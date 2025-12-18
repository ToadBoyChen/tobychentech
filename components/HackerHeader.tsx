"use client";
import { useEffect, useRef, useState } from "react";
import MagneticPill from "@/components/MagneticPill"; 
import HackerText from "./HackerText";

type HackerHeaderProps = {
  title?: string;
  text?: string;
  prefix1?: string;
  prefix2?: string; 
  prefix3?: string;
  lineSide?: "left" | "right";
  className?: string;
  speed?: number;
  delay?: number;
  bgColour?: string;
};

export default function HackerHeader({
  title,
  text,
  prefix1,
  prefix2,
  prefix3,
  lineSide = "right",
  className = "",
  speed = 40,
  delay = 0,
  bgColour = "bg-lime-600",
}: HackerHeaderProps) {
  
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const displayTitle = title || text || ""; 

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);
  const pillClass = `${className} ${bgColour} px-4 rounded-full text-xs inline-flex items-center justify-center font-mono tracking-widest uppercase select-none`;

  return (
    <div ref={ref} className={`flex items-center gap-4 w-full overflow-visible isolate`}>
      
      {/* Left Line */}
      {lineSide === "left" && (
        <div
          className={`
            flex-1 
            transition-transform duration-1000 ease-out delay-100 
            origin-right 
            h-1 rounded-full
            ${bgColour}
            ${inView ? "scale-x-100" : "scale-x-0"}
          `}
        />
      )}

      {/* Prefix 1 */}
      {prefix1 && (
        <MagneticPill strength={0.3} className={pillClass}>
             {prefix1}
        </MagneticPill>
      )}

      {/* Prefix 2 */}
      {prefix2 && (
        <MagneticPill strength={0.3} className={pillClass}>
             {prefix2}
        </MagneticPill>
      )}

      {/* Prefix 3 */}
      {prefix3 && (
        <MagneticPill strength={0.3} className={pillClass}>
             {prefix3}
        </MagneticPill>
      )}

      {/* Main Title */}
      <MagneticPill strength={0.3} className={pillClass}>
        <HackerText
          text={displayTitle}
          speed={speed}
          delay={delay}
          triggerOnMount={inView} 
          triggerOnHover={false}
          className=""
        />
      </MagneticPill>

      {/* Right Line */}
      {lineSide === "right" && (
        <div
          className={`
            flex-1 
            transition-transform duration-1000 ease-out delay-200 
            origin-left 
            h-1 rounded-full
            ${bgColour}
            ${inView ? "scale-x-100" : "scale-x-0"}
          `}
        />
      )}
    </div>
  );
} 