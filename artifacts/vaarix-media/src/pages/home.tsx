import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { VideoShowcase } from "@/components/video-showcase";
import { About } from "@/components/about";
import { Brands } from "@/components/brands";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { Cursor } from "@/components/cursor";

/**
 * Visitors arriving from paid social ads (any URL containing a UTM parameter,
 * or a `?ad=1` shorthand) are scrolled directly to the contact section.
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

    const timeout = setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 2800);

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
        {/* 1. Hero — portrait + floating skill badges */}
        <Hero />

        {/* 2. Portfolio wall — flyers grid */}
        <section id="work">
          <Portfolio />
        </section>

        {/* 3. Video showcase */}
        <VideoShowcase />

        {/* 4. About Me */}
        <About />

        {/* 5. Brands I Worked With */}
        <Brands />

        {/* 6. Contact — "Let's Connect" */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
