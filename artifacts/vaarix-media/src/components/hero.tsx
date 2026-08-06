import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg";
import { HeroBadge, SkillBadge } from "./hero-decorations";
import { HeroHeadline } from "./hero-headline";
import { GlassLightEffect } from "./GlassLightEffect";

/**
 * Portrait auto-activates when you drop a transparent PNG cutout (or any image)
 * into src/assets/portrait.png (or .jpg / .webp).
 * No layout changes needed — the placeholder disappears and the image takes its place.
 */
const portraitModules = import.meta.glob<{ default: string }>(
  "../assets/portrait.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true },
);
const portrait: string | null = Object.values(portraitModules)[0]?.default ?? null;

// Floating skill badges — positioned relative to the portrait column
const SKILLS = [
  { label: "Paid Ads",         emoji: "🚀", className: "top-[12%] left-[-10%] sm:left-[-6%]" },
  { label: "Branding",         emoji: "⭐", className: "top-[12%] right-[-10%] sm:right-[-6%]" },
  { label: "Marketing",        emoji: "📣", className: "top-[40%] left-[-14%] sm:left-[-10%]" },
  { label: "Websites",         emoji: "🌐", className: "top-[40%] right-[-14%] sm:right-[-10%]" },
  { label: "Content Creation", emoji: "🎬", className: "top-[66%] left-[-8%] sm:left-[-4%]" },
  { label: "Social Media",     emoji: "📱", className: "top-[66%] right-[-8%] sm:right-[-4%]" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-50 mix-blend-multiply dark:mix-blend-screen dark:opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
      </div>

      <GlassLightEffect />

      {/* ── Top content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 pt-28 md:pt-32 pb-6 gap-5">
        <HeroBadge />
        <HeroHeadline />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <button
            onClick={() => scrollTo("work")}
            className="group flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            View Portfolio
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="group flex h-12 items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm px-7 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95"
          >
            Book a Call
          </button>
        </motion.div>
      </div>

      {/* ── Portrait area — bottom-anchored, 45–50% of viewport height ─────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-auto flex justify-center"
        style={{ height: "clamp(320px, 47vh, 560px)" }}
      >
        {/*
          Portrait column — badges are positioned relative to this wrapper.
          Width is fixed so badge positions stay consistent regardless of viewport.
        */}
        <div
          className="relative h-full"
          style={{ width: "clamp(220px, 28vw, 380px)" }}
        >
          {/* Subtle glow behind the cutout */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-2/3 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, var(--color-primary) 0%, transparent 70%)",
              filter: "blur(48px)",
              opacity: 0.18,
            }}
          />

          {portrait ? (
            /* Transparent PNG cutout — no clipping, no border, no background */
            <img
              src={portrait}
              alt="Pardu Duvvi"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 h-full w-auto object-contain object-bottom select-none"
              draggable={false}
            />
          ) : (
            /* Placeholder: dashed outline showing where the PNG cutout will appear */
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] w-[70%] flex flex-col items-center justify-end pb-6 border-2 border-dashed border-foreground/15 rounded-t-[999px] bg-foreground/[0.02]">
              <span className="text-4xl mb-3">👤</span>
              <p className="text-[11px] text-foreground/30 font-medium text-center leading-snug px-3">
                Drop your transparent<br />PNG cutout into<br />
                <code className="text-foreground/40 font-mono">src/assets/portrait.png</code>
              </p>
            </div>
          )}

          {/* Floating skill badges */}
          {SKILLS.map((s, i) => (
            <SkillBadge
              key={s.label}
              label={s.label}
              emoji={s.emoji}
              delay={2.3 + i * 0.07}
              className={s.className}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
