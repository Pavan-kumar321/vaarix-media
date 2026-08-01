import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import velvetCloudLogo from "../assets/brands/velvet-cloud.png";
import bharatBhavanLogo from "../assets/brands/bharat-bhavan.png";
import parottaPalaceLogo from "../assets/brands/parotta-palace.png";
import mnmLoungeLogo from "../assets/brands/mnm-lounge.png";
import deccanGrillLogo from "../assets/brands/deccan-grill.png";

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

const BRAND_LOGOS = [
  { src: velvetCloudLogo, alt: "Velvet Cloud" },
  { src: bharatBhavanLogo, alt: "Bharat Bhavan" },
  { src: parottaPalaceLogo, alt: "Parotta Palace" },
  { src: mnmLoungeLogo, alt: "MNM Lounge" },
  { src: deccanGrillLogo, alt: "Deccan Grill" },
];

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
          {BRAND_LOGOS.map((logo, i) => (
            <span
              key={i}
              className="h-8 w-8 rounded-full border-2 border-background overflow-hidden shadow-sm bg-white"
              title={logo.alt}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-full object-cover"
              />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
