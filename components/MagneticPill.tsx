import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useState } from "react";

interface MagneticPillProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0 to 1 (0.1 = stiff, 1.0 = loose following)
}

export default function MagneticPill({ 
  children, 
  className = "", 
  strength = 0.5 
}: MagneticPillProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // We use a slightly stiffer spring to make it snap back quickly when you let go
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseEnter = () => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rect) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = rect;

    // 1. Calculate the raw distance from the center of the element
    const rawX = clientX - (left + width / 2);
    const rawY = clientY - (top + height / 2);

    // 2. Apply the Magnetic Strength Factor
    // This constrains the movement so it doesn't just follow the mouse to infinity
    x.set(rawX * strength);
    y.set(rawY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setRect(null);
  };

  return (
    // PARENT WRAPPER: Keeps the layout space occupied (Relative)
    <div 
      className="relative inline-block isolate"
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* THE GHOST: 
        Invisible copy of children to force the parent container 
        to respect the width/height in the DOM flow.
      */}
      <div className={`invisible pointer-events-none ${className}`} aria-hidden="true">
        {children}
      </div>

      {/* THE MAGNETIC ELEMENT:
        Absolute positioned on top. This is the one that moves.
      */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        className={`absolute inset-0 z-50 flex items-center justify-center ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
};