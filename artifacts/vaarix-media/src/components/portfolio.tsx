import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import img1 from "@assets/generated_images/portfolio-1.jpg";
import img2 from "@assets/generated_images/portfolio-2.jpg";
import img3 from "@assets/generated_images/portfolio-3.jpg";
import img4 from "@assets/generated_images/portfolio-4.jpg";
import img5 from "@assets/generated_images/portfolio-5.jpg";
import { PortfolioItem, type PortfolioEntry } from "./portfolio-item";

// Auto-discovered client assets: drop files into src/assets/portfolio and
// they show up here automatically. See src/assets/portfolio/README.md for
// the naming convention (slug--category.ext, matching basenames pair a
// poster with a video).
const posterModules = import.meta.glob("../assets/portfolio/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const videoModules = import.meta.glob("../assets/portfolio/*.{mp4,webm,MP4,WEBM}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function basename(path: string) {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.[^./]+$/, "");
}

function toTitleCase(slug: string) {
  return slug
    .replace(/^\d+[-_]?/, "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function parseName(name: string) {
  const [slugPart, categoryPart] = name.split("--");
  return {
    title: toTitleCase(slugPart) || "Untitled Project",
    category: categoryPart ? toTitleCase(categoryPart) : "Case Study",
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
      .map((name) => {
        const { poster, video } = byName.get(name)!;
        const { title, category } = parseName(name);
        return { title, category, poster, video };
      });
  }, []);
}

const placeholderItems: PortfolioEntry[] = [
  { poster: img1, title: "The Burger Joint", category: "Food Photography" },
  { poster: img2, title: "Lumina Roasters", category: "Brand Identity" },
  { poster: img3, title: "Noir Cocktail Bar", category: "Social Media" },
  { poster: img4, title: "Aura Skincare", category: "Art Direction" },
  { poster: img5, title: "Michelin Plating", category: "Videography" },
];

function splitIntoRows(items: PortfolioEntry[]): [PortfolioEntry[], PortfolioEntry[]] {
  if (items.length === 0) return [[], []];
  // Repeat items so each row has at least 4 entries for a smooth marquee,
  // regardless of how many the client has uploaded so far.
  const filled: PortfolioEntry[] = [];
  while (filled.length < 8) {
    filled.push(...items);
  }
  const row1 = filled.slice(0, 4);
  const row2 = filled.slice(4, 8);
  return [row1, row2];
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-400, 0]);

  const uploaded = useUploadedPortfolio();
  const items = uploaded.length > 0 ? uploaded : placeholderItems;
  const [row1, row2] = splitIntoRows(items);

  return (
    <section id="work" className="py-32 bg-foreground text-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
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
        </motion.p>
      </div>

      <div className="flex flex-col gap-8 md:gap-12 w-[150vw] md:w-[120vw] relative left-1/2 -translate-x-1/2">
        <motion.div style={{ x: x1 }} className="flex gap-8 md:gap-12 px-6">
          {row1.map((item, i) => (
            <PortfolioItem key={i} {...item} />
          ))}
        </motion.div>

        <motion.div style={{ x: x2 }} className="flex gap-8 md:gap-12 px-6">
          {row2.map((item, i) => (
            <PortfolioItem key={i} {...item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
