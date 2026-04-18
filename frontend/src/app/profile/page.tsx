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
  const [newSkill, setNewSkill] = useState('');
  const [isEditingSkill, setIsEditingSkill] = useState(false);

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
    try {
      const newDisplayName = `${profileData.firstName} ${profileData.lastName}`.trim();
      if (newDisplayName && newDisplayName !== user.displayName) {
        await updateProfile(user, { displayName: newDisplayName });
      }

      await setDoc(doc(db, 'users', user.uid), {
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        fullName: `${profileData.firstName} ${profileData.lastName}`.trim(),
        phone: profileData.phone,
        headline: profileData.headline,
        location: profileData.location,
        skills: profileData.skills,
        salary: profileData.salary,
        modeOfWork: profileData.modeOfWork,
        objective: profileData.objective,
        workHistory: profileData.workHistory
      }, { merge: true });
      
      alert("Profile nodes updated in the sanctuary.");
    } catch (err) {
      console.error(err);
      alert("Error saving profile.");
    }
    setSaving(false);
  };

  if (authLoading || loading) {
     return <div className="flex-1 bg-[#0a0a0f] min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div></div>;
  }

  if (!user) return <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center text-gray-500 uppercase tracking-widest font-black text-xs">Access Restricted</div>;

  return (
    <div className="flex-1 bg-[#0a0a0f] min-h-screen pb-20 text-gray-100 font-body">
      
      {/* Dynamic Header */}
      <div className="h-64 bg-gradient-to-br from-indigo-600/20 via-purple-600/5 to-transparent relative flex items-end px-12 pb-12 border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
        <div className="flex items-center gap-8 relative z-10 animate-fade-in">
           <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-[#0a0a0f] shadow-2xl overflow-hidden">
              <img src={user.photoURL || `https://ui-avatars.com/api/?name=${profileData.firstName}+${profileData.lastName}&background=4f46e5&color=fff`} className="w-full h-full object-cover" />
           </div>
           <div className="space-y-1">
              <h1 className="text-4xl font-manrope font-black tracking-tighter uppercase">{profileData.firstName} {profileData.lastName}</h1>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 opacity-80">{profileData.headline || "Architect choice"}</p>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-12 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Menu */}
          <div className="w-full lg:w-80 flex flex-col gap-8">
            <div className="bg-[#11111a] rounded-md p-4 border border-white/5 shadow-2xl">
              {[
                { id: 'general', label: 'Identity', icon: 'fingerprint' },
                { id: 'experience', label: 'Timeline', icon: 'timeline' },
                { id: 'skills', label: 'Skill Matrix', icon: 'hub' },
                { id: 'resume', label: 'Vault', icon: 'folder_zip' },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-md w-full text-left transition-all duration-300 ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                >
                  <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="p-8 bg-indigo-600/5 rounded-md border border-indigo-600/10 space-y-4">
               <h4 className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Security Checkpoint</h4>
               <p className="text-[10px] font-bold text-gray-500 leading-relaxed uppercase tracking-wider">Your sanctuary nodes are encrypted and synchronized across the agentic network.</p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <div className="bg-[#11111a] rounded-md p-12 border border-white/5 shadow-2xl space-y-10 animate-fade-in">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-manrope font-black tracking-tight uppercase">General Identity</h2>
                   <button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl transition-all disabled:opacity-50">{saving ? 'Syncing...' : 'Update Sanctuary'}</button>
                </div>

                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {["firstName", "lastName", "phone", "location"].map(field => (
                      <div key={field} className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 pl-4">{field}</label>
                        <input 
                          type="text" 
                          value={(profileData as any)[field]} 
                          onChange={e => setProfileData({...profileData, [field]: e.target.value})}
                          className="w-full bg-white/5 border border-white/5 rounded-md px-6 py-4 text-sm font-semibold text-gray-200 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all" 
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 pl-4">Professional Objective</label>
                    <textarea 
                      value={profileData.objective}
                      onChange={e => setProfileData({...profileData, objective: e.target.value})}
                      className="w-full h-40 bg-white/5 border border-white/5 rounded-[2rem] px-8 py-6 text-sm font-semibold text-gray-200 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all resize-none leading-relaxed" 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center px-4">
                   <h2 className="text-2xl font-manrope font-black tracking-tight uppercase">Career Timeline</h2>
                    <button onClick={handleSave} className="bg-white/5 hover:bg-white/10 text-gray-400 px-6 py-2.5 rounded-full font-black text-[9px] uppercase tracking-widest transition-all">Persist History</button>
                </div>
                
                <div className="space-y-4">
                  {profileData.workHistory.length === 0 ? (
                    <div className="bg-[#11111a] rounded-md p-20 text-center border border-white/5 italic text-gray-700">No nodes added to timeline yet.</div>
                  ) : (
                    profileData.workHistory.map((exp) => (
                      <div key={exp.id} className="bg-[#11111a] rounded-md p-10 border border-white/5 group hover:border-indigo-500/30 transition-all duration-500 flex flex-col md:flex-row justify-between gap-6">
                         <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-4">
                               <div className={`w-12 h-12 rounded-md flex items-center justify-center ${exp.type === 'job' ? 'bg-indigo-600/10 text-indigo-400' : 'bg-purple-600/10 text-purple-400'}`}>
                                  <span className="material-symbols-outlined">{exp.type === 'job' ? 'work' : 'school'}</span>
                               </div>
                               <div>
                                  <h3 className="text-lg font-bold text-gray-100">{exp.role}</h3>
                                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400/60">{exp.organization}</p>
                               </div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">{exp.description}</p>
                         </div>
                         <div className="text-right flex flex-col justify-center items-end gap-2">
                             <div className="bg-white/5 px-4 py-2 rounded-md text-[10px] font-black uppercase tracking-widest text-gray-400 border border-white/5">
                               {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate}
                             </div>
                             {exp.isRemote && <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400 px-2 py-0.5 bg-indigo-400/10 rounded-full">Remote / WFH</span>}
                         </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="bg-[#11111a] rounded-md p-12 border border-white/5 shadow-2xl space-y-10 animate-fade-in">
                 <h2 className="text-2xl font-manrope font-black tracking-tight uppercase">Skill Matrix</h2>
                 <div className="flex flex-wrap gap-4">
                    {profileData.skills.map((skill, i) => (
                      <div key={i} className="px-6 py-3 bg-white/5 border border-white/5 rounded-md text-[10px] font-black uppercase tracking-widest text-gray-300 hover:bg-indigo-600 hover:text-white transition-all duration-300 cursor-default">
                        {skill}
                      </div>
                    ))}
                 </div>
              </div>
            )}
            
            {activeTab === 'resume' && (
              <div className="bg-[#11111a] rounded-md p-12 border border-white/5 shadow-2xl space-y-10 animate-fade-in text-center py-32">
                 <span className="material-symbols-outlined text-6xl text-gray-800 mb-4 scale-150">inventory_2</span>
                 <h2 className="text-2xl font-manrope font-black tracking-tight uppercase">Document Vault</h2>
                 <p className="text-xs font-bold text-gray-600 uppercase tracking-widest max-w-sm mx-auto">Your generated professional assets and original CV nodes are stored in the sanctuary's secure vault.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
