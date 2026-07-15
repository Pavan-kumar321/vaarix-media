import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/**
 * Initializes Lenis smooth scrolling and wires it to GSAP's ScrollTrigger so
 * every scroll-driven animation on the page (parallax, marquees, reveals)
 * stays in sync with the eased scroll position instead of the raw native
 * scroll, which is what removes jitter and gives the "heavy" editorial feel.
 */
export function initSmoothScroll() {
  if (lenis) return lenis;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  lenis = new Lenis({
    duration: prefersReducedMotion ? 0 : 1.2,
    lerp: prefersReducedMotion ? 1 : 0.08,
    wheelMultiplier: 1,
    touchMultiplier: 1.2,
    smoothWheel: !prefersReducedMotion,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function destroySmoothScroll() {
  lenis?.destroy();
  lenis = null;
}
