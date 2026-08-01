import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PortfolioLightbox } from "./portfolio-lightbox";
import type { PortfolioEntry } from "./portfolio-item";

// ─── Asset discovery ──────────────────────────────────────────────────────────
// Drop flyer images into:  src/assets/portfolio/flyers/
// Supported: jpg, jpeg, png, webp (case-insensitive)
// Files auto-appear — no code changes needed.

const flyerModules = import.meta.glob<{ default: string }>(
  "../assets/portfolio/flyers/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true },
);

function basename(path: string) {
  return (path.split("/").pop() ?? path).replace(/\.[^./]+$/, "");
}

function toTitle(raw: string) {
  const s = raw.replace(/^\d+[-_\s]+/, "").replace(/--.*$/, "").trim();
  if (/[-_]/.test(s) && !/ /.test(s))
    return s.split(/[-_]+/).filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  return s || "Untitled";
}

function useFlyerEntries(): PortfolioEntry[] {
  return useMemo(
    () =>
      Object.entries(flyerModules).map(([path, mod], idx) => ({
        id: idx,
        title: toTitle(basename(path)),
        category: "Creative",
        poster: mod.default,
      })),
    [],
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="w-14 h-14 rounded-xl border-2 border-dashed border-white/15 flex items-center justify-center">
        <span className="text-white/20 text-xl">+</span>
      </div>
      <p className="text-white/25 text-sm font-medium max-w-xs leading-relaxed">
        Drop flyer images into{" "}
        <code className="text-white/40 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">
          src/assets/portfolio/flyers/
        </code>
        {" "}— they'll fill the wall automatically.
      </p>
    </div>
  );
}

// ─── Gallery card ─────────────────────────────────────────────────────────────

function GalleryCard({
  entry,
  onClick,
  index,
}: {
  entry: PortfolioEntry;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: (index % 21) * 0.025 }}
      className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer bg-white/5"
      onClick={onClick}
    >
      <img
        src={entry.poster}
        alt={entry.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        draggable={false}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
    </motion.div>
  );
}

// ─── Portfolio section ────────────────────────────────────────────────────────

export function Portfolio() {
  const entries = useFlyerEntries();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="pt-0 pb-2 overflow-hidden"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      {/* Header */}
      <div className="container mx-auto px-6 md:px-10 pt-12 pb-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-medium tracking-widest uppercase text-xs"
        >
          Our Work
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-serif text-4xl md:text-5xl font-medium mt-3 leading-tight text-white"
        >
          Creatives that <span className="italic text-primary">sell.</span>
        </motion.h2>
      </div>

      {/* Dense masonry wall */}
      <div className="px-3 md:px-4">
        {entries.length > 0 ? (
          <div
            className="grid gap-[12px]"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
            }}
          >
            {entries.map((entry, i) => (
              <GalleryCard
                key={entry.id}
                entry={entry}
                index={i}
                onClick={() => setLightboxIdx(entry.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-[12px]">
            <EmptyState />
          </div>
        )}
      </div>

      {/* Lightbox */}
      <PortfolioLightbox
        items={entries}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onPrev={() =>
          setLightboxIdx(i =>
            i === null ? null : (i - 1 + entries.length) % entries.length,
          )
        }
        onNext={() =>
          setLightboxIdx(i =>
            i === null ? null : (i + 1) % entries.length,
          )
        }
      />
    </section>
  );
}
