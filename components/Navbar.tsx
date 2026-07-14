"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// Font Awesome WhatsApp Brand SVG Icon
const WhatsAppIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
  </svg>
);

// Font Awesome Facebook Brand SVG Icon
const FacebookIcon = ({ className = "size-5" }: { className?: string }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
  </svg>
);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "#", active: true },
    { label: "Gallery", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <>
      {/* Main Desktop Header */}
      <header className="flex items-center justify-between py-6 md:py-8">
        
        {/* Logo */}
        <Link href="/" className="flex flex-col select-none group">
          <span className="font-logo text-[34px] leading-none tracking-normal text-zinc-900 group-hover:text-zinc-950 transition-colors">
            KAYAK
          </span>
          <span className="font-sans text-[10px] font-bold tracking-[0.45em] text-zinc-800 leading-none mt-1 group-hover:text-zinc-950 transition-colors">
            ADVENTURE
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative font-sans text-[14px] font-medium tracking-wide text-zinc-800 hover:text-zinc-950 transition-colors py-2 group"
            >
              {item.label}
              {item.active ? (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#38d1eb] rounded-full" />
              ) : (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#38d1eb] rounded-full transition-all duration-300 group-hover:w-4" />
              )}
            </Link>
          ))}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {/* Social Contact Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="https://wa.me/94761122261"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-10 rounded-full bg-white text-[#00b2d6] hover:bg-zinc-950 hover:text-white hover:scale-105 active:scale-95 transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:shadow-black/5"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="size-5" />
            </Link>

            <Link
              href="https://www.facebook.com/share/15Tf7YNeJC/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-10 rounded-full bg-white text-[#00b2d6] hover:bg-zinc-950 hover:text-white hover:scale-105 active:scale-95 transition-all duration-500 ease-in-out shadow-md hover:shadow-lg hover:shadow-black/5"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-5" />
            </Link>
          </div>

          <Link href="#featuredSection">
            <Button variant="cta" size="cta">
              Explore More
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-zinc-900 hover:text-black focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Full Screen Mobile Navigation Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-8 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header Area inside Mobile Overlay */}
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="flex flex-col select-none">
              <span className="font-logo text-3xl leading-none text-zinc-900">
                KAYAK
              </span>
              <span className="font-sans text-[8px] font-bold tracking-[0.4em] text-zinc-700 leading-none mt-1">
                ADVENTURE
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-zinc-600 hover:text-zinc-950 focus:outline-none"
              aria-label="Close Menu"
            >
              <svg
                className="size-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Centered Large Navigation Links */}
          <nav className="flex flex-col items-center justify-center gap-8 my-auto text-center">
            {navigationItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-sans text-2xl sm:text-3xl font-medium tracking-wide transition-all duration-300 flex items-center gap-1 group ${
                  item.active
                    ? "text-[#00b2d6]"
                    : "text-zinc-800 hover:text-[#00b2d6] hover:scale-105"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions Container */}
          <div className="flex flex-col items-center gap-6 mt-auto pb-4 w-full animate-in fade-in slide-in-from-bottom-5 duration-500 delay-200">
            <Link href="#featuredSection" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="cta" size="cta">
                Explore More
              </Button>
            </Link>

            {/* Social Contact Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Link
                href="https://wa.me/94761122261"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center size-12 rounded-full bg-white text-[#00b2d6] hover:bg-zinc-950 hover:text-white active:scale-95 transition-all duration-500 ease-in-out shadow-md border border-zinc-100"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="size-6" />
              </Link>

              <Link
                href="https://www.facebook.com/share/15Tf7YNeJC/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center size-12 rounded-full bg-white text-[#00b2d6] hover:bg-zinc-950 hover:text-white active:scale-95 transition-all duration-500 ease-in-out shadow-md border border-zinc-100"
                aria-label="Facebook"
              >
                <FacebookIcon className="size-6" />
              </Link>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
