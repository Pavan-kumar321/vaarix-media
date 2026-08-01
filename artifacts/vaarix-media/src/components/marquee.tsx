import { motion } from "framer-motion";
import velvetCloudLogo from "../assets/brands/velvet-cloud.png";
import bharatBhavanLogo from "../assets/brands/bharat-bhavan.png";
import parottaPalaceLogo from "../assets/brands/parotta-palace.png";
import mnmLoungeLogo from "../assets/brands/mnm-lounge.png";
import deccanGrillLogo from "../assets/brands/deccan-grill.png";

// Drop eesha-blogs.png into src/assets/brands/ to activate the image.
// We use import.meta.glob so the build doesn't fail if the file is absent.
const eeshaModules = import.meta.glob<{ default: string }>(
  "../assets/brands/eesha-blogs.png",
  { eager: true }
);
const eeshaBlogsLogo: string | null =
  eeshaModules["../assets/brands/eesha-blogs.png"]?.default ?? null;

interface BrandEntry {
  name: string;
  logo?: string | null;
  /** If true, show name label underneath (Eesha Blogs style) */
  showLabel?: boolean;
}

const BRANDS: BrandEntry[] = [
  { name: "Velvet Cloud",    logo: velvetCloudLogo },
  { name: "Bharat Bhavan",  logo: bharatBhavanLogo },
  { name: "Parotta Palace", logo: parottaPalaceLogo },
  { name: "MNM Lounge",     logo: mnmLoungeLogo },
  { name: "Deccan Grill",   logo: deccanGrillLogo },
  { name: "Eesha Blogs",    logo: eeshaBlogsLogo, showLabel: true },
];

function BrandCard({ name, logo, showLabel }: BrandEntry) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logo) {
    return (
      <div className="flex flex-col items-center gap-1.5 select-none">
        <div className="h-12 w-12 rounded-full overflow-hidden border border-border/30 shadow-sm bg-white flex-shrink-0">
          <img
            src={logo}
            alt={name}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
        {showLabel && (
          <span className="text-[11px] font-medium text-foreground/55 whitespace-nowrap tracking-wide">
            {name}
          </span>
        )}
      </div>
    );
  }

  // Eesha Blogs slot — no image uploaded yet; render styled initials circle
  if (name === "Eesha Blogs") {
    return (
      <div className="flex flex-col items-center gap-1.5 select-none">
        <div className="h-12 w-12 rounded-full border border-border/30 shadow-sm bg-foreground/5 flex items-center justify-center flex-shrink-0">
          <span className="text-[13px] font-semibold text-foreground/40">
            {initials}
          </span>
        </div>
        <span className="text-[11px] font-medium text-foreground/55 whitespace-nowrap tracking-wide">
          {name}
        </span>
      </div>
    );
  }

  // Generic text-only fallback for any brand without a logo
  return (
    <div className="text-xl md:text-2xl font-serif text-foreground/40 font-medium tracking-tight whitespace-nowrap select-none">
      {name}
    </div>
  );
}

export function Marquee() {
  // Triple the track for a seamless infinite loop
  const track = [...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <section className="py-10 border-b border-border/50 overflow-hidden bg-white/30 backdrop-blur-sm">
      <motion.div
        className="flex gap-14 px-8 items-center w-max"
        animate={{ x: [0, -(BRANDS.length * 104)] }}
        transition={{ ease: "linear", duration: 22, repeat: Infinity }}
      >
        {track.map((brand, i) => (
          <BrandCard key={i} {...brand} />
        ))}
      </motion.div>
    </section>
  );
}
