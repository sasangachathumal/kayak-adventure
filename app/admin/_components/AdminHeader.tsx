'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-zinc-200 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo — matching the site navbar */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 select-none group">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
            <Image
              src="/logo-with-no-text.svg"
              alt="Kayak Adventure Logo"
              fill
              sizes="40px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center -space-y-0.5">
            <span className="font-logo text-[22px] sm:text-[26px] leading-none tracking-normal text-zinc-900">
              KAYAK
            </span>
            <span className="font-sans text-[7px] sm:text-[8px] font-bold tracking-[0.43em] leading-none text-zinc-700 mt-0.5">
              ADVENTURE
            </span>
          </div>

          {/* CMS badge */}
          <span className="hidden sm:inline-flex ml-1.5 sm:ml-2 items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-brand/10 text-brand border border-brand/20">
            CMS
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-2.5 sm:px-3 py-1.5 rounded-full border border-zinc-200 transition-colors"
          >
            <span className="hidden xs:inline">View Site</span>
            <span className="xs:hidden">Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-2.5 sm:px-3 py-1.5 rounded-full border border-red-200 transition-colors cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden xs:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
