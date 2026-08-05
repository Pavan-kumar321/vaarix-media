import { motion } from "framer-motion";
import { Instagram, Linkedin, Twitter, Facebook, Mail } from "lucide-react";

const SOCIALS = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/vaarix.media/",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
  {
    icon: Twitter,
    label: "X / Twitter",
    href: "https://twitter.com/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592042032388",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:hello@parduduvvi.com",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[80dvh] flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      {/* Radial spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className="h-px w-10 bg-white/20" />
          <span className="font-serif italic text-white/40 text-sm tracking-wide">Still here</span>
          <div className="h-px w-10 bg-white/20" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] tracking-tight"
        >
          <span className="text-white">Let's </span>
          <span className="text-white/40">Connect</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-white/50 text-base md:text-lg max-w-md leading-relaxed"
        >
          Available for freelance work, collaborations, and exciting marketing projects.
        </motion.p>

        {/* WhatsApp CTA */}
        <motion.a
          href="https://wa.me/919701790548"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.26 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="mt-2 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:border-white/35"
        >
          {/* WhatsApp icon (SVG inline) */}
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Message on WhatsApp
          <span className="text-white/40">→</span>
        </motion.a>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.34 }}
          className="flex items-center gap-3 mt-2"
        >
          {SOCIALS.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/50 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white hover:scale-110"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom copyright */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <p className="text-white/20 text-xs">
          © {new Date().getFullYear()} Pardu Duvvi. All rights reserved.
        </p>
      </div>
    </section>
  );
}
