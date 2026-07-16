/**
 * GlassLightEffect
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders soft, slow-moving frosted-glass light reflections behind the hero
 * content. Three radial gradient orbs drift diagonally at different speeds,
 * and a single diagonal beam sweeps across the full width on a longer loop.
 *
 * Rules:
 *  • pointer-events: none — never intercepts clicks or scroll
 *  • z-[1]           — sits above the hero background image, below all content
 *  • mix-blend-mode: screen — adds light without darkening underlying image
 *  • Animates with GSAP (transform only) for compositor-thread, 60fps perf
 *  • Fully respects prefers-reduced-motion (no animation, elements stay put)
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─── Individual orb style helper ─────────────────────────────────────────────

interface OrbStyle {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  background: string;
  blur: number;         // px
  opacity: number;      // 0–1
}

function orbStyle({
  top, left, right, bottom,
  width, height,
  background,
  blur,
  opacity,
}: OrbStyle): React.CSSProperties {
  return {
    position: "absolute",
    top, left, right, bottom,
    width, height,
    background,
    filter: `blur(${blur}px)`,
    opacity,
    mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"],
    willChange: "transform",
    borderRadius: "50%",
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function GlassLightEffect() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orb1Ref     = useRef<HTMLDivElement>(null);
  const orb2Ref     = useRef<HTMLDivElement>(null);
  const orb3Ref     = useRef<HTMLDivElement>(null);
  const sweepRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use GSAP matchMedia so the animation is auto-killed under reduced motion.
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // ── Orb 1 ──────────────────────────────────────────────────
        // Large, dominant orb — drifts slowly toward the lower-right.
        gsap.to(orb1Ref.current, {
          x: "22%",
          y: "14%",
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // ── Orb 2 ──────────────────────────────────────────────────
        // Secondary orb on the right — counter-rhythm to orb 1.
        gsap.to(orb2Ref.current, {
          x: "-18%",
          y: "22%",
          duration: 22,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 4,
        });

        // ── Orb 3 ──────────────────────────────────────────────────
        // Smaller accent at the bottom — subtle, shorter period.
        gsap.to(orb3Ref.current, {
          x: "14%",
          y: "-10%",
          duration: 15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 8,
        });

        // ── Diagonal sweep ─────────────────────────────────────────
        // A soft angled beam crosses the full hero once every ~30s.
        // We wait for paint so we can measure the real container width.
        const container = containerRef.current;
        const sweep     = sweepRef.current;

        if (container && sweep) {
          const runSweep = () => {
            const cw  = container.offsetWidth;
            const sw  = sweep.offsetWidth;

            gsap.fromTo(
              sweep,
              { x: -sw - 40 },
              {
                x: cw + 40,
                duration: 20,
                ease: "power1.inOut",
                onComplete: () => {
                  // Natural pause between sweeps (10–14s random variation).
                  const pause = 10 + Math.random() * 4;
                  gsap.delayedCall(pause, runSweep);
                },
              },
            );
          };

          // First sweep starts after a 6 s delay (hero entrance has settled).
          gsap.delayedCall(6, runSweep);
        }
      }, containerRef);

      // GSAP matchMedia cleanup
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-[1] overflow-hidden pointer-events-none select-none"
    >
      {/* ── Orb 1 — large, top-left, primary light source ──────────── */}
      <div
        ref={orb1Ref}
        style={orbStyle({
          top: "-25%",
          left: "-12%",
          width: "65%",
          height: "70%",
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.05) 40%, transparent 70%)",
          blur: 48,
          opacity: 1,
        })}
      />

      {/* ── Orb 2 — large, right side, cooler tone ─────────────────── */}
      <div
        ref={orb2Ref}
        style={orbStyle({
          top: "20%",
          right: "-20%",
          width: "58%",
          height: "58%",
          background:
            "radial-gradient(ellipse at 60% 45%, rgba(240,245,255,0.09) 0%, rgba(240,245,255,0.03) 50%, transparent 72%)",
          blur: 56,
          opacity: 1,
        })}
      />

      {/* ── Orb 3 — small accent, lower-center ─────────────────────── */}
      <div
        ref={orb3Ref}
        style={orbStyle({
          bottom: "8%",
          left: "25%",
          width: "38%",
          height: "42%",
          background:
            "radial-gradient(ellipse at 50% 55%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 55%, transparent 78%)",
          blur: 38,
          opacity: 1,
        })}
      />

      {/* ── Diagonal sweep — a feathered beam crossing the hero ─────── */}
      {/*    Positioned off-screen left; GSAP moves it off-screen right. */}
      <div
        ref={sweepRef}
        style={{
          position: "absolute",
          top: "-5%",
          left: 0,
          width: "28%",
          height: "110%",
          background:
            "linear-gradient(108deg, transparent 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.04) 70%, transparent 100%)",
          filter: "blur(22px)",
          opacity: 1,
          mixBlendMode: "screen" as React.CSSProperties["mixBlendMode"],
          willChange: "transform",
          transform: "skewX(-8deg)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
