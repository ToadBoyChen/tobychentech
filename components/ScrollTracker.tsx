"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ScrollTracker() {
  const [activeSection, setActiveSection] = useState("");

  const sections = [
    { id: "intro", label: "" },
    { id: "about", label: "About" },
    { id: "stats", label: "Statistics" },
    { id: "projects", label: "Projects" },
    { id: "services", label: "Services" },
    // { id: "contact", label: "Contact" }, 
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
      {
        rootMargin: "-20% 0px -50% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
      
      {sections.map(({ id, label }, index) => {
        if (!label) return null;

        const formattedId = index.toString().padStart(2, '0');

        return (
          <Link
            key={id}
            href={`#${id}`}
            className="group flex items-center gap-4 justify-end cursor-pointer"
          >
            {/* 1. THE LABEL (Now First/Left) */}
            <span 
              className={`
                text-sm font-medium transition-colors duration-300 text-right
                ${activeSection === id ? "text-zinc-900" : "text-zinc-400"}
              `}
            >
              {label}
            </span>
            
            {/* 2. THE LINE INDICATOR (Now Middle) */}
            <div 
              className={`
                h-px bg-zinc-900 transition-all duration-300
                ${activeSection === id ? "w-4" : "w-0 opacity-0"} 
              `}
            />

            {/* 3. THE NUMBER ID (Now Last/Right) */}
            <span 
              className={`
                font-mono text-xs transition-colors duration-300
                ${activeSection === id 
                  ? "text-zinc-900 font-bold" 
                  : "text-zinc-400 group-hover:text-blue-600"} 
              `}
            >
              {formattedId}
            </span>

          </Link>
        );
      })}
    </div>
  );
}