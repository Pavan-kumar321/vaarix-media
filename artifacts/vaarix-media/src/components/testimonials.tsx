import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      text: "Vaarix completely completely transformed our digital presence. We saw a 40% increase in weekend reservations within the first month of working together.",
      author: "Sarah Jenkins",
      role: "Owner, The Rustic Fork"
    },
    {
      text: "Their content team is unmatched. The reels they produce are cinematic, engaging, and most importantly, they convert views into actual paying customers.",
      author: "David Chen",
      role: "Founder, Bawarchi"
    },
    {
      text: "We went from struggling to get eyes on our brand to having lines out the door. The ROAS on our Meta campaigns has been consistently over 4x.",
      author: "Elena Rodriguez",
      role: "Marketing Director, Velvet Cloud"
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-wider uppercase text-sm"
          >
            Client Love
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-medium mt-4 text-foreground"
          >
            Don't just take our word for it.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-card p-10 rounded-[2rem] border border-card-border shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-foreground/80 mb-8 font-light">
                  "{testimonial.text}"
                </p>
              </div>
              <div>
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
