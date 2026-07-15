import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wires a weighted scroll-parallax (via GSAP ScrollTrigger, scrubbed with a
 * lag so it never feels directly pinned to the scrollbar) onto an outer
 * wrapper, while a separate inner wrapper runs a slow idle float. The two
 * transforms live on different elements so they compose instead of fighting
 * over the same `transform` property.
 */
function useWeightedParallax(
  ref: React.RefObject<HTMLElement | null>,
  { speed, rotation }: { speed: number; rotation: number },
) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reduceMotion) return;

    const tween = gsap.fromTo(
      ref.current,
      { y: -speed, rotation: -rotation },
      {
        y: speed,
        rotation,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, reduceMotion, speed, rotation]);
}

export function HeroBadge() {
  const outerRef = useRef<HTMLDivElement>(null);
  useWeightedParallax(outerRef, { speed: 14, rotation: 1 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={outerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-white/50 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
        style={reduceMotion ? undefined : { animation: "hero-idle-float 7s ease-in-out infinite" }}
      >
        <span className="flex h-2 w-2 rounded-full bg-primary" />
        Creative Agency • Texas & India
      </motion.div>
    </div>
  );
}

const AVATAR_COLORS = ["bg-primary", "bg-foreground", "bg-amber-500", "bg-emerald-500", "bg-rose-500"];

export function HeroAvatarStack() {
  const outerRef = useRef<HTMLDivElement>(null);
  useWeightedParallax(outerRef, { speed: 22, rotation: -1 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={outerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, delay: 1.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex items-center gap-3"
        style={reduceMotion ? undefined : { animation: "hero-idle-float 8s ease-in-out infinite", animationDelay: "0.4s" }}
      >
        <div className="flex -space-x-3">
          {AVATAR_COLORS.map((color, i) => (
            <span
              key={i}
              className={`h-8 w-8 rounded-full border-2 border-background ${color} flex items-center justify-center text-[10px] font-semibold text-white shadow-sm`}
            >
              {String.fromCharCode(65 + i)}
            </span>
          ))}
        </div>
        <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">
          Trusted by 50+ local brands
        </span>
      </motion.div>
    </div>
  );
}
