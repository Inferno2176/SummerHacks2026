"use client";
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Google",
    location: "Bangalore",
    mode: "On-site",
    salary: "₹40,00,000 - ₹50,00,000",
    skills: ["Figma", "User Testing"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR82D6pWE71uAEIY4rCgBdI6tZXb4VPXXcrmqseN9yjWPGQyAg_iPWKpf-wzarZBdwIlwWIn0Sn-p33Kvmk0lbmXoQl10ql6_XnK1aDBHiXycgCkk29dYkN4cQBcryZeVesWcS5SjW2JFk3ZNv7y_V0VsRlUvWVItskje_D5dO1hPLfGBN2A_hyjEunrc_zN4BtCIulXjLgpQnHwc-z51jp5X-LgN9h96TPcjoyHjU2wwZz_RQOAHd4sOPDwWCF3TlAGi27UbZmMPU",
    match: "98%",
    theme: "bg-surface-container-lowest",
    isFeatured: false,
    iconColor: "text-primary",
    description: "Lead design initiatives for next-generation workspace tools, focusing on seamless collaboration and intuitive user experiences."
  },
  {
    id: 2,
    title: "UX Researcher",
    company: "Stripe",
    location: "Remote",
    mode: "Contract",
    salary: "₹25,00,000 - ₹35,00,000",
    skills: ["Analytics", "User Testing"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJPbeZaiCS2Rl-uzgjGUWeMv0szldeL7HBBm0seACSM9yDBXwzoCE13lLi0FDZ0Aohm5iVa9GCthQ8E29vJO8bh3R32SBsQivWoSzdbEO-TGEzpxPKiF0p-4eFNeLOHp-KeOHyGq6xxVqAPJeN8_2nYWTlbzE3Jpu5E6a2VBdvJBUStio_rzIqArVZdiPYBdCFiY-ovmWfA3VDYKsEOnDqxu9CSt1DpTMfBLFUrFxXLMZU5STi4-qZoKpqlsLZRwCNiL-M9N9PAuFb",
    match: "95%",
    theme: "bg-surface-container-lowest",
    isFeatured: false,
    iconColor: "text-secondary",
    description: "Conduct foundational and tactical research to inform product strategy for global financial infrastructure tools."
  },
  {
    id: 3,
    title: "Design Systems Lead",
    company: "Airbnb",
    location: "Mumbai",
    mode: "Hybrid",
    salary: "₹50,00,000+",
    skills: ["Figma", "React"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSrAjBzv3vfGQNNUTUR0A0wCzqE5txm6C3u6fvlEiIdzTHKjNVK2CmgEo_fKh0nmRkl39_cOWHDEIquf1cKnklfRlLl6e3PcKVYuXTRFGNvxoeAMweRDDJGYk6maWB5_eqkZIlh50NNRJoZ1k5wIlbtIEDXxn9BRFjo3Nw7VFY4OTie6FjbNDLuEWXKkZGiV26-wTTmgdUCQB_XcKHyMYqYBAQlXGBg2cI2mYap2D68up7nzVtYgfnS6KkCdlKKdbNWEu3F3YoEUW",
    match: "92%",
    theme: "bg-surface-container-lowest",
    isFeatured: false,
    iconColor: "text-tertiary",
    description: "Define and evolve the core visual language and component libraries across all core traveler experiences."
  },
  {
    id: 4,
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    mode: "Full-time",
    salary: "₹30,00,000 - ₹45,00,000",
    skills: ["React", "TypeScript", "Next.js"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR82D6pWE71uAEIY4rCgBdI6tZXb4VPXXcrmqseN9yjWPGQyAg_iPWKpf-wzarZBdwIlwWIn0Sn-p33Kvmk0lbmXoQl10ql6_XnK1aDBHiXycgCkk29dYkN4cQBcryZeVesWcS5SjW2JFk3ZNv7y_V0VsRlUvWVItskje_D5dO1hPLfGBN2A_hyjEunrc_zN4BtCIulXjLgpQnHwc-z51jp5X-LgN9h96TPcjoyHjU2wwZz_RQOAHd4sOPDwWCF3TlAGi27UbZmMPU",
    match: "88%",
    theme: "bg-surface-container-lowest",
    isFeatured: false,
    iconColor: "text-primary",
    description: "Build robust, high-performance web applications using modern JavaScript frameworks."
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Airbnb",
    location: "Bangalore",
    mode: "On-site",
    salary: "₹15,00,000 - ₹20,00,000",
    skills: ["Python", "Analytics"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSrAjBzv3vfGQNNUTUR0A0wCzqE5txm6C3u6fvlEiIdzTHKjNVK2CmgEo_fKh0nmRkl39_cOWHDEIquf1cKnklfRlLl6e3PcKVYuXTRFGNvxoeAMweRDDJGYk6maWB5_eqkZIlh50NNRJoZ1k5wIlbtIEDXxn9BRFjo3Nw7VFY4OTie6FjbNDLuEWXKkZGiV26-wTTmgdUCQB_XcKHyMYqYBAQlXGBg2cI2mYap2D68up7nzVtYgfnS6KkCdlKKdbNWEu3F3YoEUW",
    match: "82%",
    theme: "bg-surface-container-lowest",
    isFeatured: false,
    iconColor: "text-secondary",
    description: "Analyze large datasets to extract meaningful insights that define product directions."
  },
  {
    id: 6,
    title: "Machine Learning Engineer",
    company: "Stripe",
    location: "Hyderabad",
    mode: "Hybrid",
    salary: "₹45,00,000+",
    skills: ["Python", "Machine Learning"],
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJPbeZaiCS2Rl-uzgjGUWeMv0szldeL7HBBm0seACSM9yDBXwzoCE13lLi0FDZ0Aohm5iVa9GCthQ8E29vJO8bh3R32SBsQivWoSzdbEO-TGEzpxPKiF0p-4eFNeLOHp-KeOHyGq6xxVqAPJeN8_2nYWTlbzE3Jpu5E6a2VBdvJBUStio_rzIqArVZdiPYBdCFiY-ovmWfA3VDYKsEOnDqxu9CSt1DpTMfBLFUrFxXLMZU5STi4-qZoKpqlsLZRwCNiL-M9N9PAuFb",
    match: "78%",
    theme: "bg-surface-container-lowest",
    isFeatured: false,
    iconColor: "text-tertiary",
    description: "Develop generative models and optimization algorithms for natural language processing."
  }
];

export default function JobFeed() {
  const { userProfile, user, loading } = useAuth();
  const [dismissedJobs, setDismissedJobs] = useState<number[]>([]);

  const filteredJobs = jobs.filter(job => {
    if (dismissedJobs.includes(job.id)) return false;
    // If no profile data exists, show all (or prompt to complete profile below)
    if (!userProfile || Object.keys(userProfile).length === 0) return true;

    // Soft Matching logic
    let match = true;
    
    // Mode of Work Match
    if (userProfile.modeOfWork && job.mode) {
      if (userProfile.modeOfWork === 'Remote' && job.mode === 'On-site') match = false;
      if (userProfile.modeOfWork === 'On-site' && job.mode === 'Remote') match = false;
    }

    // Skills Match
    if (userProfile.skills && userProfile.skills.length > 0) {
      const lowercaseUserSkills = userProfile.skills.map(s => s.toLowerCase());
      const hasOverlap = job.skills.some(skill => lowercaseUserSkills.includes(skill.toLowerCase()));
      if (!hasOverlap) match = false; 
    }

    return match;
  });



  return (
    <div className="flex-1 bg-surface h-[calc(100vh-4.5rem)] flex flex-col max-w-[1920px] mx-auto w-full overflow-hidden">
      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 h-full overflow-y-auto no-scrollbar relative w-full">
        <div className="p-6 md:p-12 flex flex-col gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Page Header (Compact) */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-4 border-b border-outline-variant/10">
            <div>
              <h2 className="font-manrope text-3xl font-black text-on-surface mb-2 tracking-tight uppercase">Your Curated Opportunities</h2>
              <p className="font-body text-sm text-on-surface-variant font-medium">Auto-matched using the skills and preferences from your professional profile and resume.</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
               {userProfile && Object.keys(userProfile).length > 0 && (
                 <div className="flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-md text-xs font-bold border border-primary/10">
                   <span className="material-symbols-outlined text-[16px]">tune</span>
                   Profile Matches Active
                 </div>
               )}
               <button className="px-5 py-2.5 rounded-md bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-colors">Sort by Relevance</button>
            </div>
          </header>

          {/* Missing Profile Warning */}
          {!loading && user && (!userProfile || Object.keys(userProfile).length === 0) && (
            <div className="bg-tertiary/10 border border-tertiary/20 rounded-md p-6 flex flex-col sm:flex-row gap-4 items-center justify-between mb-2">
              <div className="flex items-center gap-4 text-tertiary">
                <span className="material-symbols-outlined text-3xl">account_circle_off</span>
                <div>
                  <h4 className="font-bold text-sm">Your profile is incomplete!</h4>
                  <p className="text-xs opacity-80 mt-1">Lumina AI requires your skillset, location, and salary expectations to curate jobs perfectly for you.</p>
                </div>
              </div>
              <Link href="/profile" className="shrink-0 bg-tertiary text-white px-5 py-2.5 rounded-md uppercase tracking-widest text-[10px] font-black hover:opacity-90">
                 Complete Profile
              </Link>
            </div>
          )}

          {/* Job Grid / Match Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center bg-surface-container-lowest rounded-md border border-dashed border-outline-variant/30">
                <span className="material-symbols-outlined text-5xl text-outline-variant mb-4">search_off</span>
                <h3 className="text-lg font-black text-on-surface mb-1">No perfect matches right now</h3>
                <p className="text-sm font-bold text-on-surface-variant max-w-md mx-auto">We couldn't find active roles that perfectly align with your exact skillet and mode of work. Try broadening your preferences!</p>
                <Link href="/profile" className="mt-6 bg-primary text-white text-xs font-black px-6 py-3 rounded-md uppercase tracking-widest hover:opacity-90">Update Preferences</Link>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job.id} className={`${job.theme} rounded-md p-6 flex flex-col gap-6 relative group hover:-translate-y-1 transition-all duration-300 ambient-shadow border border-outline-variant/10 overflow-hidden`}>
                  
                  {/* Dismiss Button */}
                  <button 
                    onClick={() => setDismissedJobs(prev => [...prev, job.id])}
                    className="absolute top-4 left-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-error/10 hover:border-error/20 border border-transparent transition-all z-20 opacity-0 group-hover:opacity-100 shadow-sm"
                    title="Dismiss this suggestion"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>

                  {/* Decorative Accent for Featured */}
                  {job.isFeatured && <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>}

                  {/* AI Tag */}
                  <div className={`absolute top-6 right-6 ${job.isFeatured ? 'bg-white/20 text-white' : 'bg-surface-container-lowest/90 text-on-surface'} backdrop-blur-sm rounded-md px-2.5 py-1 flex items-center gap-1.5 shadow-sm border border-outline-variant/10 z-10`}>
                    <span className={`material-symbols-outlined text-[14px] ${job.isFeatured ? 'text-white' : job.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <span className="font-body text-[10px] font-black uppercase tracking-tighter">{job.match} Match</span>
                  </div>

                  {/* Header */}
                  <div className="flex items-start gap-4 pr-24">
                    <div className={`w-12 h-12 rounded-md shrink-0 ${job.isFeatured ? 'bg-white' : 'bg-surface-container-lowest'} flex items-center justify-center shadow-sm overflow-hidden p-2 border border-outline-variant/10 group-hover:scale-105 transition-transform`}>
                      <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className={`font-manrope font-black text-lg ${job.isFeatured ? 'text-white' : 'text-on-surface'} leading-tight`}>{job.title}</h3>
                      <p className={`font-body text-xs mt-1 font-bold ${job.isFeatured ? 'text-white/70' : 'text-on-surface-variant/80'}`}>{job.company} • {job.location}</p>
                    </div>
                  </div>
                  
                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-2">
                     <span className={`text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-md border ${job.isFeatured ? 'border-white/20 text-white/90 bg-white/5' : 'border-outline-variant/20 text-on-surface-variant bg-surface'}`}>{job.mode}</span>
                     <span className={`text-[10px] uppercase tracking-wider font-black px-2.5 py-1 rounded-md border ${job.isFeatured ? 'border-white/20 text-white/90 bg-white/5' : 'border-outline-variant/20 text-on-surface-variant bg-surface'}`}>{job.salary}</span>
                  </div>

                  {/* Description */}
                  <p className={`font-body text-xs line-clamp-2 leading-relaxed font-semibold ${job.isFeatured ? 'text-white/90' : 'text-on-surface/80'}`}>
                    {job.description}
                  </p>

                  {/* Top Matched Skills Indicator */}
                  <div className="flex gap-1.5 flex-wrap">
                    {job.skills.map(s => {
                       const isSkillMatch = userProfile?.skills?.map(us => us.toLowerCase()).includes(s.toLowerCase());
                       return (
                         <span key={s} className={`text-[9px] uppercase tracking-widest font-black px-2 py-1 rounded flex items-center gap-1 ${isSkillMatch ? 'bg-primary/10 text-primary' : (job.isFeatured ? 'text-white/60 bg-white/5' : 'text-on-surface-variant/60 bg-surface-container')}`}>
                           {isSkillMatch && <span className="material-symbols-outlined text-[10px]">check_circle</span>}
                           {s}
                         </span>
                       );
                    })}
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-2 flex items-center justify-between gap-3">
                    <div className="flex gap-2 w-full">
                       <button className={`flex-1 ${job.isFeatured ? 'bg-white text-primary' : 'bg-primary text-white shadow-primary/20'} font-body text-[10px] font-black py-2.5 rounded-md shadow-lg hover:opacity-90 transition-all active:scale-[0.95] uppercase tracking-widest`}>
                        Apply
                      </button>
                      <button className={`flex-1 ${job.isFeatured ? 'bg-white/20 text-white border-white/20' : 'bg-surface-container-lowest text-primary border-primary/20'} border font-body text-[10px] font-black py-2.5 rounded-md hover:bg-primary/5 transition-all uppercase tracking-widest`}>
                        Auto Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            </div>
        </div>
      </div>
    </div>
  );
}
