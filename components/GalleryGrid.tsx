"use client";

import * as React from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Section from "./Section";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
  /** Grid span hint: "tall" spans 2 rows on desktop */
  span?: "tall";
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [visibleCount, setVisibleCount] = React.useState(10);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const visibleImages = images.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 10, images.length));
  };

  // Lock body scroll when lightbox is open
  React.useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, images.length]);

  return (
    <>
      <Section
        id="gallery-grid"
        className="bg-[#f0efeb] pt-16 sm:pt-20 pb-16 sm:pb-24"
        containerClassName="flex flex-col gap-10 sm:gap-12"
      >
        {/* Section sub-heading */}
        <Reveal variant="fade-up" duration={700}>
          <div className="flex items-center gap-4">
            <h2 className="font-serif text-[22px] sm:text-[26px] text-zinc-800 font-medium tracking-wide whitespace-nowrap">
              Our <span className="italic">adventures.</span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-300/80 to-transparent" />
          </div>
        </Reveal>

        {/* ── Desktop Masonry Grid (4 cols, auto rows) ─────────────────────── */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {visibleImages.map((img, idx) => (
            <Reveal
              key={img.src}
              variant="fade-up"
              delay={(idx % 8) * 80}
              duration={800}
              className={cn(img.span === "tall" && "md:row-span-2")}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="relative w-full h-full group cursor-pointer focus:outline-none"
                aria-label={`View ${img.alt}`}
              >
                <div
                  className={cn(
                    "relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] shadow-md",
                    "border border-transparent hover:border-[#00b2d6]/30",
                    "transition-all duration-500",
                    img.span === "tall"
                      ? "aspect-[3/4] md:aspect-[3/4]"
                      : "aspect-[3/2]"
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Hover overlay with caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5 sm:p-6">
                    <span className="font-sans text-[13px] sm:text-[14px] font-semibold text-white tracking-wide">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* ── Mobile Grid (2 cols, simpler) ──────────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 sm:hidden">
          {visibleImages.map((img, idx) => (
            <Reveal
              key={img.src}
              variant="fade-up"
              delay={(idx % 6) * 60}
              duration={700}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="relative w-full group cursor-pointer focus:outline-none"
                aria-label={`View ${img.alt}`}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[16px] shadow-md border border-transparent hover:border-[#00b2d6]/30 transition-all duration-500">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="50vw"
                    className="object-cover pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  {/* Caption overlay on mobile too */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-3">
                    <span className="font-sans text-[11px] font-semibold text-white tracking-wide">
                      {img.alt}
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < images.length && (
          <Reveal variant="fade-up" duration={700}>
            <div className="flex justify-center mt-8 select-none">
              <Button variant="cta" size="cta" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          </Reveal>
        )}
      </Section>

      {/* ── Lightbox Modal ────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setLightboxIndex(null)}
          />

          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-[110] flex items-center justify-center size-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </button>

          {/* Image counter */}
          <div className="absolute top-7 left-6 z-[110] font-sans text-[12px] sm:text-[13px] font-semibold text-white/60 tracking-wider">
            <span className="text-brand">{lightboxIndex + 1}</span>
            <span className="mx-1.5">/</span>
            <span>{images.length}</span>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
            className="absolute left-4 sm:left-8 z-[110] group/prev flex items-center justify-center size-11 sm:size-12 rounded-full bg-[#00b2d6] text-white hover:bg-zinc-950 transition-all duration-300 cursor-pointer shadow-lg overflow-hidden"
            aria-label="Previous image"
          >
            <ArrowLeft className="size-4 sm:size-5 stroke-[2.5] transition-all duration-500 ease-in-out transform group-hover/prev:-translate-x-6 group-hover/prev:opacity-0" />
            <ArrowLeft className="absolute size-4 sm:size-5 stroke-[2.5] translate-x-6 opacity-0 transition-all duration-500 ease-in-out transform group-hover/prev:translate-x-0 group-hover/prev:opacity-100" />
          </button>

          <button
            onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
            className="absolute right-4 sm:right-8 z-[110] group/next flex items-center justify-center size-11 sm:size-12 rounded-full bg-[#00b2d6] text-white hover:bg-zinc-950 transition-all duration-300 cursor-pointer shadow-lg overflow-hidden"
            aria-label="Next image"
          >
            <ArrowRight className="size-4 sm:size-5 stroke-[2.5] transition-all duration-500 ease-in-out transform group-hover/next:translate-x-6 group-hover/next:opacity-0" />
            <ArrowRight className="absolute size-4 sm:size-5 stroke-[2.5] -translate-x-6 opacity-0 transition-all duration-500 ease-in-out transform group-hover/next:translate-x-0 group-hover/next:opacity-100" />
          </button>

          {/* Main image */}
          <div className="relative z-[105] w-[90vw] h-[75vh] sm:w-[80vw] sm:h-[80vh] max-w-5xl">
            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain pointer-events-none animate-in zoom-in-95 fade-in duration-300"
              quality={95}
              priority
            />
            {/* Caption below image */}
            <div className="absolute -bottom-10 left-0 right-0 text-center">
              <span className="font-sans text-[13px] sm:text-[14px] font-medium text-white/70 tracking-wide">
                {images[lightboxIndex].alt}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
