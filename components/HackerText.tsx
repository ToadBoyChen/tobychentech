"use client";
import { useEffect, useRef, useState } from "react";

type NatureTextProps = {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
  triggerOnHover?: boolean;
  speed?: number; 
  delay?: number; 
};

export default function NatureText({
  text,
  className = "",
  triggerOnMount = true,
  triggerOnHover = true,
  speed = 40,
  delay = 0,
}: NatureTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  // State to track if we are currently hovering
  const [isHovered, setIsHovered] = useState(false);
  
  const elementRef = useRef<HTMLSpanElement>(null);

  // 1. Entrance Logic
  useEffect(() => {
    if (!triggerOnMount) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnMount, delay]);

  // 2. Interaction Handlers
  const handleMouseEnter = () => {
    if (triggerOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOnHover) {
      setIsHovered(false);
    }
  };

  const characters = text.split("");

  return (
    <span
      ref={elementRef}
      className={`inline-block relative cursor-default ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} // Add the leave handler here
      aria-label={text}
    >
      {characters.map((char, index) => {
        const entranceDelay = `${index * speed}ms`;
        
        // Stagger the wave so they rise one by one on hover
        const waveDelay = `${index * 30}ms`; 

        return (
          <span
            key={index}
            className="inline-block whitespace-pre transition-all duration-500 ease-[cubic-bezier(0.2,0.65,0.3,0.9)]"
            style={{
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? "blur(0px)" : "blur(8px)",
              
              transform: isVisible
                ? isHovered
                  ? "translateY(-6px) rotate(3deg) scale(1.1)" // Position HELD while hovering
                  : "translateY(0) rotate(0deg) scale(1)"      // Return to rest
                : "translateY(15px) rotate(4deg) scale(0.9)", 

              // Use waveDelay when hovering to ripple up, entranceDelay otherwise
              transitionDelay: isHovered ? waveDelay : entranceDelay,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}