"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Me from "@/public/me.jpg"; 

const TECH_DATA: Record<string, { description: string; projects: string[] }> = {
  React: {
    description: "My core library for UI development. I specialize in component architecture, custom hooks, and performance optimization.",
    projects: ["This Portfolio", "SaaS Dashboard V2", "E-commerce Front"]
  },
  "Next.js": {
    description: "The framework I use for full-stack production apps. Deep experience with App Router, SSR, and Server Actions.",
    projects: ["Client Marketing Site", "Internal Tools"]
  },
  TypeScript: {
    description: "I don't write JavaScript without it. I focus on strict typing and generic patterns to ensure codebase scalability.",
    projects: ["Financial Algo Library", "Type-Safe API Wrapper"]
  },
  Python: {
    description: "Used for backend logic, data analysis, and automation scripts. My go-to for LeetCode and Math problems.",
    projects: ["Data Scraper", "Automation Bot"]
  },
  Tailwind: {
    description: "My preferred styling engine for rapid, responsive design implementation.",
    projects: ["All recent projects"]
  },
  "Node.js": {
    description: "Backend runtime environment for building scalable APIs and microservices.",
    projects: ["Chat Server", "Auth Service"]
  },
  PostgreSQL: {
    description: "Relational database management for structured data storage.",
    projects: ["User Management System", "Inventory DB"]
  },
  AWS: {
    description: "Cloud infrastructure deployment and management services.",
    projects: ["Serverless API", "S3 Image Uploads"]
  }
};

export default function Card() {
  // 1. STATE: Modal Logic
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  
  // 2. STATE: Scroll Animation Logic
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  // 3. EFFECT: Observe when the photo enters the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animation when 30% of the card is visible
        if (entry.isIntersecting) {
          setIsPhotoVisible(true);
        }
      },
      { threshold: 0.3 } 
    );

    if (photoRef.current) {
      observer.observe(photoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full max-w-6xl px-6 py-32 relative">
      
      {/* --- MODAL (POPUP WINDOW) --- */}
      {selectedTech && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedTech(null)}
        >
            <div 
                className="bg-white w-full max-w-lg border-2 border-zinc-900 shadow-2xl p-8 relative overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                        SYS_INFO // {selectedTech.toUpperCase()}
                    </span>
                    <button 
                        onClick={() => setSelectedTech(null)}
                        className="text-zinc-400 hover:text-zinc-900 transition-colors font-mono text-xs hover:underline"
                    >
                        [CLOSE_WINDOW]
                    </button>
                </div>

                {/* Body */}
                <h3 className="text-4xl font-black text-zinc-900 mb-4 tracking-tighter">
                    {selectedTech}
                </h3>
                <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                    {TECH_DATA[selectedTech]?.description}
                </p>

                {/* Project List */}
                <div>
                    <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3 block">
                        Related_Executables
                    </span>
                    <div className="flex flex-col gap-2">
                        {TECH_DATA[selectedTech]?.projects.map((proj, i) => (
                            <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                <span className="text-zinc-300 font-mono text-xs">0{i+1}</span>
                                <span className="text-zinc-800 font-bold border-b border-transparent group-hover:border-zinc-900 transition-all">
                                    {proj}
                                </span>
                                <span className="text-zinc-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs">
                                    →
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decoration */}
                <div 
                    className="absolute top-0 right-0 w-32 h-32 opacity-5 pointer-events-none" 
                    style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "8px 8px" }} 
                />
            </div>
        </div>
      )}

      <div className="flex items-center gap-6 mb-16">
        <div className="h-px bg-zinc-600 flex-1" />
        <span className="font-mono text-sm text-zinc-800 uppercase tracking-widest">
          01 // About_Me
        </span>
        <div className="h-px bg-zinc-600 flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        
        <div className="md:col-span-2 bg-zinc-100 p-8 md:p-12 flex flex-col justify-between group hover:scale-103 transition-all duration-300 ease-out min-h-[400px]">
            <div>
                <h3 className="text-4xl md:text-5xl font-black text-zinc-900 mb-8 tracking-tighter leading-[0.95]">
                    Engineering clarity <br /> from chaos.
                </h3>
                
                <p className="text-zinc-500 leading-relaxed text-lg font-medium max-w-lg">
                    I don't just write code; I solve <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all">logic puzzles</span>. 
                    With a background in Mathematics and competitive Kickboxing, I bring a unique blend of disciplined precision and aggressive problem-solving to web development.
                </p>
            </div>
            
            <div className="mt-12 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 group-hover:text-zinc-900 transition-colors">
                <span>STATUS: STUDENT</span>
                <span className="h-px bg-current flex-1 opacity-20" />
                <span>TYPE: MATHEMATICS</span>
            </div>
        </div>

        <div 
            ref={photoRef}
            className="md:col-span-1 md:row-span-2 relative overflow-hidden bg-zinc-900 h-[600px] md:h-auto min-h-[600px] group"
        >
            {/* Image: Default Grayscale. Turns Color + Scales Up when scrolled into view */}
            <Image 
                src={Me} 
                alt="Toby Chen" 
                fill 
                className={`
                    object-cover object-center transition-all duration-[1.5s] ease-out
                    ${isPhotoVisible ? "grayscale-0 scale-105" : "grayscale scale-100"}
                `}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80" />

            <div className={`
                absolute bottom-8 left-8 transition-all duration-1000 delay-300
                ${isPhotoVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}>
                <p className="text-white font-black text-5xl md:text-6xl tracking-tighter leading-none mb-2">
                    TOBY <br/> CHEN
                </p>
                <p className="text-zinc-400 text-xs font-mono tracking-widest border-t border-zinc-700 pt-3 mt-3 inline-block">
                    UK // LONDON
                </p>
            </div>
        </div>

        <div className="md:col-span-2 duration-300 bg-zinc-100 p-8 flex flex-col gap-6 overflow-hidden hover:scale-103 transition-all ease-out relative min-h-[250px]">
             <div className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2 group-hover:text-zinc-900 transition-colors">
                Stack_Inventory
             </div>

             <div className="flex flex-wrap gap-2 font-mono text-sm text-zinc-600 relative z-10">
                {Object.keys(TECH_DATA).map((tech) => (
                    <button 
                        key={tech}
                        onClick={() => setSelectedTech(tech)}
                        className="
                            px-4 py-2 bg-zinc-100 rounded-lg 
                            font-bold transition-all duration-300 cursor-pointer
                            hover:bg-zinc-900 hover:text-white  hover:shadow-lg
                        "
                    >
                        {tech}
                    </button>
                ))}
             </div>
             
             <div 
                className="absolute right-0 bottom-0 w-300 h-16 opacity-15" 
                style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "8px 8px" }} 
             />
        </div>

      </div>
    </section>
  );
}