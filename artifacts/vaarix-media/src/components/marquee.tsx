import { motion } from "framer-motion";

export function Marquee() {
  const logos = [
    "Velvet Cloud",
    "Bawarchi",
    "Bharat Bhavan",
    "Around The Corner",
    "Pizza O Pizza",
    "HSK Technologies",
    "Lumina Roasters",
    "Aura Studios",
    "The Rustic Fork",
    "Noir Collective"
  ];

  return (
    <section className="py-12 border-b border-border/50 overflow-hidden bg-white/30 backdrop-blur-sm">
      <div className="flex w-[200%] md:w-[150%] lg:w-[120%] animate-marquee">
        <motion.div
          className="flex whitespace-nowrap gap-16 px-8 items-center"
          animate={{ x: [0, -1035] }} // Adjust based on width
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="text-xl md:text-3xl font-serif text-foreground/40 font-medium tracking-tight whitespace-nowrap">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
