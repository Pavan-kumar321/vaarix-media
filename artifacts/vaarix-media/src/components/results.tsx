import { motion } from "framer-motion";
export function Results() {
  return (
    <section id="results" className="py-10 md:py-24 bg-background relative border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-12 items-center">
          <div className="flex-1">
            <motion.span 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-wider uppercase text-sm"
            >
              The Impact
            </motion.span>
            <motion.h2 
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl font-medium mt-4 text-foreground leading-tight mb-4 md:mb-6"
            >
              Metrics that actually <span className="italic">matter.</span>
            </motion.h2>
            <motion.p 
              initial={false}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Likes are nice, but revenue is better. We focus on driving real, measurable business outcomes. Foot traffic, reservations, and loyal customers.
            </motion.p>

            <motion.div
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-5 md:mt-8"
            >
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="impact-cta group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-8 text-sm font-semibold text-foreground transition-all"
              >
                Start Growing Today
              </button>
            </motion.div>
          </div>

          <div className="flex-1 metrics-grid grid grid-cols-2 gap-3 md:gap-6 w-full">
            {[
              { label: "Average ROI", value: 340, suffix: "%" },
              { label: "New Reservations", value: 12, suffix: "k+" },
              { label: "Ad Spend Managed", value: 5, suffix: "M+" },
              { label: "Client Retention", value: 96, suffix: "%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={false}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="metric-card bg-card rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 border border-card-border shadow-sm flex flex-col justify-center min-h-[110px] md:min-h-[180px]"
              >
                <div className="metric-value text-[30px] sm:text-4xl md:text-5xl font-serif text-primary mb-2 md:mb-4">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm leading-snug font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
