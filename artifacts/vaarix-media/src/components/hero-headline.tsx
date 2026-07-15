import { motion, useReducedMotion } from "framer-motion";
import localBusinessesVideo from "@assets/generated_videos/hero-pill-local-businesses.mp4";
import brandsVideo from "@assets/generated_videos/hero-pill-brands.mp4";

/**
 * Word-based reveal for the hero headline: each word fades from opacity 0,
 * translates up ~20px, and unblurs, staggered for a cinematic feel. Total
 * animation lands in the 1.2-1.5s band the brief asked for. Two phrases are
 * rendered as inline video pills instead of plain words.
 */

interface Word {
  text: string;
  pillVideo?: string;
  italic?: boolean;
}

const WORDS: Word[] = [
  { text: "We" },
  { text: "turn" },
  { text: "local businesses", pillVideo: localBusinessesVideo },
  { text: "into" },
  { text: "brands", pillVideo: brandsVideo },
  { text: "people" },
  { text: "can't" },
  { text: "ignore.", italic: true },
];

const REVEAL_START = 1.8; // matches the original h1 delay so layout timing feels the same
const STAGGER = 0.05;

function VideoPill({ src, label, delay, reduceMotion }: { src: string; label: string; delay: number; reduceMotion: boolean | null }) {
  return (
    <motion.span
      initial={reduceMotion ? { opacity: 1 } : { width: 0, opacity: 0, scale: 0.9 }}
      animate={reduceMotion ? { opacity: 1 } : { width: "auto", opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 20, delay: delay + 0.15 }}
      className="relative inline-flex h-[0.85em] items-center overflow-hidden rounded-full align-middle mx-1"
      style={{ verticalAlign: "-0.1em" }}
    >
      <span className="invisible whitespace-nowrap px-[0.55em] font-medium">{label}</span>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <span className="absolute inset-0 bg-black/35" />
      <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-[0.55em] font-medium text-white">
        {label}
      </span>
    </motion.span>
  );
}

export function HeroHeadline() {
  const reduceMotion = useReducedMotion();

  return (
    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground max-w-5xl leading-[1.1]">
      {WORDS.map((word, i) => {
        const delay = REVEAL_START + i * STAGGER;

        if (word.pillVideo) {
          return <VideoPill key={i} src={word.pillVideo} label={word.text} delay={delay} reduceMotion={reduceMotion} />;
        }

        return (
          <motion.span
            key={i}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`inline-block mr-[0.28em] ${word.italic ? "text-primary italic" : ""}`}
          >
            {word.text}
          </motion.span>
        );
      })}
    </h1>
  );
}
