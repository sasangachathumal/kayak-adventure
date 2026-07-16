"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "../shared/Section";
import Reveal from "../shared/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ShowcaseImageProps {
  src: string;
  alt: string;
  sizes: string;
  preloaderDone: boolean;
}

function ShowcaseImage({ src, alt, sizes, preloaderDone }: ShowcaseImageProps) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <>
      {!preloaderDone ? (
        <Skeleton className="absolute inset-0 w-full h-full bg-zinc-200/50 rounded-[inherit]" />
      ) : (
        <>
          <Skeleton 
            className={cn(
              "absolute inset-0 w-full h-full bg-zinc-200 rounded-[inherit] transition-opacity duration-500",
              loaded ? "opacity-0 pointer-events-none" : "opacity-100 animate-pulse"
            )} 
          />
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={cn(
              "object-cover pointer-events-none select-none transition-all duration-700 ease-out",
              loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-sm scale-95"
            )}
          />
        </>
      )}
    </>
  );
}

export default function GalleryPreview() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [preloaderDone, setPreloaderDone] = React.useState(() => {
    if (typeof window !== "undefined") {
      return !!((window as unknown) as { __preloaderDone?: boolean }).__preloaderDone;
    }
    return false;
  });

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
    if (!api) return;

    const updateSnapState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };

    updateSnapState();
    api.on("select", updateSnapState);
    api.on("reInit", updateSnapState);

    return () => {
      api.off("select", updateSnapState);
      api.off("reInit", updateSnapState);
    };
  }, [api]);

  return (
    <Section id="gallery" className="bg-[#f0efeb] pt-12 sm:pt-16 pb-12 lg:pb-16">
      
      {/* Top Part: Content and Featured Header Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
        
        {/* Left Side: Content */}
        <div className="flex flex-col text-left">
          {/* Section Tag */}
          <Reveal variant="fade-left" duration={600}>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#00b2d6] uppercase">
              Gallery
            </span>
          </Reveal>

          {/* Decorative Tapered Brand Line */}
          <Reveal variant="fade-left" delay={100} duration={600}>
            <svg
              width="72"
              height="4"
              viewBox="0 0 72 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-4 mb-8"
            >
              <defs>
                <linearGradient id="gallery-brand-fade-gradient" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00b2d6" />
                  <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
                fill="url(#gallery-brand-fade-gradient)"
              />
            </svg>
          </Reveal>

          {/* Headline */}
          <Reveal variant="clip-up" delay={150} duration={900}>
            <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide mb-6">
              Moments on <br />
              the <span className="italic font-medium">water.</span>
            </h2>
          </Reveal>

          {/* Description Paragraph */}
          <Reveal variant="blur-in" delay={300} duration={800}>
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-zinc-600 leading-[1.75] font-medium tracking-wide max-w-125">
              <span className="block md:hidden">
                Moments from our Rathgama mangrove kayaking tours.
              </span>
              <span className="hidden md:inline">
                Snapshots from our kayaking adventures through Rathgama&apos;s mangroves. Every paddle, every path, a story worth remembering.
              </span>
            </p>
          </Reveal>
        </div>

        {/* Right Side: Top Landscape Showcase */}
        <Reveal variant="scale-up" delay={200} duration={900} className="hidden lg:block">
          <AspectRatio ratio={1.8} className="w-full overflow-hidden rounded-[24px] sm:rounded-[32px] shadow-md">
            <ShowcaseImage
              src="/gallery-image-1.png"
              alt="Kayakers paddling at sunset"
              sizes="50vw"
              preloaderDone={preloaderDone}
            />
          </AspectRatio>
        </Reveal>

      </div>

      {/* Bottom Part: Grid of Showcase Images (Desktop) */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Left Tall Column (Item 1) */}
        <Reveal variant="fade-up" delay={0} duration={800} className="md:row-span-2">
          <div className="relative aspect-3/4 md:aspect-auto md:h-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
            <ShowcaseImage
              src="/gallery-image-2.png"
              alt="Mangrove Archway"
              sizes="(max-width: 768px) 50vw, 25vw"
              preloaderDone={preloaderDone}
            />
          </div>
        </Reveal>

        {/* Middle Columns: Row 1 */}
        {/* Top Middle Left (Item 2) */}
        <Reveal variant="fade-up" delay={100} duration={800}>
          <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
            <ShowcaseImage
              src="/gallery-image-4.png"
              alt="Aerial Lake View"
              sizes="(max-width: 768px) 50vw, 25vw"
              preloaderDone={preloaderDone}
            />
          </div>
        </Reveal>

        {/* Top Middle Right (Item 3) */}
        <Reveal variant="fade-up" delay={200} duration={800}>
          <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
            <ShowcaseImage
              src="/gallery-image-5.png"
              alt="Canopy Tunnel Path"
              sizes="(max-width: 768px) 50vw, 25vw"
              preloaderDone={preloaderDone}
            />
          </div>
        </Reveal>

        {/* Right Tall Column (Item 4) */}
        <Reveal variant="fade-up" delay={300} duration={800} className="md:row-span-2">
          <div className="relative aspect-3/4 md:aspect-auto md:h-full rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
            <ShowcaseImage
              src="/gallery-image-3.png"
              alt="Golden Hour Waters"
              sizes="(max-width: 768px) 50vw, 25vw"
              preloaderDone={preloaderDone}
            />
          </div>
        </Reveal>

        {/* Middle Columns: Row 2 */}
        {/* Bottom Middle Left (Item 5) */}
        <Reveal variant="fade-up" delay={400} duration={800}>
          <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
            <ShowcaseImage
              src="/gallery-image-7.png"
              alt="Lagoon Reflections"
              sizes="(max-width: 768px) 50vw, 25vw"
              preloaderDone={preloaderDone}
            />
          </div>
        </Reveal>

        {/* Bottom Middle Right (Item 6) */}
        <Reveal variant="fade-up" delay={500} duration={800}>
          <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
            <ShowcaseImage
              src="/gallery-image-6.png"
              alt="Paddling Exploration"
              sizes="(max-width: 768px) 50vw, 25vw"
              preloaderDone={preloaderDone}
            />
          </div>
        </Reveal>

      </div>

      {/* Mobile Carousel View */}
      <Reveal variant="fade-up" delay={100} duration={700} className="sm:hidden w-full select-none">
        <Carousel setApi={setApi} opts={{ align: "start", loop: false, watchDrag: true }} className="w-full" style={{ touchAction: "pan-y" }}>
          <CarouselContent className="-ml-4">
            
            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <ShowcaseImage
                  src="/gallery-image-2.png"
                  alt="Mangrove Archway"
                  sizes="85vw"
                  preloaderDone={preloaderDone}
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <ShowcaseImage
                  src="/gallery-image-4.png"
                  alt="Aerial Lake View"
                  sizes="85vw"
                  preloaderDone={preloaderDone}
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <ShowcaseImage
                  src="/gallery-image-5.png"
                  alt="Canopy Tunnel Path"
                  sizes="85vw"
                  preloaderDone={preloaderDone}
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <ShowcaseImage
                  src="/gallery-image-3.png"
                  alt="Golden Hour Waters"
                  sizes="85vw"
                  preloaderDone={preloaderDone}
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <ShowcaseImage
                  src="/gallery-image-6.png"
                  alt="Lagoon Reflections"
                  sizes="85vw"
                  preloaderDone={preloaderDone}
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <ShowcaseImage
                  src="/gallery-image-7.png"
                  alt="Paddling Exploration"
                  sizes="85vw"
                  preloaderDone={preloaderDone}
                />
              </div>
            </CarouselItem>

          </CarouselContent>
        </Carousel>

        {/* Carousel Controls (Centered Pagination) */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {Array.from({ length: count }).map((_, idx) => (
            <Button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "size-2 rounded-full transition-all duration-300 p-0 h-2 bg-zinc-200 border-none min-w-0 min-h-0",
                current === idx ? "bg-[#00b2d6] w-2" : "bg-zinc-200"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </Reveal>

      {/* Centered CTA Button */}
      <Reveal variant="fade-up" delay={200} duration={700}>
        <div className="flex justify-center mt-16 select-none">
          <Link href="/gallery">
            <Button variant="cta" size="cta">
              View More
            </Button>
          </Link>
        </div>
      </Reveal>

    </Section>
  );
}
