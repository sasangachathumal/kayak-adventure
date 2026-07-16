"use client";

import { useState } from "react";
import Image from "next/image";
import Section from "../shared/Section";
import Reveal from "../shared/Reveal";
import { ShieldCheck, Leaf } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverTrigger,
} from "@/components/ui/popover";

// ─── Timeline milestone data ───────────────────────────────────────────────────
const milestones = [
  {
    year: "2018",
    title: "The first paddle",
    description:
      "Kayak Adventure began with a single kayak and an unshakeable belief that Sri Lanka's waterways deserved to be shared. Our founders paddled Rathgama Lagoon for the first time — and never looked back.",
  },
  {
    year: "2020",
    title: "Growing the fleet",
    description:
      "After two seasons of word-of-mouth growth, we expanded to a full fleet of premium kayaks, adding structured guided routes through the mangrove tunnels and a dedicated safety-first training programme.",
  },
  {
    year: "2022",
    title: "SLIC insurance partnership",
    description:
      "We became one of the first kayak tour operators in Sri Lanka to offer fully insured tours through the Sri Lanka Insurance Corporation — a milestone that cemented our commitment to guest safety.",
  },
  {
    year: "2024",
    title: "Eco-certified tours",
    description:
      "All Kayak Adventure tours are now 100% eco-conscious. We adopted a leave-no-trace ethos, limited group sizes to protect biodiversity, and began active mangrove restoration along Rathgama Lagoon.",
  },
];

export default function AboutStory() {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Section
      id="our-story"
      className="bg-[#f0efeb] pt-24 pb-12 sm:pt-32 sm:pb-16"
      containerClassName="flex flex-col gap-16 sm:gap-20"
    >
      {/* ── Header Row ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        {/* Left: Heading block */}
        <div className="flex flex-col text-left">
          {/* Section Tag */}
          <Reveal variant="fade-left" duration={600}>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-brand uppercase">
              Our Story
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
                <linearGradient id="story-brand-fade" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00b2d6" />
                  <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
                fill="url(#story-brand-fade)"
              />
            </svg>
          </Reveal>

          {/* Headline */}
          <Reveal variant="clip-up" delay={150} duration={900}>
            <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide mb-6">
              Made for <br />
              the <span className="italic font-medium">explorers.</span>
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal variant="blur-in" delay={250} duration={800}>
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-zinc-600 leading-[1.8] mb-6 font-medium tracking-wide max-w-xl">
              Kayak Adventure was born from a love for nature and the thrill of
              exploration. We create meaningful kayaking experiences that let you
              escape the ordinary and connect with the wild beauty that surrounds us.
            </p>
          </Reveal>

          <Reveal variant="blur-in" delay={350} duration={800}>
            <p className="font-sans text-[14.5px] sm:text-[15px] text-zinc-500 leading-[1.75] font-normal tracking-wide max-w-xl">
              Nestled by the quiet waters of Rathgama Lagoon in Hikkaduwa, Sri
              Lanka, our guided excursions balance safety, local storytelling, and
              ecological mindfulness. We guide you through untouched mangrove
              tunnels, showcasing Sri Lanka&apos;s rich coastal biodiversity.
            </p>
          </Reveal>
        </div>

        {/* Right: Trust & Showcase Grid — matches landing About grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg lg:max-w-none mx-auto">

          {/* Card 1: Brand Logo */}
          <Reveal variant="scale-up" delay={100} duration={700}>
            <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2.5 sm:gap-3.5">
              <div className="relative size-16 sm:size-24 select-none pointer-events-none transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-with-no-text.svg"
                  alt="Brand Logo Emblem"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center -space-y-0.5 text-center">
                <span className="font-logo text-[24px] sm:text-[32px] leading-none tracking-normal text-zinc-900">
                  KAYAK
                </span>
                <span className="font-sans text-[7.5px] sm:text-[9.5px] font-bold tracking-[0.43em] text-zinc-600 leading-none mt-1.5 uppercase">
                  ADVENTURE
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 2: SLIC Insurance with Shadcn Popover */}
          <Reveal variant="scale-up" delay={200} duration={700}>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger
                onMouseEnter={() => setPopoverOpen(true)}
                onMouseLeave={() => setPopoverOpen(false)}
                className="relative w-full flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2 sm:gap-4 cursor-help focus:outline-none focus-visible:outline-none focus:ring-0"
              >
                <div className="relative w-20 h-12.5 sm:w-36 sm:h-22.5 shrink-0">
                  <Image
                    src="/slic-general.png"
                    alt="Sri Lanka Insurance Corporation — SLIC"
                    fill
                    sizes="144px"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                  <span className="font-serif text-[17px] sm:text-[22px] font-semibold text-zinc-900 leading-snug tracking-wide">
                    Insured Tours
                  </span>
                  <span className="font-sans text-[11.5px] sm:text-[14.5px] text-zinc-500 leading-normal tracking-wide max-w-[120px] sm:max-w-[180px]">
                    Full coverage under SLIC policy
                  </span>
                </div>
              </PopoverTrigger>

              <PopoverContent
                side="top"
                align="center"
                sideOffset={10}
                className="w-80 sm:w-[420px] p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xl pointer-events-none"
              >
                <PopoverHeader className="flex flex-col gap-1.5 text-left">
                  <PopoverTitle className="font-serif text-[15px] font-bold text-zinc-900 leading-tight">
                    Passenger Liability Insurance
                  </PopoverTitle>
                  <PopoverDescription className="font-sans text-[12px] text-zinc-600 leading-relaxed font-normal">
                    All passengers joining <strong className="font-bold text-zinc-950">Kayak Adventure Rathgama Lake</strong> are protected under a <strong className="font-bold text-zinc-950">Passenger Liability Insurance</strong> policy provided by <strong className="font-bold text-zinc-950">Sri Lanka Insurance Corporation General Ltd.</strong> (Policy No. PL/014/2025/10). This policy offers coverage of up to Rs. 7,200,000, with a limit of Rs. 300,000 per person per event, ensuring the safety and security of every guest throughout the experience.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
          </Reveal>

          {/* Card 3: Eco Conscious */}
          <Reveal variant="scale-up" delay={300} duration={700}>
            <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2.5 sm:gap-5">
              <div className="flex items-center justify-center size-12 sm:size-20 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
                <Leaf className="size-6 sm:size-10" />
              </div>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                <span className="font-serif text-[17px] sm:text-[22px] font-semibold text-zinc-900 leading-snug tracking-wide">
                  Eco Conscious
                </span>
                <span className="font-sans text-[11.5px] sm:text-[14.5px] text-zinc-500 leading-normal tracking-wide max-w-[120px] sm:max-w-[180px]">
                  100% sustainable tours protecting our lagoons
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Safety Certified */}
          <Reveal variant="scale-up" delay={400} duration={700}>
            <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2.5 sm:gap-5">
              <div className="flex items-center justify-center size-12 sm:size-20 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
                <ShieldCheck className="size-6 sm:size-10" />
              </div>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                <span className="font-serif text-[17px] sm:text-[22px] font-semibold text-zinc-900 leading-snug tracking-wide">
                  Safety Certified
                </span>
                <span className="font-sans text-[11.5px] sm:text-[14.5px] text-zinc-500 leading-normal tracking-wide max-w-[120px] sm:max-w-[180px]">
                  First Aid &amp; Lifeguard Trained
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-8">
        {/* Sub-heading */}
        <Reveal variant="fade-up" duration={700}>
          <div className="flex items-center gap-4">
            <h3 className="font-serif text-[22px] sm:text-[26px] text-zinc-800 font-medium tracking-wide whitespace-nowrap">
              A journey through <span className="italic">time.</span>
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-300/80 to-transparent" />
          </div>
        </Reveal>

        {/* Timeline items */}
        <div className="relative">
          {/* Vertical connecting line (desktop) */}
          <div className="hidden lg:block absolute left-[72px] top-4 bottom-4 w-px bg-gradient-to-b from-brand/40 via-zinc-300/60 to-transparent" />

          <div className="flex flex-col gap-0">
            {milestones.map(({ year, title, description }, idx) => (
              <Reveal key={year} variant="fade-up" delay={idx * 80} duration={700}>
                <div className="grid grid-cols-1 lg:grid-cols-[144px_1fr] gap-4 lg:gap-8 py-7 border-b border-zinc-200/60 last:border-b-0 group">
                  {/* Year badge */}
                  <div className="flex items-start lg:justify-center pt-0.5">
                    <span className="font-serif text-[13px] font-semibold tracking-[0.18em] text-brand uppercase bg-brand/8 border border-brand/20 rounded-full px-3.5 py-1 leading-none select-none">
                      {year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-serif text-[19px] sm:text-[22px] text-zinc-900 font-medium leading-snug tracking-wide group-hover:text-brand transition-colors duration-300">
                      {title}
                    </h4>
                    <p className="font-sans text-[14px] sm:text-[15px] text-zinc-500 leading-[1.75] tracking-wide max-w-2xl">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
