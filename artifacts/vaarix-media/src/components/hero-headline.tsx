import { motion, useReducedMotion } from "framer-motion";

const REVEAL_START = 1.6;

export function HeroHeadline() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="text-center space-y-2">
      <motion.h1
        {...fadeUp(REVEAL_START)}
        className="font-serif text-[2rem] xs:text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground leading-[1.1]"
      >
        I'm{" "}
        <span className="text-primary italic">Pardu Duvvi</span>
        <span className="inline-block ml-2">👋</span>
      </motion.h1>

      <motion.p
        {...fadeUp(REVEAL_START + 0.12)}
        className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground/60 font-light tracking-tight"
      >
        Brand Strategist & Digital Marketing Specialist
      </motion.p>
    </div>
  );
}
