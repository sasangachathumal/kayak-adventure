"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Section from "../shared/Section";
import Reveal from "../shared/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const testimonials = [
  {
    quote: "Paddling through the mangroves was pure magic. The calm, the views, and the whole experience was something I'll never forget.",
    author: "Sarah Jenkins",
    location: "London, United Kingdom",
    image: "/testimonial-Sarah.jpeg",
  },
  {
    quote: "Our guide was amazing—super friendly and knew so much about the area. It felt safe, fun, and so well organized from start to finish.",
    author: "Marcus Koskinen",
    location: "Helsinki, Finland",
    image: "/testimonial-Marcus.jpeg",
  },
  {
    quote: "An absolute highlight of our trip! The scenery is breathtaking, and the kayaks were comfortable and high quality.",
    author: "Lukas Schmidt",
    location: "Munich, Germany",
    image: "/testimonial-Lukas.jpeg",
  },
  {
    quote: "Superb organization and friendly staff. Highly recommend the sunset tour for stunning photography opportunities.",
    author: "Chloe Bennett",
    location: "Sydney, Australia",
    image: "/testimonial-Chloe.jpeg",
  },
  {
    quote: "Getting to explore the hidden channels at sunrise was unforgettable. Highly recommend this to anyone visiting Sri Lanka!",
    author: "Emma Lindqvist",
    location: "Stockholm, Sweden",
    image: "/testimonial-Emma.jpeg",
  }
];

export default function Testimonials() {
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
    <Section id="testimonials" className="bg-[#f0efeb] pt-12 sm:pt-16 pb-10 sm:pb-20 lg:pb-28">
      
      {/* Top Part: Title */}
      <div className="flex flex-col text-left mb-16">
        {/* Section Tag */}
        <Reveal variant="fade-left" duration={600}>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#00b2d6] uppercase">
            Testimonials
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
              <linearGradient id="testimonials-brand-fade-gradient" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b2d6" />
                <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
              fill="url(#testimonials-brand-fade-gradient)"
            />
          </svg>
        </Reveal>

        {/* Headline */}
        <Reveal variant="clip-up" delay={150} duration={900}>
          <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide max-w-[500px]">
            Hear it from <br />
            our <span className="italic font-medium">explorers.</span>
          </h2>
        </Reveal>
      </div>

      {/* Embla Carousel Container */}
      <Reveal variant="fade-up" delay={200} duration={800}>
        <div className="w-full relative">
          <Carousel setApi={setApi} opts={{ align: "start", loop: false, watchDrag: true }} className="w-full" style={{ touchAction: "pan-y" }}>
            <CarouselContent className="-ml-6">
              
              {testimonials.map((t, index) => (
                <CarouselItem key={index} className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Card className="flex flex-col text-left h-full min-h-[250px] lg:min-h-[310px] bg-white border border-zinc-200/50 p-8 rounded-[24px] shadow-sm hover:shadow-md hover:border-zinc-200/80 ring-0 [--card-spacing:0px] transition-all duration-300">
                    <CardContent className="p-0 flex flex-col h-full flex-1">
                      {/* Large Stylized Cyan Quote Mark */}
                      <span className="font-serif text-[64px] text-[#00b2d6] leading-[1] select-none h-10 -mt-2 block">
                        &ldquo;
                      </span>

                      {/* Testimonial text */}
                      <p className="font-sans text-[15px] sm:text-[16px] text-zinc-700 leading-relaxed font-normal tracking-wide mb-6 flex-1">
                        {t.quote}
                      </p>

                      {/* Subtle Separator */}
                      <Separator className="w-12 h-[1px] bg-zinc-200 mb-6" />

                      {/* Author Meta */}
                      <div className="flex items-center gap-3">
                        <Avatar className="size-11 border border-zinc-200 bg-zinc-100 shadow-inner">
                          <AvatarImage
                            src={t.image}
                            alt={t.author}
                            className="object-cover pointer-events-none select-none"
                          />
                          <AvatarFallback>{t.author.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                          <span className="font-sans text-[13px] sm:text-[14px] font-semibold text-zinc-900 leading-tight">
                            {t.author}
                          </span>
                          <span className="font-sans text-[11px] text-zinc-400 mt-0.5">
                            {t.location}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}

            </CarouselContent>
          </Carousel>

          {/* Carousel Controls (Mobile: Dots only; Desktop: Floating White Capsule Wrapper) */}
          <div className="flex items-center justify-center mt-16">
            {/* Mobile version (dots only) */}
            <div className="flex sm:hidden items-center justify-center gap-2.5">
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

            {/* Desktop version (Floating White Capsule Wrapper with arrows + dots) */}
            <div className="hidden sm:flex items-center h-[46px] px-[5px] gap-4 bg-white rounded-full shadow-sm border border-zinc-200/50 select-none">
              {/* Prev Button */}
              <Button
                onClick={() => api?.scrollPrev()}
                disabled={!api?.canScrollPrev()}
                className="relative overflow-hidden size-9 rounded-full bg-[#00b2d6] text-white flex items-center justify-center hover:bg-zinc-950 transition-all duration-300 disabled:opacity-40 disabled:hover:bg-[#00b2d6] cursor-pointer group/prev p-0 border-none"
                aria-label="Previous slide"
              >
                {/* Arrow 1: Slides out to the left */}
                <ArrowLeft className="size-4 stroke-[2.5] transition-all duration-500 ease-in-out transform group-hover/prev:-translate-x-6 group-hover/prev:opacity-0" />
                {/* Arrow 2: Slides in from the right */}
                <ArrowLeft className="absolute size-4 stroke-[2.5] translate-x-6 opacity-0 transition-all duration-500 ease-in-out transform group-hover/prev:translate-x-0 group-hover/prev:opacity-100" />
              </Button>

              {/* Pagination Indicators */}
              <div className="flex items-center gap-2.5">
                {Array.from({ length: count }).map((_, idx) => (
                  <Button
                    key={idx}
                    onClick={() => api?.scrollTo(idx)}
                    className={cn(
                      "size-2 rounded-full transition-all duration-300 cursor-pointer p-0 h-2 bg-zinc-200 border-none min-w-0 min-h-0",
                      current === idx ? "bg-[#00b2d6] w-2" : "bg-zinc-200"
                    )}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <Button
                onClick={() => api?.scrollNext()}
                disabled={!api?.canScrollNext()}
                className="relative overflow-hidden size-9 rounded-full bg-[#00b2d6] text-white flex items-center justify-center hover:bg-zinc-950 transition-all duration-300 disabled:opacity-40 disabled:hover:bg-[#00b2d6] cursor-pointer group/next p-0 border-none"
                aria-label="Next slide"
              >
                {/* Arrow 1: Slides out to the right */}
                <ArrowRight className="size-4 stroke-[2.5] transition-all duration-500 ease-in-out transform group-hover/next:translate-x-6 group-hover/next:opacity-0" />
                {/* Arrow 2: Slides in from the left */}
                <ArrowRight className="absolute size-4 stroke-[2.5] -translate-x-6 opacity-0 transition-all duration-500 ease-in-out transform group-hover/next:translate-x-0 group-hover/next:opacity-100" />
              </Button>
            </div>
          </div>

        </div>
      </Reveal>

    </Section>
  );
}
