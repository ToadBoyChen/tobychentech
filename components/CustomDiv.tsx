"use client";
import { useEffect, useRef, useState } from "react";
import MagneticPill from "@/components/MagneticPill"; 

interface SectionHeaderProps {
  label: string;
  lineColor?: string;
  textColor?: string;
}

export default function SectionHeader({
  label,
  lineColor = "bg-zinc-600",
  textColor = "text-zinc-900",
}: SectionHeaderProps) {
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
    <div
      ref={ref}
      className="flex items-center gap-4 w-full overflow-visible isolate"
    >
      {/* Left Line */}
      <div
        className={`
          h-1 rounded-full flex-1 
          origin-right 
          transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${lineColor}
          ${inView ? "scale-x-100" : "scale-x-0"}
        `}
      />

      {/* Central Magnetic Pill Wrapper */}
      <div
        className={`
          transition-opacity duration-700 delay-300 z-10
          flex items-center justify-center
          ${inView ? "opacity-100" : "opacity-0"}
        `}
      >
        <MagneticPill
          strength={0.5}
          className={`
            px-4 py-3 rounded-full 
            tracking-widest font-mono uppercase text-xs
            flex items-center justify-center
            ${lineColor} ${textColor}
          `}
        >
          <span className="relative z-10 pointer-events-none">
            {label}
          </span>
        </MagneticPill>
      </div>

      {/* Right Line */}
      <div
        className={`
          h-1 rounded-full flex-1 
          origin-left 
          transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${lineColor}
          ${inView ? "scale-x-100" : "scale-x-0"}
        `}
      />
    </div>
  );
}