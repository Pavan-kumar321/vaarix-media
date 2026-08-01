import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion } from "framer-motion";

// ─── Asset discovery ──────────────────────────────────────────────────────────
// Drop videos into:  src/assets/portfolio/videos/
// Supported: mp4, webm (case-insensitive)
// Files auto-appear — no code changes needed.

const videoModules = import.meta.glob<{ default: string }>(
  "../assets/portfolio/videos/*.{mp4,webm,MP4,WEBM}",
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

interface VideoEntry { src: string; title: string }

const VIDEOS: VideoEntry[] = Object.entries(videoModules).map(([path, mod]) => ({
  src: mod.default,
  title: toTitle(basename(path)),
}));

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-14 h-14 rounded-xl border-2 border-dashed border-white/15 flex items-center justify-center">
        <span className="text-white/20 text-xl">▶</span>
      </div>
      <p className="text-white/25 text-sm font-medium max-w-xs leading-relaxed">
        Drop videos into{" "}
        <code className="text-white/40 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">
          src/assets/portfolio/videos/
        </code>
        {" "}— they'll appear here automatically.
      </p>
    </div>
  );
}

// ─── Single video card ────────────────────────────────────────────────────────

interface VideoCardProps {
  entry: VideoEntry;
  isCenter: boolean;
  onEnded: () => void;
}

function VideoCard({ entry, isCenter, onEnded }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  // Play / pause based on center state
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (isCenter) {
      v.muted = true;
      v.currentTime = 0;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.muted = true;
    }
  }, [isCenter]);

  // Unmute while hovered (center only)
  useEffect(() => {
    const v = ref.current;
    if (!v || !isCenter) return;
    v.muted = !hovered;
  }, [hovered, isCenter]);

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden rounded-2xl select-none"
      style={{
        width: isCenter ? "clamp(200px, 20vw, 300px)" : "clamp(100px, 11vw, 165px)",
        aspectRatio: "9/16",
        opacity: isCenter ? 1 : 0.3,
        transition: "width 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => isCenter && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={ref}
        src={entry.src}
        muted
        playsInline
        loop={false}
        preload="metadata"
        onEnded={onEnded}
        className="w-full h-full object-cover"
      />

      {/* Hover audio indicator */}
      {isCenter && (
        <div
          className="absolute bottom-4 right-4 transition-opacity duration-200 pointer-events-none"
          style={{ opacity: hovered ? 1 : 0.6 }}
        >
          <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white/80">
            {hovered ? "🔊 Audio on" : "🔇 Hover for audio"}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

function Carousel() {
  const count = VIDEOS.length;
  const [idx, setIdx] = useState(0);

  const advance = useCallback(
    () => setIdx(i => (i + 1) % count),
    [count],
  );

  // 30-second fallback auto-advance
  useEffect(() => {
    if (count <= 1) return;
    const t = setTimeout(advance, 30_000);
    return () => clearTimeout(t);
  }, [idx, advance, count]);

  if (count === 0) return <EmptyState />;

  const prevIdx = (idx - 1 + count) % count;
  const nextIdx = (idx + 1) % count;

  const slots =
    count === 1
      ? [{ entry: VIDEOS[0], isCenter: true }]
      : [
          { entry: VIDEOS[prevIdx], isCenter: false },
          { entry: VIDEOS[idx],     isCenter: true  },
          { entry: VIDEOS[nextIdx], isCenter: false },
        ];

  return (
    <>
      {/* Video row */}
      <div className="flex items-center justify-center gap-4 md:gap-5 px-4 overflow-hidden">
        {slots.map(({ entry, isCenter }, i) => (
          <VideoCard
            key={`${isCenter ? "c" : i}-${entry.src}`}
            entry={entry}
            isCenter={isCenter}
            onEnded={isCenter ? advance : () => {}}
          />
        ))}
      </div>

      {/* Dot nav */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 24 : 6,
                backgroundColor: i === idx ? "var(--color-primary)" : "rgba(255,255,255,0.2)",
              }}
              aria-label={`Video ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function VideoShowcase() {
  return (
    <section
      className="pt-10 pb-12 overflow-hidden"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      {/* Header */}
      <div className="container mx-auto px-6 md:px-10 mb-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-medium tracking-widest uppercase text-xs"
        >
          In Motion
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-serif text-4xl md:text-5xl font-medium mt-3 leading-tight text-white"
        >
          Content that <span className="italic text-primary">moves</span> people.
        </motion.h2>
      </div>

      <Carousel />
    </section>
  );
}
