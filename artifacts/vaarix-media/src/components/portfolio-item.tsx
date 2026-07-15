import { useRef } from "react";

export interface PortfolioEntry {
  /** Stable index into the original items array — used for lightbox mapping. */
  id: number;
  title: string;
  category: string;
  poster?: string;
  video?: string;
}

interface PortfolioItemProps extends PortfolioEntry {
  onClick: () => void;
}

export function PortfolioItem({ title, category, poster, video, onClick }: PortfolioItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Track the in-flight play() promise so we never call pause() before it settles.
  const playPromise = useRef<Promise<void> | null>(null);

  const handleEnter = () => {
    if (video && videoRef.current) {
      videoRef.current.currentTime = 0;
      playPromise.current = videoRef.current.play().catch(() => {});
    }
  };

  const handleLeave = () => {
    if (video && videoRef.current) {
      const vid = videoRef.current;
      if (playPromise.current) {
        // Wait for play() to settle before pausing to avoid the interrupted-by-pause error.
        playPromise.current.then(() => { vid.pause(); }).catch(() => {});
        playPromise.current = null;
      } else {
        vid.pause();
      }
    }
  };

  return (
    <div
      className="portfolio-item group relative w-[280px] md:w-[300px] aspect-video rounded-[24px] overflow-hidden shrink-0 cursor-pointer select-none"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      {/* Media */}
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      ) : (
        <img
          src={poster}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-500 ease-out" />

      {/* Glass card — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] p-4">
        <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3">
          <p className="text-white/70 text-[10px] font-semibold uppercase tracking-widest mb-0.5">
            {category}
          </p>
          <div className="flex items-center justify-between gap-2">
            <p className="text-white font-serif text-base leading-tight">{title}</p>
            <span className="shrink-0 text-white/60 text-[10px] font-semibold uppercase tracking-wider border border-white/25 rounded-full px-2 py-0.5 whitespace-nowrap">
              View →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
