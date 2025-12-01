"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()<>?/-_=+[]{}|;:',. ";

type HackerTextProps = {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
  triggerOnHover?: boolean; // <--- Re-added this prop
  speed?: number; 
  delay?: number; 
};

export default function HackerText({ 
  text, 
  className, 
  triggerOnMount = true, 
  triggerOnHover = true, // Default to true so it works on other parts of the site
  speed = 40,
  delay = 0 
}: HackerTextProps) {
  
  const [displayText, setDisplayText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // We wrap the scramble logic in useCallback so we can run it 
  // both on Mount AND on Hover.
  const startScramble = useCallback(() => {
    // 1. Clean up any existing animation to prevent glitches if the user hovers rapidly
    if (intervalRef.current) clearInterval(intervalRef.current);

    const startTime = Date.now();
    let isFinished = false;

    const tick = () => {
      if (isFinished) return;

      const now = Date.now();
      const elapsed = now - startTime;

      // Calculate progress
      const revealCount = Math.floor((elapsed - delay) / speed);

      // Generate text state
      const currentText = text
        .split("")
        .map((char, index) => {
          // If solved, show real char
          if (index < revealCount) {
            return text[index];
          }
          // If waiting for delay or not solved yet, show random char
          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        })
        .join("");

      setDisplayText(currentText);

      // Check if finished
      if (revealCount >= text.length) {
        isFinished = true;
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }
    };

    // Start the chaos loop
    intervalRef.current = setInterval(tick, 30);

  }, [text, speed, delay]);

  // 1. Handle Mount
  useEffect(() => {
    if (triggerOnMount) {
      startScramble();
    } else {
      setDisplayText(text); // If mount trigger is off, show static text immediately
    }

    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [triggerOnMount, startScramble, text]);

  // 2. Handle Hover
  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <span 
      className={className}
      onMouseEnter={handleMouseEnter} // Attach the event listener
    >
      {displayText}
    </span>
  );
}