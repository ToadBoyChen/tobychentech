"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()<>?/-_=+[]{}|;:',. ";

type HackerTextProps = {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
  triggerOnHover?: boolean;
  speed?: number; 
  delay?: number;
  direction?: "ltr" | "rtl" | "center"; // New Prop
};

export default function HackerText({ 
  text, 
  className, 
  triggerOnMount = true, 
  triggerOnHover = true,
  speed = 40,
  delay = 0,
  direction = "ltr" // Default to Left-to-Right
}: HackerTextProps) {
  
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const startTime = Date.now();
    let isFinished = false;

    const tick = () => {
      if (isFinished) return;

      const now = Date.now();
      const elapsed = now - startTime;

      // Calculate how many characters *should* be revealed based on time
      const revealCount = Math.floor((elapsed - delay) / speed);

      const currentText = text
        .split("")
        .map((char, index) => {
          
          // --- DIRECTION LOGIC ---
          let shouldReveal = false;

          if (direction === "ltr") {
            // Left to Right: Reveal if index is low enough
            shouldReveal = index < revealCount;
          } 
          else if (direction === "rtl") {
            // Right to Left: Reveal if index is high enough
            // (e.g. if length is 10 and we revealed 3, show indices 7, 8, 9)
            shouldReveal = index >= text.length - revealCount;
          } 
          else if (direction === "center") {
            // Center Out: Calculate distance from middle
            const middle = text.length / 2;
            const distFromCenter = Math.abs(index - middle);
            // We divide revealCount by 2 because we are expanding in two directions
            shouldReveal = distFromCenter < revealCount / 2;
          }

          // If revealed, show real char. If not, show random char.
          if (shouldReveal) {
            return text[index];
          }
          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join("");

      setDisplayText(currentText);

      if (revealCount >= text.length) {
        isFinished = true;
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 30);

  }, [text, speed, delay, direction]);

  useEffect(() => {
    if (triggerOnMount) {
      startScramble();
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [triggerOnMount, startScramble, text]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <span 
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
}