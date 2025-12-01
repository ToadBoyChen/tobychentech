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
};

export default function HackerText({ 
  text, 
  className, 
  triggerOnMount = true, 
  triggerOnHover = true,
  speed = 40,
  delay = 0 
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

      const revealCount = Math.floor((elapsed - delay) / speed);

      const currentText = text
        .split("")
        .map((char, index) => {
          if (index < revealCount) {
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

  }, [text, speed, delay]);

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