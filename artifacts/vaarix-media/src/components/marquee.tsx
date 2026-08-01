import { motion } from "framer-motion";

const BRANDS = [
  "Velvet Cloud",
  "Parotta Palace",
  "Bharat Bhavan",
  "MNM Lounge",
  "Deccan Grill",
  "Eesha Blogs",
];

const SEP = "•";

// Build a flat track: Name • Name • Name • …
function buildTrack(brands: string[]): string[] {
  const items: string[] = [];
  brands.forEach((name, i) => {
    items.push(name);
    if (i < brands.length - 1) items.push(SEP);
  });
  return items;
}

const TRACK_ONCE = buildTrack(BRANDS);
// Triple for a seamless loop — the animation resets after one repetition
const TRACK = [...TRACK_ONCE, SEP, ...TRACK_ONCE, SEP, ...TRACK_ONCE];

// Each name slot is ~180px, each separator is ~36px
const NAME_W = 180;
const SEP_W  = 36;

function itemWidth(item: string) {
  return item === SEP ? SEP_W : NAME_W;
}

const ONCE_PX = TRACK_ONCE.reduce((acc, item) => acc + itemWidth(item), 0) + SEP_W; // + trailing sep

export function Marquee() {
  return (
    <section className="py-8 border-b border-border/40 overflow-hidden bg-white/20 backdrop-blur-sm">
      <motion.div
        className="flex items-center w-max"
        animate={{ x: [0, -ONCE_PX] }}
        transition={{ ease: "linear", duration: 28, repeat: Infinity }}
      >
        {TRACK.map((item, i) =>
          item === SEP ? (
            <span
              key={i}
              className="text-foreground/25 text-sm select-none"
              style={{ width: SEP_W, textAlign: "center", flexShrink: 0 }}
            >
              •
            </span>
          ) : (
            <span
              key={i}
              className="text-foreground/60 text-base md:text-lg font-medium tracking-wide whitespace-nowrap select-none"
              style={{ width: NAME_W, flexShrink: 0 }}
            >
              {item}
            </span>
          )
        )}
      </motion.div>
    </section>
  );
}
