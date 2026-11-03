import { useEffect, useRef, useState, useMemo } from "react";
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

const thumbnails = import.meta.glob<{ default: string }>("../assets/portfolio/thumbnails/*.webp", { eager: true });
const thumbnailByStem = Object.fromEntries(Object.entries(thumbnails).map(([path, mod]) => [basename(path), mod.default]));

const thumbnailByUrl = Object.fromEntries(Object.entries(flyerModules).map(([path, mod]) => [mod.default, thumbnailByStem[basename(path)]]));

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

// Each row contains eight original pieces; the hidden second track keeps the loop seamless.
function GalleryCard({ entry, onClick, repeated = false }: { entry: PortfolioEntry; onClick: () => void; repeated?: boolean }) {
  return <button type="button" tabIndex={repeated ? -1 : 0} aria-label={repeated ? undefined : `View ${entry.title}`} className="gallery-card" onClick={onClick}>
    <img src={entry.poster ? thumbnailByUrl[entry.poster] ?? entry.poster : undefined} alt={repeated ? "" : entry.title} loading="lazy" decoding="async" width={480} height={480} draggable={false}/>
  </button>;
}

export function Portfolio() {
  const entries = useFlyerEntries().slice(0, 40);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [touchedRow, setTouchedRow] = useState<number | null>(null);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(section);
    const visibility = () => setInView(!document.hidden && section.getBoundingClientRect().bottom > 0 && section.getBoundingClientRect().top < window.innerHeight);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  const rows = Array.from({ length: Math.ceil(entries.length / 8) }, (_, row) => entries.slice(row * 8, row * 8 + 8));
  return <section ref={sectionRef} id="work" className="creative-work py-14 md:py-20">
    <div className="container mx-auto px-5 md:px-12 mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-primary font-semibold tracking-widest uppercase text-xs">Our work</p>
        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-3 leading-tight">Designs that make your brand <span className="italic text-primary">stand out.</span></h2>
      </div>
    </div>
    <div className="gallery-wall" data-paused={!inView || lightboxIdx !== null} aria-label="Artwork gallery">
      {rows.map((row, rowIndex) => <div className="gallery-row" key={rowIndex} data-touched={touchedRow === rowIndex} onPointerDown={event => { if (event.pointerType !== "mouse") setTouchedRow(rowIndex); }} onPointerUp={() => setTouchedRow(null)} onPointerCancel={() => setTouchedRow(null)} onPointerLeave={() => setTouchedRow(null)}>
        <div className={`gallery-track ${rowIndex % 2 ? "gallery-track-reverse" : ""}`}>
          <div className="gallery-group">{row.map(entry => <GalleryCard key={entry.id} entry={entry} onClick={() => setLightboxIdx(entry.id)}/>)}</div>
          <div className="gallery-group gallery-repeat" aria-hidden="true">{row.map(entry => <GalleryCard key={entry.id} entry={entry} repeated onClick={() => setLightboxIdx(entry.id)}/>)}</div>
        </div>
      </div>)}
    </div>
    <PortfolioLightbox items={entries} index={lightboxIdx} onClose={() => setLightboxIdx(null)}
      onPrev={() => setLightboxIdx(i => i === null ? null : (i - 1 + entries.length) % entries.length)}
      onNext={() => setLightboxIdx(i => i === null ? null : (i + 1) % entries.length)}/>
  </section>;
}
