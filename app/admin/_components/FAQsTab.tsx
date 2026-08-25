'use client';

import * as React from 'react';
import { Loader2, Plus, HelpCircle, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import EditFAQModal from './EditFAQModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import type { FAQItem } from '@/lib/types';

interface FAQsTabProps {
  faqsList: FAQItem[];
  setFaqsList: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}

export default function FAQsTab({ faqsList, setFaqsList, showFeedback }: FAQsTabProps) {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [editingFaq, setEditingFaq] = React.useState<FAQItem | null>(null);
  const [deletingFaq, setDeletingFaq] = React.useState<FAQItem | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  async function handleCreateFaq(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim() || saving) return;

    setSaving(true);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || 'Failed to add FAQ');
      }

      const data = (await res.json().catch(() => ({}))) as { faq?: FAQItem };
      if (data.faq) {
        setFaqsList((prev) => [data.faq!, ...prev]);
      }
      setQuestion('');
      setAnswer('');
      showFeedback('success', 'FAQ question published!');
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Failed to add FAQ');
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleVisibility(faq: FAQItem) {
    const newHidden = !faq.hidden;
    setFaqsList((prev) =>
      prev.map((f) => (f.id === faq.id ? { ...f, hidden: newHidden } : f))
    );
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: faq.id, hidden: newHidden }),
      });
      if (!res.ok) throw new Error('Visibility update failed');
      showFeedback(
        'success',
        newHidden ? 'FAQ is now hidden from the website.' : 'FAQ is now visible in the accordion.'
      );
    } catch (err: unknown) {
      setFaqsList((prev) =>
        prev.map((f) => (f.id === faq.id ? { ...f, hidden: faq.hidden } : f))
      );
      showFeedback('error', err instanceof Error ? err.message : 'Failed to update visibility');
    }
  }

  async function handleConfirmDelete() {
    if (!deletingFaq) return;
    const id = deletingFaq.id;
    setDeletingId(id);
    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      setFaqsList((prev) => prev.filter((f) => f.id !== id));
      showFeedback('success', 'FAQ removed.');
      setDeletingFaq(null);
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  }

  function handleUpdate(updated: FAQItem) {
    setFaqsList((prev) =>
      prev.map((f) => (f.id === updated.id ? updated : f))
    );
  }

  const inputClass =
    'w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 sm:px-4 text-base sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all';
  const labelClass = 'block text-xs font-semibold text-zinc-500 tracking-wider mb-1.5';

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Add FAQ Form Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm p-4 sm:p-6 md:p-8">
        <div className="mb-5 sm:mb-6">
          <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-brand uppercase">
            Questions & Answers
          </span>
          <svg width="48" height="3" viewBox="0 0 48 3" fill="none" className="mt-1.5 mb-2.5 sm:mt-2 sm:mb-3">
            <defs>
              <linearGradient id="faq-line" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b2d6" />
                <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 0.5 C 14 0.5, 34 1, 48 1.5 C 34 2, 14 2.5, 0 2.5 Z" fill="url(#faq-line)" />
          </svg>
          <h2 className="font-serif text-lg sm:text-2xl text-zinc-900 font-medium leading-snug">
            Add New <span className="italic">FAQ</span>
          </h2>
        </div>

        <form onSubmit={handleCreateFaq} className="space-y-3.5 sm:space-y-4">
          <div>
            <label className={labelClass}>Question *</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Do you offer sunset tours?"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Answer *</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide a clear, detailed answer for visitors..."
              rows={3}
              required
              className={inputClass}
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={!question.trim() || !answer.trim() || saving}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium text-sm px-6 py-3 sm:py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50 min-h-[44px]"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Publish 
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* List of FAQs */}
      <div>
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <h3 className="font-serif text-base sm:text-lg text-zinc-900 font-medium">
            Published <span className="italic">Questions</span>
          </h3>
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
            {faqsList.length}
          </span>
        </div>

        <div className="space-y-4 sm:space-y-5">
          {faqsList.map((faq) => {
            const isHidden = faq.hidden === true;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between ${
                  isHidden ? 'border-amber-200/80 opacity-80' : 'border-zinc-200'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-zinc-900 text-sm sm:text-base leading-snug">
                      {faq.question}
                    </h4>
                    {isHidden && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-zinc-900 text-amber-300">
                        <EyeOff className="w-2.5 h-2.5" />
                        Hidden
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>

                {/* Footer Action Buttons with generous vertical space */}
                <div className="flex items-center justify-end gap-2 pt-3.5 mt-4 border-t border-zinc-100">
                  <button
                    onClick={() => handleToggleVisibility(faq)}
                    title={isHidden ? 'Hidden from live FAQ. Click to show.' : 'Visible on live FAQ. Click to hide.'}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isHidden
                        ? 'text-amber-700 bg-amber-50/80 hover:bg-amber-100/80'
                        : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
                    }`}
                  >
                    {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isHidden ? 'Hidden' : 'Visible'}</span>
                  </button>

                  <button
                    onClick={() => setEditingFaq(faq)}
                    title="Edit question"
                    className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-500 hover:text-brand hover:bg-zinc-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => setDeletingFaq(faq)}
                    disabled={deletingId === faq.id}
                    title="Delete question"
                    className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-red-500 hover:bg-red-50 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit FAQ Modal */}
      <EditFAQModal
        faq={editingFaq}
        isOpen={Boolean(editingFaq)}
        onClose={() => setEditingFaq(null)}
        onUpdate={handleUpdate}
        showFeedback={showFeedback}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingFaq)}
        title="Delete FAQ Question"
        description="Are you sure you want to remove this question and answer from the FAQ?"
        itemPreview={deletingFaq?.question}
        isDeleting={Boolean(deletingId)}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingFaq(null)}
      />
    </div>
  );
}
