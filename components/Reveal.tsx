"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

// ─── Animation Variant Types ─────────────────────────────────────────────────
type RevealVariant =
  | "fade-up"       // Fade in + slide up (classic text reveal)
  | "fade-down"     // Fade in + slide down
  | "fade-left"     // Fade in + slide from left
  | "fade-right"    // Fade in + slide from right
  | "clip-up"       // Masked reveal from bottom (overflow:hidden + translateY — cross-browser)
  | "clip-left"     // Masked reveal from left (overflow:hidden + translateX — cross-browser)
  | "scale-up"      // Scale from 0.92 + fade
  | "blur-in"       // Blur-in + fade (cinematic)
  | "slide-up"      // Pure translate-up (no fade, for masked text)
  | "stagger";      // For parent containers that stagger children

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  /** Delay in milliseconds */
  delay?: number;
  /** Duration in milliseconds */
  duration?: number;
  /** IntersectionObserver threshold (0-1) */
  threshold?: number;
  /** Additional className */
  className?: string;
  /** Render as a specific HTML element */
  as?: keyof React.JSX.IntrinsicElements;
  /** Only animate once */
  once?: boolean;
  /** Stagger delay for children (ms) — used with variant="stagger" */
  staggerDelay?: number;
}

// ─── Transform Maps (used for non-clip variants) ──────────────────────────────
const getHiddenStyles = (variant: RevealVariant): CSSProperties => {
  switch (variant) {
    case "fade-up":
      return { opacity: 0, transform: "translateY(48px)" };
    case "fade-down":
      return { opacity: 0, transform: "translateY(-48px)" };
    case "fade-left":
      return { opacity: 0, transform: "translateX(-48px)" };
    case "fade-right":
      return { opacity: 0, transform: "translateX(48px)" };
    case "scale-up":
      return { opacity: 0, transform: "scale(0.92) translateY(24px)" };
    case "blur-in":
      return { opacity: 0, filter: "blur(12px)", transform: "translateY(16px)" };
    case "slide-up":
      return { transform: "translateY(100%)" };
    case "stagger":
      return { opacity: 1 };
    default:
      return { opacity: 0, transform: "translateY(48px)" };
  }
};

const getVisibleStyles = (variant: RevealVariant): CSSProperties => {
  switch (variant) {
    case "fade-up":
    case "fade-down":
    case "fade-left":
    case "fade-right":
      return { opacity: 1, transform: "translate(0)" };
    case "scale-up":
      return { opacity: 1, transform: "scale(1) translateY(0)" };
    case "blur-in":
      return { opacity: 1, filter: "blur(0px)", transform: "translateY(0)" };
    case "slide-up":
      return { transform: "translateY(0)" };
    case "stagger":
      return { opacity: 1 };
    default:
      return { opacity: 1, transform: "translate(0)" };
  }
};

const getEasing = (variant: RevealVariant): string => {
  switch (variant) {
    case "clip-up":
    case "clip-left":
      return "cubic-bezier(0.16, 1, 0.3, 1)";
    case "blur-in":
      return "cubic-bezier(0.25, 1, 0.5, 1)";
    case "scale-up":
      return "cubic-bezier(0.16, 1, 0.3, 1)";
    default:
      return "cubic-bezier(0.25, 1, 0.5, 1)";
  }
};

// ─── Reveal Component ────────────────────────────────────────────────────────
export default function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 800,
  threshold = 0.15,
  className = "",
  as: Tag = "div",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  // Sync preloader state — with a safety timeout fallback.
  // If preloaderFinished never fires (page refresh, direct URL, race condition)
  // we force-reveal after 3.5s so nothing stays permanently hidden.
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ((window as any).__preloaderDone) {
      setPreloaderDone(true);
      return;
    }

    const handleFinished = () => {
      setPreloaderDone(true);
      clearTimeout(fallback);
    };

    const fallback = setTimeout(() => setPreloaderDone(true), 3500);

    window.addEventListener("preloaderFinished", handleFinished);
    return () => {
      window.removeEventListener("preloaderFinished", handleFinished);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!preloaderDone) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -10px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, preloaderDone]);

  // ── clip-up / clip-left: two-element mask technique ────────────────────────
  // Using overflow:hidden on the outer wrapper + translateY/X on the inner
  // content is the industry-standard cross-browser approach (works in Chrome,
  // Safari, Firefox). clip-path: inset() had negative-value issues in Chrome
  // and edge-clipping issues in Safari.
  if (variant === "clip-up") {
    const innerStyle: CSSProperties = {
      transform: isVisible ? "translateY(0%)" : "translateY(105%)",
      transition: `transform ${duration}ms ${getEasing(variant)} ${delay}ms`,
      willChange: "transform",
    };
    return (
      // @ts-expect-error — dynamic tag name
      // overflowY:"clip" masks vertically without affecting overflowX,
      // so whitespace-nowrap text can extend beyond the container width.
      <Tag ref={ref} className={className} style={{ overflowX: "visible", overflowY: "clip" }}>
        <div style={innerStyle}>{children}</div>
      </Tag>
    );
  }

  if (variant === "clip-left") {
    const innerStyle: CSSProperties = {
      transform: isVisible ? "translateX(0%)" : "translateX(-105%)",
      transition: `transform ${duration}ms ${getEasing(variant)} ${delay}ms`,
      willChange: "transform",
    };
    return (
      // @ts-expect-error — dynamic tag name
      // overflowX:"clip" masks horizontally without affecting overflowY
      <Tag ref={ref} className={className} style={{ overflowX: "clip", overflowY: "visible" }}>
        <div style={innerStyle}>{children}</div>
      </Tag>
    );
  }

  // ── All other variants: single-element opacity/transform ───────────────────
  const style: CSSProperties = {
    ...(isVisible ? getVisibleStyles(variant) : getHiddenStyles(variant)),
    transition: `all ${duration}ms ${getEasing(variant)} ${delay}ms`,
    willChange: "transform, opacity, filter",
  };

  return (
    // @ts-expect-error — dynamic tag name
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
