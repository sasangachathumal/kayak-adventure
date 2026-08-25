'use client';

import * as React from 'react';
import { Upload, RefreshCw, Loader2, Plus } from 'lucide-react';
import { watermarkImage } from '@/lib/watermark';
import type { GalleryItem } from '@/lib/types';

interface GalleryUploadCardProps {
  onUpload: (item: GalleryItem) => void;
  showFeedback: (type: 'success' | 'error', message: string) => void;
}

export default function GalleryUploadCard({ onUpload, showFeedback }: GalleryUploadCardProps) {
  const [galleryFile, setGalleryFile] = React.useState<File | null>(null);
  const [altText, setAltText] = React.useState('');
  const [spanType, setSpanType] = React.useState<'normal' | 'tall'>('normal');
  const [uploading, setUploading] = React.useState(false);

  const previewUrl = React.useMemo(() => {
    if (!galleryFile) return null;
    return URL.createObjectURL(galleryFile);
  }, [galleryFile]);

  React.useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!galleryFile || uploading) return;
    setUploading(true);
    try {
      const isVideo = galleryFile.type.startsWith('video/');
      const formData = new FormData();
      formData.set('type', isVideo ? 'video' : 'image');
      formData.set('alt', altText || 'Kayak Adventure gallery moment');
      formData.set('span', spanType);

      if (isVideo) {
        formData.set('file', galleryFile);
        formData.set('width', '800');
        formData.set('height', spanType === 'tall' ? '1200' : '600');
      } else {
        const { blob, width, height } = await watermarkImage(galleryFile);
        formData.set('file', new File([blob], 'watermarked.webp', { type: 'image/webp' }));
        formData.set('width', String(width));
        formData.set('height', String(height));
      }

      const res = await fetch('/api/admin/gallery', { method: 'POST', body: formData });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || 'Upload failed');
      }
      const data = (await res.json().catch(() => ({}))) as { item?: GalleryItem };
      if (data.item) onUpload(data.item);
      setGalleryFile(null);
      setAltText('');
      setSpanType('normal');
      showFeedback('success', 'Media published to live gallery!');
    } catch (err: unknown) {
      showFeedback('error', err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm p-4 sm:p-6 md:p-8">
      {/* Card heading */}
      <div className="mb-5 sm:mb-6">
        <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-brand uppercase">
          Upload Media
        </span>
        {/* Tapered brand line */}
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
          Add to <span className="italic">Gallery</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Drop zone */}
        <div className="lg:col-span-5">
          <label
            htmlFor="upload-file"
            className={`flex flex-col items-center justify-center min-h-[140px] sm:min-h-[200px] border-2 border-dashed rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 ${
              previewUrl
                ? 'border-brand/40 bg-brand/5'
                : 'border-zinc-300 bg-zinc-50 hover:border-brand hover:bg-brand/5'
            }`}
          >
            {previewUrl ? (
              <div className="w-full flex flex-col items-center gap-2 p-3 sm:p-4">
                {galleryFile?.type.startsWith('video/') ? (
                  <video src={previewUrl} className="max-h-36 sm:max-h-44 rounded-lg sm:rounded-xl object-cover shadow-sm" controls />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Preview" className="max-h-36 sm:max-h-44 rounded-lg sm:rounded-xl object-cover shadow-sm" />
                )}
                <span className="text-xs text-zinc-400 truncate max-w-[180px] sm:max-w-[200px]">{galleryFile?.name}</span>
                <span className="text-xs text-brand font-medium">Click to change</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 sm:gap-2 p-5 sm:p-8 text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="text-xs sm:text-sm font-medium text-zinc-700">Click or drag a file here</p>
                <p className="text-[11px] sm:text-xs text-zinc-400">PNG, JPG, WebP, AVIF or MP4</p>
              </div>
            )}
            <input
              id="upload-file"
              type="file"
              accept="image/*,video/mp4,video/webm"
              disabled={uploading}
              onChange={(e) => { if (e.target.files?.[0]) setGalleryFile(e.target.files[0]); }}
              className="hidden"
            />
          </label>
        </div>

        {/* Fields */}
        <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 justify-between">
          <div className="space-y-3.5 sm:space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-500 tracking-wider mb-1.5">
                Caption
              </label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Sunset kayaking through the mangroves"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 sm:px-4 text-base sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-500 tracking-wider mb-1.5 sm:mb-2">
                Grid Display
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {(['normal', 'tall'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSpanType(type)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      spanType === type
                        ? 'border-brand bg-brand/5 text-zinc-900'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:border-zinc-300'
                    }`}
                  >
                    <div className="font-semibold mb-0.5 text-xs">
                      {type === 'normal' ? 'Normal (1×1)' : 'Tall (2×1)'}
                    </div>
                    <div className="text-zinc-400 text-[10px] sm:text-[11px]">
                      {type === 'normal' ? 'Standard card' : 'Spans 2 vertical slots'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-brand/5 border border-brand/15 rounded-xl px-3 py-2.5 sm:px-3.5 sm:py-3">
              <RefreshCw className="w-4 h-4 text-brand shrink-0" />
              <p className="text-xs text-zinc-600 leading-snug">
                Images are auto-converted to WebP and <strong className="text-zinc-800 font-semibold">watermarked</strong> before saving.
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!galleryFile || uploading}
            className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium text-sm py-3 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm min-h-11"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Processing &amp; Uploading...</>
            ) : (
              <><Plus className="w-4 h-4" /> Publish </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
