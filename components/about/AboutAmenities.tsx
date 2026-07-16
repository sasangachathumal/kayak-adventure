"use client";

import Section from "../shared/Section";
import Reveal from "../shared/Reveal";
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
  description: string;
  spin?: boolean;
}

// ─── Expanded amenity list with short descriptions ────────────────────────────
const amenities: Amenity[] = [
  {
    icon: LifeBuoy,
    label: "Life Jackets",
    description: "CE-certified jackets in all sizes — provided for every paddler, every tour.",
    spin: true,
  },
  {
    icon: Users,
    label: "Expert Guides",
    description: "Trained, First Aid-certified local guides lead every excursion from front to back.",
  },
  {
    icon: ShieldCheck,
    label: "Safety Certified",
    description: "All guides hold Lifeguard certificates and follow a strict safety protocol.",
  },
  {
    icon: Leaf,
    label: "Eco Conscious",
    description: "100% leave-no-trace tours. We protect the lagoon we paddle through.",
  },
  {
    icon: Lock,
    label: "Secure Lockers",
    description: "Leave your valuables safely behind in our on-site storage lockers.",
  },
  {
    icon: Car,
    label: "Free Parking",
    description: "Ample, complimentary parking available at our Rathgama base.",
  },
  {
    icon: Droplet,
    label: "Rinse Showers",
    description: "Fresh-water rinse showers available after every tour on-site.",
  },
  {
    icon: GlassWater,
    label: "Bottled Water",
    description: "Chilled, complimentary bottled water provided for all guests.",
  },
  {
    icon: Backpack,
    label: "Dry Bags",
    description: "Keep your belongings and electronics dry with our provided dry bags.",
  },
  {
    icon: Camera,
    label: "Tour Photos",
    description: "Our guides capture moments throughout the tour — shareable memories, no extra cost.",
  },
  {
    icon: HeartPulse,
    label: "First Aid Kit",
    description: "A comprehensive first aid kit is carried on every single tour, always.",
  },
  {
    icon: Wifi,
    label: "Base Wi-Fi",
    description: "Stay connected between tours with free Wi-Fi at our Rathgama base.",
  },
];

export default function AboutAmenities() {
  return (
    <Section
      id="amenities"
      className="bg-[#f0efeb] pt-20 pb-16 sm:pt-28 sm:pb-24"
      containerClassName="flex flex-col gap-14 sm:gap-16"
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col text-left max-w-2xl">
        {/* Section Tag */}
        <Reveal variant="fade-left" duration={600}>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-brand uppercase">
            Included
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
              <linearGradient id="amenities-brand-fade" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b2d6" />
                <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
              fill="url(#amenities-brand-fade)"
            />
          </svg>
        </Reveal>

        {/* Headline */}
        <Reveal variant="clip-up" delay={150} duration={900}>
          <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide">
            Everything you need,{" "}
            <br className="hidden sm:block" />
            <span className="italic font-medium">included.</span>
          </h2>
        </Reveal>

        <Reveal variant="blur-in" delay={250} duration={800}>
          <p className="mt-6 font-sans text-[14.5px] sm:text-[15px] text-zinc-500 leading-[1.75] font-normal tracking-wide">
            We take care of every detail so you can focus on the experience.
            All amenities are provided at no extra cost on every tour.
          </p>
        </Reveal>
      </div>

      {/* ── Amenity Cards Grid ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {amenities.map(({ icon: Icon, label, description, spin }, idx) => (
          <Reveal key={label} variant="fade-up" delay={idx * 50} duration={650}>
            <div className="group flex items-start gap-4 bg-white/60 backdrop-blur-sm border border-zinc-200/50 rounded-[20px] p-5 sm:p-6 hover:border-zinc-200 hover:bg-white hover:shadow-md transition-all duration-300">
              {/* Icon */}
              <div className="flex items-center justify-center size-10 rounded-xl bg-white border border-zinc-200/60 shadow-sm text-brand shrink-0 mt-0.5 group-hover:scale-105 transition-transform duration-300">
                <Icon
                  className={`size-[18px]${spin ? " animate-spin-slow" : ""}`}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-sans text-[13.5px] sm:text-[14px] font-bold text-zinc-800 tracking-wide leading-tight">
                  {label}
                </span>
                <span className="font-sans text-[12.5px] sm:text-[13px] text-zinc-500 leading-[1.65] tracking-wide">
                  {description}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
