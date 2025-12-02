"use client";
import { useEffect, useState } from "react";
import HackerText from "./HackerText";

export default function ScrollTracker() {
  const [activeSection, setActiveSection] = useState("intro");
  
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: "intro", label: " " },
    { id: "about", label: "ABOUT ME" },
    { id: "stats", label: "STATISTICS" },
    { id: "projects", label: "PROJECTS" },
    { id: "services", label: "SERVICES" },
    { id: "end", label: " " },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeSection !== "intro") setIsVisible(true);
  }, [activeSection]);

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const activeLabel = sections[currentIndex]?.label || "LOADING";

  return (
    <div 
      className={`
        fixed right-2 top-1/2 -translate-y-1/2 
        h-[85vh] flex flex-col items-center justify-between
        transition-all duration-1000 ease-out mix-blend-difference text-white z-100
        ${isVisible 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-10 pointer-events-none"
        }
      `}
    >
      <div className="absolute top-1/2 -translate-y-1/2 right-0 h-[60vh] flex items-center justify-center">
         <div style={{ writingMode: 'vertical-rl' }}>
            <span className="font-black text-6xl tracking-[3vh] uppercase whitespace-nowrap">
                <HackerText 
                    key={activeLabel}
                    text={activeLabel}
                    speed={40}
                    triggerOnMount={true}
                    triggerOnHover={false} 
                />
            </span>
         </div>
      </div>
    </div>
  );
}