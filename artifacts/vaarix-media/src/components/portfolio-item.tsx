import { useRef } from "react";

export interface PortfolioEntry {
  title: string;
  category: string;
  poster?: string;
  video?: string;
}

export function PortfolioItem({ title, category, poster, video }: PortfolioEntry) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    if (video && videoRef.current) {
      videoRef.current.currentTime = 0;
      void videoRef.current.play();
    }
  };

  const handleLeave = () => {
    if (video && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="portfolio-item group relative w-[60vw] md:w-[35vw] aspect-[4/3] rounded-[2rem] overflow-hidden shrink-0"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
        <div>
          <div className="text-white/80 text-sm font-medium tracking-wide mb-2 uppercase">{category}</div>
          <div className="text-white text-2xl font-serif">{title}</div>
        </div>
      </div>
    </div>
  );
}
