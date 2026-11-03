import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
const videos = import.meta.glob<string>("../assets/portfolio/videos/*.{mp4,webm,MP4,WEBM}", { eager: true, query: "?url", import: "default" });
const posters = import.meta.glob<string>("../assets/portfolio/video-posters/*.webp", { eager: true, query: "?url", import: "default" });
const posterByStem = Object.fromEntries(Object.entries(posters).map(([path, url]) => [(path.split("/").pop() ?? "").replace(/\.[^.]+$/, ""), url]));
const titles: Record<string, string> = {
  "Bharat Bhavan Influencerr": "Bharat Bhavan · Influencer feature",
  "Bharat Bhavann": "Bharat Bhavan",
  "Empire state towers": "Empire State Towers",
  "Festive theme Bharat Bhavan": "Bharat Bhavan · Festive campaign",
  "M N M": "MNM Lounge · Brand film",
  "MNM loungee": "MNM Lounge",
  "Velvet cloud": "Velvet Cloud",
};
const entries = Object.entries(videos).map(([path, src], index) => {
  const stem = (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "");
  return { src, poster: posterByStem[stem], title: titles[stem] ?? `Video project ${index + 1}` };
});
function VideoCard({ entry, active, onPlay, onStop }: { entry: typeof entries[number]; active: boolean; onPlay: () => void; onStop: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!active || !video) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) video.pause(); }, { threshold: 0.15 });
    observer.observe(video);
    const pauseWhenHidden = () => { if (document.hidden) video.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseWhenHidden); };
  }, [active]);
  return <article className="min-w-0">
    <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-secondary">
      {active ? <video ref={ref} src={entry.src} controls autoPlay playsInline preload="none" className="h-full w-full object-contain" aria-label={entry.title} onEnded={onStop}/> :
        <button type="button" onClick={onPlay} className="video-cover relative flex h-full w-full flex-col items-center justify-center gap-5 px-4 text-center" aria-label={`Play ${entry.title}`}>
          <img src={entry.poster} alt="" loading="lazy" decoding="async" width={480} height={854} className="absolute inset-0 h-full w-full object-cover"/>
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-sm"><Play className="ml-1" size={24}/></span>


        </button>}
    </div>
  </article>;
}
export function VideoShowcase() {
  const [active, setActive] = useState<string | null>(null);
  return <section id="video-portfolio" className="bg-background py-14 md:py-20">
    <div className="container mx-auto px-5 md:px-12">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">In motion</p>
        <h2 className="mt-3 font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">Content that <span className="italic text-primary">moves</span> people.</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">Explore our films, reels, and restaurant campaigns. Choose a video to watch.</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {entries.map(entry => <VideoCard key={entry.src} entry={entry} active={active === entry.src} onPlay={() => setActive(entry.src)} onStop={() => setActive(null)}/>)}
      </div>
    </div>
  </section>;
}
