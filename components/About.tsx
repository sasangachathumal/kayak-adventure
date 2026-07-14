"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "./Section";

export default function About() {
  return (
    <Section
      id="about"
      className="min-h-screen flex flex-col justify-center bg-[#f0efeb] py-20"
      containerClassName="flex flex-col flex-1 justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col text-left order-2 lg:order-1">
          {/* Section Tag */}
          <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#00b2d6] uppercase">
            About Us
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
              <linearGradient id="about-brand-fade-gradient" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b2d6" />
                <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
              fill="url(#about-brand-fade-gradient)"
            />
          </svg>

          {/* Headline */}
          <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide mb-6">
            Made for <br />
            the <span className="italic font-medium">explorers.</span>
          </h2>

          {/* Description Paragraph */}
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-zinc-600 leading-[1.75] mb-8 font-medium tracking-wide max-w-125">
            Kayak Adventure was born from a love for nature and the thrill of exploration. We create meaningful kayaking experiences that let you escape the ordinary and connect with the wild beauty that surrounds us.
          </p>

          {/* Key Highlights */}
          <div className="hidden sm:grid grid-cols-2 gap-6 mb-8 pt-6 border-t border-zinc-100">
            <div>
              <span className="block font-sans text-[11px] font-bold text-brand tracking-[0.15em] uppercase mb-2">
                LAGOON ECOSYSTEM
              </span>
              <p className="font-sans text-[13.5px] text-zinc-500 leading-relaxed font-normal">
                Navigate the quiet waters and winding mangrove tunnels of Rathgama Lake.
              </p>
            </div>
            <div>
              <span className="block font-sans text-[11px] font-bold text-brand tracking-[0.15em] uppercase mb-2">
                LOCAL GUIDANCE
              </span>
              <p className="font-sans text-[13.5px] text-zinc-500 leading-relaxed font-normal">
                Safely explore hidden channels led by our experienced local guides.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex select-none">
            <Link href="#contact">
              <Button variant="cta" size="cta">
                Read More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Showcase Image */}
        <div className="w-full relative aspect-4/3 sm:aspect-[1.2/1] rounded-[30px] sm:rounded-[40px] overflow-hidden shadow-md order-1 lg:order-2">
          <Image
            src="/about-image.png"
            alt="Kayaking through tropical mangrove forest lagoon"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="object-cover pointer-events-none select-none"
          />
        </div>

      </div>
    </Section>
  );
}
