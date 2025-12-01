"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Me from "@/public/me.jpg"; 
import HackerText from "../HackerText";

const METRICS = [
  { label: "CORE FOCUS", value: "FULLSTACK" },
  { label: "CURRENTLY BASED IN", value: "LDN, UK" },
  { label: "EXPERIENCE", value: "1 YEAR" },
  { label: "STATUS", value: "AVAILABLE" }
];

export default function Card() {
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  const [metricIndex, setMetricIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % METRICS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsPhotoVisible(true);
      },
      { threshold: 0.3 } 
    );
    if (photoRef.current) observer.observe(photoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <style jsx>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="flex items-center gap-6 mb-16">
        <div className="h-px bg-zinc-600 flex-1" />
        <span className="font-mono text-sm text-zinc-800 uppercase tracking-widest">
          01 // About_Me
        </span>
        <div className="h-px bg-zinc-600 flex-1" />
      </div>
      
      <div className="flex flex-col items-center mb-8">
        <HackerText
          text="USER_PROFILE"
          triggerOnMount={true}
          triggerOnHover={false}
          speed={50}
          className="font-bold text-5xl tracking-tighter text-center font-mono"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
        
        <div className="md:col-span-2 bg-zinc-100 p-8 md:p-12 flex flex-col justify-between group transition-all duration-300 ease-out min-h-[400px]">
            <div>
              <p className="text-4xl md:text-5xl font-black text-zinc-900 mb-8 tracking-tighter leading-[0.95]">
                  Building the <br/> Foundation.
              </p>
              <p className="text-zinc-500 leading-relaxed text-lg font-medium max-w-lg">
                  I am currently <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-cyan-500 transition-all">making my mark</span>.

                  As a developer without years under their belt, I compensate my lack of experience with a <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-sky-500 transition-all">real love for programming</span> and <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all">genuine curiosity</span>. 

                  <br />
                  <br />

                  I've yet to find a niche. All I know is that I want to <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-indigo-500 transition-all">code for you</span>, for <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-violet-500 transition-all">free</span> or for <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-purple-500 transition-all">very cheap</span>.
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
            <Image 
                src={Me} 
                alt="Toby Chen" 
                fill 
                className={`
                    object-cover object-center transition-all duration-[1.5s] ease-out
                    ${isPhotoVisible ? "grayscale-0 scale-105" : "grayscale scale-100"}
                `}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80" />
            <div className={`
                absolute bottom-8 left-8 transition-all duration-1000 delay-300
                ${isPhotoVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            `}>
            </div>
        </div>
        <div className="md:col-span-2 bg-zinc-900 p-8 flex flex-col justify-center items-center overflow-hidden transition-transform duration-300 relative min-h-[250px]">
             
             <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

             <div className="relative z-10 w-full text-center">
                <div key={metricIndex} className="animate-slide-up flex flex-col gap-2">
                    <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.2em]">
                        {METRICS[metricIndex].label}
                    </p>
                    <p className="text-white font-black text-5xl md:text-7xl tracking-tighter">
                        {METRICS[metricIndex].value}
                    </p>
                </div>

                <div className="flex justify-center gap-2 mt-8">
                    {METRICS.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1 rounded-full transition-all duration-300 ${
                                i === metricIndex ? "w-8 bg-white" : "w-2 bg-zinc-700"
                            }`}
                        />
                    ))}
                </div>
             </div>
             <div className="absolute -right-4 -bottom-8 text-[8rem] font-black text-white/5 select-none pointer-events-none">
                2004
             </div>
        </div>
      </div>
    </div>
  );
}