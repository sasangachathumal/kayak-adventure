"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Section from "./Section";
import { LifeBuoy, GlassWater, Lock, Car, Users, Droplet, Backpack, Camera, HeartPulse, Wifi, Award, ShieldCheck, Compass, Leaf } from "lucide-react";

export default function About() {
  return (
    <Section
      id="about"
      className="bg-[#f0efeb] py-24 sm:py-32"
      containerClassName="flex flex-col gap-10 sm:gap-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side: Content */}
        <div className="flex flex-col text-left">
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

          {/* Description Paragraphs */}
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-zinc-600 leading-[1.8] mb-6 font-medium tracking-wide max-w-xl">
            Kayak Adventure was born from a love for nature and the thrill of exploration. We create meaningful kayaking experiences that let you escape the ordinary and connect with the wild beauty that surrounds us.
          </p>

          <p className="font-sans text-[14.5px] sm:text-[15px] text-zinc-500 leading-[1.75] mb-8 font-normal tracking-wide max-w-xl">
            Nestled by the quiet waters of Rathgama Lagoon in Hikkaduwa, Sri Lanka, our guided excursions balance safety, local storytelling, and ecological mindfulness. We guide you through untouched mangrove tunnels, showcasing Sri Lanka's rich coastal biodiversity.
          </p>

          {/* CTA Button */}
          <div className="flex select-none">
            <Link href="#contact">
              <Button variant="cta" size="cta">
                Read More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Trust & Showcase Grid */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-lg lg:max-w-none mx-auto">
          {/* Card 1: Showcase Image (1:1 aspect ratio card) */}
          <div className="relative aspect-square rounded-[24px] overflow-hidden border border-zinc-200/40 shadow-sm hover:shadow-md transition-all duration-300 bg-white flex items-center justify-center">
            <Image
              src="/about-image.png"
              alt="Kayaking through tropical mangrove forest lagoon"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              priority
              className="object-cover pointer-events-none select-none opacity-40"
            />
            
            {/* Center Logo Overlay */}
            <div className="relative z-10 size-16 sm:size-20 drop-shadow-md select-none pointer-events-none transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo-with-no-text.svg"
                alt="Brand Logo Emblem"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Card 2: SLIC Insurance */}
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
              <span className="font-sans text-[13px] sm:text-[18px] font-bold text-zinc-900 leading-tight">
                Insured Tours
              </span>
              <span className="font-sans text-[9.5px] sm:text-[12.5px] text-zinc-500 leading-tight max-w-[110px] sm:max-w-[160px]">
                Full coverage under SLIC policy
              </span>
            </div>
          </div>

          {/* Card 3: Eco Conscious */}
          <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2 sm:gap-4">
            <div className="flex items-center justify-center size-10 sm:size-16 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Leaf className="size-5 sm:size-8" />
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
              <span className="font-sans text-[13px] sm:text-[18px] font-bold text-zinc-900 leading-tight">
                Eco Conscious
              </span>
              <span className="font-sans text-[9.5px] sm:text-[12.5px] text-zinc-500 leading-tight max-w-[110px] sm:max-w-[160px]">
                100% sustainable tours protecting our lagoons
              </span>
            </div>
          </div>

          {/* Card 4: Certified Safety */}
          <div className="flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-sm p-4 sm:p-6 rounded-[24px] border border-zinc-200/50 shadow-sm hover:shadow-md hover:border-zinc-200 hover:bg-white transition-all duration-300 aspect-square gap-2 sm:gap-4">
            <div className="flex items-center justify-center size-10 sm:size-16 rounded-xl sm:rounded-2xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <ShieldCheck className="size-5 sm:size-8" />
            </div>
            <div className="flex flex-col items-center gap-0.5 sm:gap-1.5">
              <span className="font-sans text-[13px] sm:text-[18px] font-bold text-zinc-900 leading-tight">
                Safety Certified
              </span>
              <span className="font-sans text-[9.5px] sm:text-[12.5px] text-zinc-500 leading-tight max-w-[110px] sm:max-w-[160px]">
                First Aid & Lifeguard Trained
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Amenities Grid */}
      <div className="pt-8 border-t border-zinc-200">
        <span className="block text-zinc-500 text-sm font-semibold tracking-wide mb-8 text-left">
          Amenities & Conveniences Included:
        </span>

        <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 justify-items-center">
          {/* Amenity 1 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Life Jackets">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <LifeBuoy className="size-4.5 sm:size-5 animate-spin-slow" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Life Jackets
            </span>
          </div>

          {/* Amenity 2 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Expert Guides">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Users className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Expert Guides
            </span>
          </div>

          {/* Amenity 3 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Secure Lockers">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Lock className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Secure Lockers
            </span>
          </div>

          {/* Amenity 4 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Free Parking">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Car className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Free Parking
            </span>
          </div>

          {/* Amenity 5 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Rinse Showers">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Droplet className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Rinse Showers
            </span>
          </div>

          {/* Amenity 6 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Bottled Water">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <GlassWater className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Bottled Water
            </span>
          </div>

          {/* Amenity 7 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Dry Bags">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Backpack className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Dry Bags
            </span>
          </div>

          {/* Amenity 8 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Tour Photos">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Camera className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Tour Photos
            </span>
          </div>

          {/* Amenity 9 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="First Aid Kit">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <HeartPulse className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              First Aid Kit
            </span>
          </div>

          {/* Amenity 10 */}
          <div className="flex items-center justify-center sm:justify-start gap-0 sm:gap-3.5 bg-white/50 backdrop-blur-sm p-1.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border border-zinc-200/50 hover:border-zinc-300 hover:bg-white hover:shadow-sm transition-all duration-300 aspect-square sm:aspect-auto w-full max-w-[48px] sm:max-w-none" title="Base Wi-Fi">
            <div className="flex items-center justify-center size-[32px] sm:size-[40px] rounded-lg sm:rounded-xl bg-white border border-zinc-200/60 shadow-sm text-[#00b2d6] shrink-0">
              <Wifi className="size-4.5 sm:size-5" />
            </div>
            <span className="hidden sm:block font-sans text-[13.5px] font-bold text-zinc-800 tracking-wide truncate">
              Base Wi-Fi
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
