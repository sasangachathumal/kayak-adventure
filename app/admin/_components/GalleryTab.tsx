'use client';

import * as React from 'react';
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

export default function GalleryTab({
  galleryList,
  setGalleryList,
  showFeedback,
  deletingId,
  setDeletingId,
}: GalleryTabProps) {
  const [editingItem, setEditingItem] = React.useState<GalleryItem | null>(null);
  const [deletingItem, setDeletingItem] = React.useState<GalleryItem | null>(null);

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

  return (
    <div className="space-y-6 sm:space-y-8">
      <GalleryUploadCard
        onUpload={(item) => setGalleryList((prev) => [item, ...prev])}
        showFeedback={showFeedback}
      />

      {/* Published items */}
      <div>
        <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <h3 className="font-serif text-base sm:text-lg text-zinc-900 font-medium">
            Published <span className="italic">Media</span>
          </h3>
          <span className="text-[10px] sm:text-xs font-semibold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-full">
            {galleryList.length}
          </span>
        </div>

        {galleryList.length === 0 ? (
          <div className="text-center py-12 sm:py-16 border-2 border-dashed border-zinc-200 rounded-2xl p-4">
            <p className="text-xs sm:text-sm text-zinc-400">No CMS media uploaded yet.</p>
            <p className="text-[11px] sm:text-xs text-zinc-300 mt-1">Static gallery images are shown until you add some here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {galleryList.map((item) => (
              <GalleryItemCard
                key={item.id}
                item={item}
                onEdit={(i) => setEditingItem(i)}
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
