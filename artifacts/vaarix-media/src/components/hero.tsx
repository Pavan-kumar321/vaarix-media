import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg";
import { HeroBadge, SkillBadge } from "./hero-decorations";
import { HeroHeadline } from "./hero-headline";
import { GlassLightEffect } from "./GlassLightEffect";

// Portrait: drop src/assets/portrait.jpg (or .png/.webp) to activate
const portraitModules = import.meta.glob<{ default: string }>(
  "../assets/portrait.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true },
);
const portrait: string | null = Object.values(portraitModules)[0]?.default ?? null;

const SKILLS = [
  { label: "Paid Ads",          emoji: "🚀", className: "top-10 -left-4 sm:left-0" },
  { label: "Branding",          emoji: "⭐", className: "top-10 -right-4 sm:right-0" },
  { label: "Marketing",         emoji: "📣", className: "top-1/2 -translate-y-1/2 -left-8 sm:-left-6" },
  { label: "Websites",          emoji: "🌐", className: "top-1/2 -translate-y-1/2 -right-8 sm:-right-6" },
  { label: "Content Creation",  emoji: "🎬", className: "bottom-14 -left-2 sm:left-2" },
  { label: "Social Media",      emoji: "📱", className: "bottom-14 -right-2 sm:right-2" },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 md:pt-24 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover opacity-50 mix-blend-multiply dark:mix-blend-screen dark:opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      <GlassLightEffect />

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <HeroBadge />

        {/* Headline */}
        <HeroHeadline />

        {/* Portrait + floating skill badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[320px] sm:w-[380px] h-[340px] sm:h-[400px] flex items-center justify-center my-2"
        >
          {/* Organic blob behind portrait */}
          <div
            className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full opacity-25 dark:opacity-15"
            style={{
              background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
              filter: "blur(32px)",
            }}
          />

          {/* Portrait circle */}
          <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-border/40 shadow-2xl bg-foreground/5">
            {portrait ? (
              <img
                src={portrait}
                alt="Pardu Duvvi"
                className="w-full h-full object-cover object-center"
              />
            ) : (
              /* Placeholder until portrait is uploaded */
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-border/40 rounded-full">
                <span className="text-3xl">👤</span>
                <span className="text-[10px] text-foreground/30 font-medium text-center px-4 leading-tight">
                  Drop portrait.jpg into<br />src/assets/
                </span>
              </div>
            )}
          </div>

          {/* Floating skill badges */}
          {SKILLS.map((s, i) => (
            <SkillBadge
              key={s.label}
              label={s.label}
              emoji={s.emoji}
              delay={2.2 + i * 0.08}
              className={s.className}
            />
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => scrollTo("work")}
            className="group flex h-13 items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            View Portfolio
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="group flex h-13 items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm px-8 py-3 text-base font-semibold text-foreground transition-all hover:border-primary hover:text-primary hover:scale-105 active:scale-95"
          >
            Book a Call
          </button>
        </motion.div>
      </div>
    </section>
  );
}
