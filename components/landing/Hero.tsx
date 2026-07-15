"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "../shared/Section";
import Reveal from "../shared/Reveal";

export default function Hero() {
  return (
    <Section
      className="min-h-screen flex flex-col justify-between bg-sky-50"
      containerClassName="flex flex-col flex-1"
      background={
        <>
          {/* Background Images with Next.js Optimization */}
          {/* Mobile background */}
          <div className="absolute inset-0 z-0 md:hidden">
            <Image
              src="/mobile-herobg1.png"
              alt="Kayak adventure mobile background"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 0px"
              className="object-cover object-bottom pointer-events-none select-none"
              quality={90}
            />
            {/* Subtle overlay for better mobile text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/45 via-white/15 to-transparent" />
          </div>

          {/* Desktop background */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <Image
              src="/herobg1.png"
              alt="Kayak adventure desktop background"
              fill
              priority
              sizes="(min-width: 768px) 100vw, 0px"
              className="object-cover object-[center_35%] pointer-events-none select-none"
              quality={100}
            />
            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-white/10" />
          </div>
        </>
      }
    >
      {/* Hero Main Body Content — pt accounts for the fixed navbar height */}
      <div className="flex-1 flex flex-col justify-start pt-37 sm:pt-36 lg:pt-50 pb-20">
        <div className="max-w-2xl text-left flex flex-col">
          
          {/* Title */}
          <h1 className="flex flex-col text-left">
            <Reveal variant="clip-up" duration={900}>
              <span className="block font-serif text-[38px] min-[375px]:text-[44px] min-[425px]:text-[52px] sm:text-7xl md:text-[96px] text-[#121212] font-medium leading-[1.05] sm:leading-[1.02] md:leading-[0.96] tracking-wide">
                Nature.
              </span>
            </Reveal>
            <Reveal variant="clip-up" delay={120} duration={900}>
              <span className="block font-serif text-[38px] min-[375px]:text-[44px] min-[425px]:text-[52px] sm:text-7xl md:text-[96px] text-[#121212] font-medium leading-[1.05] sm:leading-[1.02] md:leading-[0.96] tracking-wide whitespace-nowrap">
                Your <span className="italic font-medium">Adventure.</span>
              </span>
            </Reveal>
          </h1>

          {/* Decorative Tapered Brand Line */}
          <Reveal variant="fade-left" delay={300} duration={700}>
            <svg
              width="72"
              height="4"
              viewBox="0 0 72 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-8 mb-6"
            >
              <defs>
                <linearGradient id="brand-fade-gradient" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00b2d6" />
                  <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
                fill="url(#brand-fade-gradient)"
              />
            </svg>
          </Reveal>

          {/* Description Copy */}
          <Reveal variant="blur-in" delay={400} duration={900}>
            <p 
              className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-zinc-950 md:text-zinc-800 max-w-xs sm:max-w-sm md:max-w-[430px] leading-[1.65] mb-8 font-semibold md:font-medium tracking-wide"
              style={{ textShadow: "0 1px 2px rgba(255, 255, 255, 0.7)" }}
            >
              <span className="block md:hidden">
                Find places only<br />the water can reach.
              </span>
              <span className="hidden md:inline">
                Paddle through serene waterways, discover hidden gems, and create unforgettable memories.
              </span>
            </p>
          </Reveal>

          {/* CTA Button using shadcn Button */}
          <Reveal variant="fade-up" delay={550} duration={700}>
            <div className="flex select-none">
              <Link href="#featuredSection">
                <Button variant="cta" size="cta">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  );
}
