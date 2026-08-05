import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="footer-section py-10 md:py-14 pb-8 rounded-t-[2rem] md:rounded-t-[3rem] -mt-10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="lg:col-span-1">
            <h2 className="footer-heading font-serif text-3xl md:text-4xl font-medium mb-4">Pardu.</h2>
            <p className="footer-body max-w-xs text-base font-light leading-relaxed">
              Brand Strategist & Digital Marketing Specialist. Turning ideas into brands people remember.
            </p>
          </div>

          <div>
            <h4 className="footer-label font-semibold uppercase tracking-widest text-sm mb-6">Navigate</h4>
            <ul className="space-y-3">
              <li><a href="#about"   className="footer-link">About</a></li>
              <li><a href="#work"    className="footer-link">Portfolio</a></li>
              <li><a href="#brands"  className="footer-link">Brands</a></li>
              <li><a href="#contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-label font-semibold uppercase tracking-widest text-sm mb-6">Socials</h4>
            <ul className="space-y-3">
              <li><a href="https://www.instagram.com/vaarix.media/" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
              <li><a href="https://wa.me/919701790548" target="_blank" rel="noopener noreferrer" className="footer-link">WhatsApp</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61592042032388" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a></li>
              <li><a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-border flex flex-col md:flex-row justify-between items-center pt-6 border-t footer-meta text-xs">
          <p>© {new Date().getFullYear()} Pardu Duvvi. All rights reserved.</p>
          <div className="flex gap-5 mt-3 md:mt-0">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
