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
  direction?: "ltr" | "rtl" | "center";
};

export default function HackerText({ 
  text, 
  className, 
  triggerOnMount = true, 
  triggerOnHover = true,
  speed = 40,
  delay = 0,
  direction = "ltr"
}: HackerTextProps) {
  
  const [displayText, setDisplayText] = useState(text);
  const [hasPlayed, setHasPlayed] = useState(false); // Track if animation has run once
  
  // 1. REF: We need a reference to the DOM element to observe it
  const elementRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const startTime = Date.now();
    let isFinished = false;

    const tick = () => {
      if (isFinished) return;

      const now = Date.now();
      const elapsed = now - startTime;

      const revealCount = Math.floor((elapsed - delay) / speed);

      const currentText = text
        .split("")
        .map((char, index) => {
          
          let shouldReveal = false;
          if (direction === "ltr") shouldReveal = index < revealCount;
          else if (direction === "rtl") shouldReveal = index >= text.length - revealCount;
          else if (direction === "center") {
            const middle = text.length / 2;
            const distFromCenter = Math.abs(index - middle);
            shouldReveal = distFromCenter < revealCount / 2;
          }

          if (shouldReveal) return text[index];
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

  // 2. INTERSECTION OBSERVER LOGIC
  useEffect(() => {
    // If triggerOnMount is false, we just set the text and do nothing else
    if (!triggerOnMount) {
      setDisplayText(text);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Run ONLY if it enters viewport AND hasn't played yet
        if (entry.isIntersecting && !hasPlayed) {
          startScramble();
          setHasPlayed(true); // Mark as played so it doesn't re-run when scrolling back up
          observer.disconnect(); // Stop observing to save resources
        }
      },
      { threshold: 0.2 } // Trigger when 10% of the text is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnMount, startScramble, hasPlayed, text]);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      startScramble();
    }
  };

  return (
    <span 
      ref={elementRef} // Attach ref here
      className={className}
      onMouseEnter={handleMouseEnter}
    >
      {displayText}
    </span>
  );
}