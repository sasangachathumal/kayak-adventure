'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, LogOut } from 'lucide-react';
import { AdminDesktopTabs, type AdminTab } from './AdminTabs';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
}

export default function AdminHeader({ activeTab, onTabChange, onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 select-none group shrink-0">
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

        {/* Center: Desktop Navigation Tabs */}
        <div className="hidden md:flex items-center justify-center">
          <AdminDesktopTabs activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 bg-zinc-100/90 hover:bg-zinc-200/80 px-3.5 sm:px-4 h-10.5 rounded-full border border-zinc-200/60 transition-all shadow-xs"
          >
            <span className="hidden xs:inline">View Site</span>
            <span className="xs:hidden">Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
          </Link>

          <button
            onClick={onLogout}
            className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50/80 hover:bg-red-100/80 px-3.5 sm:px-4 h-10.5 rounded-full border border-red-200/60 transition-all shadow-xs cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
