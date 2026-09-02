"use client";

import * as React from "react";
import { Loader2, Plus } from "lucide-react";
import StarRating from "./StarRating";
import {
  PLATFORMS,
  type PlatformConfig,
} from "@/components/shared/PlatformIcons";
import type { Testimonial, TestimonialPlatform } from "@/lib/types";

interface TestimonialFormProps {
  onSave: (entry: Testimonial) => void;
  showFeedback: (type: "success" | "error", message: string) => void;
}

const PLATFORM_LIST: PlatformConfig[] = Object.values(PLATFORMS);

export default function TestimonialForm({
  onSave,
  showFeedback,
}: TestimonialFormProps) {
  const [tName, setTName] = React.useState("");
  const [tLocation, setTLocation] = React.useState("");
  const [tQuote, setTQuote] = React.useState("");
  const [tRating, setTRating] = React.useState<number>(5);
  const [tPlatform, setTPlatform] =
    React.useState<TestimonialPlatform>("google");
  const [tAvatar, setTAvatar] = React.useState<File | null>(null);
  const [saving, setSaving] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!tName || !tQuote || saving) return;
    setSaving(true);
    try {
      const formData = new FormData();
      formData.set("name", tName);
      formData.set("location", tLocation);
      formData.set("quote", tQuote);
      formData.set("rating", String(tRating));
      formData.set("platform", tPlatform);
      if (tAvatar) formData.set("avatar", tAvatar);

      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || "Save failed");
      }
      const data = (await res.json().catch(() => ({}))) as {
        entry?: Testimonial;
      };
      if (data.entry) onSave(data.entry);
      setTName("");
      setTLocation("");
      setTQuote("");
      setTRating(5);
      setTPlatform("google");
      setTAvatar(null);
      showFeedback("success", "Testimonial saved!");
    } catch (err: unknown) {
      showFeedback("error", err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-2.5 sm:px-4 text-base sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all";
  const labelClass =
    "block text-xs font-semibold text-zinc-500 tracking-wider mb-1.5";

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-sm p-4 sm:p-6 md:p-8">
      {/* Card heading */}
      <div className="mb-5 sm:mb-6">
        <span className="font-sans text-[9px] sm:text-[10px] font-bold tracking-[0.35em] text-brand uppercase">
          Add Review
        </span>
        <svg
          width="48"
          height="3"
          viewBox="0 0 48 3"
          fill="none"
          className="mt-1.5 mb-2.5 sm:mt-2 sm:mb-3"
        >
          <defs>
            <linearGradient
              id="tf-line"
              x1="0"
              y1="0"
              x2="48"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#00b2d6" />
              <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 0.5 C 14 0.5, 34 1, 48 1.5 C 34 2, 14 2.5, 0 2.5 Z"
            fill="url(#tf-line)"
          />
        </svg>
        <h2 className="font-serif text-lg sm:text-2xl text-zinc-900 font-medium leading-snug">
          Add <span className="italic">Testimonial</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label className={labelClass}>Guest Name *</label>
            <input
              type="text"
              value={tName}
              onChange={(e) => setTName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Location</label>
            <input
              type="text"
              value={tLocation}
              onChange={(e) => setTLocation(e.target.value)}
              placeholder="e.g. London, United Kingdom"
              className={inputClass}
            />
          </div>
        </div>

        {/* Rating & Source Platform Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
          <div>
            <label className={labelClass}>Star Rating</label>
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 inline-flex w-full sm:w-auto">
              <StarRating value={tRating} onChange={setTRating} size="md" />
            </div>
          </div>

          <div>
            <label className={labelClass}>From</label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {PLATFORM_LIST.map((p) => {
                const isSelected = tPlatform === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setTPlatform(p.id)}
                    className={`flex items-center justify-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "border-zinc-900 bg-zinc-900 text-white shadow-xs"
                        : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{p.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <label className={labelClass}>Review *</label>
          <textarea
            value={tQuote}
            onChange={(e) => setTQuote(e.target.value)}
            placeholder="e.g. Paddling through the mangroves was pure magic..."
            rows={3}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Avatar Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setTAvatar(e.target.files?.[0] || null)}
            className="block w-full text-xs text-zinc-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer transition-colors"
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={!tName || !tQuote || saving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white font-medium text-sm px-6 py-3 sm:py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm min-h-[44px]"
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
  );
}
