import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WhatsAppIcon, FacebookIcon } from "./NavbarIcons";

interface NavbarOverlayProps {
  isVisible: boolean;
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
  handleClose: () => void;
  navigationItems: Array<{ label: string; href: string; index: number }>;
}

export default function NavbarOverlay({
  isVisible,
  isOpen,
  isOpening,
  isClosing,
  handleClose,
  navigationItems,
}: NavbarOverlayProps) {
  const pathname = usePathname();

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-30 bg-white flex flex-col p-8 md:p-16 md:py-12 menu-overlay-clip ${isOpen ? "open" : ""}`}
      style={{
        transition: isOpening
          ? "none"                                                   // no transition on mount
          : "clip-path 0.75s cubic-bezier(0.77, 0, 0.175, 1)",      // same curve open & close
      }}
    >
      {/* Spacer to balance layout */}
      <div className="flex items-center justify-between w-full pt-1 mb-auto">
        <div className="w-32" />
      </div>

      {/* Centered Navigation Links */}
      <nav className="flex flex-col items-start md:items-center justify-center gap-2 flex-1 w-full">
        {navigationItems.map((item) => {
          const openDelay  = 0.25 + item.index * 0.08;
          const closeDelay = 0.05 + item.index * 0.05;
          const isActive   = item.href === "/" ? pathname === "/" : pathname === item.href;

          return (
            <div
              key={item.label}
              className="overflow-hidden w-full flex justify-start md:justify-center"
              style={{ paddingBottom: "2px" }}
            >
              <Link
                href={item.href}
                onClick={handleClose}
                className={`relative inline-block font-serif text-[52px] sm:text-[64px] font-medium leading-[1.0] tracking-tight transition-colors duration-300 group text-left md:text-center cursor-pointer pb-2 sm:pb-3
                  ${isActive ? "text-[#00b2d6]" : "text-zinc-900 hover:text-[#00b2d6]"}`}
                style={{
                  display: "inline-block",
                  animation: isClosing
                    ? `navLinkOut 0.35s cubic-bezier(0.55, 0, 1, 0.45) ${closeDelay}s both`
                    : `navLinkIn 0.65s cubic-bezier(0.23, 1, 0.32, 1) ${openDelay}s both`,
                }}
              >
                <span className="inline-block">{item.label}</span>
                {/* Animated underline */}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#00b2d6] transition-all duration-400 group-hover:w-full
                  ${isActive ? "w-full" : "w-0"}`} />
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Bottom Meta Row */}
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
            href="https://wa.me/94761122261?text=Hello!"
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
            href="https://www.facebook.com/profile.php?id=61565539648872&rdid=rmGEVPBEUmBlSJyv&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F15Tf7YNeJC%2F"
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
  );
}
