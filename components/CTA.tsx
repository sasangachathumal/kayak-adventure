"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "./Section";

export default function CTA() {
  return (
    <Section
      id="contact"
      className="relative min-h-120 lg:min-h-140 flex flex-col justify-center items-center py-20 text-center text-white"
      containerClassName="flex flex-col justify-center items-center flex-1"
      background={
        <div className="absolute inset-0 z-0 w-full h-full select-none pointer-events-none">
          <Image
            src="/cta-bg.png"
            alt="Calm Sri Lankan lagoon water surface"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          {/* Subtle dark overlay to ensure readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      }
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Section Tag */}
        <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-brand uppercase">
          Let&apos;s Connect
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
            <linearGradient id="cta-brand-fade-gradient" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00b2d6" />
              <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
            fill="url(#cta-brand-fade-gradient)"
          />
        </svg>

        {/* Headline */}
        <h2 className="font-serif text-[42px] sm:text-5xl md:text-[64px] text-white font-medium leading-[1.1] tracking-wide mb-10 max-w-162.5">
          Ready for your <br />
          next <span className="italic font-medium">adventure?</span>
        </h2>

        {/* CTA Button using brand styles */}
        <div className="flex select-none">
          <Link href="https://wa.me/94761122261" target="_blank" rel="noopener noreferrer">
            <Button variant="cta" size="cta">
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
