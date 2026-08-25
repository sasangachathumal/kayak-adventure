'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password || loading) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.href = '/admin';
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || 'Invalid password');
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0efeb] flex items-center justify-center px-4 py-8 selection:bg-brand selection:text-white">
      {/* Subtle background texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 60% 40%, #00b2d615 0%, transparent 60%), radial-gradient(circle at 20% 80%, #00b2d60a 0%, transparent 50%)',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-lg px-5 py-7 sm:px-8 sm:py-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0 bg-white rounded-full p-1 sm:p-1.5 border border-zinc-200 shadow-sm">
              <Image
                src="/logo-with-no-text.svg"
                alt="Kayak Adventure Logo"
                fill
                sizes="44px"
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col justify-center -space-y-0.5">
              <span className="font-logo text-[24px] sm:text-[28px] leading-none tracking-normal text-zinc-900">
                KAYAK
              </span>
              <span className="font-sans text-[7.5px] sm:text-[8px] font-bold tracking-[0.43em] leading-none text-zinc-700 mt-0.5">
                ADVENTURE
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-6 sm:mb-7">
            <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-brand uppercase">
              Admin Portal
            </span>
            {/* Tapered brand line */}
            <svg width="48" height="3" viewBox="0 0 48 3" fill="none" className="mt-1.5 mb-2.5 sm:mt-2 sm:mb-3">
              <defs>
                <linearGradient id="login-line" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00b2d6" />
                  <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 0.5 C 14 0.5, 34 1, 48 1.5 C 34 2, 14 2.5, 0 2.5 Z" fill="url(#login-line)" />
            </svg>
            <h1 className="font-serif text-2xl sm:text-3xl text-zinc-900 font-medium leading-snug">
              Welcome <span className="italic">back.</span>
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  autoFocus
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3 pl-10 sm:pl-11 pr-11 sm:pr-12 text-base sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all min-h-[44px]"
                />
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium py-3 rounded-xl transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-h-[44px] text-sm"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
              ) : (
                <>Login <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
