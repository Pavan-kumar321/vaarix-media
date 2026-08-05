import { motion } from "framer-motion";

// Portrait reuse: same glob as hero
const portraitModules = import.meta.glob<{ default: string }>(
  "../assets/portrait.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true },
);
const portrait: string | null = Object.values(portraitModules)[0]?.default ?? null;

const SKILLS = [
  "Meta & Google Ads",
  "Brand Strategy",
  "Social Media Management",
  "Cinematic Content",
  "Restaurant Marketing",
  "Website Design",
];

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-20 items-center">

          {/* LEFT — text */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-widest uppercase text-xs"
            >
              About Me
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mt-5 leading-[1.15] text-foreground"
            >
              Turning ideas into{" "}
              <span className="italic text-primary">brands</span>{" "}
              that people remember.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              I'm Pardu Duvvi — a digital marketer and brand strategist based in Texas & India.
              I specialize in building recognizable brands for restaurants and hospitality businesses
              through cinematic content, strategic paid advertising, and consistent creative systems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 text-base text-muted-foreground leading-relaxed"
            >
              Currently focused on growing emerging restaurant brands across the US and India,
              creating visual identities that drive foot traffic, reservations, and loyal customers.
            </motion.p>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border/60 bg-foreground/[0.03] px-4 py-1.5 text-sm font-medium text-foreground/70"
                >
                  {skill}
                </span>
              ))}
            </motion.div>

            {/* Experience callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-border/50" />
              <p className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                2+ Years in Brand & Marketing
              </p>
              <div className="h-px flex-1 bg-border/50" />
            </motion.div>
          </div>

          {/* RIGHT — portrait */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Blob accent */}
              <div
                className="absolute -inset-6 rounded-full opacity-15 dark:opacity-10"
                style={{
                  background:
                    "radial-gradient(circle at 60% 40%, var(--color-primary) 0%, transparent 65%)",
                  filter: "blur(40px)",
                }}
              />
              <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden border border-border/40 shadow-xl bg-foreground/5">
                {portrait ? (
                  <img
                    src={portrait}
                    alt="Pardu Duvvi"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border/30 rounded-2xl md:rounded-3xl">
                    <span className="text-5xl">👤</span>
                    <p className="text-xs text-foreground/30 font-medium text-center px-6 leading-relaxed">
                      Drop portrait.jpg into<br />src/assets/
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
