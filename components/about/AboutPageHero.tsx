"use client";

import Image from "next/image";
import Section from "../shared/Section";
import Reveal from "../shared/Reveal";

export default function AboutPageHero() {
  return (
    <Section
      className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-end bg-zinc-900"
      containerClassName="flex flex-col justify-end pb-16 sm:pb-20 lg:pb-24"
      background={
        <>
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/about-image.png"
              alt="Kayakers gliding through Rathgama Lagoon at dawn"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center pointer-events-none select-none"
              quality={90}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
          </div>
        </>
      }
    >
      {/* Content sits at the bottom of the hero */}
      <div className="relative z-10 max-w-2xl pt-36 lg:pt-44">
        {/* Section Tag */}
        <Reveal variant="fade-left" duration={600}>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-white uppercase">
            About Us
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
              <linearGradient id="about-page-hero-brand-fade" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b2d6" />
                <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
              fill="url(#about-page-hero-brand-fade)"
            />
          </svg>
        </Reveal>

        {/* Headline */}
        <Reveal variant="clip-up" delay={150} duration={900}>
          <h1 className="font-serif text-[40px] sm:text-5xl md:text-[64px] text-white font-medium leading-[1.1] tracking-wide mb-6">
            Inspired by the{" "}
            <span className="italic font-medium">wild.</span>
          </h1>
        </Reveal>

        {/* Description */}
        <Reveal variant="blur-in" delay={350} duration={800}>
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-white/80 leading-[1.75] font-medium tracking-wide max-w-md">
            <span className="block md:hidden">
              Our story, our values, and the people behind every paddle.
            </span>
            <span className="hidden md:inline">
              Discover the story, values, and people behind Kayak Adventure, Sri Lanka&apos;s most trusted guided kayaking experience.
            </span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
