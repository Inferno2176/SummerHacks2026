"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export interface UserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  headline?: string;
  location?: string;
  skills?: string[];
  salary?: string;
  modeOfWork?: string;
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, userProfile: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fallback to local storage for profile data due to DB issues
        try {
           const localData = localStorage.getItem(`profile_${currentUser.uid}`);
           if (localData) {
              setUserProfile(JSON.parse(localData));
           } else {
              setUserProfile({});
           }
        } catch(e) {
           setUserProfile({});
        }
        setLoading(false);

        // Keep DB as a backup read if it works, but don't overwrite if local data is richer
        unsubscribeProfile = onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
          if (docSnap.exists()) {
             const serverData = docSnap.data();
             setUserProfile(prev => {
                // Only merge if we don't have local data, preventing server rollback of cache
                if (Object.keys(prev || {}).length === 0) return serverData as UserProfile;
                return prev;
             });
          }
        }, (error) => {
          console.warn("DB syncing error, relying purely on LocalStorage.", error.message);
        });
      } else {
        setUserProfile(null);
        if (unsubscribeProfile) unsubscribeProfile();
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  // Provide a method to save to context/localStorage
  const saveProfileLocal = (uid: string, data: Partial<UserProfile>) => {
     setUserProfile(prev => {
        const merged = { ...prev, ...data };
        localStorage.setItem(`profile_${uid}`, JSON.stringify(merged));
        return merged;
     });
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, saveProfileLocal } as any}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);