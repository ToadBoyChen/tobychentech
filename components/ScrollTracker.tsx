"use client";
import { useEffect, useState, useRef } from "react";
import HackerText from "./HackerText";

const sections = [
  { id: "intro", label: " " },
  { id: "about", label: "ABOUT ME" },
  { id: "stats", label: "STATISTICS" },
  { id: "projects", label: "PROJECTS" },
  { id: "services", label: "SERVICES" },
  { id: "end", label: " " },
];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("intro");
  const observers = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        observers.current.set(entry.target.id, entry);
      });

      let maxVisibleHeight = 0;
      let winnerId = "";

      observers.current.forEach((entry) => {
        if (entry.isIntersecting) {
          const visibleHeight = entry.intersectionRect.height;
          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            winnerId = entry.target.id;
          }
        }
      });

      if (winnerId) setActiveSection(winnerId);
    };

    const observer = new IntersectionObserver(callback, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: "-10% 0px -10% 0px", 
    });

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

export function useEarlyActiveSection() {
  const [earlyActiveSection, setEarlyActiveSection] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEarlyActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px" } 
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100 ) {
        setEarlyActiveSection("intro");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return earlyActiveSection;
}

interface ScrollTrackerProps {
    activeSection: string;
}

export default function ScrollTracker({ activeSection }: ScrollTrackerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (activeSection !== "intro") setIsVisible(true);
    else setIsVisible(false);
  }, [activeSection]);

  const activeLabel = sections.find((s) => s.id === activeSection)?.label || "LOADING";

  return (
    <div 
      className={`
        fixed right-2 top-1/2 -translate-y-1/2 
        h-[85vh] flex flex-col items-center justify-between
        transition-all duration-1000 ease-out mix-blend-difference text-white z-50
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