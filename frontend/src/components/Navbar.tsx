import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-surface-container-lowest border-b border-ghost flex justify-between items-center px-10 py-4 ambient-shadow sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <h1 className="text-2xl font-bold text-primary font-manrope">LandMyJob.</h1>
        <div className="flex items-center gap-2">
          <Link href="/" className="font-medium text-outline-variant hover:text-on-surface hover:bg-primary/5 px-4 py-2 rounded-md transition-all">Dashboard</Link>
          <Link href="/jobs" className="font-medium text-outline-variant hover:text-on-surface hover:bg-primary/5 px-4 py-2 rounded-md transition-all">Job Matches</Link>
          <Link href="/tracker" className="font-medium text-primary bg-primary/10 px-4 py-2 rounded-md transition-all">App Tracker</Link>
          <Link href="/studio" className="font-medium text-outline-variant hover:text-on-surface hover:bg-primary/5 px-4 py-2 rounded-md transition-all">Review Studio</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-bold text-primary hover:text-primary-dim transition-colors">Sign In</Link>
        <div className="w-10 h-10 bg-surface-container-high rounded-full border-ghost overflow-hidden">
             {/* Mock Avatar */}
        </div>
      </div>
    </nav>
  );
}
