"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Section from "../shared/Section";
import Reveal from "../shared/Reveal";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Do I need any previous kayaking experience?",
    answer: "No experience is necessary! Our tours are designed to be beginner-friendly. Our professional guides provide a full safety briefing and basic paddling instructions on the shore before we launch into the water.",
  },
  {
    question: "What should I wear and bring with me?",
    answer: "We recommend light, quick-dry clothing, swimwear or shorts, and water sandals. Don't forget sunscreen, a hat, sunglasses, and a waterproof camera or phone pouch. We provide safety life jackets and dry bags for your belongings.",
  },
  {
    question: "Is there an age limit for the mangrove kayak tours?",
    answer: "Our tours are suitable for participants aged 6 and up. Children must be accompanied by an adult. For safety reasons, every participant must wear a properly fitted life jacket (provided by us) while on the water.",
  },
  {
    question: "How long does the tour typically last?",
    answer: "Our standard Rathgama mangrove kayaking tour takes about 2.5 to 3 hours. This runs at a relaxed, leisurely pace, allowing plenty of time to explore narrow mangrove canals, spot wildlife, and take pictures.",
  },
  {
    question: "What happens in case of bad weather?",
    answer: "A light tropical drizzle won't stop the tour—in fact, paddling under the rain can be a magical experience in the mangroves! However, in the event of heavy downpours, high winds, or lightning, we will postpone or reschedule the tour for your safety.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="pt-2 md:pt-6 pb-24 bg-[#f0efeb]">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading and Info */}
        <div className="lg:col-span-5 mb-12 lg:mb-0">
          {/* Section Tag */}
          <Reveal variant="fade-left" duration={600}>
            <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#00b2d6] uppercase">
              FAQ
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
                <linearGradient id="faq-brand-gradient" x1="0" y1="0" x2="72" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00b2d6" />
                  <stop offset="60%" stopColor="#00b2d6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00b2d6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 0.5 C 20 0.5, 50 1.2, 72 2 C 50 2.8, 20 3.5, 0 3.5 Z"
                fill="url(#faq-brand-gradient)"
              />
            </svg>
          </Reveal>

          {/* Headline */}
          <Reveal variant="clip-up" delay={150} duration={900}>
            <h2 className="font-serif text-[40px] sm:text-5xl md:text-[54px] text-zinc-900 font-medium leading-[1.1] tracking-wide mb-6">
              Frequently <br />
              asked <span className="italic font-medium">questions.</span>
            </h2>
          </Reveal>

          {/* Subtitle Description */}
          <Reveal variant="blur-in" delay={300} duration={800}>
            <p className="font-sans text-[15px] sm:text-[16px] text-zinc-600 leading-[1.75] font-medium tracking-wide max-w-sm">
              Have questions about our Rathgama mangrove tours? We have compiled list of answers to help you prepare for your journey.
            </p>
          </Reveal>
        </div>

        {/* Right Column: Accordions */}
        <div className="lg:col-span-7 space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <Reveal 
                key={idx}
                variant="fade-up" 
                delay={idx * 80} 
                duration={700}
                className={cn(idx >= 3 && "hidden md:block")}
              >
                <div 
                  className={cn(
                    "border-b border-zinc-200/80 transition-all duration-300 pb-2",
                    isOpen && "border-b border-[#00b2d6]/30"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(idx)}
                    className="w-full flex items-center justify-between text-left py-4 focus:outline-none group select-none animate-none h-auto bg-transparent hover:bg-transparent border-none shadow-none p-0 cursor-pointer"
                  >
                    <span 
                      className={cn(
                        "font-sans text-[16px] sm:text-[18px] font-semibold tracking-wide text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900",
                        isOpen && "text-[#00b2d6]"
                      )}
                    >
                      {item.question}
                    </span>
                    <span 
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition-all duration-300 group-hover:bg-zinc-200 group-hover:text-zinc-700",
                        isOpen && "bg-[#00b2d6]/10 text-[#00b2d6] rotate-180"
                      )}
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </button>

                  <div 
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-2 pb-2" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="font-sans text-[14px] sm:text-[15px] text-zinc-600 leading-[1.7] max-w-xl">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </Section>
  );
}
