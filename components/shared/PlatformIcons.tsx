/* eslint-disable @next/next/no-img-element */
import * as React from 'react';
import type { TestimonialPlatform } from '@/lib/types';
import { cn } from '@/lib/utils';

export function GoogleLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <img
      src="/icons/icons8-google.svg"
      alt="Google"
      className={cn('object-contain shrink-0', className)}
      loading="lazy"
    />
  );
}

export function FacebookLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <img
      src="/icons/icons8-facebook.svg"
      alt="Facebook"
      className={cn('object-contain shrink-0', className)}
      loading="lazy"
    />
  );
}

export function InstagramLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <img
      src="/icons/icons8-instagram-48.png"
      alt="Instagram"
      className={cn('object-contain shrink-0', className)}
      loading="lazy"
    />
  );
}

export function WhatsAppLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <img
      src="/icons/icons8-whatsapp.svg"
      alt="WhatsApp"
      className={cn('object-contain shrink-0', className)}
      loading="lazy"
    />
  );
}

export function TripAdvisorLogo({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <img
      src="/icons/icons8-tripadvisor.svg"
      alt="TripAdvisor"
      className={cn('object-contain shrink-0', className)}
      loading="lazy"
    />
  );
}

export interface PlatformConfig {
  id: TestimonialPlatform;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
}

export const PLATFORMS: Record<TestimonialPlatform, PlatformConfig> = {
  google: {
    id: 'google',
    name: 'Google Reviews',
    shortName: 'Google',
    icon: GoogleLogo,
    badgeBg: 'bg-white',
    badgeBorder: 'border-zinc-200/80',
    textColor: 'text-zinc-800',
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    shortName: 'Facebook',
    icon: FacebookLogo,
    badgeBg: 'bg-[#1877F2]/10',
    badgeBorder: 'border-[#1877F2]/20',
    textColor: 'text-[#1877F2]',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    shortName: 'Instagram',
    icon: InstagramLogo,
    badgeBg: 'bg-[#E1306C]/10',
    badgeBorder: 'border-[#E1306C]/20',
    textColor: 'text-[#C13584]',
  },
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    shortName: 'WhatsApp',
    icon: WhatsAppLogo,
    badgeBg: 'bg-[#25D366]/10',
    badgeBorder: 'border-[#25D366]/20',
    textColor: 'text-[#128C7E]',
  },
  tripadvisor: {
    id: 'tripadvisor',
    name: 'TripAdvisor',
    shortName: 'TripAdvisor',
    icon: TripAdvisorLogo,
    badgeBg: 'bg-[#00AF87]/10',
    badgeBorder: 'border-[#00AF87]/20',
    textColor: 'text-[#007B5E]',
  },
};

export function getPlatformMeta(platform?: TestimonialPlatform): PlatformConfig {
  if (platform && PLATFORMS[platform]) {
    return PLATFORMS[platform];
  }
  return PLATFORMS.google;
}

export function PlatformBadge({
  platform,
  size = 'md',
  showLabel = true,
  className,
}: {
  platform?: TestimonialPlatform;
  size?: 'xs' | 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}) {
  const meta = getPlatformMeta(platform);
  const Icon = meta.icon;

  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-[9px] gap-1',
    sm: 'px-2 py-0.5 text-[10px] sm:text-[11px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  }[size];

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border shadow-2xs transition-all select-none',
        meta.badgeBg,
        meta.badgeBorder,
        meta.textColor,
        sizeClasses,
        className
      )}
      title={`Review via ${meta.name}`}
    >
      <Icon className={cn(iconSizes, 'shrink-0')} />
      {showLabel && <span className="font-semibold tracking-tight">{meta.shortName}</span>}
    </span>
  );
}
