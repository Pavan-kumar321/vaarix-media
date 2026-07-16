/**
 * GlassLightEffect
 * ─────────────────────────────────────────────────────────────────────────────
 * Soft frosted-glass light reflections behind the hero.
 *
 * Light mode: warm ivory/cream orbs — sunlight through frosted glass.
 * Dark  mode: cool silver-white highlights — moonlight on dark glass.
 *
 * Rules:
 *  • Normal compositing (no mix-blend-mode) so orbs show on any background.
 *  • pointer-events: none — never intercepts clicks/scroll.
 *  • z-[1] — above bg image (z-0), below all content (z-10).
 *  • GSAP animates transform only — compositor thread, 60 fps.
 *  • prefers-reduced-motion: orbs always render; only animation is suppressed.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/context/ThemeContext";

export function GlassLightEffect() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref      = useRef<HTMLDivElement>(null);
  const orb2Ref      = useRef<HTMLDivElement>(null);
  const orb3Ref      = useRef<HTMLDivElement>(null);
  const sweepRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // ── Orb 1 — large primary, top-left, slow diagonal drift ──────
      gsap.to(orb1Ref.current, {
        x: "20%", y: "13%",
        duration: 19, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // ── Orb 2 — secondary, right side, counter-rhythm ─────────────
      gsap.to(orb2Ref.current, {
        x: "-16%", y: "20%",
        duration: 23, repeat: -1, yoyo: true, ease: "sine.inOut",
        delay: 5,
      });

      // ── Orb 3 — small accent, lower-center ────────────────────────
      gsap.to(orb3Ref.current, {
        x: "12%", y: "-9%",
        duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut",
        delay: 9,
      });

      // ── Diagonal sweep — feathered beam, crosses full width ────────
      // Widths and timing vary naturally; pause between sweeps is random.
      const container = containerRef.current;
      const sweep     = sweepRef.current;

      if (container && sweep) {
        const runSweep = () => {
          const cw = container.offsetWidth;
          const sw = sweep.offsetWidth;
          gsap.fromTo(
            sweep,
            { x: -sw - 60 },
            {
              x: cw + 60,
              duration: 18 + Math.random() * 4,
              ease: "power1.inOut",
              onComplete: () => {
                gsap.delayedCall(12 + Math.random() * 6, runSweep);
              },
            },
          );
        };
        gsap.delayedCall(5, runSweep);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);   // intentionally no [isDark] dep — animation params are theme-agnostic

  // ── Orb colour palettes ─────────────────────────────────────────────────────
  //
  // Light: warm cream-ivory — sunlight through frosted linen.
  //   Peak centres use rgba(255, 248, 220, …) — candlelight cream.
  //   Feathered falloffs hold to rgba(255, 245, 210, …) then transparent.
  //
  // Dark:  cool silver-white — moonlight on dark glass.
  //   More opaque at centre (larger contrast ratio needed on dark bg).

  const orb1bg = isDark
    ? "radial-gradient(ellipse at 38% 38%, rgba(255,255,255,0.13) 0%, rgba(220,230,255,0.06) 45%, transparent 70%)"
    : "radial-gradient(ellipse at 38% 38%, rgba(255,250,224,0.22) 0%, rgba(255,246,208,0.09) 42%, transparent 70%)";

  const orb2bg = isDark
    ? "radial-gradient(ellipse at 62% 44%, rgba(255,255,255,0.10) 0%, rgba(210,225,255,0.04) 52%, transparent 74%)"
    : "radial-gradient(ellipse at 62% 44%, rgba(255,248,218,0.18) 0%, rgba(255,244,200,0.07) 52%, transparent 74%)";

  const orb3bg = isDark
    ? "radial-gradient(ellipse at 50% 54%, rgba(255,255,255,0.08) 0%, rgba(200,215,255,0.03) 58%, transparent 80%)"
    : "radial-gradient(ellipse at 50% 54%, rgba(255,247,215,0.16) 0%, rgba(255,242,198,0.05) 58%, transparent 80%)";

  // Sweep: slightly off-axis linear gradient — feathered on both edges.
  // Light beam is warm (cream); dark beam is silver-cool.
  const sweepBg = isDark
    ? "linear-gradient(109deg, transparent 0%, rgba(255,255,255,0.03) 28%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.03) 72%, transparent 100%)"
    : "linear-gradient(109deg, transparent 0%, rgba(255,248,220,0.04) 25%, rgba(255,246,210,0.10) 48%, rgba(255,248,220,0.05) 72%, transparent 100%)";

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
      {/* ── Orb 1 — large, top-left, primary warm glow ─────────────── */}
      <div
        ref={orb1Ref}
        style={{
          ...base,
          top: "-22%", left: "-12%",
          width: "72%", height: "74%",
          borderRadius: "50%",
          background: orb1bg,
          filter: "blur(54px)",
        }}
      />

      {/* ── Orb 2 — wide secondary, right side ─────────────────────── */}
      <div
        ref={orb2Ref}
        style={{
          ...base,
          top: "14%", right: "-20%",
          width: "62%", height: "62%",
          borderRadius: "50%",
          background: orb2bg,
          filter: "blur(62px)",
        }}
      />

      {/* ── Orb 3 — small accent, lower-center ─────────────────────── */}
      <div
        ref={orb3Ref}
        style={{
          ...base,
          bottom: "5%", left: "20%",
          width: "44%", height: "46%",
          borderRadius: "50%",
          background: orb3bg,
          filter: "blur(46px)",
        }}
      />

      {/* ── Diagonal sweep — feathered, skewed beam ─────────────────── */}
      {/* Starts off-screen left; GSAP translates to off-screen right. */}
      {/* Width is intentionally narrower than full viewport for subtlety. */}
      <div
        ref={sweepRef}
        style={{
          ...base,
          top: "-8%", left: 0,
          width: "22%", height: "116%",
          background: sweepBg,
          filter: "blur(28px)",
          transform: "skewX(-10deg) translateX(-140%)",
        }}
      />
    </div>
  );
}
