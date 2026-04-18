"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, userProfile, loading } = useAuth();
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const firstName = loading ? "..." : (userProfile?.firstName || user?.displayName?.split(' ')[0] || "there");
  const isProfileIncomplete = !loading && (!userProfile || Object.keys(userProfile).length === 0 || !userProfile.skills || userProfile.skills.length === 0);

  const careerTasks = [
    {
      id: 1,
      title: "Review Top Match at Google",
      description: "Based on your added 'React' skill, this role is a 98% match. Apply before the deadline.",
      type: "Application",
      icon: "work_history",
      priority: "High",
      time: "Today",
      status: "To Do",
      color: "primary"
    },
    {
      id: 2,
      title: "Prepare for Stripe Interview",
      description: "Technical screening scheduled. Review your notes on system design and algorithms.",
      type: "Interview",
      icon: "video_camera_front",
      priority: "Critical",
      time: "Tomorrow, 2:00 PM",
      status: "In Progress",
      color: "tertiary"
    },
    {
      id: 3,
      title: "Follow up with Airbnb Recruiter",
      description: "Send a quick thank-you note regarding yesterday's introductory call.",
      type: "Networking",
      icon: "mail",
      priority: "Medium",
      time: "Today",
      status: "To Do",
      color: "secondary"
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar pb-24 md:pb-10 bg-surface">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Greeting & Overview */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-2">{greeting}, {firstName}.</h2>
            <p className="text-on-surface-variant font-body text-lg">You have 3 career action items queued for today.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-5 py-2.5 bg-surface-container-lowest rounded-md font-label text-sm text-on-surface font-medium border border-outline-variant/20 hover:border-primary/50 transition-colors flex items-center space-x-2">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>Filter</span>
            </button>
            <button className="px-5 py-2.5 bg-surface-container-lowest rounded-md font-label text-sm text-on-surface font-medium border border-outline-variant/20 hover:border-primary/50 transition-colors flex items-center space-x-2">
              <span className="material-symbols-outlined text-sm">sort</span>
              <span>Sort</span>
            </button>
          </div>
        </section>

        {/* Smart Suggestion Bento */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* AI Suggestion Card - HIGH CONTRAST */}
          {loading ? (
            <div className="md:col-span-2 bg-surface-container rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between group border border-outline-variant/10 animate-pulse min-h-[300px]">
              <div>
                <div className="w-32 h-4 bg-outline-variant/20 rounded-md mb-6"></div>
                <div className="w-3/4 max-w-md h-10 bg-outline-variant/20 rounded-lg mb-4"></div>
                <div className="w-1/2 max-w-sm h-16 bg-outline-variant/20 rounded-md mb-8"></div>
              </div>
              <div className="relative z-10 mt-10 flex justify-end">
                <div className="w-40 h-12 bg-outline-variant/20 rounded-xl"></div>
              </div>
            </div>
          ) : isProfileIncomplete ? (
            <div className="md:col-span-2 bg-tertiary rounded-md p-8 relative overflow-hidden shadow-2xl shadow-tertiary/20 flex flex-col justify-between group border border-white/10">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="material-symbols-outlined text-white text-xl">account_circle_off</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-80 font-manrope">Action Required</span>
                </div>
                <h3 className="text-3xl font-black font-manrope text-white mb-2 uppercase tracking-tight">Complete Your Profile</h3>
                <p className="text-white/80 font-body text-base mb-8 max-w-md font-medium leading-relaxed">Lumina AI needs to know your skillset, location, and salary expectations to find your perfect job matches.</p>
                <div className="flex items-center space-x-6">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-md bg-white/20 text-white font-black text-[10px] uppercase tracking-wider border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 animate-pulse"></span>
                    High Priority
                  </span>
                </div>
              </div>
              <div className="relative z-10 mt-10 flex justify-end">
                <Link href="/onboarding" className="px-8 py-4 bg-white text-tertiary rounded-md font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center space-x-2 shadow-xl active:scale-[0.98]">
                  <span>Set Up Profile</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="md:col-span-2 bg-primary rounded-md p-8 relative overflow-hidden shadow-2xl shadow-primary/20 flex flex-col justify-between group border border-white/10">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-80 font-manrope">Smart Suggestion</span>
                </div>
                <h3 className="text-3xl font-black font-manrope text-white mb-2 uppercase tracking-tight">Review Outstanding Matches</h3>
                <p className="text-white/80 font-body text-base mb-8 max-w-md font-medium leading-relaxed">Lumina AI has found 2 new high-probability job matches based on your updated profile and skills.</p>
                <div className="flex items-center space-x-6">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-md bg-white/20 text-white font-black text-[10px] uppercase tracking-wider border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 animate-pulse"></span>
                    AI Curated
                  </span>
                  <span className="text-xs text-white/70 font-black uppercase tracking-widest flex items-center">
                    <span className="material-symbols-outlined text-base mr-2">explore</span>
                    Job Feed
                  </span>
                </div>
              </div>
              <div className="relative z-10 mt-10 flex justify-end">
                <Link href="/jobs" className="px-8 py-4 bg-white text-primary rounded-md font-black text-xs uppercase tracking-widest hover:bg-surface transition-all flex items-center space-x-2 shadow-xl active:scale-[0.98]">
                  <span>View Matches</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          )}

          {/* Mini Stats / Progress */}
          <div className="md:col-span-1 bg-surface-container-lowest rounded-md p-8 ambient-shadow flex flex-col justify-between relative overflow-hidden border border-outline-variant/10">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <h4 className="font-manrope font-black text-lg text-on-surface mb-1 uppercase tracking-tight">Application Pipeline</h4>
              <p className="text-[10px] text-on-surface-variant font-black opacity-80 uppercase tracking-widest">12 Active Opps</p>
            </div>
            <div className="flex-1 flex items-center justify-center py-6">
              {/* Faux Donut Chart */}
              <div className="relative w-28 h-28 flex items-center justify-center rounded-full before:absolute before:inset-0 before:rounded-full before:border-[10px] before:border-surface-container-high after:absolute after:inset-0 after:rounded-full after:border-[10px] after:border-secondary after:border-t-transparent after:border-r-transparent after:rotate-45">
                <div className="text-center">
                   <div className="text-2xl font-black font-manrope text-on-surface leading-none mt-2">3</div>
                   <div className="text-[8px] uppercase font-black tracking-widest text-secondary mt-1">Intvs</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Get Started Resume Card */}
          <div className="md:col-span-1 bg-surface-container-lowest rounded-md p-6 ambient-shadow border border-outline-variant/10 group hover:border-primary/50 transition-all flex flex-col justify-between">
             <div>
                <div className="w-10 h-10 rounded-md bg-secondary/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-secondary text-xl">description</span>
                </div>
                <h4 className="font-manrope font-black text-base md:text-lg text-on-surface leading-tight tracking-tight uppercase mb-2">Get Started</h4>
                <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed">Instantly generate a tailored professional resume dynamically built from your onboarding questionnaire nodes.</p>
             </div>
             
             <Link href="/resume" className="mt-6 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-secondary group-hover:text-primary transition-colors border border-outline-variant/20 px-4 py-2.5 rounded-md hover:bg-surface w-full">
                <span>Build Resume</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
             </Link>
          </div>
        </section>

        {/* Task Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black font-manrope text-on-surface uppercase tracking-tight">Career Action Items</h3>
            <div className="flex space-x-2">
              <button className="px-5 py-2 rounded-md bg-on-surface text-surface font-black text-[10px] uppercase tracking-widest">All</button>
              <button className="px-5 py-2 rounded-md text-on-surface-variant font-black text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-colors">Interviews</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerTasks.map(task => {
              // Precompute tailwind classes to prevent purging
              const colorClasses: Record<string, any> = {
                primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/10', bgMuted: 'bg-primary/5', bgSolid: 'bg-primary' },
                secondary: { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/10', bgMuted: 'bg-secondary/5', bgSolid: 'bg-secondary' },
                tertiary: { bg: 'bg-tertiary/10', text: 'text-tertiary', border: 'border-tertiary/10', bgMuted: 'bg-tertiary/5', bgSolid: 'bg-tertiary' }
              };
              const c = colorClasses[task.color] || colorClasses.primary;

              return (
              <div key={task.id} className="bg-surface-container-lowest rounded-md p-6 ambient-shadow flex flex-col h-full cursor-pointer group border border-outline-variant/20 hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2.5 ${c.bg} rounded-md ${c.text} border ${c.border}`}>
                    <span className="material-symbols-outlined text-xl">{task.icon}</span>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-md bg-surface-container-high text-on-surface-variant font-black text-[10px] uppercase tracking-widest border border-outline-variant/10 shadow-sm">{task.status}</span>
                </div>
                <h4 className="font-manrope font-black text-xl text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight tracking-tight uppercase">{task.title}</h4>
                <p className="text-sm text-on-surface-variant font-body mb-8 flex-1 line-clamp-2 font-medium opacity-80 leading-relaxed">{task.description}</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                  <span className={`inline-flex items-center px-3 py-1 ${c.bgMuted} ${c.text} font-black text-[10px] uppercase tracking-tighter rounded-md border ${c.border}`}>
                    {task.priority === 'Critical' && <span className={`w-1.5 h-1.5 rounded-full ${c.bgSolid} mr-2`}></span>}
                    {task.priority}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest flex items-center">
                    <span className="material-symbols-outlined text-base mr-2 opacity-40">event</span>
                    {task.time}
                  </span>
                </div>
              </div>
            )})}
          </div>
        </section>
      </div>
    </main>
  );
}
