'use client';

import * as React from 'react';
import { Loader2, Plus, Search, X, Pencil, Trash2, Eye, EyeOff, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';
import SegmentedControl from './SegmentedControl';
import EditFAQModal from './EditFAQModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import type { FAQItem } from '@/lib/types';

interface FAQsTabProps {
  faqsList: FAQItem[];
  setFaqsList: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}

type VisibilityFilter = 'all' | 'visible' | 'hidden';

export default function FAQsTab({ faqsList, setFaqsList, showFeedback }: FAQsTabProps) {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [editingFaq, setEditingFaq] = React.useState<FAQItem | null>(null);
  const [deletingFaq, setDeletingFaq] = React.useState<FAQItem | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibilityFilter, setVisibilityFilter] = React.useState<VisibilityFilter>('all');

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

  async function handleMove(faqId: string, direction: 'prev' | 'next') {
    const fromIndex = faqsList.findIndex((f) => f.id === faqId);
    if (fromIndex === -1) return;
    const toIndex = direction === 'prev' ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= faqsList.length) return;

    const reordered = [...faqsList];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    // Optimistic update
    setFaqsList(reordered);

    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: reordered.map((f) => f.id) }),
      });
      if (!res.ok) throw new Error('Reorder failed');
      showFeedback('success', 'FAQ sequence updated.');
    } catch (err: unknown) {
      setFaqsList(faqsList); // Revert on failure
      showFeedback('error', err instanceof Error ? err.message : 'Failed to save sequence');
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

  // Filtered FAQs computation
  const filteredFaqs = React.useMemo(() => {
    return faqsList.filter((faq) => {
      // 1. Search Query (question, answer)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const questionMatch = (faq.question || '').toLowerCase().includes(q);
        const answerMatch = (faq.answer || '').toLowerCase().includes(q);
        if (!questionMatch && !answerMatch) return false;
      }

      // 2. Visibility
      if (visibilityFilter === 'visible' && faq.hidden === true) return false;
      if (visibilityFilter === 'hidden' && faq.hidden !== true) return false;

      return true;
    });
  }, [faqsList, searchQuery, visibilityFilter]);

  const isFiltering = searchQuery.trim() !== '' || visibilityFilter !== 'all';

  function resetFilters() {
    setSearchQuery('');
    setVisibilityFilter('all');
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
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium text-sm px-6 py-3 sm:py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50 min-h-11"
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

      {/* List of FAQs Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="shrink-0">
            <h3 className="font-serif text-base sm:text-lg text-zinc-900 font-medium whitespace-nowrap">
              Published <span className="italic">Questions</span>
            </h3>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or answers..."
              className="w-full bg-white border border-zinc-200 rounded-full pl-10 pr-8 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips Bar with Smooth Gliding Pill Indicator */}
        {faqsList.length > 0 && (
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
            <SegmentedControl<VisibilityFilter>
              value={visibilityFilter}
              onChange={setVisibilityFilter}
              options={[
                { value: 'all', label: 'All' },
                { value: 'visible', label: 'Visible', icon: Eye },
                { value: 'hidden', label: 'Hidden', icon: EyeOff },
              ]}
              activeColor="bg-zinc-900"
            />

            {/* Clear all filters button */}
            {isFiltering && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        )}

        {/* FAQs List or Empty State */}
        {faqsList.length === 0 ? (
          <div className="text-center py-12 sm:py-16 border-2 border-dashed border-zinc-200 rounded-2xl p-4 bg-white/50">
            <p className="text-xs sm:text-sm text-zinc-400">No CMS FAQs added yet.</p>
            <p className="text-[11px] sm:text-xs text-zinc-300 mt-1">Default questions are displayed until you add some here.</p>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs animate-in fade-in duration-200">
            <Search className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-zinc-800">No questions match your search &amp; filters</p>
            <p className="text-xs text-zinc-400 mt-1 mb-4">Try searching for a different keyword or resetting filters.</p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover bg-brand/10 hover:bg-brand/20 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {filteredFaqs.map((faq, index) => {
              const originalIndex = faqsList.findIndex((item) => item.id === faq.id);
              const isHidden = faq.hidden === true;
              const canMovePrev = originalIndex > 0;
              const canMoveNext = originalIndex < faqsList.length - 1;

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-2xl sm:rounded-3xl border p-5 sm:p-6 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between ${
                    isHidden ? 'border-amber-200/80 opacity-80' : 'border-zinc-200'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-950/80 text-white">
                        #{originalIndex >= 0 ? originalIndex + 1 : index + 1}
                      </span>
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

                  {/* Footer Action Buttons with Sequence Controls */}
                  <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-zinc-100 flex-wrap gap-2">
                    {/* Reorder controls */}
                    <div className="inline-flex items-center p-0.5 bg-zinc-100 rounded-lg">
                      <button
                        type="button"
                        disabled={!canMovePrev}
                        onClick={() => handleMove(faq.id, 'prev')}
                        title="Move up in FAQ order"
                        className="p-1.5 rounded text-zinc-600 hover:text-zinc-900 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={!canMoveNext}
                        onClick={() => handleMove(faq.id, 'next')}
                        title="Move down in FAQ order"
                        className="p-1.5 rounded text-zinc-600 hover:text-zinc-900 hover:bg-white transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleVisibility(faq)}
                        title={isHidden ? 'Hidden from live FAQ. Click to show.' : 'Visible on live FAQ. Click to hide.'}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer min-h-8.5 ${
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
                        className="px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-500 hover:text-brand hover:bg-zinc-100 flex items-center gap-1.5 transition-colors cursor-pointer min-h-8.5"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => setDeletingFaq(faq)}
                        disabled={deletingId === faq.id}
                        title="Delete question"
                        className="px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-red-500 hover:bg-red-50 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 min-h-8.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
