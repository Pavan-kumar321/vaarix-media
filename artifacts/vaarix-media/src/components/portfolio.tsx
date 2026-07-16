import { useState, useMemo, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import img1 from "@assets/generated_images/portfolio-1.jpg";
import img2 from "@assets/generated_images/portfolio-2.jpg";
import img3 from "@assets/generated_images/portfolio-3.jpg";
import img4 from "@assets/generated_images/portfolio-4.jpg";
import img5 from "@assets/generated_images/portfolio-5.jpg";
import { PortfolioItem, type PortfolioEntry } from "./portfolio-item";
import { PortfolioLightbox } from "./portfolio-lightbox";

// ─── Asset discovery ──────────────────────────────────────────────────────────

const posterModules = import.meta.glob(
  "../assets/portfolio/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, import: "default" },
) as Record<string, string>;

const videoModules = import.meta.glob(
  "../assets/portfolio/*.{mp4,webm,MP4,WEBM}",
  { eager: true, import: "default" },
) as Record<string, string>;

/** Strip the last extension: "MM Lounge Test Reel.mp4" → "MM Lounge Test Reel" */
function basename(path: string) {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.[^./]+$/, "");
}

/**
 * Convert a raw filename stem to a display title.
 *
 * Handles two conventions without requiring either:
 *   • Hyphen/underscore slugs  — "burger-joint"  → "Burger Joint"
 *   • Human-readable names     — "MM Lounge Test Reel" → "MM Lounge Test Reel"
 *
 * Leading numeric prefixes are stripped ("01-burger" → "Burger").
 */
function toDisplayTitle(raw: string): string {
  // Strip leading number prefix (e.g. "01-", "1_", "01 ")
  const stripped = raw.replace(/^\d+[-_\s]+/, "").trim();
  if (!stripped) return "Untitled Project";

  // If the stem is a hyphen/underscore slug (no spaces), convert it
  if (/[-_]/.test(stripped) && !/ /.test(stripped)) {
    return stripped
      .split(/[-_]+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  // Already a human-readable name — return as-is
  return stripped;
}

/**
 * Extract title and optional category from a filename stem.
 * Filenames may optionally encode a category after "--":
 *   "my-project--Social Media" → { title: "My Project", category: "Social Media" }
 * Any filename without "--" gets an auto-detected category based on asset type.
 */
function parseName(name: string): { title: string; explicitCategory?: string } {
  const [namePart, categoryPart] = name.split("--");
  return {
    title: toDisplayTitle(namePart) || "Untitled Project",
    explicitCategory: categoryPart?.trim() || undefined,
  };
}

function useUploadedPortfolio(): PortfolioEntry[] {
  return useMemo(() => {
    const byName = new Map<string, { poster?: string; video?: string }>();

    for (const [path, url] of Object.entries(posterModules)) {
      const name = basename(path);
      byName.set(name, { ...byName.get(name), poster: url });
    }
    for (const [path, url] of Object.entries(videoModules)) {
      const name = basename(path);
      byName.set(name, { ...byName.get(name), video: url });
    }

    return Array.from(byName.keys())
      .sort()
      .map((name, idx) => {
        const { poster, video } = byName.get(name)!;
        const { title, explicitCategory } = parseName(name);
        // Auto-detect category: video files → Videography, image-only → Photography.
        // An explicit "--Category" suffix in the filename always wins.
        const category = explicitCategory ?? (video ? "Videography" : "Photography");
        // id is the stable index into the master items array — used for lightbox
        return { id: idx, title, category, poster, video };
      });
  }, []);
}

const placeholderItems: PortfolioEntry[] = [
  { id: 0, poster: img1, title: "The Burger Joint", category: "Food Photography" },
  { id: 1, poster: img2, title: "Lumina Roasters", category: "Brand Identity" },
  { id: 2, poster: img3, title: "Noir Cocktail Bar", category: "Social Media" },
  { id: 3, poster: img4, title: "Aura Skincare", category: "Art Direction" },
  { id: 4, poster: img5, title: "Michelin Plating", category: "Videography" },
];

// ─── Marquee row ──────────────────────────────────────────────────────────────

const DURATION = 38; // seconds — linear, never stops

interface MarqueeRowProps {
  items: PortfolioEntry[];
  direction: "left" | "right";
  onClickItem: (id: number) => void;
}

function MarqueeRow({ items, direction, onClickItem }: MarqueeRowProps) {
  const [paused, setPaused] = useState(false);
  // Duplicate track for seamless loop
  const track = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex gap-[22px] w-max"
        style={{
          animation: `${direction === "left" ? "marquee-left" : "marquee-right"} ${DURATION}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((item, i) => (
          // Use item.id (stable original index) — never the rendered array index.
          // This ensures duplicated marquee cards always open their own project.
          <PortfolioItem
            key={`${direction}-${i}`}
            {...item}
            onClick={() => onClickItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Row distribution ─────────────────────────────────────────────────────────

function distributeIntoRows(
  items: PortfolioEntry[],
): [PortfolioEntry[], PortfolioEntry[], PortfolioEntry[]] {
  if (items.length === 0) return [[], [], []];

  // Ensure each row has at least 5 items for smooth marquee
  const minPerRow = 5;
  const filled: PortfolioEntry[] = [];
  while (filled.length < minPerRow * 3) filled.push(...items);

  const row1: PortfolioEntry[] = [];
  const row2: PortfolioEntry[] = [];
  const row3: PortfolioEntry[] = [];
  filled.forEach((item, i) => {
    if (i % 3 === 0) row1.push(item);
    else if (i % 3 === 1) row2.push(item);
    else row3.push(item);
  });

  return [row1, row2, row3];
}

// ─── Portfolio section ────────────────────────────────────────────────────────

export function Portfolio() {
  const uploaded = useUploadedPortfolio();
  const items = uploaded.length > 0 ? uploaded : placeholderItems;
  const [row1, row2, row3] = distributeIntoRows(items);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpen = useCallback((idx: number) => setLightboxIndex(idx), []);
  const handleClose = useCallback(() => setLightboxIndex(null), []);
  const handlePrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  );
  const handleNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  );

  return (
    <section id="work" className="py-16 md:py-32 bg-foreground text-background overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-10 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-wider uppercase text-sm"
          >
            Selected Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-medium mt-4 leading-tight"
          >
            Work that <span className="italic text-white">speaks</span> for itself.
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-white/60 max-w-sm"
        >
          A glimpse into the brands we've transformed through strategic design and compelling content.
          Hover to pause · click to explore.
        </motion.p>
      </div>

      {/* Three marquee rows */}
      <div className="flex flex-col gap-[22px]">
        <MarqueeRow items={row1} direction="left"  onClickItem={handleOpen} />
        <MarqueeRow items={row2} direction="right" onClickItem={handleOpen} />
        <MarqueeRow items={row3} direction="left"  onClickItem={handleOpen} />
      </div>

      {/* Lightbox */}
      <PortfolioLightbox
        items={items}
        index={lightboxIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
}
