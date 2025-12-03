"use client";
import { useEffect, useRef, useState } from "react";
import HackerText from "./HackerText";

type HackerHeaderProps = {
  text: string;
  lineSide?: "left" | "right";
  lineColor?: string;
  className?: string;
  speed?: number;
  delay?: number;
};

export default function HackerHeader({
  text,
  lineSide = "right",
  lineColor = "bg-zinc-600",
  className = "",
  speed = 40,
  delay = 0,
}: HackerHeaderProps) {
  
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

  return (
    <div ref={ref} className="flex items-center gap-4 w-full overflow-hidden font-mono text-sm uppercase tracking-widest">
      
      {lineSide === "left" && (
        <div
          className={`
            h-px flex-1 
            transition-transform duration-1000 ease-out delay-100 
            origin-right 
            ${lineColor}
            ${inView ? "scale-x-100" : "scale-x-0"}
          `}
        />
      )}

      <HackerText
        text={text}
        className={className}
        speed={speed}
        delay={delay}
        triggerOnMount={inView} 
        triggerOnHover={false}
      />

      {lineSide === "right" && (
        <div
          className={`
            h-px flex-1 
            transition-transform duration-1000 ease-out delay-200 
            origin-left 
            ${lineColor}
            ${inView ? "scale-x-100" : "scale-x-0"}
          `}
        />
      )}
    </div>
  );
}