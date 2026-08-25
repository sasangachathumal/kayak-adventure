'use client';

import * as React from 'react';
import { Loader2, X, Save, HelpCircle, Eye, EyeOff } from 'lucide-react';
import type { FAQItem } from '@/lib/types';

interface EditFAQModalProps {
  faq: FAQItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: FAQItem) => void;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}

function EditFAQForm({
  faq,
  onClose,
  onUpdate,
  showFeedback,
}: {
  faq: FAQItem;
  onClose: () => void;
  onUpdate: (updated: FAQItem) => void;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}) {
  const [question, setQuestion] = React.useState(faq.question || '');
  const [answer, setAnswer] = React.useState(faq.answer || '');
  const [hidden, setHidden] = React.useState(faq.hidden === true);
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
    if (!question || !answer || saving) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: faq.id,
          question,
          answer,
          hidden,
        }),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || 'Update failed');
      }

      const data = (await res.json().catch(() => ({}))) as { faq?: FAQItem };
      if (data.faq) {
        onUpdate(data.faq);
      }
      showFeedback('success', 'FAQ question updated successfully!');
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
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-medium text-zinc-900 leading-snug">
            Edit <span className="italic">FAQ</span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Update question, answer, or visibility
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Question *</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. Do I need previous kayaking experience?"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Answer *</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Provide a clear, helpful answer..."
            rows={4}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Website Visibility</label>
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setHidden(false)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2 min-h-11 ${
                !hidden
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold shadow-xs'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300'
              }`}
            >
              <Eye className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="min-w-0">
                <div className="truncate">Visible</div>
                <div className="text-[10px] text-zinc-400 font-normal hidden sm:block truncate">Shown on live site</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setHidden(true)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center gap-2 min-h-11 ${
                hidden
                  ? 'border-amber-500 bg-amber-50 text-amber-900 font-semibold shadow-xs'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300'
              }`}
            >
              <EyeOff className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="min-w-0">
                <div className="truncate">Hidden</div>
                <div className="text-[10px] text-zinc-400 font-normal hidden sm:block truncate">Hidden from site</div>
              </div>
            </button>
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
            disabled={!question || !answer || saving}
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

export default function EditFAQModal({
  faq,
  isOpen,
  onClose,
  onUpdate,
  showFeedback,
}: EditFAQModalProps) {
  if (!isOpen || !faq) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <EditFAQForm
        key={faq.id}
        faq={faq}
        onClose={onClose}
        onUpdate={onUpdate}
        showFeedback={showFeedback}
      />
    </div>
  );
}
