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
    <div className="flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-6 z-50">
      
      {sections.map(({ id, label }) => (
        <Link
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-3 justify-end"
        >
          <span 
            className={`
              text-sm font-medium transition-colors duration-300
              ${activeSection === id ? "text-zinc-900" : "text-zinc-300 group-hover:text-zinc-500"}
            `}
          >
            {label}
          </span>
          
          {/* The little indicator line */}
          <div 
            className={`
              h-px transition-all duration-300 bg-zinc-900
              ${activeSection === id && activeSection !== "intro" ? "w-8" : "w-0 opacity-0"} 
            `}
          />
        </Link>
      ))}
    </div>
  );
}