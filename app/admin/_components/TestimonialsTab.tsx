'use client';

import * as React from 'react';
import TestimonialForm from './TestimonialForm';
import TestimonialCard from './TestimonialCard';
import EditTestimonialModal from './EditTestimonialModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
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
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] = React.useState<Testimonial | null>(null);

  async function handleConfirmDelete() {
    if (!deletingTestimonial) return;
    const id = deletingTestimonial.id;
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
      setDeletingTestimonial(null);
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  }

  function handleSave(entry: Testimonial) {
    setTestimonialsList((prev) => [entry, ...prev.filter((t) => t.id !== entry.id)]);
  }

  function handleUpdate(updated: Testimonial) {
    setTestimonialsList((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  }

  async function handleToggleVisibility(testimonial: Testimonial) {
    const newHidden = !testimonial.hidden;
    // Optimistic update
    setTestimonialsList((prev) =>
      prev.map((t) => (t.id === testimonial.id ? { ...t, hidden: newHidden } : t))
    );
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: testimonial.id, hidden: newHidden }),
      });
      if (!res.ok) throw new Error('Visibility update failed');
      showFeedback(
        'success',
        newHidden ? 'Review is now hidden from the website.' : 'Review is now visible on the website.'
      );
    } catch (err: unknown) {
      // Revert on error
      setTestimonialsList((prev) =>
        prev.map((t) => (t.id === testimonial.id ? { ...t, hidden: testimonial.hidden } : t))
      );
      showFeedback('error', err instanceof Error ? err.message : 'Failed to update visibility');
    }
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
                onEdit={(item) => setEditingTestimonial(item)}
                onToggleVisibility={handleToggleVisibility}
                onDelete={(item) => setDeletingTestimonial(item)}
                deleting={deletingId === t.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Testimonial Modal */}
      <EditTestimonialModal
        testimonial={editingTestimonial}
        isOpen={Boolean(editingTestimonial)}
        onClose={() => setEditingTestimonial(null)}
        onUpdate={handleUpdate}
        showFeedback={showFeedback}
      />

      {/* Custom Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingTestimonial)}
        title="Delete Testimonial"
        description="Are you sure you want to remove this review from the website?"
        itemPreview={`${deletingTestimonial?.name}: ${deletingTestimonial?.quote}`}
        isDeleting={Boolean(deletingId)}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTestimonial(null)}
      />
    </div>
  );
}
