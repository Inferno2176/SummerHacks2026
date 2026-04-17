"use client";
import React from 'react';

const applications = [
  {
    id: 1,
    title: "Product Designer",
    company: "Google",
    location: "Mountain View, CA",
    status: "Interview",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMd4OXJ0bqbUo57kU1G7hYTnQRN-ctd50E1Gd9lPGZZqeHfrUB57Sn0tYOb-ilqfMrFJtO6bJQbUUI5H00-JxHvdfv7dk5Dsilmh-f0vEixRM6ke4EJdAH4oYSDz11_gWkPtMO4d_jNWgS1811-XbhgLt7u4b3yAXcRQoyL3QSEfc7FzmtkxIxRO7NpGHvNR4-FozyR54-VuAqIH2YTTMqHWKNOpLsRw58pJqVSuafq0SbgEowzQGG4CfjW-r1qo1kKAEuIqKewuP0",
    statusColor: "bg-secondary-container text-on-secondary-container",
    nextStep: "Portfolio Review · Tomorrow, 2 PM",
    nextStepIcon: "videocam",
    action: "Prepare"
  },
  {
    id: 2,
    title: "UX Researcher",
    company: "Airbnb",
    location: "Remote",
    status: "Applied",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWWv5GKZVE1S1k4-jw0DY1lDh6gTQKBiT3OHQUPDYI0JzcYdZN5M5M-WTDKxzG_paVtUR9WpYdzo33mZe2WNgc5JOZo95nmn1s3rM0eoCZHorLzcJyH0euyC5zioK0WUhS2pWCRs_1iMuQIDzoy8FSSA06ReP1wPqA8j4cUbEN_nj5bDAJ-YhGYalWkeMOHjav_Vht3tuHG5LylMh6B_oIiUu92lZ_1XAI1ewAMP4NKdMxBu1AWflPMuIgPS-00DJwGLQ9kgXvg772",
    statusColor: "bg-primary-container/20 text-primary",
    nextStep: "Applied 2 days ago. Awaiting review.",
    progress: 30
  },
  {
    id: 3,
    title: "Design Systems Lead",
    company: "Spotify",
    location: "New York, NY",
    status: "Saved",
    logo: "https://lh3.googleusercontent.com/aida-public/AB6AXuCH7-TF1GgJBg4hr7Zs1UDZkKD3DzPoGhlGbpJ3ikr-ccgnlPQoKCTlk_nQu7DqAHYhyzN81RtQostBLFac9px-HyW1HuEFORhWdyFpjENhw0qKR1Hp_1C0DUcOlWgHvgl27ohd-ZCaOMEMlNV4NaKQw1MCkh1H3HEfqlaOPvX0yOkOOv46BAIBjJu4cOxXGUvCfNk6PF5OsfEqrs4iVMI7ebeh96g_gEb28RVZ8zICEm2tzDVH47h1WsPutcgQmMvjvz2TcxGBPVWJ",
    statusColor: "bg-surface-container-high text-on-surface",
    action: "Apply"
  }
];

const feedItems = [
  { id: 1, time: "Just now", icon: "check_circle", iconColor: "text-secondary", title: "Scheduled interview with Google", desc: "Added Portfolio Review to your calendar for tomorrow at 2 PM." },
  { id: 2, time: "2 hours ago", icon: "document_scanner", iconColor: "text-primary", title: "Generated resume for Airbnb", desc: "Tailored your experience to highlight user research metrics.", action: "View Draft" },
  { id: 3, time: "Yesterday", icon: "travel_explore", iconColor: "text-tertiary", title: "Found 3 new matches", desc: "Based on your preference for remote design systems roles.", tags: ["Figma", "Vercel", "+1"] }
];

export default function ApplicationsPage() {
  return (
    <div className="flex-1 bg-surface min-h-[calc(100vh-4.5rem)] flex flex-col xl:flex-row p-4 md:p-6 max-w-screen-2xl mx-auto w-full overflow-hidden">
      
      {/* Left Column: Lumina Activity Feed (Blended) */}
      <aside className="w-full xl:w-[260px] shrink-0 -mt-2">
        <div className="sticky top-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse"></div>
              <div className="w-10 h-10 bg-gradient-to-tr from-primary to-primary-fixed rounded-full flex items-center justify-center relative z-10 shadow-sm border border-surface-container-lowest text-white">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
            </div>
            <div>
              <h2 className="font-manrope font-black text-xl text-on-surface">Lumina</h2>
              <p className="text-xs text-primary font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span> Active Concierge
              </p>
            </div>
          </div>

          <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-gradient-to-b before:from-primary/20 before:to-transparent ml-1">
            {feedItems.map((item) => (
              <div key={item.id} className="relative pl-8 group">
                <div className="absolute left-[-6px] top-1 w-8 h-8 bg-surface rounded-full flex items-center justify-center border-[4px] border-surface shadow-sm z-10">
                   <span className={`material-symbols-outlined ${item.iconColor} text-[14px]`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <p className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-0.5">{item.time}</p>
                <div className="bg-surface-container-low/30 rounded-xl p-3 group-hover:bg-surface-container/50 transition-colors">
                  <h4 className="font-manrope font-bold text-on-surface text-xs mb-0.5">{item.title}</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium leading-snug">{item.desc}</p>
                  {item.action && (
                    <button className="mt-2 text-[10px] font-bold text-primary flex items-center gap-1 hover:text-primary-dim transition-colors uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[12px]">visibility</span> {item.action}
                    </button>
                  )}
                  {item.tags && (
                    <div className="flex gap-1.5 mt-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-surface-container-low px-1.5 py-0.5 rounded-md text-[9px] font-bold border border-outline-variant/10 text-on-surface-variant">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Divider for AI Column */}
      <div className="hidden xl:block w-px bg-outline-variant/30 mx-6 self-stretch shrink-0 mt-4"></div>

      {/* Main Column: Application Tracker */}
      <div className="flex-1 flex flex-col gap-6 min-w-0 h-full">
        
        {/* Header inline with Search & Filters */}
        <header className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-4 w-full shrink-0">
          <div className="shrink-0">
            <h1 className="text-3xl font-manrope font-extrabold text-on-surface tracking-tight mb-1">Applications</h1>
            <p className="text-on-surface-variant text-sm font-body">Tracking your journey to the next opportunity.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-center bg-surface-container-low p-1.5 rounded-full border border-outline-variant/10 shadow-sm w-full 2xl:w-auto">
            <div className="flex-1 relative w-full min-w-48">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input className="w-full bg-surface-container-lowest rounded-full py-2 pl-9 pr-3 border-none focus:ring-2 focus:ring-primary text-xs font-body shadow-sm placeholder-on-surface-variant/50" placeholder="Search roles, companies..." type="text"/>
            </div>
            <div className="flex gap-1.5 pr-1.5 overflow-x-auto w-full sm:w-auto custom-scrollbar pb-1 sm:pb-0">
              <button className="bg-primary text-on-primary px-4 py-2 rounded-full text-xs font-semibold font-body whitespace-nowrap shadow-sm">All (12)</button>
              <button className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-4 py-2 rounded-full text-xs font-medium font-body whitespace-nowrap transition-colors border border-outline-variant/15">Interviewing (3)</button>
              <button className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-4 py-2 rounded-full text-xs font-medium font-body whitespace-nowrap transition-colors border border-outline-variant/15">Applied (8)</button>
            </div>
          </div>
        </header>

        {/* Tracker Horizontal Kanban Sections (Vertically Stacked Items) */}
        <div className="flex flex-col xl:flex-row w-full flex-1 min-h-0 pt-2">
          {[
            { label: 'Interviews', status: 'Interview' }, 
            { label: 'Applied', status: 'Applied' }, 
            { label: 'Saved', status: 'Saved' }
          ].map((section, index, array) => {
            const sectionApps = applications.filter(a => a.status === section.status);
            // Count total non-empty columns to know when to render a right-border
            const activeSections = array.filter(s => applications.filter(a => a.status === s.status).length > 0);
            if (sectionApps.length === 0) return null;
            
            const isLastActive = activeSections.length > 0 ? activeSections[activeSections.length - 1].label === section.label : false;

            return (
              <React.Fragment key={section.label}>
                <section className="flex-1 flex flex-col gap-4 w-full min-w-[260px] px-1">
                  <h3 className="text-lg font-manrope font-black text-on-surface pl-3 border-l-4 border-primary">
                    {section.label} <span className="text-on-surface-variant text-sm ml-1 opacity-50">({sectionApps.length})</span>
                  </h3>
                  {/* Vertical scroll container */}
                  <div className="flex flex-col overflow-y-auto overflow-x-hidden gap-4 pb-4 w-full h-full custom-scrollbar pr-2">
                    {sectionApps.map((app) => (
                      <article key={app.id} className={`w-full shrink-0 h-[175px] ${app.status === 'Interview' ? 'bg-secondary text-on-secondary shadow-md ring-2 ring-secondary/10' : 'bg-surface-container-lowest'} rounded-2xl p-4 ambient-shadow flex flex-col relative overflow-hidden group border border-outline-variant/10 hover:-translate-y-0.5 transition-transform`}>
                        {/* Decorative Accent for Featured */}
                        {app.status === 'Interview' && <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-xl pointer-events-none"></div>}

                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${app.status === 'Interview' ? 'bg-white' : 'bg-surface-container'} flex items-center justify-center overflow-hidden border border-outline-variant/10 p-1.5 shrink-0`}>
                              <img src={app.logo} alt={app.company} className="w-full h-full object-contain" />
                            </div>
                            <div className="min-w-0">
                              <h3 className={`font-manrope font-bold text-base truncate ${app.status === 'Interview' ? 'text-white' : 'text-on-surface'}`}>{app.title}</h3>
                              <p className={`text-xs font-body truncate ${app.status === 'Interview' ? 'text-white/70' : 'text-on-surface-variant'}`}>{app.company} • {app.location}</p>
                            </div>
                          </div>
                          <span className={`${app.status === 'Interview' ? 'bg-white/20 text-white border-white/10' : app.statusColor + ' border-outline-variant/5'} shrink-0 px-2 py-0.5 rounded-md text-[10px] font-black font-body flex items-center gap-1 border ml-2`}>
                            <span className="material-symbols-outlined text-[12px]">
                              {app.status === 'Interview' ? 'calendar_clock' : app.status === 'Applied' ? 'send' : 'bookmark'}
                            </span>
                            {app.status}
                          </span>
                        </div>

                        {app.nextStep && (
                          <div className={`${app.status === 'Interview' ? 'bg-white/10' : 'bg-surface-container-low'} rounded-xl p-3 mt-auto`}>
                            <p className={`text-[11px] font-black uppercase tracking-widest mb-1.5 flex items-center justify-between ${app.status === 'Interview' ? 'text-white/60' : 'text-on-surface/60'}`}>
                              {app.status === 'Interview' ? 'Next Step' : 'Timeline'}
                              {app.progress !== undefined && <span>{app.progress}%</span>}
                            </p>
                            {app.progress !== undefined && (
                              <div className={`w-full rounded-full h-1.5 mb-2 ${app.status === 'Interview' ? 'bg-white/10' : 'bg-surface-variant'}`}>
                                <div className={`${app.status === 'Interview' ? 'bg-white' : 'bg-primary'} h-1.5 rounded-full`} style={{ width: `${app.progress}%` }}></div>
                              </div>
                            )}
                            <div className="flex items-center justify-between mt-1 gap-2">
                              <span className={`text-[13px] flex items-center gap-1 font-bold line-clamp-1 ${app.status === 'Interview' ? 'text-white/90' : 'text-on-surface-variant'}`}>
                                {app.nextStepIcon && <span className="material-symbols-outlined text-[14px] shrink-0">{app.nextStepIcon}</span>}
                                <span className="truncate">{app.nextStep}</span>
                              </span>
                              {app.action && <button className={`text-sm font-black transition-colors shrink-0 ${app.status === 'Interview' ? 'text-white' : 'text-primary'}`}>{app.action}</button>}
                            </div>
                          </div>
                        )}
                        
                        {!app.nextStep && (
                          <div className="mt-auto flex gap-2">
                            <button className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg py-2.5 text-[11px] font-black font-body transition-colors uppercase tracking-widest truncate">Draft Cover</button>
                            <button className="bg-primary hover:bg-primary-dim text-on-primary rounded-lg px-5 py-2.5 text-[11px] font-black font-body transition-colors shadow-sm shadow-primary/20 uppercase tracking-widest shrink-0">Apply</button>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
                
                {/* Inter-section Divider */}
                {!isLastActive && (
                  <div className="hidden xl:block w-px bg-outline-variant/30 xl:mx-4 2xl:mx-6 shrink-0 mt-2 h-[calc(100%-2rem)]"></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
