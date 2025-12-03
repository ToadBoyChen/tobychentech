"use client";
import { useEffect, useState, useRef } from "react";
import HackerText from "./HackerText";

const sections = [
  { id: "intro", label: " " },
  { id: "about", label: "ABOUT ME" },
  { id: "stats", label: "SOME FACTS" },
  { id: "projects", label: "PROJECTS" },
  { id: "services", label: "SERVICES" },
  { id: "end", label: " " },
];

// ------------------------------------
export function useActiveSection(isReady: boolean) {
  const [activeSection, setActiveSection] = useState("intro");
  const observers = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    if (!isReady) return;

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

    const scan = () => {
        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });
    };

    scan();
    const timer = setTimeout(scan, 500);

    return () => {
        clearTimeout(timer);
        observer.disconnect();
    };

  }, [isReady]); 

  return activeSection;
}

export function useEarlyActiveSection(isReady: boolean) {
  const [earlyActiveSection, setEarlyActiveSection] = useState("intro");

  useEffect(() => {
    if (!isReady) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEarlyActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -25% 0px" } 
    );

    const scan = () => {
        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });
    };

    scan();
    const timer = setTimeout(scan, 500);

    return () => {
        clearTimeout(timer);
        observer.disconnect();
    };
  }, [isReady]);

  useEffect(() => {
    if (!isReady) return; 

    const handleScroll = () => {
      if (window.scrollY < 100 && earlyActiveSection !== "intro") {
        setEarlyActiveSection("intro");
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReady, earlyActiveSection]);

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

  const activeLabel = sections.find((s) => s.id === activeSection)?.label || "SYSTEM_READY";

  return (
    <div 
      className={`
        fixed z-50 
        transition-all duration-1000 ease-out 
        mix-blend-difference
    
        bottom-0 left-0 w-full h-12 flex items-center justify-between px-6

        md:top-0 md:bottom-auto md:left-auto md:right-0
        md:w-18 md:h-screen
        md:flex-col md:justify-center md:items-center md:px-0
        
        lg:w-24

        ${isVisible 
            ? "translate-y-0 opacity-100" 
            : "translate-y-10 md:translate-x-10 opacity-0 pointer-events-none"
        }
      `}
    >
        <div className="relative flex items-center justify-center">
            <span className={`
                uppercase mix-blend-difference whitespace-nowrap
                text-white font-black
                [writing-mode:horizontal-tb] md:[writing-mode:vertical-rl]
                text-md md:text-5xl lg:text-7xl
                tracking-widest md:tracking-[2vh] lg:tracking-[3vh]
            `}>
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
  );
}