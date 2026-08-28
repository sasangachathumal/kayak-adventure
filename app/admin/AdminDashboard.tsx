'use client';

import * as React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import type { GalleryItem, Testimonial, FAQItem, SiteSettings } from '@/lib/types';
import AdminHeader from './_components/AdminHeader';
import { AdminMobileNav, type AdminTab } from './_components/AdminTabs';
import GalleryTab from './_components/GalleryTab';
import TestimonialsTab from './_components/TestimonialsTab';
import FAQsTab from './_components/FAQsTab';
import SettingsTab from './_components/SettingsTab';

interface AdminDashboardProps {
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  settings: SiteSettings;
}

export default function AdminDashboard({
  gallery: initialGallery,
  testimonials: initialTestimonials,
  faqs: initialFaqs,
  settings: initialSettings,
}: AdminDashboardProps) {
  const [tab, setTab] = React.useState<AdminTab>('gallery');

  const [galleryList, setGalleryList] = React.useState<GalleryItem[]>(initialGallery);
  const [testimonialsList, setTestimonialsList] = React.useState<Testimonial[]>(initialTestimonials);
  const [faqsList, setFaqsList] = React.useState<FAQItem[]>(initialFaqs);
  const [settings, setSettings] = React.useState<SiteSettings>(initialSettings);

  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  const [feedback, setFeedback] = React.useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  function showFeedback(type: 'success' | 'error', message: string) {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4500);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  }

  return (
    <div className="min-h-screen bg-[#f0efeb] pb-24 md:pb-12">
      <AdminHeader
        activeTab={tab}
        onTabChange={setTab}
        onLogout={handleLogout}
      />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-6 sm:py-8">
        {/* Page title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-zinc-900 font-medium leading-snug">
            CMS
          </h1>
        </div>

        {/* Animated Tab content */}
        <div key={tab} className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300 ease-out">
          {tab === 'gallery' && (
            <GalleryTab
              galleryList={galleryList}
              setGalleryList={setGalleryList}
              showFeedback={showFeedback}
              deletingId={deletingId}
              setDeletingId={setDeletingId}
            />
          )}
          {tab === 'testimonials' && (
            <TestimonialsTab
              testimonialsList={testimonialsList}
              setTestimonialsList={setTestimonialsList}
              showFeedback={showFeedback}
              deletingId={deletingId}
              setDeletingId={setDeletingId}
            />
          )}
          {tab === 'faqs' && (
            <FAQsTab
              faqsList={faqsList}
              setFaqsList={setFaqsList}
              showFeedback={showFeedback}
            />
          )}
          {tab === 'settings' && (
            <SettingsTab
              settings={settings}
              setSettings={setSettings}
              showFeedback={showFeedback}
            />
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <AdminMobileNav activeTab={tab} onTabChange={setTab} />

      {/* Feedback toast */}
      {feedback && (
        <div
          className={`fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 md:bottom-6 sm:max-w-sm z-50 flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-xl border text-sm font-medium animate-in slide-in-from-bottom-4 duration-300 ${
            feedback.type === 'success'
              ? 'bg-white border-emerald-200 text-emerald-800'
              : 'bg-white border-red-200 text-red-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
          )}
          <span className="truncate">{feedback.message}</span>
        </div>
      )}
    </div>
  );
}
