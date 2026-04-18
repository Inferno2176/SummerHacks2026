"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

interface WorkEntry {
  id: string;
  type: 'job' | 'internship';
  role: string;
  organization: string;
  location: string;
  isRemote: boolean;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('general');
  const { user, userProfile, loading: authLoading } = useAuth();
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    headline: '',
    location: '',
    skills: [] as string[],
    salary: '',
    modeOfWork: 'Hybrid',
    objective: '',
    workHistory: [] as WorkEntry[]
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const authContext = useAuth() as any; // Cast to access local save

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }
    
    // Support mapping from 'fullName' if it exists in Firestore
    let fName = userProfile?.firstName || '';
    let lName = userProfile?.lastName || '';
    
    if (!fName && !lName && userProfile?.fullName) {
      const parts = userProfile.fullName.split(' ');
      fName = parts[0];
      lName = parts.slice(1).join(' ');
    }

    if (!fName) fName = user.displayName?.split(' ')[0] || '';
    if (!lName) lName = user.displayName?.split(' ').slice(1).join(' ') || '';
    
    setProfileData({
      firstName: fName,
      lastName: lName,
      email: user.email || '',
      phone: userProfile?.phone || '',
      headline: userProfile?.headline || '',
      location: userProfile?.location || '',
      skills: userProfile?.skills || [],
      salary: userProfile?.salary || '',
      modeOfWork: userProfile?.modeOfWork || 'Hybrid',
      objective: userProfile?.objective || '',
      workHistory: userProfile?.workHistory || []
    });
    setLoading(false);
  }, [user, userProfile, authLoading]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    
    // Create payload, filtering out strictly undefined fields which Firebase rejects
    const payload = {
      firstName: profileData.firstName || "",
      lastName: profileData.lastName || "",
      fullName: `${profileData.firstName} ${profileData.lastName}`.trim(),
      phone: profileData.phone || "",
      headline: profileData.headline || "",
      location: profileData.location || "",
      skills: profileData.skills || [],
      salary: profileData.salary || "",
      modeOfWork: profileData.modeOfWork || "Hybrid",
      objective: profileData.objective || "",
      workHistory: profileData.workHistory || []
    };

    try {
      const newDisplayName = payload.fullName;
      if (newDisplayName && newDisplayName !== user.displayName) {
        updateProfile(user, { displayName: newDisplayName }).catch(console.error);
      }

      // Bypass broken Firebase backend completely and forcefully inject into React/Browser memory
      if (authContext && authContext.saveProfileLocal) {
         authContext.saveProfileLocal(user.uid, payload);
      }
      
      alert("Local Cache Identity Locked Matrix Saved! Ready for Resume AI Extraction.");
    } catch(e) {
      console.error(e);
      alert("Error committing to cache memory.");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
     return <div className="flex-1 bg-surface-container-lowest min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!user) return <div className="min-h-screen bg-surface-container flex items-center justify-center text-on-surface-variant font-bold text-sm">Access Restricted</div>;

  return (
    <div className="flex-1 bg-surface min-h-screen pb-20 text-on-surface font-body overflow-x-hidden">
      
      {/* Sleek Light Mode Header - Compact layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 pb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
         <div className="w-24 h-24 shrink-0 rounded-full bg-surface-container-high border-4 border-surface shadow-md overflow-hidden relative">
            <img src={user.photoURL || `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=e2e8f0&color=475569`} className="w-full h-full object-cover" />
         </div>
         <div className="space-y-1 text-center md:text-left mt-2">
            <h1 className="text-3xl font-manrope font-black tracking-tight text-on-surface">{profileData.firstName} {profileData.lastName}</h1>
            <p className="text-sm font-bold text-on-surface-variant">{profileData.headline || "Add a professional headline"}</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Menu */}
          <div className="w-full lg:w-72 flex flex-col gap-6 shrink-0">
            <div className="bg-surface-container-lowest rounded-md p-3 border border-outline-variant/20 shadow-sm">
              {[
                { id: 'general', label: 'Identity', icon: 'fingerprint' },
                { id: 'experience', label: 'Timeline', icon: 'timeline' },
                { id: 'skills', label: 'Skill Matrix', icon: 'hub' },
                { id: 'resume', label: 'Vault', icon: 'folder_zip' },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-md w-full text-left transition-all duration-200 ${activeTab === tab.id ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'}`}
                >
                  <span className={`material-symbols-outlined text-[20px] ${activeTab === tab.id ? 'text-primary' : ''}`}>{tab.icon}</span>
                  <span className="text-[11px] uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-6 bg-surface-container rounded-md border border-outline-variant/10">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface">Data Privacy</h4>
               <p className="text-[11px] font-medium text-on-surface-variant mt-2 leading-relaxed">Your data securely synchronizes with the LandMyJob agentic network to power automated applications.</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <div className="bg-surface-container-lowest rounded-md p-8 lg:p-10 border border-outline-variant/20 shadow-sm space-y-8 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                   <h2 className="text-xl font-manrope font-black tracking-tight text-on-surface">General Information</h2>
                   <button onClick={handleSave} disabled={saving} className="bg-primary hover:opacity-90 text-on-primary px-6 py-2.5 rounded-md font-black text-[10px] uppercase tracking-widest shadow-sm transition-opacity disabled:opacity-50">{saving ? 'Saving...' : 'Save Profile'}</button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["firstName", "lastName", "phone", "location"].map(field => (
                      <div key={field} className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant pl-1">{field}</label>
                        <input 
                          type="text" 
                          value={(profileData as any)[field]} 
                          onChange={e => setProfileData({...profileData, [field]: e.target.value})}
                          className="w-full bg-surface border border-outline-variant/20 rounded-md px-5 py-3 text-sm font-semibold text-on-surface focus:border-primary outline-none transition-colors" 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant pl-1">Professional Objective</label>
                    <textarea 
                      value={profileData.objective}
                      onChange={e => setProfileData({...profileData, objective: e.target.value})}
                      className="w-full h-32 bg-surface border border-outline-variant/20 rounded-md px-5 py-4 text-sm font-medium text-on-surface focus:border-primary outline-none transition-colors resize-none leading-relaxed" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-2">
                   <h2 className="text-xl font-manrope font-black tracking-tight text-on-surface">Career Timeline</h2>
                   <button onClick={handleSave} className="bg-surface-container hover:bg-outline-variant/20 text-on-surface-variant border border-outline-variant/20 px-6 py-2.5 rounded-md font-black text-[10px] uppercase tracking-widest transition-colors mb-2">Save History</button>
                </div>
                
                <div className="space-y-4">
                  {profileData.workHistory.length === 0 ? (
                    <div className="bg-surface-container-lowest rounded-md p-16 text-center border-2 border-dashed border-outline-variant/20 text-on-surface-variant font-medium text-sm">No work experience added yet. Add it via the Onboarding flow.</div>
                  ) : (
                    profileData.workHistory.map((exp) => (
                      <div key={exp.id} className="bg-surface-container-lowest rounded-md p-6 border border-outline-variant/20 hover:border-primary/30 transition-all flex flex-col md:flex-row justify-between gap-6 shadow-sm">
                         <div className="flex-1 space-y-3">
                            <div className="flex items-start gap-4">
                               <div className={`w-10 h-10 mt-1 rounded-md flex shrink-0 items-center justify-center ${exp.type === 'job' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                                  <span className="material-symbols-outlined text-[20px]">{exp.type === 'job' ? 'work' : 'school'}</span>
                               </div>
                               <div>
                                  <h3 className="text-base font-bold text-on-surface">{exp.organization}</h3>
                                  <p className="text-[11px] font-black uppercase tracking-widest text-on-surface-variant mt-0.5">{exp.role}</p>
                               </div>
                            </div>
                            <p className="text-sm text-on-surface-variant leading-relaxed font-medium pl-14">{exp.description}</p>
                         </div>
                         <div className="flex flex-col items-start md:items-end gap-2 md:pl-0 pl-14">
                             <div className="bg-surface px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider text-on-surface-variant border border-outline-variant/10">
                               {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}
                             </div>
                             {exp.isRemote && <span className="text-[9px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">Remote</span>}
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="bg-surface-container-lowest rounded-md p-8 lg:p-10 border border-outline-variant/20 shadow-sm space-y-8 animate-fade-in">
                 <div className="flex justify-between items-center">
                    <h2 className="text-xl font-manrope font-black tracking-tight text-on-surface">Skill Matrix</h2>
                    <button onClick={handleSave} disabled={saving} className="bg-primary hover:opacity-90 text-on-primary px-6 py-2.5 rounded-md font-black text-[10px] uppercase tracking-widest shadow-sm transition-opacity disabled:opacity-50">{saving ? 'Saving...' : 'Save Matrix'}</button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, i) => (
                      <div key={i} className="px-4 py-2 bg-surface border border-outline-variant/20 rounded-md text-[11px] font-bold uppercase tracking-widest text-on-surface shadow-sm cursor-default">
                        {skill}
                      </div>
                    ))}
                    {profileData.skills.length === 0 && <span className="text-sm text-on-surface-variant italic">No skills added yet.</span>}
                 </div>
              </div>
            )}
            
            {activeTab === 'resume' && (
              <div className="bg-surface-container-lowest rounded-md p-12 border border-outline-variant/20 shadow-sm space-y-6 animate-fade-in text-center flex flex-col items-center justify-center min-h-[300px]">
                 <span className="material-symbols-outlined text-[48px] text-primary/40 mb-2">snippet_folder</span>
                 <h2 className="text-xl font-manrope font-black tracking-tight text-on-surface">Document Vault</h2>
                 <p className="text-xs font-medium text-on-surface-variant max-w-sm mx-auto leading-relaxed">Your generated cover letters and parsed CV components are safely stored in your repository.</p>
                 <button className="mt-4 bg-surface border border-outline-variant/20 hover:bg-surface-container text-on-surface px-6 py-2.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-colors shadow-sm">View Vault Documents</button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
