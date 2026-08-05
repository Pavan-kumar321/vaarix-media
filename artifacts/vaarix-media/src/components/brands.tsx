import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Brand logos
import velvetCloudLogo    from "../assets/brands/velvet-cloud.png";
import bharatBhavanLogo   from "../assets/brands/bharat-bhavan.png";
import parottaPalaceLogo  from "../assets/brands/parotta-palace.png";
import mnmLoungeLogo      from "../assets/brands/mnm-lounge.png";
import deccanGrillLogo    from "../assets/brands/deccan-grill.png";

// Per-brand gallery assets — drop images/videos into src/assets/portfolio/brands/<slug>/
const allBrandAssets = import.meta.glob<{ default: string }>(
  "../assets/portfolio/brands/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP,mp4,webm,MP4,WEBM}",
  { eager: true },
);

interface Brand {
  slug: string;
  name: string;
  logo: string;
  tagline: string;
}

const BRANDS: Brand[] = [
  { slug: "bharat-bhavan",  name: "Bharat Bhavan",  logo: bharatBhavanLogo,  tagline: "Authentic Indian restaurant" },
  { slug: "velvet-cloud",   name: "Velvet Cloud",   logo: velvetCloudLogo,   tagline: "Premium lounge & bar" },
  { slug: "mnm-lounge",     name: "MNM Lounge",     logo: mnmLoungeLogo,     tagline: "Social dining & events" },
  { slug: "deccan-grill",   name: "Deccan Grill",   logo: deccanGrillLogo,   tagline: "South Indian cuisine" },
  { slug: "parotta-palace", name: "Parotta Palace", logo: parottaPalaceLogo, tagline: "Street food & more" },
];

function useBrandAssets(slug: string) {
  return useMemo(() => {
    return Object.entries(allBrandAssets)
      .filter(([path]) => path.includes(`/brands/${slug}/`))
      .map(([, mod]) => mod.default);
  }, [slug]);
}

// ─── Brand Modal ──────────────────────────────────────────────────────────────

function isVideo(src: string) {
  return /\.(mp4|webm)$/i.test(src);
}

function BrandModal({ brand, onClose }: { brand: Brand; onClose: () => void }) {
  const assets = useBrandAssets(brand.slug);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = () =>
    setLightboxIdx(i => (i === null ? null : (i - 1 + assets.length) % assets.length));
  const next = () =>
    setLightboxIdx(i => (i === null ? null : (i + 1) % assets.length));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full sm:max-w-4xl max-h-[90dvh] bg-background rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-4 p-5 md:p-6 border-b border-border/50 flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-border/40 bg-white shadow-sm flex-shrink-0">
            <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-serif text-xl font-medium text-foreground">{brand.name}</h2>
            <p className="text-sm text-muted-foreground">{brand.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-auto rounded-full p-2 hover:bg-foreground/8 transition-colors"
          >
            <X className="h-5 w-5 text-foreground/60" />
          </button>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {assets.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {assets.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className="aspect-square rounded-xl overflow-hidden border border-border/30 hover:border-primary/50 transition-all hover:scale-[1.02] bg-foreground/5"
                >
                  {isVideo(src) ? (
                    <video src={src} muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-border/30 flex items-center justify-center">
                <span className="text-2xl">🖼️</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Drop images or videos into{" "}
                <code className="bg-foreground/5 px-1.5 py-0.5 rounded text-xs font-mono">
                  src/assets/portfolio/brands/{brand.slug}/
                </code>
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Full-screen lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && assets[lightboxIdx] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <div className="max-w-3xl max-h-[85dvh] rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
              {isVideo(assets[lightboxIdx]) ? (
                <video src={assets[lightboxIdx]} controls autoPlay className="max-h-[85dvh] w-auto" />
              ) : (
                <img src={assets[lightboxIdx]} alt="" className="max-h-[85dvh] w-auto object-contain" />
              )}
            </div>
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-3 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 p-2 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Brand Card ───────────────────────────────────────────────────────────────

function BrandCard({ brand, onClick }: { brand: Brand; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={onClick}
      className="group flex flex-col items-center gap-4 rounded-2xl border border-border/50 bg-card p-6 md:p-8 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 text-center w-full"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden border border-border/40 bg-white shadow-sm group-hover:shadow-md transition-shadow">
        <img src={brand.logo} alt={brand.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h3 className="font-serif text-base md:text-lg font-medium text-foreground">{brand.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{brand.tagline}</p>
      </div>
      <span className="mt-auto text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        View Work →
      </span>
    </motion.button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function Brands() {
  const [activeBrand, setActiveBrand] = useState<Brand | null>(null);

  return (
    <section id="brands" className="py-20 md:py-32 bg-background border-b border-border/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium tracking-widest uppercase text-xs"
          >
            Brands I Worked With
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl md:text-5xl font-medium mt-4 text-foreground leading-tight"
          >
            Clients that trusted{" "}
            <span className="italic text-primary">the vision.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-muted-foreground max-w-md mx-auto text-sm md:text-base"
          >
            Click any brand to explore the work created for them.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <BrandCard brand={brand} onClick={() => setActiveBrand(brand)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brand modal */}
      <AnimatePresence>
        {activeBrand && (
          <BrandModal brand={activeBrand} onClose={() => setActiveBrand(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
