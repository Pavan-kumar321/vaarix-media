import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioLightbox } from "./portfolio-lightbox";
import type { PortfolioEntry } from "./portfolio-item";

// ─── Asset discovery ──────────────────────────────────────────────────────────
// Drop flyer images into src/assets/portfolio/flyers/ — they appear here automatically.
// Supported formats: jpg, jpeg, png, webp (and uppercase variants).

const flyerModules = import.meta.glob<{ default: string }>(
  "../assets/portfolio/flyers/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true }
);

function basename(path: string) {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.[^./]+$/, "");
}

function toTitle(raw: string): string {
  const stripped = raw.replace(/^\d+[-_\s]+/, "").replace(/--.*$/, "").trim();
  if (/[-_]/.test(stripped) && !/ /.test(stripped)) {
    return stripped.split(/[-_]+/).filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  return stripped || "Untitled";
}

function useFlyerEntries(): PortfolioEntry[] {
  return useMemo(() => {
    return Object.entries(flyerModules).map(([path, mod], idx) => ({
      id: idx,
      title: toTitle(basename(path)),
      category: "Creative",
      poster: mod.default,
    }));
  }, []);
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-border/50 flex items-center justify-center">
        <span className="text-2xl text-foreground/25">+</span>
      </div>
      <p className="text-foreground/40 text-sm font-medium max-w-xs leading-relaxed">
        Drop flyer images into{" "}
        <code className="text-foreground/60 font-mono text-xs bg-foreground/5 px-1.5 py-0.5 rounded">
          src/assets/portfolio/flyers/
        </code>{" "}
        — they'll appear here automatically.
      </p>
    </div>
  );
}

// ─── Gallery card ─────────────────────────────────────────────────────────────

interface GalleryCardProps {
  entry: PortfolioEntry;
  onClick: () => void;
  index: number;
}

function GalleryCard({ entry, onClick, index }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 12) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-foreground/5"
      onClick={onClick}
    >
      <img
        src={entry.poster}
        alt={entry.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        draggable={false}
      />
      {/* Subtle overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-400" />
      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] p-3">
        <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/20 px-3 py-2">
          <p className="text-white font-medium text-sm leading-tight truncate">{entry.title}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Portfolio section ────────────────────────────────────────────────────────

export function Portfolio() {
  const entries = useFlyerEntries();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="work" className="py-16 md:py-24 bg-foreground text-background">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-10 md:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-medium tracking-wider uppercase text-sm"
        >
          Our Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl font-medium mt-4 leading-tight"
        >
          Creatives that <span className="italic text-white">sell.</span>
        </motion.h2>
      </div>

      {/* Static grid */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {entries.length > 0 ? (
            entries.map((entry, i) => (
              <GalleryCard
                key={entry.id}
                entry={entry}
                index={i}
                onClick={() => setLightboxIndex(entry.id)}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Lightbox */}
      <PortfolioLightbox
        items={entries}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() => setLightboxIndex((i) => (i === null ? null : (i - 1 + entries.length) % entries.length))}
        onNext={() => setLightboxIndex((i) => (i === null ? null : (i + 1) % entries.length))}
      />
    </section>
  );
}
