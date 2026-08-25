'use client';

import * as React from 'react';
import { Search, X, Image as ImageIcon, Video, Eye, EyeOff, RotateCcw } from 'lucide-react';
import GalleryUploadCard from './GalleryUploadCard';
import GalleryItemCard from './GalleryItemCard';
import EditGalleryModal from './EditGalleryModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import type { GalleryItem } from '@/lib/types';

interface GalleryTabProps {
  galleryList: GalleryItem[];
  setGalleryList: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  showFeedback: (type: 'success' | 'error', message: string) => void;
  deletingId: string | null;
  setDeletingId: React.Dispatch<React.SetStateAction<string | null>>;
}

type VisibilityFilter = 'all' | 'visible' | 'hidden';
type TypeFilter = 'all' | 'image' | 'video';
type SpanFilter = 'all' | 'normal' | 'tall';

export default function GalleryTab({
  galleryList,
  setGalleryList,
  showFeedback,
  deletingId,
  setDeletingId,
}: GalleryTabProps) {
  const [editingItem, setEditingItem] = React.useState<GalleryItem | null>(null);
  const [deletingItem, setDeletingItem] = React.useState<GalleryItem | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visibilityFilter, setVisibilityFilter] = React.useState<VisibilityFilter>('all');
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>('all');
  const [spanFilter, setSpanFilter] = React.useState<SpanFilter>('all');

  async function handleConfirmDelete() {
    if (!deletingItem) return;
    const id = deletingItem.id;
    setDeletingId(id);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error('Delete failed');
      setGalleryList((prev) => prev.filter((i) => i.id !== id));
      showFeedback('success', 'Item removed from gallery.');
      setDeletingItem(null);
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  }

  function handleUpdate(updated: GalleryItem) {
    setGalleryList((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  }

  async function handleToggleVisibility(item: GalleryItem) {
    const newHidden = !item.hidden;
    // Optimistic update
    setGalleryList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, hidden: newHidden } : i))
    );
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, hidden: newHidden }),
      });
      if (!res.ok) throw new Error('Visibility update failed');
      showFeedback(
        'success',
        newHidden ? 'Media is now hidden from the website.' : 'Media is now visible on the website.'
      );
    } catch (err: unknown) {
      // Revert on error
      setGalleryList((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, hidden: item.hidden } : i))
      );
      showFeedback('error', err instanceof Error ? err.message : 'Failed to update visibility');
    }
  }

  // Filtered gallery items computation
  const filteredGallery = React.useMemo(() => {
    return galleryList.filter((item) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const altMatch = (item.alt || '').toLowerCase().includes(q);
        const typeMatch = item.type.toLowerCase().includes(q);
        if (!altMatch && !typeMatch) return false;
      }

      // 2. Visibility
      if (visibilityFilter === 'visible' && item.hidden === true) return false;
      if (visibilityFilter === 'hidden' && item.hidden !== true) return false;

      // 3. Media Type
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;

      // 4. Span
      if (spanFilter !== 'all' && (item.span || 'normal') !== spanFilter) return false;

      return true;
    });
  }, [galleryList, searchQuery, visibilityFilter, typeFilter, spanFilter]);

  const visibleCount = galleryList.filter((i) => !i.hidden).length;
  const hiddenCount = galleryList.filter((i) => i.hidden === true).length;
  const imageCount = galleryList.filter((i) => i.type === 'image').length;
  const videoCount = galleryList.filter((i) => i.type === 'video').length;

  const isFiltering =
    searchQuery.trim() !== '' ||
    visibilityFilter !== 'all' ||
    typeFilter !== 'all' ||
    spanFilter !== 'all';

  function resetFilters() {
    setSearchQuery('');
    setVisibilityFilter('all');
    setTypeFilter('all');
    setSpanFilter('all');
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <GalleryUploadCard
        onUpload={(item) => setGalleryList((prev) => [item, ...prev])}
        showFeedback={showFeedback}
      />

      {/* Published items Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="shrink-0">
            <h3 className="font-serif text-base sm:text-lg text-zinc-900 font-medium whitespace-nowrap">
              Published <span className="italic">Media</span>
            </h3>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search captions or type..."
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

        {/* Filter Chips Bar */}
        {galleryList.length > 0 && (
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {/* Visibility filters */}
              <div className="inline-flex items-center p-1 bg-white border border-zinc-200/80 rounded-full shadow-xs">
                <button
                  onClick={() => setVisibilityFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    visibilityFilter === 'all'
                      ? 'bg-zinc-900 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setVisibilityFilter('visible')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    visibilityFilter === 'visible'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-emerald-700'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Visible</span>
                </button>
                <button
                  onClick={() => setVisibilityFilter('hidden')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    visibilityFilter === 'hidden'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-amber-700'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>Hidden</span>
                </button>
              </div>

              {/* Media Type filters */}
              <div className="inline-flex items-center p-1 bg-white border border-zinc-200/80 rounded-full shadow-xs">
                <button
                  onClick={() => setTypeFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    typeFilter === 'all'
                      ? 'bg-brand text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setTypeFilter('image')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    typeFilter === 'image'
                      ? 'bg-brand text-white shadow-xs'
                      : 'text-zinc-600 hover:text-brand'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Photos</span>
                </button>
                <button
                  onClick={() => setTypeFilter('video')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    typeFilter === 'video'
                      ? 'bg-brand text-white shadow-xs'
                      : 'text-zinc-600 hover:text-brand'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Videos</span>
                </button>
              </div>

              {/* Span layout filter */}
              <div className="inline-flex items-center p-1 bg-white border border-zinc-200/80 rounded-full shadow-xs">
                <button
                  onClick={() => setSpanFilter(spanFilter === 'tall' ? 'all' : 'tall')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    spanFilter === 'tall'
                      ? 'bg-zinc-800 text-white shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Tall (2×1) only
                </button>
              </div>
            </div>

            {/* Clear all filters button */}
            {isFiltering && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-500 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition-colors shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        )}

        {/* Gallery Grid or Empty states */}
        {galleryList.length === 0 ? (
          <div className="text-center py-12 sm:py-16 border-2 border-dashed border-zinc-200 rounded-2xl p-4 bg-white/50">
            <p className="text-xs sm:text-sm text-zinc-400">No CMS media uploaded yet.</p>
            <p className="text-[11px] sm:text-xs text-zinc-300 mt-1">Static gallery images are shown until you add some here.</p>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs animate-in fade-in duration-200">
            <Search className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-zinc-800">No media matches your search &amp; filters</p>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {filteredGallery.map((item) => (
              <GalleryItemCard
                key={item.id}
                item={item}
                onEdit={(i) => setEditingItem(i)}
                onToggleVisibility={handleToggleVisibility}
                onDelete={(i) => setDeletingItem(i)}
                deleting={deletingId === item.id}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <EditGalleryModal
        item={editingItem}
        isOpen={Boolean(editingItem)}
        onClose={() => setEditingItem(null)}
        onUpdate={handleUpdate}
        showFeedback={showFeedback}
      />

      {/* Custom Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingItem)}
        title="Delete Gallery Media"
        description="Are you sure you want to remove this media item from the live gallery?"
        itemPreview={deletingItem?.alt}
        isDeleting={Boolean(deletingId)}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingItem(null)}
      />
    </div>
  );
}
