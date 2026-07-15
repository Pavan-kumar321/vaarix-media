import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-20 pb-10 rounded-t-[3rem] -mt-10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6 text-white">Vaarix.</h2>
            <p className="text-white/60 max-w-sm text-lg font-light leading-relaxed">
              A creative marketing agency turning local businesses into unforgettable brands. Operating in Texas & India.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/80 uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="text-white/60 hover:text-white transition-colors">Services</a></li>
              <li><a href="#work" className="text-white/60 hover:text-white transition-colors">Work</a></li>
              <li><a href="#results" className="text-white/60 hover:text-white transition-colors">Results</a></li>
              <li><a href="#testimonials" className="text-white/60 hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white/80 uppercase tracking-widest text-sm mb-6">Socials</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Twitter / X</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Behance</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} Vaarix Media. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
