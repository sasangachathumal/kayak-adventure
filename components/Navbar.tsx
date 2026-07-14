"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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

// Menu state type — 4 states for proper CSS transition on mount
type MenuState = "closed" | "opening" | "open" | "closing";

const navigationItems = [
  { label: "Home",     href: "#",           index: 0 },
  { label: "Gallery",  href: "#gallery",    index: 1 },
  { label: "About Us", href: "#about",      index: 2 },
  { label: "Contact",  href: "#contact",   index: 3 },
];

export default function Navbar() {
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // ─── Scroll hide/show and background tracking logic ───────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        // Scrolled background trigger
        if (currentScrollY > 20) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }

        if (currentScrollY < 80) {
          setNavVisible(true);
        } else if (delta > 4) {
          setNavVisible(false);
          // auto-close menu if user scrolls while it was open
          if (menuState === "open") handleClose();
        } else if (delta < -4) {
          setNavVisible(true);
        }

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuState]);

  // ─── Open / Close handlers ────────────────────────────────────────────────
  const handleOpen = () => {
    // Step 1: mount overlay at circle(0%) — the "opening" state
    setMenuState("opening");
    document.body.style.overflow = "hidden";
    // Step 2: on next double-rAF, trigger transition to circle(150%)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMenuState("open");
      });
    });
  };

  const handleClose = () => {
    setMenuState("closing");
    document.body.style.overflow = "";
    setTimeout(() => setMenuState("closed"), 750);
  };

  const isOpening = menuState === "opening";
  const isOpen    = menuState === "open";
  const isClosing = menuState === "closing";
  const isVisible = isOpening || isOpen || isClosing;

  return (
    <>
      {/* ── Keyframe animations injected as a style tag ── */}
      <style>{`
        @keyframes navLinkIn {
          from { opacity: 0; transform: translateY(48px) skewY(4deg); }
          to   { opacity: 1; transform: translateY(0)    skewY(0deg); }
        }
        @keyframes navLinkOut {
          from { opacity: 1; transform: translateY(0)     skewY(0deg); }
          to   { opacity: 0; transform: translateY(-48px) skewY(-4deg); }
        }
        @keyframes navMetaIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes navMetaOut {
          from { opacity: 1; transform: translateY(0); }
          to   { opacity: 0; transform: translateY(-16px); }
        }
        .menu-overlay-clip {
          clip-path: circle(0% at calc(100% - 52px) 52px);
        }
        .menu-overlay-clip.open {
          clip-path: circle(150% at calc(100% - 52px) 52px);
        }
        @media (min-width: 768px) {
          .menu-overlay-clip {
            clip-path: circle(0% at calc(100% - 84px) 44px);
          }
          .menu-overlay-clip.open {
            clip-path: circle(150% at calc(100% - 84px) 44px);
          }
        }
      `}</style>

      {/* ── Fixed Navbar ─────────────────────────────────────────────────── */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-40
          flex items-center justify-between
          px-8 md:px-16 transition-all duration-300 ease-in-out
          ${navVisible ? "translate-y-0" : "-translate-y-full"}
          ${scrolled ? "bg-white/80 backdrop-blur-md border-zinc-200/40 shadow-sm py-4" : "py-5 md:py-6"}
        `}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3.5 select-none group relative z-50">
          <div className="relative w-12 h-12 flex-shrink-0">
            <Image src="/kayak-logo.svg" alt="Kayak Adventure Logo Icon" fill sizes="48px" className="object-contain" />
          </div>
          <div className="flex flex-col justify-center -space-y-0.5">
            <span className="font-logo text-[32px] leading-none tracking-normal text-zinc-900 transition-colors duration-300">
              KAYAK
            </span>
            <span className="font-sans text-[9px] font-bold tracking-[0.43em] leading-none text-zinc-800 transition-colors duration-300 mt-0.5">
              ADVENTURE
            </span>
          </div>
        </Link>

        {/* Action button & menu toggle grouped on the right */}
        <div className="flex items-center gap-5 md:gap-6">
          <button
            onClick={isOpen || isOpening ? handleClose : handleOpen}
            className="relative z-50 flex items-center justify-center size-[46px] rounded-full bg-[#00b2d6] hover:bg-[#0099b8] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none group cursor-pointer shadow-md"
            aria-label={isOpen || isOpening ? "Close Menu" : "Open Menu"}
          >
            <span className={`absolute block w-[20px] h-[2px] rounded-full bg-white transition-all duration-300 ease-in-out origin-center
              ${isOpen || isOpening ? "rotate-45 translate-y-0" : "-translate-y-[4px]"}`}
            />
            <span className={`absolute block w-[20px] h-[2px] rounded-full bg-white transition-all duration-300 ease-in-out origin-center
              ${isOpen || isOpening ? "-rotate-45 translate-y-0" : "translate-y-[4px]"}`}
            />
          </button>
        </div>
      </header>

      {/* ── Full Screen Menu Overlay (clip-path card reveal) ─────────────── */}
      {isVisible && (
        <div
          className={`fixed inset-0 z-30 bg-white flex flex-col p-8 md:p-16 md:py-12 menu-overlay-clip ${isOpen ? "open" : ""}`}
          style={{
            transition: isOpening
              ? "none"                                                   // no transition on mount
              : "clip-path 0.75s cubic-bezier(0.77, 0, 0.175, 1)",      // same curve open & close
          }}
        >
          {/* ── Top Row: Logo placeholder (real logo is in the fixed header above) ── */}
          <div className="flex items-center justify-between w-full pt-1 mb-auto">
            {/* Spacer to balance layout */}
            <div className="w-32" />
          </div>

          {/* ── Centered Navigation Links ─────────────────────────────── */}
          <nav className="flex flex-col items-start md:items-center justify-center gap-2 flex-1 w-full">
            {navigationItems.map((item) => {
              const openDelay  = 0.25 + item.index * 0.08;
              const closeDelay = 0.05 + item.index * 0.05; // same order as open
              return (
                <div
                  key={item.label}
                  className="overflow-hidden w-full flex justify-start md:justify-center"
                  style={{ paddingBottom: "2px" }}
                >
                  <Link
                    href={item.href}
                    onClick={handleClose}
                    className="block font-serif text-[52px] sm:text-[64px] font-medium text-zinc-900 leading-[1.0] tracking-tight
                      hover:text-[#00b2d6] transition-colors duration-300 group text-left md:text-center cursor-pointer"
                    style={{
                      display: "block",
                      animation: isClosing
                        ? `navLinkOut 0.35s cubic-bezier(0.55, 0, 1, 0.45) ${closeDelay}s both`
                        : `navLinkIn 0.65s cubic-bezier(0.23, 1, 0.32, 1) ${openDelay}s both`,
                    }}
                  >
                    <span className="inline-block">{item.label}</span>
                    {/* Animated underline */}
                    <span className="block h-[2px] w-0 bg-[#00b2d6] transition-all duration-400 group-hover:w-full" />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* ── Bottom Meta Row ──────────────────────────────────────────── */}
          <div
            className="flex items-center justify-center pt-8 border-t border-zinc-200 mt-8"
            style={{
              animation: isClosing
                ? "navMetaOut 0.3s ease forwards"
                : "navMetaIn 0.6s cubic-bezier(0.23, 1, 0.32, 1) 0.55s both",
            }}
          >
            {/* Social Pill */}
            <div className="flex items-center h-[42px] px-[5px] gap-1.5 bg-white rounded-full border border-zinc-100 shadow-sm">
              <Link
                href="https://wa.me/94761122261"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="inline-flex items-center justify-center size-[34px] rounded-full text-zinc-500 hover:bg-[#00b2d6] hover:text-white active:scale-95 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="size-4" />
              </Link>
              <div className="w-[1px] h-[18px] bg-zinc-200" />
              <Link
                href="https://www.facebook.com/share/15Tf7YNeJC/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="inline-flex items-center justify-center size-[34px] rounded-full text-zinc-500 hover:bg-[#00b2d6] hover:text-white active:scale-95 transition-all duration-300"
                aria-label="Facebook"
              >
                <FacebookIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
