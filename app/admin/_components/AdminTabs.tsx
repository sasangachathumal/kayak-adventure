'use client';

import * as React from 'react';
import { Image as ImageIcon, MessageSquare } from 'lucide-react';

type Tab = 'gallery' | 'testimonials';

interface AdminTabsProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  galleryCount: number;
  testimonialCount: number;
}

export default function AdminTabs({
  activeTab,
  onTabChange,
  galleryCount,
  testimonialCount,
}: AdminTabsProps) {
  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }>; count: number }[] = [
    { key: 'gallery', label: 'Gallery Media', icon: ImageIcon, count: galleryCount },
    { key: 'testimonials', label: 'Testimonials', icon: MessageSquare, count: testimonialCount },
  ];

  const tabRefs = React.useRef<Record<Tab, HTMLButtonElement | null>>({
    gallery: null,
    testimonials: null,
  });

  const [indicatorStyle, setIndicatorStyle] = React.useState<{ left: number; width: number } | null>(null);

  const updateIndicator = React.useCallback(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  React.useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  return (
    <div className="inline-flex items-center p-1 sm:p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-zinc-200/80 shadow-xs relative max-w-full overflow-x-auto no-scrollbar">
      {/* Animated active pill indicator */}
      {indicatorStyle && (
        <div
          className="absolute top-1 bottom-1 sm:top-1.5 sm:bottom-1.5 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] border border-zinc-200/70 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none"
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
        />
      )}

      {tabs.map(({ key, label, icon: Icon, count }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            ref={(el) => {
              tabRefs.current[key] = el;
            }}
            onClick={() => onTabChange(key)}
            className={`relative z-10 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap select-none shrink-0 ${
              isActive
                ? 'text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-200 ${
                isActive ? 'text-brand' : 'text-zinc-400'
              }`}
            />
            <span>{label}</span>
            <span
              className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-brand/10 text-brand'
                  : 'bg-zinc-100 text-zinc-500 border border-zinc-200/50'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
