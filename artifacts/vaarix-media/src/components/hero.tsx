import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import heroBg from "@assets/generated_images/hero-bg.jpg";
import { HeroBadge, HeroAvatarStack } from "./hero-decorations";
import { HeroHeadline } from "./hero-headline";
import { GlassLightEffect } from "./GlassLightEffect";

export function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 md:pt-24 pb-8 md:pb-12 overflow-hidden">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0">
        {/*
          Light mode: mix-blend-multiply tones the image into the warm ivory bg.
          Dark  mode: mix-blend-screen lifts the image against the dark bg
                      so it remains visible rather than collapsing to black.
        */}
        <img
          src={heroBg}
          alt="Abstract Background"
          className="w-full h-full object-cover opacity-60 mix-blend-multiply dark:mix-blend-screen dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      </div>

      {/* Glass light reflections — above bg (z-1), below all content (z-10) */}
      <GlassLightEffect />

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Creative Agency · Texas & India badge — weighted scroll-parallax + idle float */}
        <HeroBadge />

        {/* Hero headline — word-by-word GSAP-style reveal with video pills */}
        <HeroHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.0, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-foreground/70 font-light"
        >
          Specializing in restaurant marketing, cinematic content creation, and paid advertising. We don't just run ads; we craft desire.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <button 
            onClick={scrollToContact}
            className="group flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            Book Strategy Call
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          
          <button 
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: "smooth" })}
            className="btn-view-work group flex h-14 items-center justify-center gap-2 rounded-full px-8 text-base font-semibold"
          >
            <PlayCircle className="h-5 w-5 opacity-50 group-hover:opacity-70 transition-opacity" />
            view our work
          </button>
        </motion.div>

        {/* Avatar stack — weighted parallax at a different speed for depth */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="mt-6 md:mt-10"
        >
          <HeroAvatarStack />
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16 border-t border-border/60 pt-6 md:pt-12 w-full max-w-5xl"
        >
          {[
            { value: "20+", label: "Brands Scaled" },
            { value: "50M+", label: "Organic Views" },
            { value: "100+", label: "Campaigns Launched" },
            { value: "2", label: "Global Hubs" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center">
              <span className="font-serif text-[2rem] md:text-[48px] font-medium text-foreground">{stat.value}</span>
              <span className="mt-2 text-sm font-medium uppercase tracking-wider text-foreground/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
