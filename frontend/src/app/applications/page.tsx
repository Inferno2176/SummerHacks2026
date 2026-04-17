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
    <div className="flex-1 bg-surface min-h-[calc(100vh-4.5rem)] flex flex-col xl:flex-row gap-8 p-6 md:p-8 max-w-screen-2xl mx-auto w-full">
      
      {/* Left Column: Application Tracker */}
      <div className="flex-1 flex flex-col gap-8">
        <header>
          <h1 className="text-4xl font-manrope font-extrabold text-on-surface tracking-tight mb-2">Applications</h1>
          <p className="text-on-surface-variant text-lg font-body">Tracking your journey to the next opportunity.</p>
        </header>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 items-center bg-surface-container-low p-2 rounded-full border border-outline-variant/10 shadow-sm">
          <div className="flex-1 relative w-full">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input className="w-full bg-surface-container-lowest rounded-full py-3 pl-12 pr-4 border-none focus:ring-2 focus:ring-primary text-sm font-body shadow-sm placeholder-on-surface-variant/50" placeholder="Search roles, companies..." type="text"/>
          </div>
          <div className="flex gap-2 pr-2">
            <button className="bg-primary text-on-primary px-5 py-2.5 rounded-full text-sm font-semibold font-body whitespace-nowrap shadow-md">All (12)</button>
            <button className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-5 py-2.5 rounded-full text-sm font-medium font-body whitespace-nowrap transition-colors border border-outline-variant/15">Interviewing (3)</button>
            <button className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-5 py-2.5 rounded-full text-sm font-medium font-body whitespace-nowrap transition-colors border border-outline-variant/15">Applied (8)</button>
          </div>
        </div>

        {/* Tracker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app, idx) => (
            <article key={app.id} className={`${idx === 0 ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20 ring-4 ring-secondary/5' : 'bg-surface-container-lowest'} rounded-3xl p-6 ambient-shadow flex flex-col gap-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/10`}>
              {/* Decorative Accent for Featured */}
              {idx === 0 && <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>}

              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${idx === 0 ? 'bg-white' : 'bg-surface-container'} flex items-center justify-center overflow-hidden border border-outline-variant/10 p-2`}>
                    <img src={app.logo} alt={app.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className={`font-manrope font-bold text-xl ${idx === 0 ? 'text-white' : 'text-on-surface'}`}>{app.title}</h3>
                    <p className={`text-sm font-body ${idx === 0 ? 'text-white/70' : 'text-on-surface-variant'}`}>{app.company} • {app.location}</p>
                  </div>
                </div>
                <span className={`${idx === 0 ? 'bg-white/20 text-white border-white/10' : app.statusColor + ' border-outline-variant/5'} px-3 py-1 rounded-lg text-xs font-black font-body flex items-center gap-1 border`}>
                  <span className="material-symbols-outlined text-[14px]">{app.status === 'Interview' ? 'calendar_clock' : app.status === 'Applied' ? 'send' : 'bookmark'}</span>
                  {app.status}
                </span>
              </div>

              {app.nextStep && (
                <div className={`${idx === 0 ? 'bg-white/10' : 'bg-surface-container-low'} rounded-2xl p-4 mt-auto`}>
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${idx === 0 ? 'text-white/60' : 'text-on-surface/60'}`}>{app.status === 'Interview' ? 'Next Step' : 'Timeline'}</p>
                  {app.progress && (
                    <div className={`w-full rounded-full h-1.5 mb-2 ${idx === 0 ? 'bg-white/10' : 'bg-surface-variant'}`}>
                      <div className={`${idx === 0 ? 'bg-white' : 'bg-primary'} h-1.5 rounded-full`} style={{ width: `${app.progress}%` }}></div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs flex items-center gap-1 font-bold ${idx === 0 ? 'text-white/90' : 'text-on-surface-variant'}`}>
                      {app.nextStepIcon && <span className="material-symbols-outlined text-[14px]">{app.nextStepIcon}</span>}
                      {app.nextStep}
                    </span>
                    {app.action && <button className={`text-sm font-black transition-colors ${idx === 0 ? 'text-white' : 'text-primary'}`}>{app.action}</button>}
                  </div>
                </div>
              )}
              
              {!app.nextStep && (idx !== 0) && (
                <div className="mt-auto flex gap-3">
                  <button className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl py-3 text-[10px] font-black font-body transition-colors uppercase tracking-widest">Draft Cover Letter</button>
                  <button className="bg-primary hover:bg-primary-dim text-on-primary rounded-xl px-6 py-3 text-[10px] font-black font-body transition-colors shadow-sm shadow-primary/20 uppercase tracking-widest">Apply</button>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Right Column: Lumina Activity Feed */}
      <aside className="w-full xl:w-[400px] shrink-0">
        <div className="bg-surface-container-lowest rounded-3xl p-8 ambient-shadow sticky top-24 border border-outline-variant/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
              <div className="w-14 h-14 bg-gradient-to-tr from-primary to-primary-fixed rounded-full flex items-center justify-center relative z-10 shadow-lg border-2 border-surface-container-lowest text-white">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
            </div>
            <div>
              <h2 className="font-manrope font-black text-2xl text-on-surface">Lumina</h2>
              <p className="text-sm text-primary font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span> Active Concierge
              </p>
            </div>
          </div>

          <div className="relative space-y-8 before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-gradient-to-b before:from-primary/20 before:to-transparent ml-2">
            {feedItems.map((item) => (
              <div key={item.id} className="relative pl-10 group">
                <div className="absolute left-[-5px] top-1 w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center border-[6px] border-surface-container-lowest shadow-sm group-hover:scale-110 transition-transform z-10">
                   <span className={`material-symbols-outlined ${item.iconColor} text-sm`} style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-1">{item.time}</p>
                <div className="bg-surface-container-low/50 rounded-2xl p-4 group-hover:bg-surface-container transition-colors border border-outline-variant/5">
                  <h4 className="font-manrope font-bold text-on-surface text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-on-surface-variant font-medium leading-relaxed">{item.desc}</p>
                  {item.action && (
                    <button className="mt-3 text-xs font-bold text-primary flex items-center gap-1 hover:text-primary-dim transition-colors uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[14px]">visibility</span> {item.action}
                    </button>
                  )}
                  {item.tags && (
                    <div className="flex gap-2 mt-3">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-surface-container-lowest px-2 py-1 rounded-lg text-[10px] font-bold border border-outline-variant/20 shadow-sm">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
