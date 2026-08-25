'use client';

import * as React from 'react';
import TestimonialForm from './TestimonialForm';
import TestimonialCard from './TestimonialCard';
import type { Testimonial } from '@/lib/types';

interface TestimonialsTabProps {
  testimonialsList: Testimonial[];
  setTestimonialsList: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  showFeedback: (type: 'success' | 'error', message: string) => void;
  deletingId: string | null;
  setDeletingId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function TestimonialsTab({
  testimonialsList,
  setTestimonialsList,
  showFeedback,
  deletingId,
  setDeletingId,
}: TestimonialsTabProps) {
  async function handleDelete(id: string) {
    if (!confirm('Delete this testimonial?')) return;
    setDeletingId(id);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      setTestimonialsList((prev) => prev.filter((t) => t.id !== id));
      showFeedback('success', 'Testimonial deleted.');
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  }

  function handleSave(entry: Testimonial) {
    setTestimonialsList((prev) => [entry, ...prev.filter((t) => t.id !== entry.id)]);
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <TestimonialForm onSave={handleSave} showFeedback={showFeedback} />

      {/* Saved testimonials */}
      <div>
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <h3 className="font-serif text-base sm:text-lg text-zinc-900 font-medium">
            Saved <span className="italic">Reviews</span>
          </h3>
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
            {testimonialsList.length}
          </span>
        </div>

        {testimonialsList.length === 0 ? (
          <div className="text-center py-12 sm:py-16 border-2 border-dashed border-zinc-200 rounded-2xl p-4">
            <p className="text-xs sm:text-sm text-zinc-400">No CMS testimonials yet.</p>
            <p className="text-[11px] sm:text-xs text-zinc-300 mt-1">Static reviews are displayed until you add some here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {testimonialsList.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                onDelete={handleDelete}
                deleting={deletingId === t.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
