'use client';

import * as React from 'react';
import { Image as ImageIcon, MessageSquare, HelpCircle, Settings as SettingsIcon } from 'lucide-react';

export type AdminTab = 'gallery' | 'testimonials' | 'faqs' | 'settings';

export const ADMIN_TABS: {
  key: AdminTab;
  label: string;
  mobileLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: 'gallery', label: 'Gallery', mobileLabel: 'Gallery', icon: ImageIcon },
  { key: 'testimonials', label: 'Testimonials', mobileLabel: 'Reviews', icon: MessageSquare },
  { key: 'faqs', label: 'FAQs', mobileLabel: 'FAQs', icon: HelpCircle },
  { key: 'settings', label: 'Settings', mobileLabel: 'Settings', icon: SettingsIcon },
];

interface TabsProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export function AdminDesktopTabs({ activeTab, onTabChange }: TabsProps) {
  const tabRefs = React.useRef<Record<AdminTab, HTMLButtonElement | null>>({
    gallery: null,
    testimonials: null,
    faqs: null,
    settings: null,
  });

  const [indicator, setIndicator] = React.useState<{ left: number; width: number } | null>(null);

  const updateIndicator = React.useCallback(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setIndicator({
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
    <div className="hidden md:inline-flex items-center p-1 bg-zinc-100/90 rounded-full border border-zinc-200/60 shadow-xs relative h-10.5">
      {indicator && (
        <div
          className="absolute top-1 bottom-1 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.03)] border border-zinc-200/60 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none"
          style={{
            left: `${indicator.left}px`,
            width: `${indicator.width}px`,
          }}
        />
      )}

      {ADMIN_TABS.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            ref={(el) => {
              tabRefs.current[key] = el;
            }}
            onClick={() => onTabChange(key)}
            className={`relative z-10 px-4 h-8.5 rounded-full flex items-center gap-2 text-xs font-semibold transition-colors duration-200 cursor-pointer whitespace-nowrap select-none shrink-0 ${
              isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 transition-colors duration-200 shrink-0 ${
                isActive ? 'text-brand' : 'text-zinc-400'
              }`}
            />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function AdminMobileNav({ activeTab, onTabChange }: TabsProps) {
  const tabRefs = React.useRef<Record<AdminTab, HTMLButtonElement | null>>({
    gallery: null,
    testimonials: null,
    faqs: null,
    settings: null,
  });

  const [indicator, setIndicator] = React.useState<{ left: number; width: number } | null>(null);

  const updateIndicator = React.useCallback(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setIndicator({
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
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)] select-none pointer-events-auto"
    >
      <div className="max-w-lg mx-auto px-3 sm:px-6 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] relative">
        <div className="grid grid-cols-4 gap-1.5 relative">
          {indicator && (
            <div
              className="absolute top-0 bottom-0 rounded-full bg-brand shadow-xs transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none"
              style={{
                left: `${indicator.left}px`,
                width: `${indicator.width}px`,
              }}
            />
          )}

          {ADMIN_TABS.map(({ key, mobileLabel, icon: Icon }) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                ref={(el) => {
                  tabRefs.current[key] = el;
                }}
                onClick={() => onTabChange(key)}
                className="relative z-10 flex flex-col items-center justify-center py-2 px-1 rounded-full cursor-pointer min-h-[48px] active:scale-95 touch-manipulation transition-transform duration-150"
              >
                <div className="flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 transition-all duration-200 ${
                      isActive ? 'scale-105 text-white' : 'text-zinc-500 hover:text-zinc-800'
                    }`}
                  />
                </div>
                <span
                  className={`text-[11px] mt-1 tracking-tight truncate max-w-full font-medium transition-colors duration-200 ${
                    isActive ? 'text-white font-semibold' : 'text-zinc-500'
                  }`}
                >
                  {mobileLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function AdminTabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <>
      <AdminDesktopTabs activeTab={activeTab} onTabChange={onTabChange} />
      <AdminMobileNav activeTab={activeTab} onTabChange={onTabChange} />
    </>
  );
}
