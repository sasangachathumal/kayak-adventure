"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ─── Animation Timeline Constants ────────────────────────────────────────────
const PHASE = {
  LOGO_ENTER:    0,      // Logo scales in immediately
  WORD_ENTER:    350,    // Wordmark starts revealing
  SHIMMER_START: 800,    // Shimmer sweep across logo
  EXIT_START:    1600,   // Begin exit sequence
  DESTROY:       2600,   // Unmount from DOM
} as const;

export default function Preloader() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"enter" | "idle" | "exit" | "done">("enter");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isNavTransition, setIsNavTransition] = useState(false);

  useEffect(() => {
    let navTransition = false;
    if (typeof window !== "undefined") {
      if ((window as any).__hasLoadedFirstTime) {
        navTransition = true;
        setIsNavTransition(true);
      } else {
        (window as any).__hasLoadedFirstTime = true;
      }
    }

    document.body.style.overflow = "hidden";

    const exitStart = navTransition ? 850 : PHASE.EXIT_START;
    const destroy = navTransition ? 1600 : PHASE.DESTROY;

    // Phase: idle
    const idleTimer = setTimeout(() => setPhase("idle"), navTransition ? 200 : PHASE.WORD_ENTER + 500);

    // Phase: exit
    const exitTimer = setTimeout(() => {
      setPhase("exit");
      document.body.style.overflow = "";
      if (typeof window !== "undefined") {
        (window as any).__preloaderDone = true;
        window.dispatchEvent(new Event("preloaderFinished"));
      }
    }, exitStart);

    // Phase: done
    const destroyTimer = setTimeout(() => setPhase("done"), destroy);

    return () => {
      clearTimeout(idleTimer);
      clearTimeout(exitTimer);
      clearTimeout(destroyTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // Subtle parallax tilt tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (phase === "exit" || phase === "done") return;
    const cx = (e.clientX / window.innerWidth - 0.5) * 2;
    const cy = (e.clientY / window.innerHeight - 0.5) * 2;
    setTilt({ x: cx * 8, y: cy * 6 });
  }, [phase]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  if (phase === "done") return null;

  const isExit = phase === "exit";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="fixed inset-0 z-50 flex items-center justify-center select-none overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* Background Curtain */}
      <div
        className="absolute inset-0 bg-[#f0efeb]"
        style={{
          transform: isExit ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />

      {/* Decorative Ambient Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00b2d6 0%, transparent 70%)",
          animation: "ambientPulse 3s ease-in-out infinite",
        }}
      />

      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: isExit
            ? "translateY(-60px) scale(0.92)"
            : `translate3d(${tilt.x}px, ${tilt.y}px, 0) rotateX(${-tilt.y * 0.5}deg) rotateY(${tilt.x * 0.5}deg)`,
          opacity: isExit ? 0 : 1,
          transition: isExit
            ? "transform 0.7s cubic-bezier(0.55, 0, 1, 0.45), opacity 0.5s ease"
            : "transform 0.12s ease-out",
        }}
      >

        {isNavTransition ? (
          <div className="flex flex-col items-center select-none text-center">
            <span className="font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-brand uppercase mb-3 animate-pulse">
              Exploring
            </span>
            <span className="font-serif text-[32px] sm:text-[40px] text-zinc-900 font-medium tracking-wide">
              {(() => {
                const name = pathname === "/" ? "Home" : pathname.replace(/^\/|\/$/g, "");
                return name.charAt(0).toUpperCase() + name.slice(1);
              })()}
              <span className="italic font-medium">.</span>
            </span>
          </div>
        ) : (
          <>
            {/* Logo Emblem */}
            <div className="relative size-[72px] sm:size-[88px] mb-6 preloader-logo">
              {/* Shimmer Sweep Overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-full z-10 pointer-events-none">
                <div className="preloader-shimmer" />
              </div>
              <Image
                src="/logo-with-no-text.svg"
                alt="Kayak Adventure Emblem"
                fill
                sizes="88px"
                priority
                className="object-contain"
              />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col items-center overflow-hidden">
              {/* KAYAK Title — Clip reveal from bottom */}
              <div className="overflow-hidden">
                <span className="block font-logo text-[38px] sm:text-[44px] text-zinc-900 tracking-normal uppercase preloader-title">
                  KAYAK
                </span>
              </div>

              {/* ADVENTURE Subtitle — Tracking expansion */}
              <div className="overflow-hidden -mt-0.5">
                <span className="block font-sans text-[9px] sm:text-[10px] font-bold text-zinc-900 uppercase preloader-subtitle">
                  ADVENTURE
                </span>
              </div>
            </div>
          </>
        )}
      </div>


      {/* ── Embedded Keyframe Animations ───────────────────────────────────── */}
      <style>{`
        /* Logo Entrance: Scale + Rotate from below */
        .preloader-logo {
          animation: logoEnter 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${PHASE.LOGO_ENTER}ms both;
        }
        @keyframes logoEnter {
          from {
            opacity: 0;
            transform: scale(0.6) translateY(24px) rotate(-12deg);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0) rotate(0deg);
          }
        }

        /* Title: Clip-reveal slide up */
        .preloader-title {
          animation: titleReveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${PHASE.WORD_ENTER}ms both;
        }
        @keyframes titleReveal {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Subtitle: Letter-spacing expansion from tight → wide */
        .preloader-subtitle {
          animation: subtitleExpand 1s cubic-bezier(0.16, 1, 0.3, 1) ${PHASE.WORD_ENTER + 120}ms both;
        }
        @keyframes subtitleExpand {
          from {
            opacity: 0;
            letter-spacing: 0.05em;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            letter-spacing: 0.45em;
            transform: translateY(0);
          }
        }

        /* Brand line: Width expansion from center */
        .preloader-line {
          width: 0;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #00b2d6, transparent);
          animation: lineExpand 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${PHASE.SHIMMER_START}ms both;
        }
        @keyframes lineExpand {
          from { width: 0; opacity: 0; }
          to { width: 80px; opacity: 1; }
        }

        /* Shimmer Sweep across logo */
        .preloader-shimmer {
          position: absolute;
          top: -20%;
          left: -100%;
          width: 60%;
          height: 140%;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.6) 50%,
            transparent 70%
          );
          animation: shimmerSweep 0.7s cubic-bezier(0.25, 1, 0.5, 1) ${PHASE.SHIMMER_START}ms both;
        }
        @keyframes shimmerSweep {
          from { left: -60%; }
          to { left: 160%; }
        }

        /* Ambient background glow pulse */
        @keyframes ambientPulse {
          0%, 100% { transform: scale(1); opacity: 0.05; }
          50% { transform: scale(1.15); opacity: 0.09; }
        }
      `}</style>
    </div>
  );
}
