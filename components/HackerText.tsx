"use client";
import { useEffect, useState, useRef } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

type HackerTextProps = {
  text: string;
  className?: string;
  triggerOnMount?: boolean; // Run when component loads?
  triggerOnHover?: boolean; // Run when mouse goes over?
  speed?: number;           // How fast the characters cycle (ms)
};

export default function HackerText({ 
  text, 
  className, 
  triggerOnMount = true, 
  triggerOnHover = true, 
  speed = 30 
}: HackerTextProps) {
  
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length;

    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return LETTERS[Math.floor(Math.random() * LETTERS.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iteration += 1 / 3; 
    }, speed);
  };

  useEffect(() => {
    if (triggerOnMount) {
      scramble();
    }
  }, []);

  const handleMouseEnter = () => {
    if (triggerOnHover) {
      scramble();
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