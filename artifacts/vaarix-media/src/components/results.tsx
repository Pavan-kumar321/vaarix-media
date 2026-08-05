import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "Strategy First",
    body: "Every campaign begins with customer psychology and brand positioning — not trends.",
  },
  {
    title: "Content That Converts",
    body: "Premium photography, cinematic reels, and scroll-stopping campaigns designed to drive real attention.",
  },
  {
    title: "Built for Restaurants",
    body: "Marketing tailored specifically for restaurants and hospitality brands — we know the industry inside out.",
  },
  {
    title: "Consistent Branding",
    body: "Every touchpoint feels cohesive — across social media, print, and web.",
  },
];

export function Results() {
  return (
    <section
      id="results"
      className="py-20 md:py-32 bg-background border-b border-border/50 relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 40%, var(--color-primary) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-14 md:gap-20 items-start">

          {/* ── LEFT — editorial heading ── */}
          <div className="flex-1 lg:max-w-md">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-widest uppercase text-xs"
            >
              Why Vaarix
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium mt-5 leading-[1.1] text-foreground"
            >
              Marketing that people{" "}
              <span className="italic">remember.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              We don't just run campaigns. We build the visual identity,
              the storytelling system, and the creative engine that makes
              your brand impossible to ignore.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-8 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Start Growing Today
              </button>
            </motion.div>
          </div>

          {/* ── RIGHT — feature cards ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm hover:shadow-md hover:border-border transition-all duration-300 flex flex-col gap-3"
              >
                {/* Accent line */}
                <div className="h-px w-8 bg-primary rounded-full opacity-70 group-hover:w-12 transition-all duration-300" />

                <h3 className="font-serif text-lg md:text-xl font-medium text-foreground leading-snug">
                  {feat.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
