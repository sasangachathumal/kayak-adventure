"use client";

import * as React from "react";
import { Search, X, Star, Eye, EyeOff, RotateCcw } from "lucide-react";
import SegmentedControl from "./SegmentedControl";
import TestimonialForm from "./TestimonialForm";
import TestimonialCard from "./TestimonialCard";
import EditTestimonialModal from "./EditTestimonialModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {
  GoogleLogo,
  FacebookLogo,
  InstagramLogo,
  WhatsAppLogo,
  TripAdvisorLogo,
} from "@/components/shared/PlatformIcons";
import type { Testimonial, TestimonialPlatform } from "@/lib/types";

interface TestimonialsTabProps {
  testimonialsList: Testimonial[];
  setTestimonialsList: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  showFeedback: (type: "success" | "error", message: string) => void;
  deletingId: string | null;
  setDeletingId: React.Dispatch<React.SetStateAction<string | null>>;
}

type VisibilityFilter = "all" | "visible" | "hidden";
type RatingFilter = "all" | 5 | 4;
type PlatformFilter = "all" | TestimonialPlatform;

export default function TestimonialsTab({
  testimonialsList,
  setTestimonialsList,
  showFeedback,
  deletingId,
  setDeletingId,
}: TestimonialsTabProps) {
  const [editingTestimonial, setEditingTestimonial] =
    React.useState<Testimonial | null>(null);
  const [deletingTestimonial, setDeletingTestimonial] =
    React.useState<Testimonial | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = React.useState("");
  const [visibilityFilter, setVisibilityFilter] =
    React.useState<VisibilityFilter>("all");
  const [ratingFilter, setRatingFilter] = React.useState<RatingFilter>("all");
  const [platformFilter, setPlatformFilter] =
    React.useState<PlatformFilter>("all");

  async function handleConfirmDelete() {
    if (!deletingTestimonial) return;
    const id = deletingTestimonial.id;
    setDeletingId(id);
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setTestimonialsList((prev) => prev.filter((t) => t.id !== id));
      showFeedback("success", "Testimonial deleted.");
      setDeletingTestimonial(null);
    } catch (err: unknown) {
      showFeedback(
        "error",
        err instanceof Error ? err.message : "Delete failed",
      );
    } finally {
      setDeletingId(null);
    }
  }

  function handleSave(entry: Testimonial) {
    setTestimonialsList((prev) => [
      entry,
      ...prev.filter((t) => t.id !== entry.id),
    ]);
  }

  function handleUpdate(updated: Testimonial) {
    setTestimonialsList((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  }

  async function handleToggleVisibility(testimonial: Testimonial) {
    const newHidden = !testimonial.hidden;
    // Optimistic update
    setTestimonialsList((prev) =>
      prev.map((t) =>
        t.id === testimonial.id ? { ...t, hidden: newHidden } : t,
      ),
    );
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: testimonial.id, hidden: newHidden }),
      });
      if (!res.ok) throw new Error("Visibility update failed");
      showFeedback(
        "success",
        newHidden
          ? "Review is now hidden from the website."
          : "Review is now visible on the website.",
      );
    } catch (err: unknown) {
      // Revert on error
      setTestimonialsList((prev) =>
        prev.map((t) =>
          t.id === testimonial.id ? { ...t, hidden: testimonial.hidden } : t,
        ),
      );
      showFeedback(
        "error",
        err instanceof Error ? err.message : "Failed to update visibility",
      );
    }
  }

  async function handleMove(testimonialId: string, direction: "prev" | "next") {
    const fromIndex = testimonialsList.findIndex((t) => t.id === testimonialId);
    if (fromIndex === -1) return;
    const toIndex = direction === "prev" ? fromIndex - 1 : fromIndex + 1;
    if (toIndex < 0 || toIndex >= testimonialsList.length) return;

    const reordered = [...testimonialsList];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);

    // Optimistic update
    setTestimonialsList(reordered);

    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: reordered.map((t) => t.id) }),
      });
      if (!res.ok) throw new Error("Reorder failed");
      showFeedback("success", "Testimonials sequence updated.");
    } catch (err: unknown) {
      setTestimonialsList(testimonialsList); // Revert on failure
      showFeedback(
        "error",
        err instanceof Error ? err.message : "Failed to save sequence",
      );
    }
  }

  // Filtered testimonials
  const filteredTestimonials = React.useMemo(() => {
    return testimonialsList.filter((t) => {
      // 1. Search Query (name, location, quote)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = (t.name || "").toLowerCase().includes(q);
        const locMatch = (t.location || "").toLowerCase().includes(q);
        const quoteMatch = (t.quote || "").toLowerCase().includes(q);
        if (!nameMatch && !locMatch && !quoteMatch) return false;
      }

      // 2. Visibility
      if (visibilityFilter === "visible" && t.hidden === true) return false;
      if (visibilityFilter === "hidden" && t.hidden !== true) return false;

      // 3. Rating
      if (ratingFilter !== "all" && (t.rating ?? 5) !== ratingFilter)
        return false;

      // 4. Platform
      if (
        platformFilter !== "all" &&
        (t.platform ?? "google") !== platformFilter
      )
        return false;

      return true;
    });
  }, [
    testimonialsList,
    searchQuery,
    visibilityFilter,
    ratingFilter,
    platformFilter,
  ]);

  const isFiltering =
    searchQuery.trim() !== "" ||
    visibilityFilter !== "all" ||
    ratingFilter !== "all" ||
    platformFilter !== "all";

  function resetFilters() {
    setSearchQuery("");
    setVisibilityFilter("all");
    setRatingFilter("all");
    setPlatformFilter("all");
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <TestimonialForm onSave={handleSave} showFeedback={showFeedback} />

      {/* Saved testimonials Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="shrink-0">
            <h3 className="font-serif text-base sm:text-lg text-zinc-900 font-medium whitespace-nowrap">
              Saved <span className="italic">Reviews</span>
            </h3>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72 md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, review..."
              className="w-full bg-white border border-zinc-200 rounded-full pl-10 pr-8 py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips Bar with Smooth Gliding Pill Indicator */}
        {testimonialsList.length > 0 && (
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              {/* Visibility filters */}
              <SegmentedControl<VisibilityFilter>
                value={visibilityFilter}
                onChange={setVisibilityFilter}
                options={[
                  { value: "all", label: "All" },
                  { value: "visible", label: "Visible", icon: Eye },
                  { value: "hidden", label: "Hidden", icon: EyeOff },
                ]}
                activeColor="bg-zinc-900"
              />

              {/* Star rating filters */}
              <SegmentedControl<RatingFilter>
                value={ratingFilter}
                onChange={setRatingFilter}
                options={[
                  { value: "all", label: "All Ratings" },
                  {
                    value: 5,
                    label: (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>5 Stars</span>
                      </span>
                    ),
                  },
                  {
                    value: 4,
                    label: (
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4 Stars</span>
                      </span>
                    ),
                  },
                ]}
                activeColor="bg-brand"
              />

              {/* Platform filters */}
              <SegmentedControl<PlatformFilter>
                value={platformFilter}
                onChange={setPlatformFilter}
                options={[
                  { value: "all", label: "All" },
                  { value: "google", label: "Google", icon: GoogleLogo },
                  { value: "facebook", label: "Facebook", icon: FacebookLogo },
                  {
                    value: "instagram",
                    label: "Instagram",
                    icon: InstagramLogo,
                  },
                  { value: "whatsapp", label: "WhatsApp", icon: WhatsAppLogo },
                  {
                    value: "tripadvisor",
                    label: "TripAdvisor",
                    icon: TripAdvisorLogo,
                  },
                ]}
                activeColor="bg-zinc-800"
              />
            </div>

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

        {/* Testimonials List or Empty states */}
        {testimonialsList.length === 0 ? (
          <div className="text-center py-12 sm:py-16 border-2 border-dashed border-zinc-200 rounded-2xl p-4 bg-white/50">
            <p className="text-xs sm:text-sm text-zinc-400">
              No CMS testimonials yet.
            </p>
            <p className="text-[11px] sm:text-xs text-zinc-300 mt-1">
              Static reviews are displayed until you add some here.
            </p>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white border border-zinc-200 rounded-2xl p-6 shadow-xs animate-in fade-in duration-200">
            <Search className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-zinc-800">
              No reviews match your search &amp; filters
            </p>
            <p className="text-xs text-zinc-400 mt-1 mb-4">
              Try searching for a different guest name or resetting filters.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover bg-brand/10 hover:bg-brand/20 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {filteredTestimonials.map((t, index) => {
              const originalIndex = testimonialsList.findIndex(
                (item) => item.id === t.id,
              );
              return (
                <TestimonialCard
                  key={t.id}
                  testimonial={t}
                  index={originalIndex >= 0 ? originalIndex : index}
                  canMovePrev={originalIndex > 0}
                  canMoveNext={originalIndex < testimonialsList.length - 1}
                  onMove={(dir) => handleMove(t.id, dir)}
                  onEdit={(item) => setEditingTestimonial(item)}
                  onToggleVisibility={handleToggleVisibility}
                  onDelete={(item) => setDeletingTestimonial(item)}
                  deleting={deletingId === t.id}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Testimonial Modal */}
      <EditTestimonialModal
        testimonial={editingTestimonial}
        isOpen={Boolean(editingTestimonial)}
        onClose={() => setEditingTestimonial(null)}
        onUpdate={handleUpdate}
        showFeedback={showFeedback}
      />

      {/* Custom Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={Boolean(deletingTestimonial)}
        title="Delete Testimonial"
        description="Are you sure you want to remove this review from the website?"
        itemPreview={`${deletingTestimonial?.name}: ${deletingTestimonial?.quote}`}
        isDeleting={Boolean(deletingId)}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTestimonial(null)}
      />
    </div>
  );
}
