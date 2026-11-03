import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Premium intro animation:
 * 1. Full-screen black background fades in
 * 2. "Vaarix Media" fades in with y + blur transition
 * 3. Thin loading line fills left-to-right
 * 4. Content fades out, background transitions to site white
 * 5. White overlay fades away, revealing the hero
 *
 * Runs once per page load / refresh.
 */
export function Loader() {
  const [phase, setPhase] = useState<"in" | "fadeContent" | "toWhite" | "done">("in");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("fadeContent"), 1500);
    const t2 = setTimeout(() => setPhase("toWhite"), 1800);
    const t3 = setTimeout(() => setPhase("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      {/* Black base layer with the brand content */}
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#111111]"
        animate={{ opacity: phase === "toWhite" ? 0 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence>
          {phase === "in" && (
            <motion.div
              key="content"
              className="flex flex-col items-center gap-6"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.3 } }}
            >
              {/* Logo */}
              <motion.p
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-5xl tracking-tight text-white"
              >
                Vaarix Media
              </motion.p>

              {/* Loading line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-32 h-[1px] bg-white/20 overflow-hidden"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.0, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-white origin-left"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* White overlay — fades in over the black, then the whole stack exits */}
      <AnimatePresence>
        {phase === "toWhite" && (
          <motion.div
            key="white"
            className="fixed inset-0 z-[201] bg-[#F7F7F7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
