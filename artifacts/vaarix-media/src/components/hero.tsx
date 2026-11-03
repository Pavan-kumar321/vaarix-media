import { ArrowUpRight } from "lucide-react";
import { HeroHeadline } from "./hero-headline";
export function Hero() {
  return <section id="top" className="hero-section">
    <div className="poster-shell">
      <HeroHeadline />
      <div className="poster-footer">
        <p>STRATEGY. CONTENT. DESIGN.<br/>BUILT TO MAKE YOUR BRAND MATTER.</p>
        <div className="poster-actions">
          <a href="#contact" className="brand-primary">Book a strategy call <ArrowUpRight size={17}/></a>
          <a href="#work" className="btn-view-work">View our work <ArrowUpRight size={17}/></a>
        </div>
        <p className="poster-note">Your business.<br/><em>Unforgettable.</em></p>
      </div>
    </div>
  </section>;
}
