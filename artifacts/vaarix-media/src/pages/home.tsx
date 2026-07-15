import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Results } from "@/components/results";
import { Testimonials } from "@/components/testimonials";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/loader";
import { Cursor } from "@/components/cursor";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white font-sans antialiased overflow-x-hidden">
      <Loader />
      <Cursor />
      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Results />
        <Testimonials />
        <ContactForm />
      </main>
      
      <Footer />
    </div>
  );
}
