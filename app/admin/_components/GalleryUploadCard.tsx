/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import {
  Upload,
  RefreshCw,
  Loader2,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Layers,
  FileImage,
  Video,
  Trash2,
} from 'lucide-react';
import { watermarkImage } from '@/lib/watermark';
import type { GalleryItem } from '@/lib/types';

interface GalleryUploadCardProps {
  onUpload: (item: GalleryItem) => void;
  showFeedback: (type: 'success' | 'error', message: string) => void;
  apiEndpoint?: string;
  tag?: string;
  title?: React.ReactNode;
}

interface QueueItem {
  id: string;
  file: File;
  previewUrl: string;
  caption: string;
  span: 'normal' | 'tall';
  status: 'queued' | 'watermarking' | 'uploading' | 'done' | 'error';
  error?: string;
}

function cleanFilename(name: string): string {
  // Remove file extension and replace underscores/dashes with spaces
  return name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' ').trim();
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export default function GalleryUploadCard({
  onUpload,
  showFeedback,
  apiEndpoint = '/api/admin/gallery',
  tag = 'Upload Media',
  title,
}: GalleryUploadCardProps) {
  const [queue, setQueue] = React.useState<QueueItem[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Clean up object URLs on unmount or item removal
  React.useEffect(() => {
    return () => {
      queue.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [queue]);

  function addFilesToQueue(files: FileList | File[]) {
    const newItems: QueueItem[] = Array.from(files).map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      file,
      previewUrl: URL.createObjectURL(file),
      caption: cleanFilename(file.name),
      span: 'normal',
      status: 'queued',
    }));

    setQueue((prev) => [...prev, ...newItems]);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      addFilesToQueue(e.target.files);
      // Reset input value so same files can be re-selected if needed
      e.target.value = '';
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFilesToQueue(e.dataTransfer.files);
    }
  }

  function updateQueueItem(id: string, updates: Partial<QueueItem>) {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }

  function removeQueueItem(id: string) {
    setQueue((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }

  function clearCompleted() {
    setQueue((prev) => {
      prev.filter((i) => i.status === 'done').forEach((i) => URL.revokeObjectURL(i.previewUrl));
      return prev.filter((i) => i.status !== 'done');
    });
  }

  async function processAndUploadQueue() {
    const pendingItems = queue.filter((i) => i.status === 'queued' || i.status === 'error');
    if (pendingItems.length === 0 || isProcessing) return;

    setIsProcessing(true);
    let successCount = 0;
    let failCount = 0;

    for (const item of pendingItems) {
      const isVideo = item.file.type.startsWith('video/');

      // Step 1: Watermarking (for images)
      if (!isVideo) {
        updateQueueItem(item.id, { status: 'watermarking' });
      }

      try {
        const formData = new FormData();
        formData.set('type', isVideo ? 'video' : 'image');
        formData.set('alt', item.caption.trim() || 'Kayak Adventure gallery moment');
        formData.set('span', item.span);

        if (isVideo) {
          formData.set('file', item.file);
          formData.set('width', '800');
          formData.set('height', item.span === 'tall' ? '1200' : '600');
        } else {
          const { blob, width, height } = await watermarkImage(item.file);
          formData.set('file', new File([blob], 'watermarked.webp', { type: 'image/webp' }));
          formData.set('width', String(width));
          formData.set('height', String(height));
        }

        // Step 2: Upload to Cloudflare Worker
        updateQueueItem(item.id, { status: 'uploading' });

        const res = await fetch(apiEndpoint, {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errData = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(errData.error || 'Upload failed');
        }

        const data = (await res.json().catch(() => ({}))) as { item?: GalleryItem };
        if (data.item) {
          onUpload(data.item);
          updateQueueItem(item.id, { status: 'done' });
          successCount++;
        } else {
          throw new Error('No item returned from server');
        }
      } catch (err: unknown) {
        failCount++;
        const message = err instanceof Error ? err.message : 'Upload failed';
        updateQueueItem(item.id, { status: 'error', error: message });
      }
    }

    setIsProcessing(false);

    if (successCount > 0 && failCount === 0) {
      showFeedback('success', `Successfully published ${successCount} media item${successCount > 1 ? 's' : ''}!`);
    } else if (successCount > 0 && failCount > 0) {
      showFeedback('error', `Uploaded ${successCount} item(s), but ${failCount} failed.`);
    } else if (failCount > 0) {
      showFeedback('error', 'Batch upload encountered errors. Please retry failed items.');
    }
  }

  const completedCount = queue.filter((i) => i.status === 'done').length;
  const pendingCount = queue.filter((i) => i.status === 'queued' || i.status === 'error').length;
  const progressPercent = queue.length > 0 ? Math.round((completedCount / queue.length) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm p-4 sm:p-6 md:p-8">
      {/* Card heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
        <div>
          <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-brand uppercase">
            {tag}
          </span>
          <svg width="48" height="3" viewBox="0 0 48 3" fill="none" className="mt-1.5 mb-2.5 sm:mt-2 sm:mb-3">
            <defs>
              <linearGradient id="ul-line" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b2d6" />
                <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 0.5 C 14 0.5, 34 1, 48 1.5 C 34 2, 14 2.5, 0 2.5 Z" fill="url(#ul-line)" />
          </svg>
          <h2 className="font-serif text-lg sm:text-2xl text-zinc-900 font-medium leading-snug">
            {title || (
              <>
                Add to <span className="italic">Gallery</span>
              </>
            )}
          </h2>
        </div>

        {queue.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-center">
            {completedCount > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                disabled={isProcessing}
                className="text-xs font-semibold text-zinc-500 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer disabled:opacity-50"
              >
                Clear completed ({completedCount})
              </button>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover bg-brand/10 hover:bg-brand/20 px-3.5 py-1.5 rounded-full transition-colors cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add more</span>
            </button>
          </div>
        )}
      </div>

      {/* Drag & Drop Upload Trigger Zone */}
      {queue.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center min-h-[160px] sm:min-h-[220px] border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-brand bg-brand/10 scale-[0.99]'
              : 'border-zinc-300 bg-zinc-50/80 hover:border-brand hover:bg-brand/5'
          }`}
        >
          <div className="flex flex-col items-center gap-2 p-6 sm:p-8 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center shadow-xs">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-zinc-800">
              Drag &amp; drop photos or videos here, or <span className="text-brand underline underline-offset-2">browse</span>
            </p>
            <p className="text-xs text-zinc-400 max-w-sm">
              Select multiple files at once. Photos are automatically branded with the circular badge and converted to WebP.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
                <FileImage className="w-3 h-3 text-emerald-600" /> WebP, JPG, PNG, AVIF
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
                <Video className="w-3 h-3 text-brand" /> MP4, WebM
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Multi-File Upload Queue View */
        <div className="space-y-4">
          {/* Progress Banner during processing */}
          {isProcessing && (
            <div className="bg-brand/5 border border-brand/20 rounded-2xl p-3.5 sm:p-4 space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-700">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand" />
                  Publishing queue: {completedCount} of {queue.length} completed
                </span>
                <span className="text-brand">{progressPercent}%</span>
              </div>
              <div className="w-full bg-zinc-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-brand h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Queue Items Grid / List */}
          <div className="space-y-2.5 max-h-[380px] sm:max-h-[460px] overflow-y-auto pr-1">
            {queue.map((item) => {
              const isVideo = item.file.type.startsWith('video/');
              return (
                <div
                  key={item.id}
                  className={`bg-zinc-50/70 border rounded-xl sm:rounded-2xl p-2.5 sm:p-3 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    item.status === 'done'
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : item.status === 'error'
                      ? 'border-red-200 bg-red-50/30'
                      : item.status === 'watermarking' || item.status === 'uploading'
                      ? 'border-brand/40 bg-brand/5'
                      : 'border-zinc-200'
                  }`}
                >
                  {/* Thumbnail & File Details */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-zinc-200 shrink-0 border border-zinc-200/80">
                      {isVideo ? (
                        <video
                          src={item.previewUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                      ) : (
                        <img
                          src={item.previewUrl}
                          alt={item.caption}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-1 left-1">
                        {isVideo ? (
                          <span className="p-0.5 rounded bg-black/60 text-white block">
                            <Video className="w-2.5 h-2.5" />
                          </span>
                        ) : (
                          <span className="p-0.5 rounded bg-black/60 text-white block">
                            <FileImage className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-xs">
                          {item.file.name}
                        </p>
                        <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                          {formatBytes(item.file.size)}
                        </span>
                      </div>

                      {/* Caption Input */}
                      <input
                        type="text"
                        value={item.caption}
                        disabled={item.status === 'done' || isProcessing}
                        onChange={(e) => updateQueueItem(item.id, { caption: e.target.value })}
                        placeholder="Caption for live site..."
                        className="w-full bg-white border border-zinc-200 rounded-lg px-2.5 py-1 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all disabled:bg-transparent disabled:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Span Layout Selector, Status, & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60">
                    {/* Span choice */}
                    {item.status !== 'done' && (
                      <div className="flex items-center gap-1 bg-white border border-zinc-200 rounded-lg p-0.5 text-[11px]">
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => updateQueueItem(item.id, { span: 'normal' })}
                          className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                            item.span === 'normal'
                              ? 'bg-zinc-800 text-white'
                              : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          1×1
                        </button>
                        <button
                          type="button"
                          disabled={isProcessing}
                          onClick={() => updateQueueItem(item.id, { span: 'tall' })}
                          className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                            item.span === 'tall'
                              ? 'bg-amber-600 text-white'
                              : 'text-zinc-500 hover:text-zinc-800'
                          }`}
                        >
                          2×1
                        </button>
                      </div>
                    )}

                    {/* Status badges */}
                    <div className="min-w-[90px] text-right">
                      {item.status === 'queued' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 bg-zinc-200/70 px-2 py-0.5 rounded-full">
                          Queued
                        </span>
                      )}
                      {item.status === 'watermarking' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full animate-pulse">
                          <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Watermarking
                        </span>
                      )}
                      {item.status === 'uploading' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-brand bg-brand/10 px-2 py-0.5 rounded-full">
                          <Loader2 className="w-2.5 h-2.5 animate-spin" /> Uploading
                        </span>
                      )}
                      {item.status === 'done' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Published
                        </span>
                      )}
                      {item.status === 'error' && (
                        <span
                          title={item.error || 'Upload error'}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full cursor-help"
                        >
                          <AlertCircle className="w-3 h-3 text-red-600" /> Failed
                        </span>
                      )}
                    </div>

                    {/* Remove button */}
                    {item.status !== 'done' && (
                      <button
                        type="button"
                        disabled={isProcessing}
                        onClick={() => removeQueueItem(item.id)}
                        className="p-1 rounded-md text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-40"
                        title="Remove from queue"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-zinc-100">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Layers className="w-4 h-4 text-zinc-400" />
              <span>
                {queue.length} item{queue.length > 1 ? 's' : ''} in queue ({completedCount} published, {pendingCount} pending)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={isProcessing || queue.length === 0}
                onClick={() => setQueue([])}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors cursor-pointer disabled:opacity-40"
              >
                Clear all
              </button>

              <button
                type="button"
                disabled={pendingCount === 0 || isProcessing}
                onClick={processAndUploadQueue}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50 shadow-sm min-h-10"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing ({completedCount}/{queue.length})...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Publish {pendingCount} item{pendingCount > 1 ? 's' : ''}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/mp4,video/webm"
        disabled={isProcessing}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
