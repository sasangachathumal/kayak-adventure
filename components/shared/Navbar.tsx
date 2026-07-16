"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { WhatsAppIcon, FacebookIcon } from "./NavbarIcons";
import NavbarOverlay from "./NavbarOverlay";
import { Button } from "@/components/ui/button";

type MenuState = "closed" | "opening" | "open" | "closing";

const navigationItems = [
  { label: "Home",     href: "/",         index: 0 },
  { label: "Gallery",  href: "/gallery",  index: 1 },
  { label: "About Us", href: "/about",    index: 2 },
  { label: "Contact",  href: "/contact",  index: 3 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const [navVisible, setNavVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // ─── Open / Close handlers ────────────────────────────────────────────────
  const handleOpen = () => {
    setMenuState("opening");
    document.body.style.overflow = "hidden";
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

  // ─── Disable right-click for images globally ─────────────────────────────────
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "IMG" || target.closest("img"))) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

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
  }, [menuState]);

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
          <div className="relative w-12 h-12 shrink-0">
            <Image src="/logo-with-no-text.svg" alt="Kayak Adventure Logo Icon" fill sizes="48px" className="object-contain" />
          </div>
          <div className="flex flex-col justify-center -space-y-0.5">
            <span className={`font-logo text-[32px] leading-none tracking-normal transition-colors duration-300 ${
              (pathname === "/gallery" || pathname === "/about" || pathname === "/contact") && !scrolled && !isOpen && !isOpening ? "text-white" : "text-zinc-900"
            }`}>
              KAYAK
            </span>
            <span className={`font-sans text-[9px] font-bold tracking-[0.43em] leading-none transition-colors duration-300 mt-0.5 ${
              (pathname === "/gallery" || pathname === "/about" || pathname === "/contact") && !scrolled && !isOpen && !isOpening ? "text-white/90" : "text-zinc-800"
            }`}>
              ADVENTURE
            </span>
          </div>
        </Link>

        {/* Action button & menu toggle grouped on the right */}
        <div className="flex items-center gap-5 md:gap-6">
          {/* Desktop-only Social Pill */}
          <div 
            className={`
              hidden md:flex items-center h-11.5 px-1.25 gap-1.5 rounded-full border border-zinc-200/60 bg-white shadow-md select-none transition-all duration-300
              ${isOpen || isOpening ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
            `}
          >
            <Link
              href="https://wa.me/94761122261?text=Hello!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-9 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-brand transition-all duration-300 cursor-pointer"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="size-4" />
            </Link>

            <div className="w-px h-4.5 bg-zinc-200" />

            <Link
              href="https://www.facebook.com/profile.php?id=61565539648872&rdid=rmGEVPBEUmBlSJyv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15Tf7YNeJC%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center size-9 rounded-full text-zinc-600 hover:bg-zinc-100 hover:text-brand transition-all duration-300 cursor-pointer"
              aria-label="Facebook"
            >
              <FacebookIcon className="size-4" />
            </Link>
          </div>

          <Button
            onClick={isOpen || isOpening ? handleClose : handleOpen}
            className="relative z-50 flex items-center justify-center size-11.5 rounded-full bg-brand hover:bg-brand-hover hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none group cursor-pointer shadow-md p-0 border-none min-w-0"
            aria-label={isOpen || isOpening ? "Close Menu" : "Open Menu"}
          >
            <span className={`absolute block w-5 h-0.5 rounded-full bg-white transition-all duration-300 ease-in-out origin-center
              ${isOpen || isOpening ? "rotate-45 translate-y-0" : "-translate-y-1"}`}
            />
            <span className={`absolute block w-5 h-0.5 rounded-full bg-white transition-all duration-300 ease-in-out origin-center
              ${isOpen || isOpening ? "-rotate-45 translate-y-0" : "translate-y-1"}`}
            />
          </Button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <NavbarOverlay
        isVisible={isVisible}
        isOpen={isOpen}
        isOpening={isOpening}
        isClosing={isClosing}
        handleClose={handleClose}
        navigationItems={navigationItems}
      />
    </>
  );
}
