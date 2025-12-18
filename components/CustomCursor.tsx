"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const { cursorText, cursorVariant } = useCursor();
  
  // 1. Track Mouse Position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. Smooth Spring Physics
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  // 3. Define Variants
  const variants = {
    default: {
      width: 0,
      height: 0, 
      opacity: 0, 
    },
    text: {
      width: 80,
      height: 80,
      opacity: 1,
      backgroundColor: "#ffba00",
      mixBlendMode: "normal" as const, // Ensure visibility on dark/light
    },
    button: {
      width: 0,
      height: 0,
      opacity: 0,
    }
  };

  return (
    <motion.div
      // Fixed z-index to z-[9999]
      className="fixed top-0 left-0 z-9999 pointer-events-none flex items-center justify-center rounded-full text-white font-black text-xs tracking-widest text-center"
      style={{
        translateX: "-50%",
        translateY: "-50%",
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      <AnimatePresence mode="wait">
        {cursorText && (
          <motion.span
            key={cursorText}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}