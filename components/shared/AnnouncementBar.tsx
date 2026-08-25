'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { AnnouncementBar as AnnouncementBarType } from '@/lib/types';

interface AnnouncementBarProps {
  announcement?: AnnouncementBarType;
}

export default function AnnouncementBar({ announcement }: AnnouncementBarProps) {
  if (!announcement || !announcement.enabled || !announcement.text) {
    return null;
  }

  return (
    <div className="w-full bg-[#00b2d6] text-white px-3 sm:px-4 py-1.5 sm:py-2 text-center shadow-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap text-center">
        <span className="font-sans font-normal sm:font-medium text-xs sm:text-sm leading-tight sm:leading-normal">
          {announcement.text}
        </span>
        {announcement.linkText && announcement.linkUrl && (
          <Link
            href={announcement.linkUrl}
            className="inline-flex items-center gap-0.5 font-semibold underline underline-offset-2 hover:text-white/80 transition-colors ml-1 text-xs sm:text-sm whitespace-nowrap shrink-0"
          >
            <span>{announcement.linkText}</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
