"use client";

import Section from "../shared/Section";
import Reveal from "../shared/Reveal";
import { Leaf, ShieldCheck, Heart, Users } from "lucide-react";

// ─── Core values data ─────────────────────────────────────────────────────────
const values = [
  {
    icon: Leaf,
    title: "Ecological Mindfulness",
    description:
      "Every tour we run is designed around a simple rule: leave the lagoon exactly as we found it. We limit group sizes, avoid disturbing wildlife habitats, and actively contribute to mangrove restoration efforts.",
    accent: "#00b2d6",
  },
  {
    icon: ShieldCheck,
    title: "Safety Above All",
    description:
      "Our guides are First Aid certified and Lifeguard trained. All guests are equipped with industry-standard life jackets and receive a full safety briefing before every excursion — no exceptions.",
    accent: "#00b2d6",
  },
  {
    icon: Heart,
    title: "Genuine Hospitality",
    description:
      "We want you to feel like a guest of the lagoon, not just a tourist. Our team shares local stories, connects you with the culture, and ensures every interaction feels warm and personal.",
    accent: "#00b2d6",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Kayak Adventure is proudly local. We employ from the surrounding communities, source supplies locally, and reinvest a portion of every booking into coastal conservation programmes.",
    accent: "#00b2d6",
  },
];

export default function AboutValues() {
  return (
    <Section
      id="our-values"
      className="bg-white pt-20 pb-16 sm:pt-28 sm:pb-24"
      containerClassName="flex flex-col gap-14 sm:gap-16"
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex flex-col text-left max-w-2xl">
        {/* Section Tag */}
        <Reveal variant="fade-left" duration={600}>
          <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-brand uppercase">
            Our Values
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
              <linearGradient id="values-brand-fade" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00b2d6" />
                <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
              fill="url(#values-brand-fade)"
            />
          </svg>
        </Reveal>

        {/* Headline */}
        <Reveal variant="clip-up" delay={150} duration={900}>
          <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide">
            What we <br />
            <span className="italic font-medium">stand for.</span>
          </h2>
        </Reveal>

        <Reveal variant="blur-in" delay={250} duration={800}>
          <p className="mt-6 font-sans text-[14.5px] sm:text-[15px] text-zinc-500 leading-[1.75] font-normal tracking-wide">
            Four principles guide everything we do — from how we design a route
            to how we greet guests on the dock.
          </p>
        </Reveal>
      </div>

      {/* ── Value Cards Grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {values.map(({ icon: Icon, title, description }, idx) => (
          <Reveal key={title} variant="scale-up" delay={idx * 80} duration={700}>
            <div className="group flex flex-col gap-5 bg-[#f0efeb] border border-zinc-200/50 rounded-[24px] p-7 sm:p-8 hover:border-zinc-300/70 hover:shadow-md transition-all duration-300 h-full">
              {/* Icon badge */}
              <div className="flex items-center justify-center size-12 rounded-2xl bg-white border border-zinc-200/60 shadow-sm text-brand shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Icon className="size-5" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2.5">
                <h3 className="font-serif text-[19px] sm:text-[21px] text-zinc-900 font-medium leading-snug tracking-wide">
                  {title}
                </h3>
                <p className="font-sans text-[14px] sm:text-[14.5px] text-zinc-500 leading-[1.75] tracking-wide">
                  {description}
                </p>
              </div>

              {/* Accent bottom line */}
              <div className="mt-auto pt-4">
                <div className="w-8 h-[2px] rounded-full bg-brand/30 group-hover:bg-brand group-hover:w-12 transition-all duration-400" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
