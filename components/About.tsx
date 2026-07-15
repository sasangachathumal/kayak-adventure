"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "./Section";
import Reveal from "./Reveal";
import {
  LifeBuoy,
  GlassWater,
  Lock,
  Car,
  Users,
  Droplet,
  Backpack,
  Camera,
  HeartPulse,
  Wifi,
  ShieldCheck,
  Leaf,
  LucideIcon,
} from "lucide-react";

interface Amenity {
  icon: LucideIcon;
  label: string;
  spin?: boolean;
}

/** Data-driven amenity list — keeps the JSX clean */
const amenities: Amenity[] = [
  { icon: LifeBuoy, label: "Life Jackets", spin: true },
  { icon: Users, label: "Expert Guides" },
  { icon: Lock, label: "Secure Lockers" },
  { icon: Car, label: "Free Parking" },
  { icon: Droplet, label: "Rinse Showers" },
  { icon: GlassWater, label: "Bottled Water" },
  { icon: Backpack, label: "Dry Bags" },
  { icon: Camera, label: "Tour Photos" },
  { icon: HeartPulse, label: "First Aid Kit" },
  { icon: Wifi, label: "Base Wi-Fi" },
];

export default function About() {
  return (
    <Section
      id="about"
      className="bg-[#f0efeb] pt-24 pb-12 sm:pt-32 sm:pb-16"
      containerClassName="flex flex-col gap-10 sm:gap-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Content */}
        <div className="flex flex-col text-left">
          {/* Section Tag */}
          <Reveal variant="fade-left" duration={600}>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-brand uppercase">
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
          </Reveal>

          {/* Headline */}
          <Reveal variant="clip-up" delay={150} duration={900}>
            <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide mb-6">
              Made for <br />
              the <span className="italic font-medium">explorers.</span>
            </h2>
          </Reveal>

          {/* Description Paragraphs */}
          <Reveal variant="blur-in" delay={250} duration={800}>
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-zinc-600 leading-[1.8] mb-6 font-medium tracking-wide max-w-xl">
              Kayak Adventure was born from a love for nature and the thrill of exploration. We create meaningful kayaking experiences that let you escape the ordinary and connect with the wild beauty that surrounds us.
            </p>
          </Reveal>

          <Reveal variant="blur-in" delay={350} duration={800}>
            <p className="font-sans text-[14.5px] sm:text-[15px] text-zinc-500 leading-[1.75] mb-8 font-normal tracking-wide max-w-xl">
              Nestled by the quiet waters of Rathgama Lagoon in Hikkaduwa, Sri Lanka, our guided excursions balance safety, local storytelling, and ecological mindfulness. We guide you through untouched mangrove tunnels, showcasing Sri Lanka&apos;s rich coastal biodiversity.
            </p>
          </Reveal>

          {/* CTA Button */}
          <Reveal variant="fade-up" delay={450} duration={700}>
            <div className="flex select-none">
              <Link href="#contact">
                <Button variant="cta" size="cta">
                  Read More
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Trust & Showcase Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg lg:max-w-none mx-auto">
          {/* Card 1: Brand Logo Card (1:1 aspect ratio card) */}
          <Reveal variant="scale-up" delay={100} duration={700}>
            <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square">
              <div className="relative size-24 sm:size-32 select-none pointer-events-none transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo-with-no-text.svg"
                  alt="Brand Logo Emblem"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>

          {/* Card 2: SLIC Insurance */}
          <Reveal variant="scale-up" delay={200} duration={700}>
            <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2 sm:gap-4">
              <div className="relative w-16 h-10 sm:w-32 sm:h-20 shrink-0">
                <Image
                  src="/slic-general.png"
                  alt="Sri Lanka Insurance Corporation Trust Logo"
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                <span className="font-serif text-[15px] sm:text-[20px] font-semibold text-zinc-900 leading-snug tracking-wide">
                  Insured Tours
                </span>
                <span className="font-sans text-[10.5px] sm:text-[13px] text-zinc-500 leading-normal tracking-wide max-w-[110px] sm:max-w-[160px]">
                  Full coverage under SLIC policy
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Eco Conscious */}
          <Reveal variant="scale-up" delay={300} duration={700}>
            <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2 sm:gap-4">
              <div className="flex items-center justify-center size-10 sm:size-16 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
                <Leaf className="size-5 sm:size-8" />
              </div>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                <span className="font-serif text-[15px] sm:text-[20px] font-semibold text-zinc-900 leading-snug tracking-wide">
                  Eco Conscious
                </span>
                <span className="font-sans text-[10.5px] sm:text-[13px] text-zinc-500 leading-normal tracking-wide max-w-[110px] sm:max-w-[160px]">
                  100% sustainable tours protecting our lagoons
                </span>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Certified Safety */}
          <Reveal variant="scale-up" delay={400} duration={700}>
            <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2 sm:gap-4">
              <div className="flex items-center justify-center size-10 sm:size-16 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
                <ShieldCheck className="size-5 sm:size-8" />
              </div>
              <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
                <span className="font-serif text-[15px] sm:text-[20px] font-semibold text-zinc-900 leading-snug tracking-wide">
                  Safety Certified
                </span>
                <span className="font-sans text-[10.5px] sm:text-[13px] text-zinc-500 leading-normal tracking-wide max-w-[110px] sm:max-w-[160px]">
                  First Aid & Lifeguard Trained
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Amenities — presented as a natural continuation of the About story */}
      <Reveal variant="fade-up" delay={100} duration={800}>
        <div className="flex flex-col gap-6">
          {/* Contextual sub-heading that ties to the About narrative */}
          <div className="flex items-center gap-4">
            <h3 className="font-serif text-[22px] sm:text-[26px] text-zinc-800 font-medium tracking-wide whitespace-nowrap">
              Everything you need, <span className="italic">included.</span>
            </h3>
            {/* Fading decorative line extending to the right */}
            <div className="flex-1 h-px bg-gradient-to-r from-zinc-300/80 to-transparent" />
          </div>

          {/* Mobile: horizontal scroll strip of compact pills  |  sm+: card grid */}
          <div className="flex overflow-x-auto gap-2.5 pb-1 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-4 sm:overflow-visible sm:pb-0">
            {amenities.map(({ icon: Icon, label, spin }) => (
              <div
                key={label}
                className={[
                  // Mobile: compact horizontal pill
                  "flex items-center gap-2.5 shrink-0 snap-start",
                  "bg-white/50 backdrop-blur-sm px-3.5 py-2.5 rounded-full",
                  "border border-zinc-200/50",
                  "hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300",
                  // sm+: switch to taller card style
                  "sm:gap-3.5 sm:px-5 sm:py-4 sm:rounded-2xl sm:shrink sm:snap-align-none",
                  "sm:justify-start sm:w-full",
                ].join(" ")}
                title={label}
              >
                <div className="flex items-center justify-center size-7 sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
                  <Icon
                    className={`size-3.5 sm:size-5${spin ? " animate-spin-slow" : ""}`}
                  />
                </div>
                <span className="font-sans text-[12px] sm:text-[13.5px] font-bold text-zinc-800 tracking-wide whitespace-nowrap">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
