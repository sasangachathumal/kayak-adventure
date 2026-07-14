"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import Section from "./Section";

// WhatsApp Brand SVG Icon
const WhatsAppIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

// Facebook Brand SVG Icon
const FacebookIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Section
      as="footer"
      id="footer"
      className="bg-[#f0efeb] text-zinc-600 pt-20 pb-12 md:pt-28 md:pb-16 border-t border-zinc-200/80 select-none"
    >
      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 pb-20 md:pb-24">

        {/* Logo & Description column */}
        <div className="col-span-12 md:col-span-7 flex flex-col items-start text-left">
          <Link href="/" className="flex items-center gap-3.5 group mb-8 self-start">
            <div className="relative w-11 h-11 flex-shrink-0">
              <Image
                src="/logo-with-no-text.svg"
                alt="Kayak Adventure Logo Icon"
                fill
                sizes="44px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center -space-y-0.5 text-left">
              <span className="font-logo text-[28px] leading-none tracking-normal text-zinc-900 group-hover:text-zinc-950 transition-colors">
                KAYAK
              </span>
              <span className="font-sans text-[9px] font-bold tracking-[0.43em] text-zinc-600 leading-none group-hover:text-zinc-950 transition-colors mt-0.5">
                ADVENTURE
              </span>
            </div>
          </Link>

          <p className="font-sans text-[14px] leading-relaxed text-zinc-600 max-w-sm mb-6 text-left">
            Experience guided kayaking tours through<br className="md:hidden" />
            Sri Lanka&apos;s serene Rathgama lagoon and<br className="md:hidden" />
            hidden mangrove paths. Reconnect with nature<br className="md:hidden" />
            at its purest.
          </p>

          {/* Address Row */}
          <div className="flex items-start gap-2.5 text-zinc-600 text-[14px] mb-10 md:mb-0">
            <MapPin className="size-4 text-brand shrink-0 mt-0.5" />
            <span className="wrap-break-word">Kayak Adventure Rathgama Lake,<br className="md:hidden" />Katudampa Road,<br className="hidden md:block" />Rathgama,<br className="md:hidden" />Southern Province, Sri Lanka.</span>
          </div>
        </div>

        {/* Contact Details Column */}
        <div className="col-span-12 md:col-span-5 flex flex-col items-start text-left">
          <span className="font-sans text-[10px] font-bold tracking-[0.35em] text-brand uppercase mb-8">
            Contact Us
          </span>
          <ul className="space-y-5 font-sans text-[14px] w-full flex flex-col items-start mb-10">
            <li className="flex flex-row items-center gap-3 text-zinc-600">
              <Phone className="size-5 text-brand shrink-0" />
              <Link href="tel:+94761122261" className="hover:text-brand transition-colors">
                +94 76 112 2261
              </Link>
            </li>
            <li className="flex flex-row items-center gap-3 text-zinc-600">
              <Mail className="size-5 text-brand shrink-0" />
              <Link href="mailto:hello@kayakadventure.lk" className="hover:text-brand transition-colors break-all">
                hello@kayakadventure.lk
              </Link>
            </li>
          </ul>

          {/* Social Contact Buttons (Combined Pill) */}
          <div className="flex items-center h-[46px] px-[5px] gap-1.5 bg-white rounded-full border border-zinc-200/50 shadow-sm">
            <Link
              href="https://wa.me/94761122261"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-[36px] rounded-full text-zinc-500 hover:bg-brand hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="size-5" />
            </Link>

            <div className="w-[1px] h-[20px] bg-zinc-100" />

            <Link
              href="https://www.facebook.com/profile.php?id=61565539648872&rdid=rmGEVPBEUmBlSJyv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15Tf7YNeJC%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-[36px] rounded-full text-zinc-500 hover:bg-brand hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="h-px w-full bg-zinc-200/80 mb-10 md:mb-12" />

      {/* Bottom copyright area */}
      <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 text-xs font-sans text-zinc-500 text-center md:text-left">
        <span>
          &copy; {currentYear} Kayak Adventure. All rights reserved.
        </span>
        <div>
          Designed & Developed by{" "}
          <Link
            href="https://www.rusiru-salwathura.me"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand transition-colors font-medium underline underline-offset-2 decoration-zinc-300 hover:decoration-brand"
          >
            code by rusiru.
          </Link>
        </div>
      </div>

    </Section>
  );
}
