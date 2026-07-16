import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isDark = theme === "dark";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div
          className="font-serif font-bold cursor-pointer tracking-tight text-[26px]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Vaarix Media.
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <button onClick={() => scrollTo("services")} className="hover:text-primary transition-colors text-[15px]">Services</button>
          <button onClick={() => scrollTo("work")}     className="hover:text-primary transition-colors text-[15px]">Work</button>
          <button onClick={() => scrollTo("results")}  className="hover:text-primary transition-colors text-[15px]">Results</button>
          <button onClick={() => scrollTo("testimonials")} className="hover:text-primary transition-colors text-[15px]">Testimonials</button>
        </div>

        <div className="flex items-center gap-3">
          {/* ── Theme toggle pill ───────────────────────────────────── */}
          <button
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`
              relative flex h-9 w-[60px] shrink-0 items-center rounded-full border p-1
              transition-colors duration-300
              ${isDark
                ? "border-white/15 bg-white/8 hover:bg-white/12"
                : "border-border bg-foreground/5 hover:bg-foreground/10"
              }
            `}
          >
            {/* Track icons */}
            <Sun  className={`absolute left-2 h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? "opacity-30" : "opacity-70 text-amber-500"}`} />
            <Moon className={`absolute right-2 h-3.5 w-3.5 transition-opacity duration-300 ${isDark ? "opacity-70 text-blue-300" : "opacity-30"}`} />

            {/* Sliding thumb */}
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 36 }}
              className={`
                relative z-10 flex h-6 w-6 items-center justify-center rounded-full shadow-sm
                ${isDark ? "bg-white/15 ml-auto" : "bg-white ml-0"}
              `}
            >
              {isDark
                ? <Moon className="h-3 w-3 text-blue-200" />
                : <Sun  className="h-3 w-3 text-amber-500" />
              }
            </motion.span>
          </button>

          {/* ── CTA ─────────────────────────────────────────────────── */}
          <button
            onClick={() => scrollTo("contact")}
            className="group relative overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Book Strategy Call</span>
            <div className="absolute inset-0 z-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
