"use client";
import { useEffect, useState, useRef } from "react";
import HackerText from "./HackerText"; // Ensure this path is correct for your setup

const sections = [
  { id: "intro", label: " " },
  { id: "about", label: "ABOUT ME" },
  { id: "stats", label: "STATISTICS" },
  { id: "projects", label: "PROJECTS" },
  { id: "services", label: "SERVICES" },
  { id: "end", label: " " },
];

// ------------------------------------
// 1. ROBUST TRACKER (Winner Takes All)
// ------------------------------------
// NOW ACCEPTS 'isReady' argument
export function useActiveSection(isReady: boolean) {
  const [activeSection, setActiveSection] = useState("intro");
  const observers = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    // STOP if the page isn't ready (loading screen still up)
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

    // Helper to find elements with retry logic
    const scan = () => {
        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });
    };

    // Run immediately
    scan();
    
    // Safety retry (just in case)
    const timer = setTimeout(scan, 500);

    return () => {
        clearTimeout(timer);
        observer.disconnect();
    };

  // RE-RUN this effect when isReady changes to true
  }, [isReady]); 

  return activeSection;
}

// ------------------------------------
// 2. EARLY TRIGGER HOOK (Animations)
// ------------------------------------
// NOW ACCEPTS 'isReady' argument
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

  // Scroll to top reset logic
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

// ------------------------------------
// 3. VISUAL COMPONENT
// ------------------------------------
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