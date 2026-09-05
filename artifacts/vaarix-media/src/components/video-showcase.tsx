import {
  useRef,
  useState,
  useEffect,
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
  duplicate?: boolean;
  onSelect: (entry: VideoEntry) => void;
}

function VideoCard({
  entry,
  isCenter,
  duplicate = false,
  onSelect,
}: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  // Every item in the marquee autoplays muted and loops. The featured item
  // keeps the existing larger-card treatment without becoming a carousel.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.play().catch(() => {});
  }, [entry.src]);

  // Hover audio is local to the video under the cursor.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = !hovered;
    if (hovered) v.play().catch(() => {});
  }, [hovered]);

  return (
    <div
      className={[
        "relative flex-shrink-0 overflow-hidden rounded-2xl select-none",
        isCenter
          ? "w-[clamp(170px,53vw,300px)] md:w-[clamp(200px,20vw,300px)]"
          : "w-[clamp(82px,18vw,165px)] md:w-[clamp(100px,11vw,165px)]",
        "cursor-pointer",
      ].join(" ")}
      style={{
        aspectRatio: "9/16",
        opacity: isCenter ? 1 : 0.3,
        transition: "width 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        if (ref.current) ref.current.muted = true;
      }}
      onClick={() => onSelect(entry)}
      role="button"
      tabIndex={duplicate ? -1 : 0}
      onKeyDown={event => {
        if (duplicate) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(entry);
        }
      }}
      aria-label={`Play ${entry.title}`}
    >
      <video
        ref={ref}
        src={entry.src}
        muted
        playsInline
        loop
        preload="metadata"
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

// ─── Single horizontal infinite rail ─────────────────────────────────────────

function HorizontalVideoRail() {
  const count = VIDEOS.length;
  const [selectedIndex, setSelectedIndex] = useState(0);

  const orderedVideos = useMemo(() => {
    if (count === 0) return [];
    const leadCount = Math.min(3, Math.floor(count / 2));
    return Array.from({ length: count }, (_, position) => {
      const offset = position - leadCount;
      return VIDEOS[(selectedIndex + offset + count) % count];
    });
  }, [count, selectedIndex]);

  const marqueeVideos = useMemo(
    () => [...orderedVideos, ...orderedVideos],
    [orderedVideos],
  );

  if (count === 0) return <EmptyState />;

  return (
    <>
      <div className="w-full overflow-hidden px-2 sm:px-4">
        <div
          key={`marquee-${selectedIndex}`}
          className="video-marquee-track items-center"
          onMouseEnter={event => {
            event.currentTarget.style.animationPlayState = "paused";
          }}
          onMouseLeave={event => {
            event.currentTarget.style.animationPlayState = "running";
          }}
        >
          {marqueeVideos.map((entry, index) => {
            const isDuplicate = index >= orderedVideos.length;
            return (
              <VideoCard
                key={`${index}-${entry.src}`}
                entry={entry}
                isCenter={entry.src === VIDEOS[selectedIndex].src}
                duplicate={isDuplicate}
                onSelect={selected => setSelectedIndex(VIDEOS.indexOf(selected))}
              />
            );
          })}
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        Featured video: {VIDEOS[selectedIndex].title}
      </span>
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

      <HorizontalVideoRail />
    </section>
  );
}
