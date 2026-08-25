/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import { Loader2, Trash2, Video, Image as ImageIcon, Pencil, Eye, EyeOff } from 'lucide-react';
import type { GalleryItem } from '@/lib/types';

interface GalleryItemCardProps {
  item: GalleryItem;
  onEdit?: (item: GalleryItem) => void;
  onToggleVisibility?: (item: GalleryItem) => void;
  onDelete: (item: GalleryItem) => void;
  deleting: boolean;
}

export default function GalleryItemCard({
  item,
  onEdit,
  onToggleVisibility,
  onDelete,
  deleting,
}: GalleryItemCardProps) {
  const isHidden = item.hidden === true;

  return (
    <div
      className={`group bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
        isHidden ? 'border-amber-200/80 opacity-80' : 'border-zinc-200'
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-zinc-100 overflow-hidden">
        {item.type === 'video' ? (
          <video
            src={`/api/media/${item.key}`}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        ) : (
          <img
            src={`/api/media/${item.key}`}
            alt={item.alt}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
          />
        )}

        {/* Badges */}
        <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 flex-wrap max-w-[90%]">
          <span className="inline-flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wide uppercase bg-white/90 text-zinc-700 shadow-sm border border-zinc-200/60 backdrop-blur-sm">
            {item.type === 'video' ? (
              <Video className="w-2.5 h-2.5 text-brand" />
            ) : (
              <ImageIcon className="w-2.5 h-2.5 text-emerald-500" />
            )}
            {item.type}
          </span>
          {item.span === 'tall' && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
              Tall
            </span>
          )}
          {isHidden && (
            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-zinc-900 text-white shadow-xs">
              <EyeOff className="w-2.5 h-2.5 text-amber-300" />
              Hidden
            </span>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div className="px-2.5 py-2 sm:px-3 sm:py-2.5 flex items-center justify-between gap-1.5">
        <p className="text-[10px] sm:text-[11px] text-zinc-500 truncate leading-none flex-1 mr-1">
          {item.alt || 'No caption'}
        </p>
        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
          {onToggleVisibility && (
            <button
              onClick={() => onToggleVisibility(item)}
              title={isHidden ? 'Hidden from live gallery. Click to show.' : 'Visible on live gallery. Click to hide.'}
              className={`p-1.5 rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center transition-colors cursor-pointer ${
                isHidden ? 'text-amber-700 bg-amber-50/80 hover:bg-amber-100' : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(item)}
              title="Edit caption and layout"
              className="p-1.5 rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center text-zinc-500 hover:text-brand hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => onDelete(item)}
            disabled={deleting}
            title="Delete"
            className="p-1.5 rounded-lg min-w-[32px] min-h-[32px] flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
