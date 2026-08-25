/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import { Loader2, Trash2, Pencil, Eye, EyeOff } from 'lucide-react';
import StarRating from './StarRating';
import type { Testimonial } from '@/lib/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  onEdit?: (testimonial: Testimonial) => void;
  onToggleVisibility?: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
  deleting: boolean;
}

export default function TestimonialCard({
  testimonial: t,
  onEdit,
  onToggleVisibility,
  onDelete,
  deleting,
}: TestimonialCardProps) {
  const isHidden = t.hidden === true;

  return (
    <div
      className={`bg-white rounded-xl sm:rounded-2xl border p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${
        isHidden ? 'border-amber-200/80 opacity-80' : 'border-zinc-200'
      }`}
    >
      <div>
        {/* Avatar + Name + Rating + Hidden Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {t.avatarKey ? (
              <img
                src={`/api/media/${t.avatarKey}`}
                alt={t.name}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-zinc-200 shrink-0"
              />
            ) : (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand/10 text-brand border border-brand/20 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0">
                {t.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs sm:text-sm font-semibold text-zinc-900 truncate leading-tight">
                  {t.name}
                </p>
                {isHidden && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-zinc-900 text-amber-300">
                    <EyeOff className="w-2.5 h-2.5" />
                    Hidden
                  </span>
                )}
              </div>
              {t.location && (
                <p className="text-[11px] sm:text-xs text-zinc-400 truncate">{t.location}</p>
              )}
            </div>
          </div>

          <div className="shrink-0 pt-0.5">
            <StarRating value={t.rating ?? 5} readOnly size="sm" />
          </div>
        </div>

        {/* Quote in serif italic */}
        <p className="font-serif text-xs sm:text-sm text-zinc-700 italic leading-relaxed line-clamp-3 mb-3.5 sm:mb-4">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2.5 sm:pt-3 border-t border-zinc-100 text-[10px] sm:text-[11px] text-zinc-400">
        <span>{new Date(t.createdAt).toLocaleDateString()}</span>
        <div className="flex items-center gap-1.5">
          {onToggleVisibility && (
            <button
              onClick={() => onToggleVisibility(t)}
              title={isHidden ? 'Hidden from live site. Click to show.' : 'Visible on live site. Click to hide.'}
              className={`p-1 -mr-0.5 min-h-[26px] flex items-center gap-1 transition-colors cursor-pointer ${
                isHidden ? 'text-amber-600 hover:text-amber-700' : 'text-zinc-400 hover:text-zinc-700'
              }`}
            >
              {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isHidden ? 'Hidden' : 'Visible'}</span>
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(t)}
              title="Edit testimonial"
              className="p-1 -mr-0.5 min-h-[26px] flex items-center gap-1 text-zinc-400 hover:text-brand transition-colors cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          )}
          <button
            onClick={() => onDelete(t)}
            disabled={deleting}
            title="Delete"
            className="p-1 -mr-1 min-h-[26px] flex items-center gap-1 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
