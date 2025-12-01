"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HackerText from "./HackerText";

export default function ScrollTracker() {
  const [activeSection, setActiveSection] = useState("intro");
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: "intro", label: "Welcome" },
    { id: "about", label: "About" },
    { id: "stats", label: "Stats" },
    { id: "projects", label: "Work" },
    { id: "services", label: "Services" },
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

  const currentIndex = sections.findIndex((s) => s.id === activeSection);
  const currentNumber = (currentIndex + 1).toString().padStart(2, "0");
  const totalNumber = sections.length.toString().padStart(2, "0");
  const activeLabel = sections[currentIndex]?.label || "Loading";

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex flex-col items-end"
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >

      <div 
        className={`
          absolute bottom-full pb-4 flex flex-col gap-3 items-end transition-all duration-300 ease-out
          ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        {sections.map((section, idx) => (
          <Link
            key={section.id}
            href={`#${section.id}`}
            onClick={() => setIsMenuOpen(false)}
            className={`
              px-4 py-2 rounded-lg
              text-xs font-mono transition-all duration-200 shadow-lg
              hover:scale-110 hover:shadow-2xl
              ${activeSection === section.id 
                ? "bg-zinc-900 text-white" 
                : "bg-white text-zinc-500"}
            `}
          >
            <span className="font-sans">
              {section.label} <span className="font-mono text-zinc-400">{(idx + 1).toString().padStart(2, "0")}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="relative overflow-hidden bg-white/90 backdrop-blur-xl  p-1 rounded-2xl shadow-2xl transition-all duration-300 cursor-default">
        
        <div className="flex items-center gap-4 px-4 py-2 rounded-xl">
          
          {/* <div className="flex flex-col items-end">
             <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Section
             </span>
             <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-zinc-900">
                    {currentNumber}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                    / {totalNumber}
                </span>
             </div>
          </div>

          <div className="w-px h-8 bg-zinc-200" /> */}

          <div className="flex flex-col items-start min-w-[80px]">
             {/* <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Current
             </span> */}
             
             <div className="text-sm font-bold text-zinc-800 tracking-tight h-5 overflow-hidden flex items-center">
               <HackerText 
                  key={activeLabel} 
                  text={activeLabel}
                  speed={50}
                  triggerOnMount={true}
                  triggerOnHover={false} 
                  className="whitespace-nowrap"
               />
             </div>
          </div>

          <div className="relative w-8 h-8 flex items-center justify-center">
             <svg className="w-full h-full -rotate-90">
                <circle cx="16" cy="16" r="14" stroke="#e4e4e7" strokeWidth="3" fill="none" />
                <circle 
                  cx="16" cy="16" r="14" 
                  stroke="#18181b" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="88" 
                  strokeDashoffset={88 - (88 * ((currentIndex + 1) / sections.length))} 
                  className="transition-all duration-500 ease-out"
                />
             </svg>
          </div>

        </div>
      </div>

    </div>
  );
}