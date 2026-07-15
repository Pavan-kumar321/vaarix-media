import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".portfolio-item")) {
        setIsHovering(true);
        document.body.classList.add("hovering-portfolio");
      } else {
        setIsHovering(false);
        document.body.classList.remove("hovering-portfolio");
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.body.classList.remove("hovering-portfolio");
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[99] hidden lg:flex items-center justify-center rounded-full mix-blend-difference"
      animate={{
        x: position.x - (isHovering ? 50 : 10),
        y: position.y - (isHovering ? 50 : 10),
        width: isHovering ? 100 : 20,
        height: isHovering ? 100 : 20,
        backgroundColor: isHovering ? "#fff" : "transparent",
        border: isHovering ? "none" : "2px solid #fff",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.5 }}
        className="text-[10px] font-bold tracking-widest text-black"
      >
        VIEW
      </motion.span>
    </motion.div>
  );
}
