"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Section from "./Section";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

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
    <Section id="gallery" className="bg-[#f0efeb] pt-0 pb-20 lg:pb-28">
      
      {/* Top Part: Content and Featured Header Image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
        
        {/* Left Side: Content */}
        <div className="flex flex-col text-left">
          {/* Section Tag */}
          <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#00b2d6] uppercase">
            Gallery
          </span>

          {/* Decorative Tapered Brand Line */}
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

          {/* Headline */}
          <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide mb-6">
            Moments on <br />
            the <span className="italic font-medium">water.</span>
          </h2>

          {/* Description Paragraph */}
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-zinc-600 leading-[1.75] font-medium tracking-wide max-w-125">
            Snapshots from our kayaking adventures through Rathgama&apos;s mangroves. Every paddle, every path, a story worth remembering.
          </p>
        </div>

        {/* Right Side: Top Landscape Showcase */}
        <div className="hidden lg:block w-full relative aspect-[1.8/1] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-md">
          <Image
            src="/gallery-image-1.png"
            alt="Kayakers paddling at sunset"
            fill
            sizes="50vw"
            className="object-cover pointer-events-none select-none"
          />
        </div>

      </div>

      {/* Bottom Part: Grid of Showcase Images (Desktop) */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Left Tall Column (Item 1) */}
        <div className="relative md:row-span-2 aspect-3/4 md:aspect-auto rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
          <Image
            src="/gallery-image-2.png"
            alt="Mangrove Archway"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* Middle Columns: Row 1 */}
        {/* Top Middle Left (Item 2) */}
        <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
          <Image
            src="/gallery-image-4.png"
            alt="Aerial Lake View"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* Top Middle Right (Item 3) */}
        <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
          <Image
            src="/gallery-image-5.png"
            alt="Canopy Tunnel Path"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* Right Tall Column (Item 4) */}
        <div className="relative md:row-span-2 aspect-3/4 md:aspect-auto rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
          <Image
            src="/gallery-image-3.png"
            alt="Golden Hour Waters"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* Middle Columns: Row 2 */}
        {/* Bottom Middle Left (Item 5) */}
        <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
          <Image
            src="/gallery-image-7.png"
            alt="Lagoon Reflections"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover pointer-events-none select-none"
          />
        </div>

        {/* Bottom Middle Right (Item 6) */}
        <div className="relative aspect-1.5/1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-md">
          <Image
            src="/gallery-image-6.png"
            alt="Paddling Exploration"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover pointer-events-none select-none"
          />
        </div>

      </div>

      {/* Mobile Carousel View */}
      <div className="sm:hidden w-full select-none">
        <Carousel setApi={setApi} opts={{ align: "start", loop: false, watchDrag: true }} className="w-full" style={{ touchAction: "pan-y" }}>
          <CarouselContent className="-ml-4">
            
            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/gallery-image-2.png"
                  alt="Mangrove Archway"
                  fill
                  sizes="85vw"
                  className="object-cover pointer-events-none select-none"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/gallery-image-4.png"
                  alt="Aerial Lake View"
                  fill
                  sizes="85vw"
                  className="object-cover pointer-events-none select-none"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/gallery-image-5.png"
                  alt="Canopy Tunnel Path"
                  fill
                  sizes="85vw"
                  className="object-cover pointer-events-none select-none"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/gallery-image-3.png"
                  alt="Golden Hour Waters"
                  fill
                  sizes="85vw"
                  className="object-cover pointer-events-none select-none"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/gallery-image-6.png"
                  alt="Lagoon Reflections"
                  fill
                  sizes="85vw"
                  className="object-cover pointer-events-none select-none"
                />
              </div>
            </CarouselItem>

            <CarouselItem className="pl-4 basis-[85%]">
              <div className="relative aspect-3/4 rounded-[20px] overflow-hidden shadow-md">
                <Image
                  src="/gallery-image-7.png"
                  alt="Paddling Exploration"
                  fill
                  sizes="85vw"
                  className="object-cover pointer-events-none select-none"
                />
              </div>
            </CarouselItem>

          </CarouselContent>
        </Carousel>

        {/* Carousel Controls (Centered Pagination) */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {Array.from({ length: count }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => api?.scrollTo(idx)}
              className={cn(
                "size-2 rounded-full transition-all duration-300",
                current === idx ? "bg-[#00b2d6] w-2" : "bg-zinc-200"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Centered CTA Button */}
      <div className="flex justify-center mt-16 select-none">
        <Link href="/gallery">
          <Button variant="cta" size="cta">
            View More
          </Button>
        </Link>
      </div>

    </Section>
  );
}
