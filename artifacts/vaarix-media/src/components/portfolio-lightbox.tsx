import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioEntry } from "./portfolio-item";

interface LightboxProps {
  items: PortfolioEntry[];
  index: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PortfolioLightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const isOpen = index !== null;
  const item = index !== null ? items[index] : null;

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    const root = document.getElementById("root");
    root?.setAttribute("inert", "");
    dialogRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close"]')?.focus();
    return () => { root?.removeAttribute("inert"); previous?.focus(); };
  }, [isOpen]);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    if (index === null) return;
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [index, handleKey]);

  return createPortal(
    <AnimatePresence>
      {index !== null && item && (
        <motion.div
          ref={dialogRef}
          onKeyDown={(event) => {
            if (event.key !== "Tab") return;
            const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button");
            if (!buttons?.length) return;
            const first = buttons[0], last = buttons[buttons.length - 1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Artwork preview"
          key="lightbox-backdrop"
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          {/* Blurred background */}
          <div className="absolute inset-0 bg-background/95" />

          {/* Panel */}
          <motion.div
            key={`lightbox-item-${index}`}
            className="relative z-10 w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media */}
            <div className="relative rounded-[1.5rem] overflow-hidden bg-card aspect-square sm:aspect-video border border-border shadow-2xl">
              {item.video ? (
                <video
                  key={item.video}
                  src={item.video}
                  poster={item.poster}
                  autoPlay
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={item.poster}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Info bar */}
            <div className="mt-5 flex items-center justify-between px-1">
              <div>
                <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest mb-1">
                  {item.category}
                </p>
                <h3 className="text-foreground font-serif text-2xl font-medium">
                  {item.title}
                </h3>
              </div>
              <div className="text-muted-foreground text-sm font-medium tabular-nums">
                {(index ?? 0) + 1} / {items.length}
              </div>
            </div>
          </motion.div>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-card border border-border text-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:scale-110"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border text-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:scale-110 md:left-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-card border border-border text-foreground backdrop-blur-sm transition-all hover:bg-secondary hover:scale-110 md:right-6"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
