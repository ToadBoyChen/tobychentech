"use client";
import { useEffect, useRef, useState } from "react";

type NatureTextProps = {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
  triggerOnHover?: boolean;
  speed?: number; 
  delay?: number;
  // NEW PROP: Allows parent to control hover state
  forceHoverState?: boolean; 
};

export default function NatureText({
  text,
  className = "",
  triggerOnMount = true,
  triggerOnHover = true,
  speed = 40,
  delay = 0,
  forceHoverState, // Destructure new prop
}: NatureTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [internalHover, setInternalHover] = useState(false); // Renamed for clarity
  
  const elementRef = useRef<HTMLSpanElement>(null);

  // Determine effective hover state: Prop takes priority over internal state
  const isHovered = forceHoverState !== undefined ? forceHoverState : internalHover;

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

  const handleMouseEnter = () => {
    if (triggerOnHover && forceHoverState === undefined) {
      setInternalHover(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOnHover && forceHoverState === undefined) {
      setInternalHover(false);
    }
  };

  const characters = text.split("");

  return (
    <span
      ref={elementRef}
      className={`inline-block relative cursor-default py-2 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
    >
      {characters.map((char, index) => {
        const entranceDelay = `${index * speed}ms`;
        const waveDelay = `${index * 30}ms`; 

        return (
          <span
            key={index}
            className="inline-block whitespace-pre transition-all duration-500 ease-[cubic-bezier(0.2,0.65,0.3,0.9)] will-change-transform"
            style={{
              opacity: isVisible ? 1 : 0,
              filter: isVisible ? "blur(0px)" : "blur(8px)",
              
              transform: isVisible
                ? isHovered
                  ? "translateY(-6px) rotate(3deg) scale(1.1)" 
                  : "translateY(0) rotate(0deg) scale(1)"      
                : "translateY(15px) rotate(4deg) scale(0.9)", 

              transitionDelay: isVisible 
                ? (isHovered ? waveDelay : "0ms") 
                : entranceDelay,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}