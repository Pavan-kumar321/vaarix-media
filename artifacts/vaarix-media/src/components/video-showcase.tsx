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
  duplicate?: boolean;
  onHoverStart: (video: HTMLVideoElement) => void;
  onHoverEnd: (video: HTMLVideoElement) => void;
  onMobilePlay: (video: HTMLVideoElement) => void;
  onVideoEnded: () => void;
}

function VideoCard({
  entry,
  duplicate = false,
  onHoverStart,
  onHoverEnd,
  onMobilePlay,
  onVideoEnded,
}: VideoCardProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const touchPointerRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  const isTouchDevice = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: none), (pointer: coarse)").matches;

  // Every item in the marquee autoplays muted and loops.
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
        "w-[clamp(110px,26vw,175px)] md:w-[clamp(135px,15.5vw,205px)] bg-white/5",
        "cursor-pointer",
      ].join(" ")}
      style={{
        aspectRatio: "9/16",
      }}
      onMouseEnter={() => {
        if (isTouchDevice()) return;
        setHovered(true);
        if (ref.current) onHoverStart(ref.current);
      }}
      onMouseLeave={() => {
        if (isTouchDevice()) return;
        setHovered(false);
        if (ref.current) {
          ref.current.muted = true;
          onHoverEnd(ref.current);
        }
      }}
      onPointerDown={event => {
        const touchLike =
          event.pointerType === "touch" || isTouchDevice();
        touchPointerRef.current = touchLike;
        if (touchLike && ref.current) onMobilePlay(ref.current);
      }}
      onClick={() => {
        if (touchPointerRef.current) {
          touchPointerRef.current = false;
          return;
        }
        if (isTouchDevice()) {
          if (ref.current) onMobilePlay(ref.current);
          return;
        }
        ref.current?.play().catch(() => {});
      }}
      role="button"
      tabIndex={duplicate ? -1 : 0}
      onKeyDown={event => {
        if (duplicate) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          ref.current?.play().catch(() => {});
        }
      }}
      aria-label={`Play ${entry.title}`}
    >
      <video
        ref={ref}
        src={entry.src}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        onEnded={() => {
          setHovered(false);
          onVideoEnded();
        }}
        className="w-full h-full object-cover"
      />

      {/* Hover audio indicator */}
      {hovered && (
        <div
          className="absolute bottom-4 right-4 transition-opacity duration-200 pointer-events-none"
          style={{ opacity: 1 }}
        >
          <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-white/80">
            {"🔊 Audio on"}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Single horizontal infinite rail ─────────────────────────────────────────

function HorizontalVideoRail() {
  const count = VIDEOS.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const activeInteractionRef = useRef<{
    key: string;
    mode: "hover" | "mobile";
    video: HTMLVideoElement;
  } | null>(null);
  const [duration, setDuration] = useState(40);
  const [pausedVideoKey, setPausedVideoKey] = useState<string | null>(null);
  const marqueeVideos = useMemo(
    () => [...VIDEOS, ...VIDEOS],
    [],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateDuration = () => {
      const loopDistance = Math.max(track.scrollWidth / 2 - 10, 1);
      setDuration(loopDistance / 42);
    };

    updateDuration();
    const observer = new ResizeObserver(updateDuration);
    observer.observe(track);
    return () => observer.disconnect();
  }, [count]);

  if (count === 0) return <EmptyState />;

  const restoreBackgroundVideo = (video: HTMLVideoElement) => {
    video.loop = true;
    video.muted = true;
    video.play().catch(() => {});
  };

  const startInteraction = (
    videoKey: string,
    mode: "hover" | "mobile",
    video: HTMLVideoElement,
  ) => {
    const activeInteraction = activeInteractionRef.current;
    if (activeInteraction && activeInteraction.video !== video) {
      restoreBackgroundVideo(activeInteraction.video);
    }

    activeInteractionRef.current = { key: videoKey, mode, video };
    video.loop = false;
    video.currentTime = 0;
    setPausedVideoKey(videoKey);
    video.play().catch(() => {});
  };

  const handleHoverStart = (videoKey: string, video: HTMLVideoElement) => {
    startInteraction(videoKey, "hover", video);
  };

  const handleHoverEnd = (videoKey: string, video: HTMLVideoElement) => {
    const activeInteraction = activeInteractionRef.current;
    if (
      activeInteraction?.key === videoKey &&
      activeInteraction.mode === "hover"
    ) {
      activeInteractionRef.current = null;
      setPausedVideoKey(null);
    }
    restoreBackgroundVideo(video);
  };

  const handleMobilePlay = (videoKey: string, video: HTMLVideoElement) => {
    startInteraction(videoKey, "mobile", video);
  };

  const handleVideoEnded = (videoKey: string) => {
    const activeInteraction = activeInteractionRef.current;
    if (
      activeInteraction?.key === videoKey &&
      activeInteraction.mode === "mobile"
    ) {
      restoreBackgroundVideo(activeInteraction.video);
      activeInteractionRef.current = null;
      setPausedVideoKey(null);
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden px-3 sm:px-6">
        <div
          ref={trackRef}
          className={[
            "video-marquee-track items-center",
            pausedVideoKey ? "video-marquee-track--paused" : "",
          ].join(" ")}
          style={{ animationDuration: `${duration}s` }}
        >
          {marqueeVideos.map((entry, index) => {
            const videoKey = `${index}-${entry.src}`;
            return (
              <VideoCard
                key={videoKey}
                entry={entry}
                duplicate={index >= count}
                onHoverStart={video =>
                  handleHoverStart(videoKey, video)
                }
                onHoverEnd={video =>
                  handleHoverEnd(videoKey, video)
                }
                onMobilePlay={video =>
                  handleMobilePlay(videoKey, video)
                }
                onVideoEnded={() => handleVideoEnded(videoKey)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function VideoShowcase() {
  useEffect(() => {
    if (window.location.hash !== "#video-portfolio") return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById("video-portfolio")?.scrollIntoView({
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      id="video-portfolio"
      className="pt-16 pb-20 overflow-hidden"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      {/* Header */}
      <div className="container mx-auto px-6 md:px-10 mb-12 text-center">
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
