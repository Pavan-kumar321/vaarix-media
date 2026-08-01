import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Asset discovery ──────────────────────────────────────────────────────────
// Drop video files into src/assets/portfolio/videos/ — they appear here automatically.
// Supported formats: mp4, webm (and uppercase variants).

const videoModules = import.meta.glob<{ default: string }>(
  "../assets/portfolio/videos/*.{mp4,webm,MP4,WEBM}",
  { eager: true }
);

function basename(path: string) {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.[^./]+$/, "");
}
function toTitle(raw: string) {
  const stripped = raw.replace(/^\d+[-_\s]+/, "").replace(/--.*$/, "").trim();
  if (/[-_]/.test(stripped) && !/ /.test(stripped)) {
    return stripped.split(/[-_]+/).filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }
  return stripped || "Untitled";
}

interface VideoEntry { src: string; title: string; }

const VIDEOS: VideoEntry[] = Object.entries(videoModules).map(([path, mod]) => ({
  src: mod.default,
  title: toTitle(basename(path)),
}));

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-white/20 flex items-center justify-center">
        <span className="text-2xl text-white/20">▶</span>
      </div>
      <p className="text-white/30 text-sm font-medium max-w-xs leading-relaxed">
        Drop video files into{" "}
        <code className="text-white/50 font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">
          src/assets/portfolio/videos/
        </code>{" "}
        — they'll appear here automatically.
      </p>
    </div>
  );
}

// ─── Video card ───────────────────────────────────────────────────────────────

interface VideoCardProps {
  entry: VideoEntry;
  isCenter: boolean;
  onEnded: () => void;
}

function VideoCard({ entry, isCenter, onEnded }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  // Play/pause & mute based on center status
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (isCenter) {
      vid.muted = true;
      vid.currentTime = 0;
      vid.play().catch(() => {});
    } else {
      vid.pause();
      vid.muted = true;
    }
  }, [isCenter]);

  // Hover: unmute center video
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || !isCenter) return;
    vid.muted = !hovered;
  }, [hovered, isCenter]);

  return (
    <motion.div
      layout
      className={`relative flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${
        isCenter
          ? "w-[54vw] max-w-[700px] shadow-2xl shadow-black/60 ring-1 ring-white/10"
          : "w-[22vw] max-w-[280px] opacity-40 scale-95"
      }`}
      style={{ aspectRatio: "9/16" }}
      onMouseEnter={() => isCenter && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        src={entry.src}
        muted
        playsInline
        loop={false}
        preload="metadata"
        onEnded={onEnded}
        className="w-full h-full object-cover"
      />
      {/* Unmute indicator */}
      {isCenter && (
        <div
          className={`absolute bottom-4 right-4 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-white/80 text-xs font-medium">
            <span>🔊</span>
            <span>Audio on</span>
          </div>
        </div>
      )}
      {isCenter && !hovered && (
        <div className="absolute bottom-4 right-4 opacity-60">
          <div className="flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5 text-white/60 text-xs">
            <span>🔇</span>
            <span>Hover for audio</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Video Showcase section ───────────────────────────────────────────────────

export function VideoShowcase() {
  const [centerIdx, setCenterIdx] = useState(0);

  const advance = useCallback(() => {
    if (VIDEOS.length === 0) return;
    setCenterIdx((i) => (i + 1) % VIDEOS.length);
  }, []);

  // Fallback auto-advance timer (30 s) in case video doesn't fire onEnded
  useEffect(() => {
    if (VIDEOS.length <= 1) return;
    const t = setTimeout(advance, 30_000);
    return () => clearTimeout(t);
  }, [centerIdx, advance]);

  const prevIdx = (centerIdx - 1 + VIDEOS.length) % VIDEOS.length;
  const nextIdx = (centerIdx + 1) % VIDEOS.length;

  return (
    <section className="py-16 md:py-24 bg-foreground text-background overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-10 md:mb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-medium tracking-wider uppercase text-sm"
        >
          In Motion
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl md:text-6xl font-medium mt-4 leading-tight"
        >
          Content that <span className="italic text-white">moves</span> people.
        </motion.h2>
      </div>

      {VIDEOS.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Carousel */}
          <div className="flex items-center justify-center gap-4 md:gap-6 px-4">
            <AnimatePresence mode="popLayout">
              {VIDEOS.length > 1 && (
                <VideoCard
                  key={`prev-${prevIdx}`}
                  entry={VIDEOS[prevIdx]}
                  isCenter={false}
                  onEnded={() => {}}
                />
              )}
              <VideoCard
                key={`center-${centerIdx}`}
                entry={VIDEOS[centerIdx]}
                isCenter={true}
                onEnded={advance}
              />
              {VIDEOS.length > 1 && (
                <VideoCard
                  key={`next-${nextIdx}`}
                  entry={VIDEOS[nextIdx]}
                  isCenter={false}
                  onEnded={() => {}}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          {VIDEOS.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCenterIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === centerIdx ? "w-6 bg-primary" : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                  aria-label={`Video ${i + 1}`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
