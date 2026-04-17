"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HorizontalNavbar() {
  const pathname = usePathname();

  const excludedPaths = ['/', '/login', '/register'];
  if (excludedPaths.includes(pathname)) {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'check_circle' },
    { name: 'Job Feed', href: '/jobs', icon: 'explore' },
    { name: 'Applications', href: '/applications', icon: 'assessment' },
    { name: 'Cover Letter', href: '/cover-letter', icon: 'description' },
    { name: 'AI Inbox', href: '/inbox', icon: 'inbox' },
  ];

  return (
    <nav className="w-full h-18 bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-outline-variant/10 sticky top-0 z-50 px-6 md:px-10 flex items-center justify-between shadow-[0_4px_20px_rgba(44,52,55,0.04)]">
      
      {/* Brand */}
      <div className="flex items-center space-x-3">
        <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <div className="hidden sm:block">
          <h1 className="text-base font-black tracking-tight text-slate-900 dark:text-slate-50 font-headline">LandMyJob</h1>
          <p className="text-[10px] text-slate-500 font-body font-normal -mt-0.5">Intelligent Career Concierge</p>
        </div>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 flex items-center justify-center space-x-1 md:space-x-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-manrope text-sm font-semibold
                ${isActive 
                   ? 'bg-primary/10 text-primary scale-105 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100/50'
                }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isActive ? 'fill-1' : ''}`} style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              <span className="hidden lg:inline">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Trailing Actions (Search & Profile) */}
      <div className="flex items-center space-x-4">
        {/* Simplified Search for Navbar */}
        <div className="hidden xl:flex relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant text-[18px]">search</span>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-surface/50 border-0 ring-1 ring-outline-variant/20 rounded-full py-1.5 pl-9 pr-4 text-xs font-body w-40 focus:w-60 focus:ring-2 focus:ring-primary transition-all duration-500 outline-none"
          />
        </div>

        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-error rounded-full border border-white"></span>
        </button>

        <div className="w-9 h-9 rounded-full bg-surface-container-high overflow-hidden ring-2 ring-white ambient-shadow cursor-pointer">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-PF9XwC43wOc_hRgLrzAYXsZjU0jXOuwuoT2unSUJ8MLIEgkLuTtkgyBz0I1hYAFTKDtRWAfYkLMcV4tqLhCQF8WQNymvONZKoxfX0TL5vJu8RRQQBV9RJV3OQdXSShBXO41Bn1125gArjdtt5hGx-HEwMb8XSE2oZyPlPC61aQxGZBb8njGah7MEiqOnJWlaIFvew2s8RizW1MOfIv6Ye8pyh8A9P7YqnX_XZJ6eLWa4n8HiDgHAOHdPTcks5buddEfddG6S_BnY" className="w-full h-full object-cover" alt="User" />
        </div>
      </div>
    </nav>
  );
}
