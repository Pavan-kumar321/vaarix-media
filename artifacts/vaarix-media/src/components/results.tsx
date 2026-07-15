import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ from = 0, to, duration = 2, suffix = "" }: { from?: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp: number;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <span>{count}{suffix}</span>;
}

export function Results() {
  return (
    <section id="results" className="py-32 bg-background relative border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-wider uppercase text-sm"
            >
              The Impact
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl font-medium mt-4 text-foreground leading-tight mb-8"
            >
              Metrics that actually <span className="italic">matter.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Likes are nice, but revenue is better. We focus on driving real, measurable business outcomes. Foot traffic, reservations, and loyal customers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-white px-8 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Start Growing Today
              </button>
            </motion.div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {[
              { label: "Average ROI", value: 340, suffix: "%" },
              { label: "New Reservations", value: 12, suffix: "k+" },
              { label: "Ad Spend Managed", value: 5, suffix: "M+" },
              { label: "Client Retention", value: 96, suffix: "%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="bg-card rounded-[2rem] p-8 border border-card-border shadow-sm flex flex-col justify-center min-h-[200px]"
              >
                <div className="text-5xl font-serif text-primary mb-4">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
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
