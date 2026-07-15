import { motion } from "framer-motion";
import { Camera, Film, MonitorSmartphone, Palette, PenTool, TrendingUp } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: <Film className="h-6 w-6" />,
      title: "Content & Reels",
      desc: "Cinematic short-form video editing and Instagram Reels that capture attention in the first 3 seconds."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Paid Advertising",
      desc: "Data-driven Meta & Google ads. We turn ad spend into measurable foot traffic and reservations."
    },
    {
      icon: <MonitorSmartphone className="h-6 w-6" />,
      title: "Social Media Management",
      desc: "Curated grids, community management, and consistent storytelling that builds cult-like followings."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Branding & Design",
      desc: "From logos to poster design. Visual identities that feel premium, cohesive, and unmistakably yours."
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Photo & Videography",
      desc: "Editorial-grade food and lifestyle photography that makes your product look as good as it tastes."
    },
    {
      icon: <PenTool className="h-6 w-6" />,
      title: "Website Design",
      desc: "High-converting, experiential websites that serve as your 24/7 digital storefront."
    }
  ];

  return (
    <section id="services" className="py-32 bg-background relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-wider uppercase text-sm"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-medium mt-4 text-foreground leading-tight"
          >
            Everything you need to <span className="italic">dominate</span> your market.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[2rem] bg-card p-10 border border-card-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-foreground group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-card-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
