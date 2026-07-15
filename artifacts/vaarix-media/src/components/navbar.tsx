import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
        >Vaarix Media.</div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          <button onClick={() => scrollTo("services")} className="hover:text-primary transition-colors">Services</button>
          <button onClick={() => scrollTo("work")} className="hover:text-primary transition-colors">Work</button>
          <button onClick={() => scrollTo("results")} className="hover:text-primary transition-colors">Results</button>
          <button onClick={() => scrollTo("testimonials")} className="hover:text-primary transition-colors">Testimonials</button>
        </div>

        <button 
          onClick={() => scrollTo("contact")}
          className="group relative overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <span className="relative z-10">Book Strategy Call</span>
          <div className="absolute inset-0 z-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        </button>
      </div>
    </motion.nav>
  );
}
