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
          {/* AI Suggestion Card */}
          <div className="md:col-span-2 bg-surface-container-lowest rounded-lg p-6 relative overflow-hidden ambient-shadow flex flex-col justify-between group">
            {/* Decorative Gradient Blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-4">
                <span className="material-symbols-outlined text-primary text-xl">auto_awesome</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary font-headline">Smart Suggestion</span>
              </div>
              <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">Finalize Q3 Presentation Deck</h3>
              <p className="text-on-surface-variant font-body mb-6 max-w-md">Based on your upcoming meeting at 2 PM, tackling this now aligns perfectly with your focus blocks.</p>
              <div className="flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-sm bg-error-container/20 text-error font-medium text-xs font-label">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                  High Priority
                </span>
                <span className="text-sm text-on-surface-variant font-body flex items-center">
                  <span className="material-symbols-outlined text-sm mr-1">schedule</span>
                  Due Today, 1:00 PM
                </span>
              </div>
            </div>
            <div className="relative z-10 mt-8 flex justify-end">
              <button className="px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-label font-medium hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-[0_8px_16px_rgba(74,75,215,0.2)]">
                <span>Start Focus Session</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Mini Stats / Progress */}
          <div className="bg-secondary-fixed/10 rounded-lg p-6 ambient-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-container/30 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <h4 className="font-headline font-semibold text-on-surface mb-1">Daily Progress</h4>
              <p className="text-xs text-on-surface-variant font-body">3 of 8 tasks completed</p>
            </div>
            <div className="flex-1 flex items-center justify-center py-6">
              {/* Faux Donut Chart */}
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full before:absolute before:inset-0 before:rounded-full before:border-[12px] before:border-surface-container-high after:absolute after:inset-0 after:rounded-full after:border-[12px] after:border-secondary after:border-t-transparent after:border-r-transparent after:-rotate-45">
                <div className="text-3xl font-black font-headline text-on-surface">38<span className="text-lg text-on-surface-variant">%</span></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs font-label text-on-surface-variant">
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>Done</span>
              <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-surface-container-high mr-2"></span>Remaining</span>
            </div>
          </div>
        </section>

        {/* Task Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-headline text-on-surface">Up Next</h3>
            <div className="flex space-x-2 text-sm font-label">
              <button className="px-4 py-1.5 rounded-full bg-surface-container-lowest text-on-surface ring-1 ring-outline-variant/15 font-medium">All</button>
              <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">Work</button>
              <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors">Personal</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Task Card 1 */}
            <div className="bg-surface-container-lowest rounded-lg p-5 ambient-shadow-hover relative flex flex-col h-full cursor-pointer group border border-transparent hover:border-outline-variant/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-tertiary-container/20 rounded-xl text-tertiary">
                  <span className="material-symbols-outlined text-lg">fitness_center</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-surface-container-high text-on-surface-variant font-medium text-[10px] font-label uppercase tracking-wide">To Do</span>
              </div>
              <h4 className="font-headline font-bold text-on-surface text-lg mb-2 group-hover:text-primary transition-colors leading-tight">Gym: Upper Body Routine</h4>
              <p className="text-sm text-on-surface-variant font-body mb-6 flex-1 line-clamp-2">Focus on progressive overload. Remember to stretch before starting.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                <span className="inline-flex items-center px-2 py-1 rounded-sm bg-surface-container-low text-on-surface-variant font-medium text-xs font-label">Medium</span>
                <span className="text-xs text-on-surface-variant font-body flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">event</span>
                  Today, 5:30 PM
                </span>
              </div>
            </div>
            
            {/* Task Card 2 */}
            <div className="bg-surface-container-lowest rounded-lg p-5 ambient-shadow-hover relative flex flex-col h-full cursor-pointer group border border-transparent hover:border-outline-variant/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary-fixed/20 rounded-xl text-primary">
                  <span className="material-symbols-outlined text-lg">payments</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-secondary-container/20 text-secondary-dim font-medium text-[10px] font-label uppercase tracking-wide">In Progress</span>
              </div>
              <h4 className="font-headline font-bold text-on-surface text-lg mb-2 group-hover:text-primary transition-colors leading-tight">Review Monthly Budget</h4>
              <p className="text-sm text-on-surface-variant font-body mb-6 flex-1 line-clamp-2">Categorize recent expenses and adjust savings goal for the upcoming trip.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                <span className="inline-flex items-center px-2 py-1 rounded-sm bg-surface-container-low text-on-surface-variant font-medium text-xs font-label">Low</span>
                <span className="text-xs text-on-surface-variant font-body flex items-center">
                  <span className="material-symbols-outlined text-[14px] mr-1">event</span>
                  Tomorrow
                </span>
              </div>
            </div>

            {/* Task Card 3 */}
            <div className="bg-surface-container-lowest rounded-lg p-5 ambient-shadow-hover relative flex flex-col h-full cursor-pointer group border border-transparent hover:border-outline-variant/10 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-fixed/20 rounded-xl text-secondary">
                  <span className="material-symbols-outlined text-lg">shopping_cart</span>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-surface-container-high text-on-surface-variant font-medium text-[10px] font-label uppercase tracking-wide">To Do</span>
              </div>
              <h4 className="font-headline font-bold text-on-surface text-lg mb-2 group-hover:text-primary transition-colors leading-tight">Groceries for Dinner Party</h4>
              <p className="text-sm text-on-surface-variant font-body mb-6 flex-1 line-clamp-2">Pick up fresh produce, wine, and ingredients for the lasagna.</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                <span className="inline-flex items-center px-2 py-1 rounded-sm bg-error-container/20 text-error font-medium text-xs font-label">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mr-1.5"></span>
                  High
                </span>
                <span className="text-xs text-error font-body flex items-center font-medium">
                  <span className="material-symbols-outlined text-[14px] mr-1">event</span>
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
