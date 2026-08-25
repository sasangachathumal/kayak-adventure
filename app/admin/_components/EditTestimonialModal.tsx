/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import { Loader2, X, Save, Edit3, Eye, EyeOff } from 'lucide-react';
import StarRating from './StarRating';
import type { Testimonial } from '@/lib/types';

interface EditTestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: Testimonial) => void;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}

function EditTestimonialForm({
  testimonial,
  onClose,
  onUpdate,
  showFeedback,
}: {
  testimonial: Testimonial;
  onClose: () => void;
  onUpdate: (updated: Testimonial) => void;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}) {
  const [name, setName] = React.useState(testimonial.name || '');
  const [location, setLocation] = React.useState(testimonial.location || '');
  const [quote, setQuote] = React.useState(testimonial.quote || '');
  const [rating, setRating] = React.useState<number>(testimonial.rating ?? 5);
  const [hidden, setHidden] = React.useState<boolean>(testimonial.hidden === true);
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !saving) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [saving, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !quote || saving) return;

    setSaving(true);
    try {
      const formData = new FormData();
      formData.set('id', testimonial.id);
      formData.set('name', name);
      formData.set('location', location);
      formData.set('quote', quote);
      formData.set('rating', String(rating));
      formData.set('hidden', String(hidden));
      if (avatar) formData.set('avatar', avatar);

      const res = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || 'Update failed');
      }

      const data = (await res.json().catch(() => ({}))) as { entry?: Testimonial };
      if (data.entry) {
        onUpdate(data.entry);
      }
      showFeedback('success', 'Testimonial updated successfully!');
      onClose();
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Update failed');
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    'w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 sm:px-4 text-base sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all';
  const labelClass = 'block text-xs font-semibold text-zinc-500 tracking-wider mb-1.5';

  return (
    <div
      className="relative w-full max-w-lg bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-2xl p-4 sm:p-7 max-h-[90dvh] overflow-y-auto animate-in zoom-in-95 duration-200"
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        disabled={saving}
        className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer disabled:opacity-50 min-h-9.5 min-w-9.5 flex items-center justify-center"
        aria-label="Close dialog"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Modal Header */}
      <div className="flex items-center gap-3 mb-5 sm:mb-6 pr-8">
        <div className="w-10 h-10 rounded-2xl bg-brand/10 text-brand border border-brand/20 flex items-center justify-center shrink-0">
          <Edit3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-medium text-zinc-900 leading-snug">
            Edit <span className="italic">Testimonial</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Update reviewer info, review, rating, and visibility
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label className={labelClass}>Guest Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. London, UK"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label className={labelClass}>Star Rating</label>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 inline-flex w-full sm:w-auto">
              <StarRating value={rating} onChange={setRating} size="lg" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Website Visibility</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setHidden(false)}
                className={`p-2 sm:p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 min-h-11 ${
                  !hidden
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Visible</span>
              </button>
              <button
                type="button"
                onClick={() => setHidden(true)}
                className={`p-2 sm:p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 min-h-11 ${
                  hidden
                    ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold shadow-xs'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300'
                }`}
              >
                <EyeOff className="w-3.5 h-3.5 text-amber-600" />
                <span>Hidden</span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Review *</label>
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="e.g. Paddling through the mangroves was pure magic..."
            rows={3}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Replace Avatar Photo (Optional)</label>
          <div className="flex items-center gap-3">
            {testimonial.avatarKey && !avatar && (
              <img
                src={`/api/media/${testimonial.avatarKey}`}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover border border-zinc-200 shrink-0"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatar(e.target.files?.[0] || null)}
              className="block w-full text-xs text-zinc-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer transition-colors"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-2.5 pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-200 text-xs sm:text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors cursor-pointer disabled:opacity-50 min-h-10.5"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name || !quote || saving}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs sm:text-sm font-medium transition-colors shadow-sm cursor-pointer disabled:opacity-50 min-h-10.5"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function EditTestimonialModal({
  testimonial,
  isOpen,
  onClose,
  onUpdate,
  showFeedback,
}: EditTestimonialModalProps) {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <EditTestimonialForm
        key={testimonial.id}
        testimonial={testimonial}
        onClose={onClose}
        onUpdate={onUpdate}
        showFeedback={showFeedback}
      />
    </div>
  );
}
