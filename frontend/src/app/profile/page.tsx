"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

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
    modeOfWork: 'Hybrid'
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
    
    const names = user.displayName?.split(' ') || ['', ''];
    const currentEmail = user.email || '';
    
    setProfileData({
      firstName: userProfile?.firstName || names[0] || '',
      lastName: userProfile?.lastName || names.slice(1).join(' ') || '',
      email: currentEmail,
      phone: userProfile?.phone || '',
      headline: userProfile?.headline || '',
      location: userProfile?.location || '',
      skills: userProfile?.skills || [],
      salary: userProfile?.salary || '',
      modeOfWork: userProfile?.modeOfWork || 'Hybrid'
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
        phone: profileData.phone,
        headline: profileData.headline,
        location: profileData.location,
        skills: profileData.skills,
        salary: profileData.salary,
        modeOfWork: profileData.modeOfWork
      }, { merge: true });
      
      alert("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving profile.");
    }
    setSaving(false);
  };

  if (authLoading || loading) {
     return <div className="flex-1 bg-surface min-h-[calc(100vh-4.5rem)] flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!user) {
    return (
      <div className="flex-1 bg-surface min-h-[calc(100vh-4.5rem)] flex items-center justify-center flex-col text-center">
        <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">lock</span>
        <h2 className="font-manrope text-2xl font-black text-on-surface">Please log in</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface min-h-[calc(100vh-4.5rem)] pb-20 overflow-x-hidden">
      
      {/* Header Banner Background */}
      <div className="h-48 bg-gradient-to-r from-primary/10 via-tertiary/10 to-surface-container-low relative flex items-end px-6 md:px-12 pb-6 border-b border-outline-variant/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="flex-1"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-16 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Avatar & Quick Stats */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* Identity Card */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow border border-outline-variant/10 flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white shadow-xl mb-4 relative group cursor-pointer">
                <img 
                  src={user.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuA-PF9XwC43wOc_hRgLrzAYXsZjU0jXOuwuoT2unSUJ8MLIEgkLuTtkgyBz0I1hYAFTKDtRWAfYkLMcV4tqLhCQF8WQNymvONZKoxfX0TL5vJu8RRQQBV9RJV3OQdXSShBXO41Bn1125gArjdtt5hGx-HEwMb8XSE2oZyPlPC61aQxGZBb8njGah7MEiqOnJWlaIFvew2s8RizW1MOfIv6Ye8pyh8A9P7YqnX_XZJ6eLWa4n8HiDgHAOHdPTcks5buddEfddG6S_BnY"} 
                  alt="Profile Avatar" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                </div>
              </div>
              
              <h2 className="font-manrope font-black text-2xl text-on-surface">{profileData.firstName} {profileData.lastName}</h2>
              <p className="font-body text-sm font-bold text-on-surface-variant/80 mt-1">{profileData.headline || 'Add a professional headline'}</p>
              
              <div className="flex items-center gap-2 mt-4 text-[11px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {profileData.location || 'Location'}
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow border border-outline-variant/10">
              <h3 className="font-manrope font-bold text-sm text-on-surface uppercase tracking-wider mb-4">Profile Strength</h3>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden mb-3">
                <div className="bg-primary h-full rounded-full w-[85%]"></div>
              </div>
              <p className="font-body text-[11px] font-black text-on-surface-variant uppercase tracking-widest flex justify-between">
                <span>85% Completed</span>
                <span className="text-primary hover:underline cursor-pointer">Improve</span>
              </p>
            </div>

            {/* Quick Links / Menu */}
            <div className="bg-surface-container-lowest rounded-3xl p-4 ambient-shadow border border-outline-variant/10 flex flex-col gap-1">
              {[
                { id: 'general', label: 'General Info', icon: 'person' },
                { id: 'resume', label: 'Resume & Documents', icon: 'picture_as_pdf' },
                { id: 'preferences', label: 'Job Preferences', icon: 'tune' },
                { id: 'security', label: 'Security & Login', icon: 'lock' },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-left transition-all ${activeTab === tab.id ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface hover:bg-surface-container-high font-medium'}`}
                >
                  <span className="material-symbols-outlined text-[20px] opacity-80">{tab.icon}</span>
                  <span className="font-manrope text-sm">{tab.label}</span>
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Dynamic Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            
            {activeTab === 'general' && (
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 ambient-shadow border border-outline-variant/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-manrope text-2xl font-black text-on-surface tracking-tight uppercase">General Information</h3>
                  <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="bg-on-surface text-surface px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">First Name</label>
                    <input 
                      type="text" 
                      value={profileData.firstName} 
                      onChange={e => setProfileData(p => ({...p, firstName: e.target.value}))}
                      className="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Last Name</label>
                    <input 
                      type="text" 
                      value={profileData.lastName}
                      onChange={e => setProfileData(p => ({...p, lastName: e.target.value}))}
                      className="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Email Address</label>
                    <input 
                      type="email" 
                      value={profileData.email}
                      disabled
                      className="w-full bg-surface/50 border border-outline-variant/10 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface-variant cursor-not-allowed" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Phone Number</label>
                    <input 
                      type="tel" 
                      value={profileData.phone}
                      onChange={e => setProfileData(p => ({...p, phone: e.target.value}))}
                      className="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Current Location</label>
                    <input 
                      type="text" 
                      value={profileData.location}
                      onChange={e => setProfileData(p => ({...p, location: e.target.value}))}
                      placeholder="e.g. San Francisco, CA"
                      className="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Professional Headline</label>
                    <input 
                      type="text" 
                      value={profileData.headline}
                      onChange={e => setProfileData(p => ({...p, headline: e.target.value}))}
                      className="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-1.5 pt-4">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1 mb-2 block">Top Skills</label>
                    <div className="flex flex-wrap gap-2 items-center">
                       {profileData.skills.map(skill => (
                          <div key={skill} className="bg-secondary/10 border border-secondary/20 text-secondary text-[11px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 uppercase tracking-wider">
                            {skill}
                            <span 
                              onClick={() => setProfileData(p => ({...p, skills: p.skills.filter(s => s !== skill)}))}
                              className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error transition-colors"
                            >
                              close
                            </span>
                          </div>
                       ))}
                       {isEditingSkill ? (
                         <form onSubmit={(e) => {
                           e.preventDefault();
                           const formatted = newSkill.trim();
                           if (formatted && !profileData.skills.includes(formatted)) {
                             setProfileData(p => ({...p, skills: [...p.skills, formatted]}));
                           }
                           setNewSkill('');
                           setIsEditingSkill(false);
                         }}>
                           <input 
                             type="text" 
                             autoFocus 
                             placeholder="Press Enter"
                             value={newSkill} 
                             onChange={e => setNewSkill(e.target.value)} 
                             onBlur={() => setIsEditingSkill(false)}
                             className="border border-outline-variant/50 text-xs px-2 py-1.5 rounded outline-none w-32 bg-surface font-semibold focus:border-primary"
                           />
                         </form>
                       ) : (
                         <button onClick={() => setIsEditingSkill(true)} className="border border-dashed border-outline-variant/50 text-outline-variant text-[11px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-surface-container hover:text-on-surface transition-colors uppercase tracking-wider">
                           <span className="material-symbols-outlined text-[14px]">add</span> Add Skill
                         </button>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resume' && (
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 ambient-shadow border border-outline-variant/10">
                 <h3 className="font-manrope text-2xl font-black text-on-surface tracking-tight uppercase mb-2">Resume & Documents</h3>
                 <p className="font-body text-sm text-on-surface-variant mb-8">Manage the resumes that Lumina AI uses to match you with jobs.</p>

                 <div className="border border-dashed border-outline-variant/40 bg-surface rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all group mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary text-3xl">cloud_upload</span>
                    </div>
                    <h4 className="font-manrope font-extrabold text-on-surface mb-1">Upload New Resume</h4>
                    <p className="font-body text-xs text-on-surface-variant">PDF, DOCX up to 5MB</p>
                 </div>

                 <div className="space-y-4">
                   <h4 className="font-body text-[11px] font-black text-on-surface-variant uppercase tracking-widest mb-2">Saved Resumes</h4>
                   
                   <div className="bg-surface border border-outline-variant/10 rounded-xl p-4 flex items-center justify-between group hover:border-primary/30 transition-colors">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-error/10 text-error rounded-lg flex items-center justify-center">
                         <span className="material-symbols-outlined">picture_as_pdf</span>
                       </div>
                       <div>
                         <p className="font-manrope font-bold text-sm text-on-surface">{profileData.firstName}_{profileData.lastName}_Resume.pdf</p>
                         <p className="font-body text-xs text-on-surface-variant">Parsed 2 days ago • Default</p>
                       </div>
                     </div>
                     <div className="flex gap-2">
                       <button className="p-2 text-outline-variant hover:text-primary transition-colors"><span className="material-symbols-outlined text-[18px]">visibility</span></button>
                       <button className="p-2 text-outline-variant hover:text-error transition-colors"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                     </div>
                   </div>

                 </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="bg-surface-container-lowest rounded-[2rem] p-8 ambient-shadow border border-outline-variant/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-manrope text-2xl font-black text-on-surface tracking-tight uppercase">Job Preferences</h3>
                  <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="bg-on-surface text-surface px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Salary Expectations (INR)</label>
                    <input 
                      type="text" 
                      value={profileData.salary} 
                      onChange={e => setProfileData(p => ({...p, salary: e.target.value}))}
                      placeholder="e.g. 15,00,000"
                      className="w-full bg-surface border border-outline-variant/20 rounded-xl px-4 py-3 text-sm font-semibold text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    />
                  </div>
                  
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Preferred Mode of Work</label>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {['Remote', 'Hybrid', 'On-site'].map(mode => (
                        <button
                          key={mode}
                          onClick={() => setProfileData({ ...profileData, modeOfWork: mode })}
                          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${profileData.modeOfWork === mode ? 'bg-primary border-primary text-on-primary' : 'bg-surface border-outline-variant/20 text-on-surface-variant hover:border-primary/50'}`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs to prevent empty state while switching */}
            {(activeTab === 'security') && (
              <div className="bg-surface-container-lowest rounded-[2rem] p-12 ambient-shadow border border-outline-variant/10 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-5xl text-outline-variant/40 mb-4">construction</span>
                <h3 className="font-manrope text-xl font-black text-on-surface tracking-tight">Under Construction</h3>
                <p className="font-body text-sm text-on-surface-variant mt-2 max-w-sm">This section is being built to give you more customized control over your journey.</p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
