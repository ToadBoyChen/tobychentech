"use client";
import { useEffect, useRef, useState } from "react";

interface SectionHeaderProps {
  label: string;
  lineColor?: string;
  textColor?: string;
}

export default function SectionHeader({ 
  label, 
  lineColor = "bg-zinc-600",
  textColor = "text-zinc-900" 
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
    <div ref={ref} className="flex items-center gap-4 w-full overflow-hidden">
      
      {/* Left Line - Tapers to the Left */}
      <div 
        className={`
          h-1 rounded-full flex-1 
          origin-right 
          transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] 
          ${lineColor}
          ${inView ? "scale-x-100" : "scale-x-0"}
        `} 
      />
      
      {/* Label Text */}
      <span 
        className={`
          tracking-widest font-mono uppercase ${lineColor} text-xs px-4 rounded-full 
          transition-opacity duration-700 delay-300
          ${textColor}
          ${inView ? "opacity-100" : "opacity-0"}
        `}
      >
        {label}
      </span>
      
      {/* Right Line - Tapers to the Right */}
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