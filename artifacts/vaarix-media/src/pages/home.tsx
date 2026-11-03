import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { VideoShowcase } from "@/components/video-showcase";
import { Results } from "@/components/results";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";

/**
 * Visitors arriving from paid social ads (any URL containing a UTM parameter,
 * or a `?ad=1` shorthand) are scrolled directly to the booking section so
 * the call-to-action is the first thing they interact with.
 */
function useAdLanding() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isAdTraffic =
      params.has("utm_source") ||
      params.has("utm_medium") ||
      params.has("utm_campaign") ||
      params.has("ad");

    if (!isAdTraffic) return;

    // Scroll after React has committed the destination section.
    const frame = requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    });

    return () => cancelAnimationFrame(frame);
  }, []);
}

export default function Home() {
  useAdLanding();

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white font-sans antialiased overflow-x-clip">
      <Navbar />

      <main>
        {/* Hero */}
        <Hero />
        {/* Artwork gallery */}
        <Portfolio />
        {/* Video portfolio */}
        <VideoShowcase />
        {/* Services */}
        <Services />
        {/* Results */}
        <Results />
        {/* Booking */}
        <Booking />
      </main>

      <Footer />
    </div>
  );
}
