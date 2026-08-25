'use client';

import * as React from 'react';
import { Loader2, Save, Bell, Phone, ArrowUpRight } from 'lucide-react';
import type { SiteSettings } from '@/lib/types';

interface SettingsTabProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsTab({ settings, setSettings, showFeedback }: SettingsTabProps) {
  const [announcementEnabled, setAnnouncementEnabled] = React.useState(
    settings.announcement?.enabled ?? false
  );
  const [announcementText, setAnnouncementText] = React.useState(
    settings.announcement?.text ?? ''
  );
  const [announcementLinkText, setAnnouncementLinkText] = React.useState(
    settings.announcement?.linkText ?? ''
  );
  const [announcementLinkUrl, setAnnouncementLinkUrl] = React.useState(
    settings.announcement?.linkUrl ?? ''
  );

  const [whatsappNumber, setWhatsappNumber] = React.useState(settings.whatsappNumber ?? '');
  const [phoneNumber, setPhoneNumber] = React.useState(settings.phoneNumber ?? '');
  const [email, setEmail] = React.useState(settings.email ?? '');
  const [operatingHours, setOperatingHours] = React.useState(settings.operatingHours ?? '');
  const [tourPricingNotice, setTourPricingNotice] = React.useState(settings.tourPricingNotice ?? '');

  const [saving, setSaving] = React.useState(false);

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    setSaving(true);
    const updated: SiteSettings = {
      announcement: {
        enabled: announcementEnabled,
        text: announcementText,
        linkText: announcementLinkText,
        linkUrl: announcementLinkUrl,
      },
      whatsappNumber,
      phoneNumber,
      email,
      operatingHours,
      tourPricingNotice,
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || 'Failed to save settings');
      }

      const data = (await res.json().catch(() => ({}))) as { settings?: SiteSettings };
      if (data.settings) {
        setSettings(data.settings);
      }
      showFeedback('success', 'Site settings saved successfully!');
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    'w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 sm:px-4 text-base sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all';
  const labelClass = 'block text-xs font-semibold text-zinc-500 tracking-wider mb-1.5';

  return (
    <form onSubmit={handleSaveSettings} className="space-y-6 sm:space-y-8">
      {/* 1. Announcement Banner Settings */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-5 sm:mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand border border-brand/20 flex items-center justify-center shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-2xl text-zinc-900 font-medium leading-snug">
                Announcement <span className="italic">Banner</span>
              </h2>
            </div>
          </div>

          {/* Toggle switch */}
          <button
            type="button"
            role="switch"
            aria-checked={announcementEnabled}
            onClick={() => setAnnouncementEnabled(!announcementEnabled)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none ${
              announcementEnabled ? 'bg-brand' : 'bg-zinc-200'
            }`}
            aria-label="Toggle announcement banner"
          >
            <span
              style={{
                transform: announcementEnabled ? 'translateX(20px)' : 'translateX(0px)',
              }}
              className="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out"
            />
          </button>
        </div>

        {/* Live Banner Preview */}
        {announcementEnabled && (
          <div className="mb-5 p-3 sm:p-4 rounded-xl bg-brand text-white flex items-center justify-between text-xs sm:text-sm font-medium shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2 truncate">
              <span className="truncate">{announcementText || 'Your announcement message goes here...'}</span>
            </div>
            {announcementLinkText && (
              <span className="shrink-0 underline text-xs font-semibold ml-3 flex items-center gap-1">
                {announcementLinkText} <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        )}

        <div className="space-y-3.5 sm:space-y-4">
          <div>
            <label className={labelClass}>Banner Text</label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              placeholder="e.g. Special Offer: 15% discount on early morning kayak tours this week!"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className={labelClass}>Button / Link Text (Optional)</label>
              <input
                type="text"
                value={announcementLinkText}
                onChange={(e) => setAnnouncementLinkText(e.target.value)}
                placeholder="e.g. Contact Us"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Link Target URL (Optional)</label>
              <input
                type="text"
                value={announcementLinkUrl}
                onChange={(e) => setAnnouncementLinkUrl(e.target.value)}
                placeholder="e.g. /contact"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Contact & Business Details */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5 sm:mb-6">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif text-lg sm:text-2xl text-zinc-900 font-medium leading-snug">
              Contact & <span className="italic">Tour Info</span>
            </h2>
          </div>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className={labelClass}>WhatsApp Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="e.g. +94771234567"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Direct Call Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +94 77 123 4567"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. info@kayakadventuresrilanka.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Operating Hours</label>
              <input
                type="text"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
                placeholder="e.g. 6:00 AM – 6:30 PM (Daily)"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Tour Pricing Notice</label>
            <input
              type="text"
              value={tourPricingNotice}
              onChange={(e) => setTourPricingNotice(e.target.value)}
              placeholder="e.g. Starting from $25 / person (Includes guide, life jacket & fruits)"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Save Button Bar */}
      <div className="flex items-center justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium text-sm px-8 py-3 rounded-xl transition-colors shadow-sm cursor-pointer disabled:opacity-50 min-h-11 whitespace-nowrap"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving Settings...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> Save Settings
            </>
          )}
        </button>
      </div>
    </form>
  );
}
