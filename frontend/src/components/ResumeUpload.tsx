"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

interface Experience {
  title: string;
  company: string;
  duration: string;
  bullets: string[];
}

interface Project {
  title: string;
  tech: string[];
}

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  role: string;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  education: { degree: string; college: string; year: string };
  links: { github: string; linkedin: string };
}

export default function ProfileForm() {
  const { user, refreshProfile, userProfile: existingProfile } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState<ProfileData>({
    name: "", email: "", phone: "", role: "", skills: [],
    experience: [{ title: "", company: "", duration: "", bullets: [] }], 
    projects: [{ title: "", tech: [] }], 
    education: { degree: "", college: "", year: "" },
    links: { github: "", linkedin: "" }
  });

  // Load existing profile if available
  useEffect(() => {
    if (existingProfile) {
      setProfile(prev => ({ ...prev, ...existingProfile }));
    }
  }, [existingProfile]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setMessage("");
    try {
      await setDoc(doc(db, "users", user.uid), profile);
      setMessage("Profile updated successfully!");
      if (refreshProfile) await refreshProfile();
    } catch (err) {
      console.error(err);
      setMessage("Error saving profile: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [...profile.experience, { title: "", company: "", duration: "", bullets: [] }]
    });
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto pb-20">
      <div className="bg-surface-container-low p-8 rounded-[2rem] shadow-xl border border-outline-variant/10 w-full animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
           <h3 className="text-2xl font-manrope font-black text-on-surface uppercase tracking-tight">Professional Profile</h3>
           <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full ring-1 ring-primary/20">Manual Entry Mode</span>
        </div>
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Full Name</label>
            <input 
              className="w-full bg-surface-container-high px-5 py-3 rounded-2xl border border-outline-variant/10 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body font-medium" 
              value={profile.name} 
              onChange={(e) => setProfile({...profile, name: e.target.value})} 
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Target Role</label>
            <input 
              className="w-full bg-surface-container-high px-5 py-3 rounded-2xl border border-outline-variant/10 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body font-medium" 
              value={profile.role} 
              onChange={(e) => setProfile({...profile, role: e.target.value})} 
              placeholder="Senior Software Engineer"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Email</label>
            <input className="w-full bg-surface-container-high px-5 py-3 rounded-2xl border border-outline-variant/10 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body font-medium" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Phone</label>
            <input className="w-full bg-surface-container-high px-5 py-3 rounded-2xl border border-outline-variant/10 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body font-medium" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8 border-t border-outline-variant/10 pt-6">
          <label className="block text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-3 pl-1">Skills (Comma separated)</label>
          <input 
            className="w-full bg-surface-container-high px-5 py-3 rounded-2xl border border-outline-variant/10 text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body font-medium" 
            placeholder="React, TypeScript, Node.js..."
            value={profile.skills.join(', ')}
            onChange={(e) => setProfile({...profile, skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-50"
        >
          {isSaving ? <span>Saving...</span> : <span>Save My Profile</span>}
        </button>
        
        {message && <p className="mt-6 text-center text-primary text-xs font-black uppercase tracking-widest animate-pulse">{message}</p>}
      </div>
    </div>
  );
}
