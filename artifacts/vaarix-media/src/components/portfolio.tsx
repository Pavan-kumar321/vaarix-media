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

// ─── Placeholder grid (shown when no flyers are uploaded yet) ─────────────────

const PLACEHOLDER_COUNT = 32; // enough to fill the visible wall

function PlaceholderGrid() {
  return (
    <>
      {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg border border-dashed border-white/10 bg-white/[0.03]"
        />
      ))}
      {/* Drop-zone label centred over the grid */}
      <div className="col-span-full flex flex-col items-center justify-center gap-3 py-6 pointer-events-none">
        <p className="text-white/30 text-xs font-medium tracking-wide text-center leading-relaxed">
          Drop flyers into{" "}
          <code className="text-white/50 font-mono bg-white/5 px-1.5 py-0.5 rounded">
            src/assets/portfolio/flyers/
          </code>
          {" "}— they fill the wall automatically.
        </p>
      </div>
    </>
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
      className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-white/5"
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

      {/* Dense creative wall — 5 cols mobile → 8 cols desktop */}
      <div className="px-3 md:px-4">
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-[10px] md:gap-[12px]">
          {entries.length > 0
            ? entries.map((entry, i) => (
                <GalleryCard
                  key={entry.id}
                  entry={entry}
                  index={i}
                  onClick={() => setLightboxIdx(entry.id)}
                />
              ))
            : <PlaceholderGrid />
          }
        </div>
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
