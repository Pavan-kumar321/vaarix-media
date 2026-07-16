import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="footer-section py-20 pb-10 rounded-t-[3rem] -mt-10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="footer-heading font-serif text-4xl md:text-5xl font-medium mb-6">Vaarix.</h2>
            <p className="footer-body max-w-sm text-lg font-light leading-relaxed">
              A creative marketing agency turning local businesses into unforgettable brands. Operating in Texas & India.
            </p>
          </div>

          <div>
            <h4 className="footer-label font-semibold uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#services" className="footer-link">Services</a></li>
              <li><a href="#work"     className="footer-link">Work</a></li>
              <li><a href="#results"  className="footer-link">Results</a></li>
              <li><a href="#testimonials" className="footer-link">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-label font-semibold uppercase tracking-widest text-sm mb-6">Socials</h4>
            <ul className="space-y-4">
              <li><a href="https://www.instagram.com/vaarix.media/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link">Instagram</a></li>
              <li><a href="https://wa.me/919701790548"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link">Whatsapp</a></li>
              <li><a href="#" className="footer-link">Twitter / X</a></li>
              <li><a href="https://www.facebook.com/profile.php?id=61592042032388"
                    target="_blank"
                    rel="noopener noreferrer"className="footer-link">FaceBook</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-border flex flex-col md:flex-row justify-between items-center pt-8 border-t footer-meta text-sm">
          <p>© {new Date().getFullYear()} Vaarix Media. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
