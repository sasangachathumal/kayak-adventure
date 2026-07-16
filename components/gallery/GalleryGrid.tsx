"use client";

import * as React from "react";
import Image from "next/image";
import { X, ArrowLeft, ArrowRight, ArrowDown } from "lucide-react";
import Section from "../shared/Section";
import Reveal from "../shared/Reveal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface GalleryImage {
  src: string;
  alt: string;
  /** Grid span hint: "tall" spans 2 rows on desktop */
  span?: "tall";
  width: number;
  height: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [loadedImages, setLoadedImages] = React.useState<Record<string, boolean>>({});
  const [preloaderDone, setPreloaderDone] = React.useState(() => {
    if (typeof window !== "undefined") {
      return !!((window as unknown) as { __preloaderDone?: boolean }).__preloaderDone;
    }
    return false;
  });
  const [isMobile, setIsMobile] = React.useState(false);
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (((window as unknown) as { __preloaderDone?: boolean }).__preloaderDone) {
      setPreloaderDone(true);
      return;
    }

    const handleFinished = () => {
      setPreloaderDone(true);
      clearTimeout(fallback);
    };

    const fallback = setTimeout(() => setPreloaderDone(true), 3500);

    window.addEventListener("preloaderFinished", handleFinished);
    return () => {
      window.removeEventListener("preloaderFinished", handleFinished);
      clearTimeout(fallback);
    };
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setVisibleCount((prev) => {
        // Adjust default count depending on layout
        if (prev <= 12) {
          return mobile ? 8 : 12;
        }
        return prev;
      });
    };

    const timer = setTimeout(handleResize, 0);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const visibleImages = images.slice(0, visibleCount);

  const handleLoadMore = () => {
    const step = isMobile ? 8 : 12;
    setVisibleCount((prev) => Math.min(prev + step, images.length));
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

        {/* ── Pinterest Columns Layout ─────────────────────── */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 sm:gap-5 md:gap-6">
          {visibleImages.map((img, idx) => (
            <div
              key={img.src}
              className="break-inside-avoid inline-block w-full align-top mb-4 sm:mb-5 md:mb-6"
            >
              <Reveal
                variant="fade-up"
                delay={(idx % 6) * 60}
                duration={700}
              >
                <Button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  className="relative w-full group cursor-pointer focus:outline-none block p-0 h-auto bg-transparent hover:bg-transparent border-none shadow-none text-zinc-950 font-normal leading-none rounded-none"
                  aria-label={`View ${img.alt}`}
                >
                  <AspectRatio 
                    ratio={img.width / img.height}
                    className="overflow-hidden rounded-[16px] sm:rounded-[24px] shadow-md border border-transparent hover:border-[#00b2d6]/30 transition-all duration-500 bg-zinc-100"
                  >
                    {!preloaderDone ? (
                      <Skeleton className="absolute inset-0 w-full h-full bg-zinc-200/50 rounded-[16px] sm:rounded-[24px]" />
                    ) : (
                      <>
                        <Skeleton 
                          className={cn(
                            "absolute inset-0 w-full h-full bg-zinc-200 rounded-[16px] sm:rounded-[24px] transition-opacity duration-500",
                            loadedImages[img.src] ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"
                          )} 
                        />
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          loading="lazy"
                          onLoad={() => {
                            setLoadedImages((prev) => ({ ...prev, [img.src]: true }));
                          }}
                          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                          className={cn(
                            "w-full h-auto pointer-events-none select-none transition-all duration-700 ease-out group-hover:scale-[1.04]",
                            loadedImages[img.src] ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-95"
                          )}
                        />
                      </>
                    )}
                    {/* Hover overlay with caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 sm:p-6">
                      <span className="font-sans text-[11px] sm:text-[14px] font-semibold text-white tracking-wide">
                        {img.alt}
                      </span>
                    </div>
                  </AspectRatio>
                </Button>
              </Reveal>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < images.length && (
          <Reveal variant="fade-up" duration={700}>
            <div className="flex justify-center mt-8 select-none">
              <Button variant="cta" size="cta" onClick={handleLoadMore} ctaIcon={ArrowDown}>
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
          <Button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-[110] flex items-center justify-center size-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md p-0"
            aria-label="Close lightbox"
          >
            <X className="size-5" />
          </Button>

          {/* Image counter */}
          <div className="absolute top-7 left-6 z-[110] font-sans text-[12px] sm:text-[13px] font-semibold text-white/60 tracking-wider">
            <span className="text-brand">{lightboxIndex + 1}</span>
            <span className="mx-1.5">/</span>
            <span>{images.length}</span>
          </div>

          {/* Navigation arrows */}
          <Button
            onClick={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
            className="absolute left-4 sm:left-8 z-[110] group/prev flex items-center justify-center size-11 sm:size-12 rounded-full bg-[#00b2d6] text-white hover:bg-zinc-950 transition-all duration-300 cursor-pointer shadow-lg overflow-hidden p-0 border-none"
            aria-label="Previous image"
          >
            <ArrowLeft className="size-4 sm:size-5 stroke-[2.5] transition-all duration-500 ease-in-out transform group-hover/prev:-translate-x-6 group-hover/prev:opacity-0" />
            <ArrowLeft className="absolute size-4 sm:size-5 stroke-[2.5] translate-x-6 opacity-0 transition-all duration-500 ease-in-out transform group-hover/prev:translate-x-0 group-hover/prev:opacity-100" />
          </Button>

          <Button
            onClick={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
            className="absolute right-4 sm:right-8 z-[110] group/next flex items-center justify-center size-11 sm:size-12 rounded-full bg-[#00b2d6] text-white hover:bg-zinc-950 transition-all duration-300 cursor-pointer shadow-lg overflow-hidden p-0 border-none"
            aria-label="Next image"
          >
            <ArrowRight className="size-4 sm:size-5 stroke-[2.5] transition-all duration-500 ease-in-out transform group-hover/next:translate-x-6 group-hover/next:opacity-0" />
            <ArrowRight className="absolute size-4 sm:size-5 stroke-[2.5] -translate-x-6 opacity-0 transition-all duration-500 ease-in-out transform group-hover/next:translate-x-0 group-hover/next:opacity-100" />
          </Button>

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
