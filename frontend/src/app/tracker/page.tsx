import React from 'react';
import Navbar from '@/components/Navbar';

export default function TrackerPage() {
  return (
    <div className="bg-background text-on-surface antialiased min-h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-8 px-4 md:px-8 pb-12 overflow-y-auto w-full max-w-screen-2xl mx-auto flex flex-col xl:flex-row gap-8">
        
        {/* Left Column: Application Tracker */}
        <div className="flex-1 flex flex-col gap-8">
          
          {/* Header */}
          <header className="mb-4">
            <h1 className="text-4xl font-manrope font-extrabold text-on-surface tracking-tight mb-2">Applications</h1>
            <p className="text-on-surface-variant text-lg">Tracking your journey to the next opportunity.</p>
          </header>

          {/* Filters & Search (No lines) */}
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-surface-container-low p-2 rounded-full">
            <div className="flex-1 relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="w-full bg-surface-container-lowest rounded-md py-3 pl-12 pr-4 border-none focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm placeholder-on-surface-variant/50" 
                placeholder="Search roles, companies..." 
                type="text"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
              <button className="bg-primary hover:opacity-90 text-on-primary px-5 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-all">All (12)</button>
              <button className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-5 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors border border-outline-variant/15">Interviewing (3)</button>
              <button className="bg-surface-container-lowest text-on-surface hover:bg-surface-container px-5 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors border border-outline-variant/15">Applied (8)</button>
            </div>
          </div>

          {/* Tracker Grid (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Interviewing */}
            <article className="bg-surface-container-lowest rounded-md p-6 ambient-shadow flex flex-col gap-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/20 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/10">
                    <img alt="Google Logo Placeholder" className="w-8 h-8 object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMd4OXJ0bqbUo57kU1G7hYTnQRN-ctd50E1Gd9lPGZZqeHfrUB57Sn0tYOb-ilqfMrFJtO6bJQbUUI5H00-JxHvdfv7dk5Dsilmh-f0vEixRM6ke4EJdAH4oYSDz11_gWkPtMO4d_jNWgS1811-XbhgLt7u4b3yAXcRQoyL3QSEfc7FzmtkxIxRO7NpGHvNR4-FozyR54-VuAqIH2YTTMqHWKNOpLsRw58pJqVSuafq0SbgEowzQGG4CfjW-r1qo1kKAEuIqKewuP0" />
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-xl text-on-surface">Product Designer</h3>
                    <p className="text-sm text-on-surface-variant">Google · Mountain View, CA</p>
                  </div>
                </div>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">calendar_clock</span> Interview
                </span>
              </div>
              <div className="bg-surface-container-low rounded-md p-4 mt-auto">
                <p className="text-sm text-on-surface font-medium mb-2">Next Step</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">videocam</span> Portfolio Review · Tomorrow, 2 PM</span>
                  <button className="text-primary hover:text-primary-dim text-sm font-semibold transition-colors">Prepare</button>
                </div>
              </div>
            </article>

            {/* Card 2: Applied */}
            <article className="bg-surface-container-lowest rounded-md p-6 ambient-shadow flex flex-col gap-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/10">
                    <img alt="Airbnb Logo Placeholder" className="w-8 h-8 object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWWv5GKZVE1S1k4-jw0DY1lDh6gTQKBiT3OHQUPDYI0JzcYdZN5M5M-WTDKxzG_paVtUR9WpYdzo33mZe2WNgc5JOZo95nmn1s3rM0eoCZHorLzcJyH0euyC5zioK0WUhS2pWCRs_1iMuQIDzoy8FSSA06ReP1wPqA8j4cUbEN_nj5bDAJ-YhGYalWkeMOHjav_Vht3tuHG5LylMh6B_oIiUu92lZ_1XAI1ewAMP4NKdMxBu1AWflPMuIgPS-00DJwGLQ9kgXvg772" />
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-xl text-on-surface">UX Researcher</h3>
                    <p className="text-sm text-on-surface-variant">Airbnb · Remote</p>
                  </div>
                </div>
                <span className="bg-primary-container/20 text-primary px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">send</span> Applied
                </span>
              </div>
              <div className="bg-surface-container-low rounded-md p-4 mt-auto">
                <p className="text-sm text-on-surface font-medium mb-2">Timeline</p>
                <div className="w-full bg-surface-variant rounded-full h-1.5 mb-2">
                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-xs text-on-surface-variant">Applied 2 days ago. Awaiting review.</p>
              </div>
            </article>

            {/* Card 3: Saved */}
            <article className="bg-surface-container-lowest rounded-md p-6 ambient-shadow flex flex-col gap-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border border-outline-variant/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary-container/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/10">
                    <img alt="Spotify Logo Placeholder" className="w-8 h-8 object-contain mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH7-TF1GgJBg4hr7Zs1UDZkKD3DzPoGhlGbpJ3ikr-ccgnlPQoKCTlk_nQu7DqAHYhyzN81RtQostBLFac9px-HyW1HuEFORhWdyFpjENhw0qKR1Hp_1C0DUcOlWgHvgl27ohd-ZCaOMEMlNV4NaKQw1MCkh1H3HEfqlaOPvX0yOkOOv46BAIBjJu4cOxXGUvCfNk6PF5OsfEqrs4iVMI7ebeh96g_gEb28RVZ8zICEm2tzDVH47h1WsPutcgQmMvjvz2TcxGBPVWJ" />
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-xl text-on-surface">Design Systems Lead</h3>
                    <p className="text-sm text-on-surface-variant">Spotify · New York, NY</p>
                  </div>
                </div>
                <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">bookmark</span> Saved
                </span>
              </div>
              <div className="mt-auto flex gap-3">
                <button className="flex-1 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-md py-2.5 text-sm font-semibold transition-colors">Draft Cover Letter</button>
                <button className="bg-primary hover:bg-primary-dim text-on-primary rounded-md px-6 py-2.5 text-sm font-semibold transition-colors shadow-sm">Apply</button>
              </div>
            </article>

            {/* Card 4: Rejected (Muted) */}
            <article className="bg-surface-container-lowest/50 rounded-md p-6 flex flex-col gap-6 relative overflow-hidden border border-outline-variant/15 opacity-70 hover:opacity-100 transition-opacity">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-surface-container flex items-center justify-center overflow-hidden grayscale">
                    <span className="material-symbols-outlined text-outline">domain</span>
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-xl text-on-surface line-through decoration-outline-variant">Senior UI Designer</h3>
                    <p className="text-sm text-on-surface-variant">Stripe · Remote</p>
                  </div>
                </div>
                <span className="bg-error-container/20 text-error px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">close</span> Closed
                </span>
              </div>
              <div className="mt-auto">
                <p className="text-xs text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[14px] text-primary">auto_awesome</span> AI Note: Focus on system architecture for next roles.</p>
              </div>
            </article>

          </div>
        </div>

        {/* Right Column: Live Activity Feed (Lumina Sphere Style) */}
        <aside className="w-full xl:w-[400px] shrink-0">
          <div className="bg-surface-container-lowest rounded-md p-8 ambient-shadow sticky top-24 border border-ghost">
            <div className="flex items-center gap-4 mb-8">
              <div className="relative">
                {/* Glowing Orb Effect for AI */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
                <div className="w-14 h-14 bg-gradient-to-tr from-primary to-primary-container rounded-full flex items-center justify-center relative z-10 shadow-lg border-2 border-surface-container-lowest">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                </div>
              </div>
              <div>
                <h2 className="font-manrope font-bold text-2xl text-on-surface">Lumina</h2>
                <p className="text-sm text-primary font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> Active Concierge
                </p>
              </div>
            </div>

            <div className="relative before:absolute before:inset-y-0 before:left-[15px] before:w-px before:bg-gradient-to-b before:from-primary/20 before:to-transparent ml-2">
              
              {/* Feed Item 1 */}
              <div className="relative pl-10 pb-8 group">
                <div className="absolute left-[-5px] top-1 w-10 h-10 bg-surface-container-lowest rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm group-hover:scale-110 transition-transform z-10">
                  <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-1 font-medium">Just now</p>
                <div className="bg-surface-container-low rounded-md p-4 group-hover:bg-surface-container transition-colors border border-ghost">
                  <h4 className="font-manrope font-bold text-on-surface text-sm mb-1">Scheduled interview with Google</h4>
                  <p className="text-sm text-on-surface-variant">Added Portfolio Review to your calendar for tomorrow at 2 PM.</p>
                </div>
              </div>

              {/* Feed Item 2 */}
              <div className="relative pl-10 pb-8 group">
                <div className="absolute left-[-5px] top-1 w-10 h-10 bg-surface-container-lowest rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm group-hover:scale-110 transition-transform z-10">
                  <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>document_scanner</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-1 font-medium">2 hours ago</p>
                <div className="bg-surface-container-low rounded-md p-4 group-hover:bg-surface-container transition-colors border border-ghost">
                  <h4 className="font-manrope font-bold text-on-surface text-sm mb-1">Generated resume for Airbnb</h4>
                  <p className="text-sm text-on-surface-variant mb-3">Tailored your experience to highlight user research metrics.</p>
                  <button className="text-xs font-semibold text-primary flex items-center gap-1 hover:text-primary-dim transition-colors">
                    <span className="material-symbols-outlined text-[14px]">visibility</span> View Draft
                  </button>
                </div>
              </div>

              {/* Feed Item 3 */}
              <div className="relative pl-10 group">
                <div className="absolute left-[-5px] top-1 w-10 h-10 bg-surface-container-lowest rounded-full flex items-center justify-center border-4 border-surface-container-lowest shadow-sm group-hover:scale-110 transition-transform z-10">
                  <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>travel_explore</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-1 font-medium">Yesterday</p>
                <div className="bg-surface-container-low rounded-md p-4 group-hover:bg-surface-container transition-colors border border-ghost">
                  <h4 className="font-manrope font-bold text-on-surface text-sm mb-1">Found 3 new matches</h4>
                  <p className="text-sm text-on-surface-variant">Based on your preference for remote design systems roles.</p>
                  <div className="flex gap-2 mt-3">
                    <span className="bg-surface-container-lowest px-2 py-1 rounded-sm text-xs border border-ghost shadow-sm">Figma</span>
                    <span className="bg-surface-container-lowest px-2 py-1 rounded-sm text-xs border border-ghost shadow-sm">Vercel</span>
                    <span className="text-xs text-on-surface-variant self-center">+1 more</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
