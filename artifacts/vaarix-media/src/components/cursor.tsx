import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type CursorState = "default" | "button" | "portfolio" | "video";

export function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>("default");

  // We track the cursor state via data-cursor attributes and element classes
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest(".portfolio-item")) {
        setState("portfolio");
        document.body.classList.add("hovering-portfolio");
      } else if (
        target.closest("video") ||
        target.closest("[data-cursor='video']")
      ) {
        setState("video");
        document.body.classList.remove("hovering-portfolio");
      } else if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        setState("button");
        document.body.classList.remove("hovering-portfolio");
      } else {
        setState("default");
        document.body.classList.remove("hovering-portfolio");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("hovering-portfolio");
    };
  }, []);

  const size = state === "portfolio" ? 96 : state === "video" ? 80 : state === "button" ? 36 : 20;
  const label = state === "portfolio" ? "VIEW" : state === "video" ? "PLAY" : "";
  const showLabel = state === "portfolio" || state === "video";

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99] hidden lg:flex items-center justify-center rounded-full mix-blend-difference"
      animate={{
        x: pos.x - size / 2,
        y: pos.y - size / 2,
        width: size,
        height: size,
        backgroundColor: showLabel ? "#ffffff" : "transparent",
        border: showLabel ? "none" : "2px solid #fff",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: showLabel ? 1 : 0,
          scale: showLabel ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
        className="text-[10px] font-bold tracking-widest text-black"
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
