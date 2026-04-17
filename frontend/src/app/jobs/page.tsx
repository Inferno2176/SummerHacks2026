"use client";
import React from 'react';

const jobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Google",
    location: "Mountain View, CA",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR82D6pWE71uAEIY4rCgBdI6tZXb4VPXXcrmqseN9yjWPGQyAg_iPWKpf-wzarZBdwIlwWIn0Sn-p33Kvmk0lbmXoQl10ql6_XnK1aDBHiXycgCkk29dYkN4cQBcryZeVesWcS5SjW2JFk3ZNv7y_V0VsRlUvWVItskje_D5dO1hPLfGBN2A_hyjEunrc_zN4BtCIulXjLgpQnHwc-z51jp5X-LgN9h96TPcjoyHjU2wwZz_RQOAHd4sOPDwWCF3TlAGi27UbZmMPU",
    match: "98%",
    theme: "bg-primary-fixed/20",
    isFeatured: true,
    iconColor: "text-primary",
    description: "Lead design initiatives for next-generation workspace tools, focusing on seamless collaboration and intuitive user experiences."
  },
  {
    id: 2,
    title: "UX Researcher",
    company: "Stripe",
    location: "Remote",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJPbeZaiCS2Rl-uzgjGUWeMv0szldeL7HBBm0seACSM9yDBXwzoCE13lLi0FDZ0Aohm5iVa9GCthQ8E29vJO8bh3R32SBsQivWoSzdbEO-TGEzpxPKiF0p-4eFNeLOHp-KeOHyGq6xxVqAPJeN8_2nYWTlbzE3Jpu5E6a2VBdvJBUStio_rzIqArVZdiPYBdCFiY-ovmWfA3VDYKsEOnDqxu9CSt1DpTMfBLFUrFxXLMZU5STi4-qZoKpqlsLZRwCNiL-M9N9PAuFb",
    match: "95%",
    theme: "bg-surface-container-lowest",
    iconColor: "text-secondary",
    description: "Conduct foundational and tactical research to inform product strategy for global financial infrastructure tools."
  },
  {
    id: 3,
    title: "Design Systems Lead",
    company: "Airbnb",
    location: "San Francisco, CA",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSrAjBzv3vfGQNNUTUR0A0wCzqE5txm6C3u6fvlEiIdzTHKjNVK2CmgEo_fKh0nmRkl39_cOWHDEIquf1cKnklfRlLl6e3PcKVYuXTRFGNvxoeAMweRDDJGYk6maWB5_eqkZIlh50NNRJoZ1k5wIlbtIEDXxn9BRFjo3Nw7VFY4OTie6FjbNDLuEWXKkZGiV26-wTTmgdUCQB_XcKHyMYqYBAQlXGBg2cI2mYap2D68up7nzVtYgfnS6KkCdlKKdbNWEu3F3YoEUW",
    match: "92%",
    theme: "bg-tertiary-fixed/10",
    iconColor: "text-tertiary",
    description: "Define and evolve the core visual language and component libraries across all core traveler experiences."
  }
];

const filterCategories = [
  { name: "Job Type", options: ["Full-time", "Contract", "Remote", "Part-time"] },
  { name: "Salary Range", options: ["$80k - $120k", "$120k - $160k", "$160k - $200k", "$200k+"] },
  { name: "Experience Level", options: ["Entry", "Mid-Level", "Senior", "Lead / Principal"] }
];

export default function JobFeed() {
  return (
    <div className="flex-1 bg-surface h-[calc(100vh-4.5rem)] flex flex-col xl:flex-row max-w-[1920px] mx-auto w-full overflow-hidden">
      
      {/* Sidebar Filter (Fixed/Non-scrollable) */}
      <aside className="w-full xl:w-[260px] shrink-0 border-r border-outline-variant/10 p-8 bg-surface-container-low/30 h-full overflow-hidden hidden xl:block">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-manrope font-black text-lg text-on-surface uppercase tracking-tight">Filters</h3>
          <button className="text-primary text-[10px] font-black uppercase tracking-wider hover:opacity-70 transition-opacity">Clear All</button>
        </div>

        <div className="space-y-8">
          {filterCategories.map((category) => (
            <div key={category.name}>
              <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] mb-4 opacity-60">{category.name}</h4>
              <div className="space-y-3">
                {category.options.map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-4 h-4 rounded border-[1.5px] border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-sm bg-primary opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant group-hover:text-on-surface transition-colors">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 bg-on-surface text-surface py-3.5 rounded-xl font-black text-[11px] shadow-lg hover:opacity-90 transition-all uppercase tracking-widest">
          Apply
        </button>
      </aside>

      {/* Main Content Area (Scrollable) */}
      <div className="flex-1 h-full overflow-y-auto no-scrollbar relative">
        <div className="p-6 md:p-8 flex flex-col gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Page Header (Compact) */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-2 border-b border-outline-variant/5">
            <div>
              <h2 className="font-manrope text-3xl font-black text-on-surface mb-1 tracking-tight uppercase">Curated Opportunities</h2>
              <p className="font-body text-sm text-on-surface-variant font-medium opacity-70">AI-matched roles tailored to your unique career trajectory.</p>
            </div>
            <div className="flex gap-2">
               <button className="px-5 py-2 rounded-xl bg-surface-container-high text-on-surface text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-colors">Sort by Match</button>
            </div>
          </header>

          {/* Job Grid (3x3 Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className={`${job.isFeatured ? 'bg-primary shadow-[0_20px_50px_rgba(74,75,215,0.15)] ring-4 ring-primary/5' : job.theme} rounded-3xl p-6 flex flex-col gap-6 relative group hover:-translate-y-1 transition-all duration-300 ambient-shadow border border-outline-variant/10 overflow-hidden`}>
                
                {/* Decorative Accent for Featured */}
                {job.isFeatured && <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>}

                {/* AI Tag */}
                <div className={`absolute top-6 right-6 ${job.isFeatured ? 'bg-white/20 text-white' : 'bg-surface-container-lowest/90 text-on-surface'} backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm border border-white/10 z-10`}>
                  <span className={`material-symbols-outlined text-[14px] ${job.isFeatured ? 'text-white' : job.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="font-body text-[10px] font-black uppercase tracking-tighter">{job.match} Match</span>
                </div>

                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl ${job.isFeatured ? 'bg-white' : 'bg-surface-container-lowest'} flex items-center justify-center shadow-sm overflow-hidden p-2 border border-outline-variant/10 group-hover:scale-105 transition-transform`}>
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className={`font-manrope font-black text-lg ${job.isFeatured ? 'text-white' : 'text-on-surface'} leading-tight`}>{job.title}</h3>
                    <p className={`font-body text-xs mt-1 font-bold ${job.isFeatured ? 'text-white/70' : 'text-on-surface-variant/80'}`}>{job.company} • {job.location}</p>
                  </div>
                </div>

                {/* Description */}
                <p className={`font-body text-xs line-clamp-2 leading-relaxed font-semibold ${job.isFeatured ? 'text-white/90' : 'text-on-surface/80'}`}>
                  {job.description}
                </p>

                {/* Actions */}
                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  <div className="flex gap-2 w-full">
                    <button className={`flex-1 ${job.isFeatured ? 'bg-white text-primary' : 'bg-primary text-white shadow-primary/20'} font-body text-[10px] font-black py-2.5 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-[0.95] uppercase tracking-widest`}>
                      Apply
                    </button>
                    <button className={`flex-1 ${job.isFeatured ? 'bg-white/20 text-white border-white/20' : 'bg-surface-container-lowest text-primary border-primary/20'} border font-body text-[10px] font-black py-2.5 rounded-xl hover:bg-white/10 transition-all uppercase tracking-widest`}>
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Simulation cards */}
            {[...jobs, ...jobs].slice(0, 6).map((job, idx) => (
              <div key={`${job.id}-dup-${idx}`} className={`${job.theme} rounded-3xl p-6 flex flex-col gap-6 relative group hover:-translate-y-1 transition-all duration-300 ambient-shadow border border-outline-variant/10`}>
                <div className="absolute top-6 right-6 bg-surface-container-lowest/90 backdrop-blur-sm rounded-lg px-2.5 py-1 flex items-center gap-1.5 shadow-sm border border-outline-variant/10 z-10">
                  <span className={`material-symbols-outlined ${job.iconColor} text-[14px]`} style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="font-body text-[10px] font-black text-on-surface">{job.match} Match</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center shadow-sm overflow-hidden p-2 border border-outline-variant/10">
                    <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-lg text-on-surface leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="font-body text-xs text-on-surface-variant mt-1 font-bold opacity-70">{job.company} • {job.location}</p>
                  </div>
                </div>
                <p className="font-body text-xs text-on-surface/80 line-clamp-2 leading-relaxed font-semibold">
                  {job.description}
                </p>
                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  <div className="flex gap-2 w-full">
                    <button className="flex-1 bg-primary text-white font-body text-[10px] font-black py-2.5 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl transition-all active:scale-[0.95] uppercase tracking-widest">
                      Apply
                    </button>
                    <button className="flex-1 bg-surface-container-lowest text-primary border border-primary/20 font-body text-[10px] font-black py-2.5 rounded-xl hover:bg-primary/5 transition-all uppercase tracking-widest">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
