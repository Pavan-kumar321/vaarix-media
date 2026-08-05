import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        Digital Marketer • Texas & India
      </motion.div>
    </div>
  );
}

// Skill badge shown floating around the portrait
interface SkillBadgeProps {
  label: string;
  emoji: string;
  delay: number;
  className?: string;
}

export function SkillBadge({ label, emoji, delay, className = "" }: SkillBadgeProps) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute flex items-center gap-1.5 rounded-full border border-border/60 bg-background/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm select-none ${className}`}
      style={reduceMotion ? undefined : {
        animation: `hero-idle-float ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay * 0.4}s`,
      }}
    >
      <span>{emoji}</span>
      {label}
    </motion.div>
  );
}
