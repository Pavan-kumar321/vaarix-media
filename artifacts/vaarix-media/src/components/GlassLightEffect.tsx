/**
 * GlassLightEffect
 * ─────────────────────────────────────────────────────────────────────────────
 * Soft, slow-moving frosted-glass light reflections rendered behind the hero.
 *
 * Key decisions:
 *  • NO mix-blend-mode: screen — screen on a light background makes white
 *    gradients mathematically invisible (result always = 1). Normal compositing
 *    lets the white gradients show as actual soft light over the image.
 *  • Orbs always render statically — reduced-motion only suppresses animation.
 *  • pointer-events: none — never touches clicks or scroll.
 *  • z-[1] — above the bg image (z-0), below all content (z-10).
 *  • transform-only GSAP tweens — compositor thread, 60 fps.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─── Component ────────────────────────────────────────────────────────────────

export function GlassLightEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref      = useRef<HTMLDivElement>(null);
  const orb2Ref      = useRef<HTMLDivElement>(null);
  const orb3Ref      = useRef<HTMLDivElement>(null);
  const sweepRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Orbs always render. Only the animation respects reduced-motion.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // ── Orb 1 — large primary, top-left ───────────────────────────
      gsap.to(orb1Ref.current, {
        x: "22%",
        y: "14%",
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ── Orb 2 — secondary, right side, counter-rhythm ─────────────
      gsap.to(orb2Ref.current, {
        x: "-18%",
        y: "22%",
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 4,
      });

      // ── Orb 3 — small accent, lower-center ────────────────────────
      gsap.to(orb3Ref.current, {
        x: "14%",
        y: "-10%",
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 8,
      });

      // ── Diagonal sweep — crosses full width, random interval ───────
      const container = containerRef.current;
      const sweep     = sweepRef.current;

      if (container && sweep) {
        const runSweep = () => {
          const cw = container.offsetWidth;
          const sw = sweep.offsetWidth;

          gsap.fromTo(
            sweep,
            { x: -sw - 40 },
            {
              x: cw + 40,
              duration: 18,
              ease: "power1.inOut",
              onComplete: () => {
                const pause = 10 + Math.random() * 4;
                gsap.delayedCall(pause, runSweep);
              },
            },
          );
        };

        // First sweep after hero entrance has settled.
        gsap.delayedCall(5, runSweep);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Shared base styles — no mix-blend-mode so white shows over any background.
  const base: React.CSSProperties = {
    position: "absolute",
    willChange: "transform",
    pointerEvents: "none",
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none"
    >
      {/* ── Orb 1 — large, top-left, primary light source ──────────── */}
      <div
        ref={orb1Ref}
        style={{
          ...base,
          top: "-20%",
          left: "-10%",
          width: "70%",
          height: "72%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.12) 40%, transparent 70%)",
          filter: "blur(52px)",
        }}
      />

      {/* ── Orb 2 — secondary, right side ──────────────────────────── */}
      <div
        ref={orb2Ref}
        style={{
          ...base,
          top: "15%",
          right: "-18%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 60% 45%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 50%, transparent 72%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Orb 3 — small accent, lower-center ─────────────────────── */}
      <div
        ref={orb3Ref}
        style={{
          ...base,
          bottom: "6%",
          left: "22%",
          width: "42%",
          height: "44%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 55%, transparent 78%)",
          filter: "blur(44px)",
        }}
      />

      {/* ── Diagonal sweep ─────────────────────────────────────────── */}
      {/* Starts off-screen left; GSAP translates it to off-screen right */}
      <div
        ref={sweepRef}
        style={{
          ...base,
          top: "-5%",
          left: 0,
          width: "26%",
          height: "110%",
          background:
            "linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.06) 70%, transparent 100%)",
          filter: "blur(24px)",
          transform: "skewX(-8deg) translateX(-120%)",
        }}
      />
    </div>
  );
}
