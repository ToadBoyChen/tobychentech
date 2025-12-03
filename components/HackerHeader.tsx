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
  size?: "small" | "large";
  variant?: "default" | "light" | "dark"; // <--- New Variant Prop
};

export default function HackerHeader({
  text,
  lineSide = "right",
  lineColor,
  className = "",
  speed = 40,
  delay = 0,
  size = "small",
  variant = "default",
}: HackerHeaderProps) {
  
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  let finalLineColor = lineColor || "bg-zinc-600";
  let variantTextColor = "";

  if (variant === "light") {
    variantTextColor = "text-stone-50"; 
    if (!lineColor) finalLineColor = "bg-stone-50";
  } 
  else if (variant === "dark") {
    variantTextColor = "text-zinc-900"; 
    if (!lineColor) finalLineColor = "bg-zinc-900";
  }

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

  const containerStyles = size === "large" 
    ? "font-mono text-xl uppercase tracking-widest"
    : "font-mono text-md uppercase tracking-widest";

  return (
    <div ref={ref} className={`flex items-center gap-4 w-full overflow-hidden ${containerStyles}`}>
      {lineSide === "left" && (
        <div
          className={`
            flex-1 
            transition-transform duration-1000 ease-out delay-100 
            origin-right 
            h-px
            ${finalLineColor}
            ${inView ? "scale-x-100" : "scale-x-0"}
          `}
        />
      )}
      <HackerText
        text={text}
        className={`${variantTextColor} ${className}`} 
        speed={speed}
        delay={delay}
        triggerOnMount={inView} 
        triggerOnHover={false}
      />

      {lineSide === "right" && (
        <div
          className={`
            flex-1 
            transition-transform duration-1000 ease-out delay-200 
            origin-left 
            h-px
            ${finalLineColor}
            ${inView ? "scale-x-100" : "scale-x-0"}
          `}
        />
      )}
    </div>
  );
}