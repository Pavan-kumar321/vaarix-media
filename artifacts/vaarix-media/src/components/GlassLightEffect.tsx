/**
 * GlassLightEffect
 * ─────────────────────────────────────────────────────────────────────────────
 * Premium luxury editorial hero background.
 * Resembles soft daylight through frosted glass.
 *
 * Design rules:
 *  • Light mode: pure warm cream/ivory orbs — zero blue tint.
 *  • Dark  mode: neutral silver-white highlights — zero blue tint.
 *  • Two staggered sweep beams: varied widths, very low opacity (5–8%),
 *    heavy blur, slow motion, randomised pause so nothing repeats mechanically.
 *  • Normal compositing (no mix-blend-mode) — shows on any background.
 *  • pointer-events: none — never intercepts clicks/scroll.
 *  • GSAP animates transform only — compositor thread, 60 fps.
 *  • prefers-reduced-motion: orbs always render; only animation suppressed.
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
  const sweep1Ref    = useRef<HTMLDivElement>(null);
  const sweep2Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {

      // ── Orb 1 — large primary, top-left, slow diagonal drift ──────────────
      gsap.to(orb1Ref.current, {
        x: "18%", y: "11%",
        duration: 28, repeat: -1, yoyo: true, ease: "sine.inOut",
      });

      // ── Orb 2 — secondary, right side, counter-rhythm ─────────────────────
      gsap.to(orb2Ref.current, {
        x: "-14%", y: "18%",
        duration: 34, repeat: -1, yoyo: true, ease: "sine.inOut",
        delay: 7,
      });

      // ── Orb 3 — small accent, lower-center, gentle wander ─────────────────
      gsap.to(orb3Ref.current, {
        x: "10%", y: "-7%",
        duration: 24, repeat: -1, yoyo: true, ease: "sine.inOut",
        delay: 13,
      });

      // ── Sweep beams — randomised so they never repeat mechanically ─────────
      const container = containerRef.current;
      const sweep1    = sweep1Ref.current;
      const sweep2    = sweep2Ref.current;

      if (container && sweep1) {
        const runSweep1 = () => {
          const cw = container.offsetWidth;
          const sw = sweep1.offsetWidth;
          gsap.fromTo(
            sweep1,
            { x: -sw - 80 },
            {
              x: cw + 80,
              duration: 32 + Math.random() * 8,   // 32–40 s
              ease: "power1.inOut",
              onComplete: () => {
                gsap.delayedCall(18 + Math.random() * 12, runSweep1); // 18–30 s gap
              },
            },
          );
        };
        gsap.delayedCall(4, runSweep1);
      }

      if (container && sweep2) {
        const runSweep2 = () => {
          const cw = container.offsetWidth;
          const sw = sweep2.offsetWidth;
          gsap.fromTo(
            sweep2,
            { x: -sw - 80 },
            {
              x: cw + 80,
              duration: 38 + Math.random() * 10,   // 38–48 s
              ease: "power1.inOut",
              onComplete: () => {
                gsap.delayedCall(22 + Math.random() * 14, runSweep2); // 22–36 s gap
              },
            },
          );
        };
        // Offset sweep2 so they never coincide
        gsap.delayedCall(16 + Math.random() * 8, runSweep2);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);  // animation params are theme-agnostic — no [isDark] dep

  // ── Colour palettes ─────────────────────────────────────────────────────────
  //
  // Light mode: pure warm cream — absolutely NO blue channel boost.
  //   Centre: rgba(255, 248, 220, …) — beeswax/candlelight cream.
  //   Falloff: rgba(255, 244, 205, …) — warm parchment, then transparent.
  //
  // Dark mode: neutral silver-white — no blue tint anywhere.
  //   Slightly more opaque to lift above the dark background.

  const orb1bg = isDark
    ? "radial-gradient(ellipse at 38% 38%, rgba(255,255,255,0.11) 0%, rgba(240,240,240,0.05) 45%, transparent 70%)"
    : "radial-gradient(ellipse at 38% 38%, rgba(255,248,220,0.28) 0%, rgba(255,244,205,0.11) 42%, transparent 70%)";

  const orb2bg = isDark
    ? "radial-gradient(ellipse at 62% 44%, rgba(255,255,255,0.08) 0%, rgba(235,235,235,0.03) 52%, transparent 74%)"
    : "radial-gradient(ellipse at 62% 44%, rgba(255,245,215,0.22) 0%, rgba(255,241,198,0.08) 52%, transparent 74%)";

  const orb3bg = isDark
    ? "radial-gradient(ellipse at 50% 54%, rgba(255,255,255,0.06) 0%, rgba(230,230,230,0.02) 58%, transparent 80%)"
    : "radial-gradient(ellipse at 50% 54%, rgba(255,244,210,0.18) 0%, rgba(255,240,195,0.05) 58%, transparent 80%)";

  // Sweep beams — warm white only (light) / neutral white (dark).
  // Peak opacity 5–7 % as specified. Heavy blur applied on the element.
  const sweep1bg = isDark
    ? "linear-gradient(106deg, transparent 0%, rgba(255,255,255,0.025) 30%, rgba(255,255,255,0.060) 50%, rgba(255,255,255,0.025) 70%, transparent 100%)"
    : "linear-gradient(106deg, transparent 0%, rgba(255,248,220,0.030) 28%, rgba(255,246,210,0.065) 50%, rgba(255,248,220,0.030) 72%, transparent 100%)";

  // Second beam — wider, slightly different angle, a touch dimmer
  const sweep2bg = isDark
    ? "linear-gradient(112deg, transparent 0%, rgba(255,255,255,0.018) 25%, rgba(255,255,255,0.050) 50%, rgba(255,255,255,0.018) 75%, transparent 100%)"
    : "linear-gradient(112deg, transparent 0%, rgba(255,248,218,0.022) 22%, rgba(255,246,208,0.055) 50%, rgba(255,248,218,0.022) 78%, transparent 100%)";

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
      {/* ── Orb 1 — large, top-left, primary warm glow ───────────────────── */}
      <div
        ref={orb1Ref}
        style={{
          ...base,
          top: "-22%", left: "-12%",
          width: "76%", height: "78%",
          borderRadius: "50%",
          background: orb1bg,
          filter: "blur(72px)",
        }}
      />

      {/* ── Orb 2 — wide secondary, right side ────────────────────────────── */}
      <div
        ref={orb2Ref}
        style={{
          ...base,
          top: "12%", right: "-22%",
          width: "64%", height: "64%",
          borderRadius: "50%",
          background: orb2bg,
          filter: "blur(80px)",
        }}
      />

      {/* ── Orb 3 — small accent, lower-center ───────────────────────────── */}
      <div
        ref={orb3Ref}
        style={{
          ...base,
          bottom: "4%", left: "18%",
          width: "46%", height: "48%",
          borderRadius: "50%",
          background: orb3bg,
          filter: "blur(60px)",
        }}
      />

      {/* ── Sweep beam 1 — narrow, warm, slow diagonal ──────────────────── */}
      {/* Starts off-screen left; GSAP translates to off-screen right.       */}
      <div
        ref={sweep1Ref}
        style={{
          ...base,
          top: "-10%", left: 0,
          width: "16%", height: "120%",
          background: sweep1bg,
          filter: "blur(52px)",
          transform: "skewX(-8deg) translateX(-200%)",
        }}
      />

      {/* ── Sweep beam 2 — wider, softer, different rhythm ──────────────── */}
      <div
        ref={sweep2Ref}
        style={{
          ...base,
          top: "-10%", left: 0,
          width: "28%", height: "120%",
          background: sweep2bg,
          filter: "blur(72px)",
          transform: "skewX(-12deg) translateX(-200%)",
        }}
      />
    </div>
  );
}
