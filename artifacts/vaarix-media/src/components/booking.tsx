import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Clock, Video, CheckCircle2, Home } from "lucide-react";
import { CALENDLY_URL } from "@/config/calendly";

type Step = "qualify" | "calendly" | "declined";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(4px)", scale: 0.98 },
  transition: { duration: 0.55, ease: EASE },
};

export function Booking() {
  const [step, setStep] = useState<Step>("qualify");
  const [selected, setSelected] = useState<"yes" | "no" | null>(null);

  const handleContinue = () => {
    if (!selected) return;
    setStep(selected === "yes" ? "calendly" : "declined");
  };

  return (
    <section
      id="contact"
      className="py-32 bg-white relative overflow-hidden"
      data-cursor="default"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mr-64 -mt-64 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-48 -mb-48 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <AnimatePresence mode="wait">
          {/* ── STEP 1: Qualification ── */}
          {step === "qualify" && (
            <motion.div key="qualify" {...fadeUp} className="max-w-2xl mx-auto">
              <div className="bg-card border border-border shadow-xl rounded-[2.5rem] p-8 md:p-14">
                <div className="mb-10">
                  <span className="text-primary font-medium tracking-wider uppercase text-sm">Book a Call</span>
                  <h2 className="font-serif text-4xl md:text-5xl font-medium text-foreground mt-4 mb-4 leading-tight">
                    Book Your Free<br />
                    <span className="italic text-primary">Strategy Call</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Before scheduling your strategy call, we'd like to make sure we're the right fit.
                  </p>
                </div>

                <div className="rounded-2xl bg-secondary/60 border border-border p-6 mb-8">
                  <p className="text-foreground font-medium text-lg leading-relaxed">
                    Our restaurant marketing partnerships begin at{" "}
                    <span className="text-primary font-semibold">$429/month</span>{" "}
                    <span className="text-muted-foreground text-base">(approximately ₹40,755/month)</span>.
                  </p>
                  <p className="mt-3 text-foreground/80 font-medium">
                    Is this a comfortable monthly investment for your business?
                  </p>
                </div>

                <div className="space-y-3 mb-10">
                  {[
                    { value: "yes" as const, label: "Yes, this budget works for me." },
                    { value: "no" as const, label: "No, I'm looking for a lower investment." },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSelected(opt.value)}
                      className={`w-full flex items-center gap-4 rounded-2xl border-2 px-6 py-4 text-left transition-all duration-300 ${
                        selected === opt.value
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                          : "border-border bg-background hover:border-primary/40 hover:bg-secondary/50"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          selected === opt.value ? "border-primary bg-primary" : "border-muted-foreground/40"
                        }`}
                      >
                        {selected === opt.value && (
                          <span className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span className={`font-medium ${selected === opt.value ? "text-foreground" : "text-foreground/70"}`}>
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!selected}
                  className="group w-full flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Calendly booking ── */}
          {step === "calendly" && (
            <motion.div key="calendly" {...fadeUp}>
              <button
                onClick={() => setStep("qualify")}
                className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              <div className="bg-card border border-border shadow-xl rounded-[2.5rem] overflow-hidden">
                <div className="grid md:grid-cols-[320px_1fr]">
                  {/* Left panel */}
                  <div className="bg-foreground text-background p-8 md:p-10 flex flex-col gap-6">
                    <div>
                      <div className="font-serif text-2xl font-medium mb-1">Vaarix Media</div>
                      <div className="text-background/60 text-sm uppercase tracking-widest font-medium">Strategy Call</div>
                    </div>

                    <div>
                      <h3 className="font-serif text-3xl font-medium leading-snug mb-6">
                        Free Strategy<br />Call
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-background/80 text-sm font-medium">
                          <Clock className="h-4 w-4 shrink-0 text-primary" />
                          30 Minutes
                        </div>
                        <div className="flex items-center gap-3 text-background/80 text-sm font-medium">
                          <Video className="h-4 w-4 shrink-0 text-primary" />
                          Google Meet
                        </div>
                      </div>
                    </div>

                    <p className="text-background/60 text-sm leading-relaxed border-t border-white/10 pt-6">
                      During this strategy call we'll review your restaurant's current marketing, identify growth
                      opportunities, and discuss how Vaarix Media can help attract more customers.
                    </p>

                    <div className="mt-auto pt-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-background/70">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        No obligation · Free
                      </div>
                    </div>
                  </div>

                  {/* Right panel */}
                  <div className="p-8 md:p-10 min-h-[520px] flex items-center justify-center">
                    {CALENDLY_URL ? (
                      <iframe
                        src={CALENDLY_URL}
                        className="w-full h-[520px] rounded-2xl border-0"
                        title="Schedule a strategy call"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full flex flex-col items-center justify-center gap-6 py-16 px-8 text-center rounded-2xl border-2 border-dashed border-border bg-secondary/30">
                        <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center">
                          <Clock className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-serif text-2xl text-foreground mb-2">Calendly will be connected here.</p>
                          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            To activate booking, paste your Calendly scheduling URL into{" "}
                            <code className="text-primary font-mono text-xs bg-primary/8 px-1.5 py-0.5 rounded">
                              src/config/calendly.ts
                            </code>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: Declined ── */}
          {step === "declined" && (
            <motion.div key="declined" {...fadeUp} className="max-w-2xl mx-auto text-center">
              <div className="bg-card border border-border shadow-xl rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/3 to-transparent pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className="mb-8 h-16 w-16 rounded-full bg-secondary flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                  </motion.div>

                  <h2 className="font-serif text-3xl md:text-4xl font-medium text-foreground mb-6 leading-tight">
                    Thank you for your interest<br />in{" "}
                    <span className="italic text-primary">Vaarix Media.</span>
                  </h2>

                  <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-lg">
                    At the moment, our marketing partnerships begin at{" "}
                    <span className="font-medium text-foreground">$429/month</span>{" "}
                    (approximately ₹40,755/month).
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                    Based on your selection, it looks like we may not be the right fit right now.
                    We truly appreciate your interest and wish you continued success with your business.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="group flex h-14 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-base font-semibold text-background shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                      <Home className="h-4 w-4" />
                      Return Home
                    </a>
                    <button
                      onClick={() => { setStep("qualify"); setSelected(null); }}
                      className="flex h-14 items-center justify-center gap-2 rounded-full border border-border px-8 text-base font-medium text-foreground transition-all hover:bg-secondary hover:scale-105 active:scale-95"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
