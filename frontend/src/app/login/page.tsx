"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface antialiased flex-1 flex items-center justify-center overflow-hidden relative font-body">
      
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-container/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary-container/20 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-stretch bg-surface-container-lowest overflow-hidden z-10 relative">
        
        {/* Left Side: Editorial Content/Image */}
        <div className="hidden lg:flex w-[55%] relative bg-surface-container-low p-12 xl:p-16 flex-col justify-between overflow-hidden">
          <div className="z-10 relative flex justify-start w-full">
            <span className="font-manrope font-black text-4xl tracking-tighter text-[#8e90ff] drop-shadow-[0_0_15px_rgba(142,144,255,0.6)]">LandMyJob</span>
          </div>
          <div className="z-10 relative mt-auto mb-12">
            <h2 className="font-manrope text-5xl xl:text-6xl font-black leading-tight mb-6 mt-2">
              <span className="text-[#8e90ff] drop-shadow-[0_0_15px_rgba(142,144,255,0.5)]">Welcome Back.</span>
            </h2>
            <p className="font-body text-white/90 text-xl font-medium leading-relaxed max-w-md drop-shadow-md">
              Access your digital sanctuary and pick up exactly where you left off.
            </p>
          </div>
          
          <div 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>
        </div>
        
        {/* Right Side: Sign In Form */}
        <div className="w-full lg:w-[45%] p-8 sm:p-10 md:p-12 xl:px-20 xl:py-10 flex flex-col justify-center bg-surface-container-lowest">
          <div className="lg:hidden mb-6 text-center">
            <span className="font-manrope font-black text-3xl tracking-tighter text-primary">LandMyJob</span>
          </div>
          
          <div className="mb-6 text-center lg:text-left">
            <h1 className="font-manrope text-3xl font-bold text-on-surface mb-3">Sign In</h1>
            <p className="font-body text-on-surface-variant text-sm">Access your ultimate career ecosystem.</p>
          </div>

          {error && <div className="mb-4 p-3 bg-error/10 text-error text-xs rounded-lg border border-error/20">{error}</div>}
          
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block font-body text-sm font-medium text-on-surface mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input 
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-surface border border-outline-variant/30 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 font-body text-sm text-on-surface placeholder:text-outline" 
                  id="email" 
                  placeholder="alex@example.com" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block font-body text-sm font-medium text-on-surface" htmlFor="password">Password</label>
                <a href="#" className="font-body text-xs font-bold text-primary hover:text-primary-dim transition-colors">Forgot?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input 
                  required
                  className="w-full pl-11 pr-4 py-2.5 bg-surface border border-outline-variant/30 rounded-[1rem] focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-300 font-body text-sm text-on-surface placeholder:text-outline" 
                  id="password" 
                  placeholder="••••••••" 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
            
            <button 
              className="w-full py-3 px-6 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-manrope font-bold text-sm mt-3 hover:shadow-[0px_8px_16px_rgba(74,75,215,0.25)] transition-all duration-300 active:scale-[0.98] flex items-center justify-center" 
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 flex items-center justify-between">
            <span className="w-1/5 border-b border-outline-variant/20 lg:w-1/4"></span>
            <span className="font-body text-[10px] text-outline-variant uppercase tracking-wider font-bold text-center w-3/5 lg:w-1/2">Or continue with</span>
            <span className="w-1/5 border-b border-outline-variant/20 lg:w-1/4"></span>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-[1rem] bg-surface hover:bg-surface-container-high transition-colors border border-outline-variant/20 font-body font-medium text-sm text-on-surface" type="button">
              <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-[1rem] bg-surface hover:bg-surface-container-high transition-colors border border-outline-variant/20 font-body font-medium text-sm text-on-surface" type="button">
              <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 1 1 0 4.13zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7H9.31V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/></svg>
              LinkedIn
            </button>
          </div>
          
          <p className="mt-5 text-center font-body text-sm text-on-surface-variant">
            Don't have an account? 
            <Link className="font-semibold text-primary hover:text-primary-dim transition-colors ml-1" href="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
