"use client";
import React from 'react';

export default function DashboardPage() {
  return (
    <main className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar pb-24 md:pb-10 bg-surface">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Greeting & Overview */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-2">Good morning, Alex.</h2>
            <p className="text-on-surface-variant font-body text-lg">You have 4 high-priority tasks for today.</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-5 py-2.5 bg-surface-container-lowest rounded-full font-label text-sm text-on-surface font-medium ring-1 ring-outline-variant/15 hover:bg-surface-container-low transition-colors flex items-center space-x-2">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>Filter</span>
            </button>
            <button className="px-5 py-2.5 bg-surface-container-lowest rounded-full font-label text-sm text-on-surface font-medium ring-1 ring-outline-variant/15 hover:bg-surface-container-low transition-colors flex items-center space-x-2">
              <span className="material-symbols-outlined text-sm">sort</span>
              <span>Sort</span>
            </button>
          </div>
        </section>

        {/* Smart Suggestion Bento */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Suggestion Card - HIGH CONTRAST */}
          <div className="md:col-span-2 bg-primary rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-primary/20 flex flex-col justify-between group border border-white/10">
            {/* Decorative Gradient Blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-6">
                <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-80 font-manrope">Smart Suggestion</span>
              </div>
              <h3 className="text-3xl font-black font-manrope text-white mb-2 uppercase tracking-tight">Finalize Q3 Presentation Deck</h3>
              <p className="text-white/80 font-body text-base mb-8 max-w-md font-medium leading-relaxed">Based on your upcoming meeting at 2 PM, tackling this now aligns perfectly with your focus blocks.</p>
              <div className="flex items-center space-x-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-lg bg-white/20 text-white font-black text-[10px] uppercase tracking-wider border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-white mr-2 animate-pulse"></span>
                  High Priority
                </span>
                <span className="text-xs text-white/70 font-black uppercase tracking-widest flex items-center">
                  <span className="material-symbols-outlined text-base mr-2">schedule</span>
                  Due Today, 1:00 PM
                </span>
              </div>
            </div>
            <div className="relative z-10 mt-10 flex justify-end">
              <button className="px-8 py-4 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-widest hover:bg-surface transition-all flex items-center space-x-2 shadow-xl active:scale-[0.98]">
                <span>Start Focus Session</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Mini Stats / Progress */}
          <div className="bg-surface-container-lowest rounded-3xl p-8 ambient-shadow flex flex-col justify-between relative overflow-hidden border border-outline-variant/10">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <h4 className="font-manrope font-black text-lg text-on-surface mb-1 uppercase tracking-tight">Daily Progress</h4>
              <p className="text-xs text-on-surface-variant font-black opacity-60 uppercase tracking-tighter">3 of 8 tasks completed</p>
            </div>
            <div className="flex-1 flex items-center justify-center py-6">
              {/* Faux Donut Chart */}
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full before:absolute before:inset-0 before:rounded-full before:border-[12px] before:border-surface-container-high after:absolute after:inset-0 after:rounded-full after:border-[12px] after:border-secondary after:border-t-transparent after:border-r-transparent after:-rotate-45">
                <div className="text-3xl font-black font-manrope text-on-surface">38<span className="text-lg text-on-surface-variant">%</span></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant/70">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>Done</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-surface-container-high mr-2"></span>Remaining</span>
            </div>
          </div>
        </section>

        {/* Task Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black font-manrope text-on-surface uppercase tracking-tight">Up Next</h3>
            <div className="flex space-x-2">
              <button className="px-5 py-2 rounded-xl bg-on-surface text-surface font-black text-[10px] uppercase tracking-widest">All</button>
              <button className="px-5 py-2 rounded-xl text-on-surface-variant font-black text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-colors">Work</button>
              <button className="px-5 py-2 rounded-xl text-on-surface-variant font-black text-[10px] uppercase tracking-widest hover:bg-surface-container-low transition-colors">Personal</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Task Card 1 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow flex flex-col h-full cursor-pointer group border border-outline-variant/10 hover:border-primary/20 transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-2.5 bg-tertiary-container/20 rounded-xl text-tertiary border border-tertiary/10">
                  <span className="material-symbols-outlined text-xl">fitness_center</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-surface-container-high text-on-surface-variant font-black text-[10px] uppercase tracking-widest">To Do</span>
              </div>
              <h4 className="font-manrope font-black text-xl text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight tracking-tight uppercase">Gym: Upper Body Routine</h4>
              <p className="text-sm text-on-surface-variant font-body mb-8 flex-1 line-clamp-2 font-medium opacity-80 leading-relaxed">Focus on progressive overload. Remember to stretch before starting.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/5">
                <span className="inline-flex items-center px-3 py-1 bg-surface-container-low text-on-surface-variant font-black text-[10px] uppercase tracking-tighter rounded-lg">Medium</span>
                <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest flex items-center">
                  <span className="material-symbols-outlined text-base mr-2 opacity-40">event</span>
                  Today, 5:30 PM
                </span>
              </div>
            </div>

            {/* Task Card 2 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow flex flex-col h-full cursor-pointer group border border-outline-variant/10 hover:border-primary/20 transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary border border-primary/10">
                  <span className="material-symbols-outlined text-xl">payments</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-secondary-container/20 text-secondary font-black text-[10px] uppercase tracking-widest">In Progress</span>
              </div>
              <h4 className="font-manrope font-black text-xl text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight tracking-tight uppercase">Review Monthly Budget</h4>
              <p className="text-sm text-on-surface-variant font-body mb-8 flex-1 line-clamp-2 font-medium opacity-80 leading-relaxed">Categorize recent expenses and adjust savings goal for the upcoming trip.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/5">
                <span className="inline-flex items-center px-3 py-1 bg-surface-container-low text-on-surface-variant font-black text-[10px] uppercase tracking-tighter rounded-lg">Low</span>
                <span className="text-[10px] text-on-surface-variant font-black uppercase tracking-widest flex items-center">
                  <span className="material-symbols-outlined text-base mr-2 opacity-40">event</span>
                  Tomorrow
                </span>
              </div>
            </div>

            {/* Task Card 3 */}
            <div className="bg-surface-container-lowest rounded-3xl p-6 ambient-shadow flex flex-col h-full cursor-pointer group border border-outline-variant/10 hover:border-primary/20 transition-all hover:-translate-y-1">
              <div className="flex justify-between items-start mb-6">
                <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary border border-secondary/10">
                  <span className="material-symbols-outlined text-xl">shopping_cart</span>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-lg bg-surface-container-high text-on-surface-variant font-black text-[10px] uppercase tracking-widest">To Do</span>
              </div>
              <h4 className="font-manrope font-black text-xl text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight tracking-tight uppercase">Groceries for Dinner Party</h4>
              <p className="text-sm text-on-surface-variant font-body mb-8 flex-1 line-clamp-2 font-medium opacity-80 leading-relaxed">Pick up fresh produce, wine, and ingredients for the lasagna.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/5">
                <span className="inline-flex items-center px-3 py-1 bg-error-container/20 text-error font-black text-[10px] uppercase tracking-tighter rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mr-2"></span>
                  High
                </span>
                <span className="text-[10px] text-error font-black uppercase tracking-widest flex items-center">
                  <span className="material-symbols-outlined text-base mr-2 opacity-40">event</span>
                  Today, 4:00 PM
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
