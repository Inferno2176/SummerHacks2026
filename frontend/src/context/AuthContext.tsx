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
  role?: string;
  name?: string; 
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  userProfile: null, 
  loading: true,
  refreshProfile: async () => {} 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {};

  useEffect(() => {
    // 🔹 RAPID LOAD: Safety timeout (3s)
    const safetyTimeout = setTimeout(() => {
      if (loading) {
        console.warn("Auth initialization taking too long. Triggering rapid skip.");
        setLoading(false);
      }
    }, 3000);

    let unsubscribeProfile;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        unsubscribeProfile = onSnapshot(doc(db, 'users', currentUser.uid), (docSnap) => {
          if (docSnap.exists()) {
             setUserProfile(docSnap.data());
          } else {
             setUserProfile({});
          }
          setLoading(false);
          clearTimeout(safetyTimeout);
        }, (error) => {
          console.error("Error fetching user profile:", error);
          setLoading(false);
          clearTimeout(safetyTimeout);
        });
      } else {
        setUserProfile(null);
        if (unsubscribeProfile) unsubscribeProfile();
        setLoading(false);
        clearTimeout(safetyTimeout);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
      clearTimeout(safetyTimeout);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface/30 animate-pulse">Loading System</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
