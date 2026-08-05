import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { VideoShowcase } from "@/components/video-showcase";
import { Results } from "@/components/results";
import { Testimonials } from "@/components/testimonials";
import { Booking } from "@/components/booking";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { Cursor } from "@/components/cursor";

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

    // Wait for the page to fully render (including loader animation) before scrolling
    const timeout = setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 2800); // matches loader exit timing

    return () => clearTimeout(timeout);
  }, []);
}

export default function Home() {
  useAdLanding();

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white font-sans antialiased overflow-x-hidden">
      <Loader />
      <Cursor />
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero />
        {/* 2. Portfolio wall */}
        <Portfolio />
        {/* 3. Video showcase carousel */}
        <VideoShowcase />
        {/* 4. Scrolling brand name marquee */}
        <Marquee />
        {/* 5. Why Vaarix — value proposition */}
        <Results />
        {/* 6. Testimonials */}
        <Testimonials />
        {/* 7. Booking / Contact */}
        <Booking />
      </main>

      <Footer />
    </div>
  );
}
