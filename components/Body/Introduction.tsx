"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; 
import HackerText from "../HackerText";
import TOC from "../TOC";
import Wallpaper from "@/public/martin-bennie-LDAEJ1rySaQ-unsplash.jpg"; 

export default function Introduction() {
  const roles = ["Mathematician", "Kickboxer", "Programmer", "Hacker"];
  const [index, setIndex] = useState(0);
  
  // State to track if the heavy background image has finished loading
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-end overflow-hidden">

      {/* --- MINIMAL LOADING SCREEN --- */}
      {/* This sits on top (z-50) and fades out when bgLoaded becomes true */}
      <div 
        className={`
          fixed inset-0 z-50 bg-black flex items-center justify-center 
          transition-opacity duration-1000 ease-in-out
          ${bgLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <div className="flex flex-col items-center gap-2">
            {/* Simple pulsating loader */}
            <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-white animate-progress-indeterminate" />
            </div>
            <span className="font-mono text-xs text-zinc-500 animate-pulse tracking-widest uppercase">
                Loading Environment
            </span>
        </div>
      </div>

      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 -z-20 w-full h-full">
        <Image 
            src={Wallpaper} 
            alt="Deer in the Cairngorms"
            fill            
            unoptimized
            preload
            onLoad={() => setBgLoaded(true)}
            className="object-cover object-center" 
        />
        
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-linear-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* --- CONTENT --- */}
      <div className={`w-full max-w-5xl px-6 relative z-10 pb-10 transition-all duration-1000 ${bgLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="grid">
            <div className="flex flex-col text-white font-mono">
                
                {/* We pass 'bgLoaded' to triggerOnMount so animations wait for the loader */}
                <HackerText 
                    text="Welcome,"
                    triggerOnMount={bgLoaded} 
                    triggerOnHover={false}
                    speed={50}
                    delay={100} // Small delay after fade-out
                    className="font-bold text-8xl tracking-tighter mb-4 text-white drop-shadow-lg"
                />

                <div className="flex flex-wrap items-center justify-start gap-x-3 text-3xl md:text-4xl font-medium tracking-tight w-full">
                    <HackerText 
                        text="I'm a"
                        triggerOnMount={bgLoaded}
                        triggerOnHover={false}
                        speed={40}
                        delay={700} 
                        className="whitespace-nowrap text-zinc-200"
                    />
                    <div className="relative flex justify-start"> 
                        <HackerText 
                            key={roles[index]} 
                            text={roles[index]}
                            triggerOnMount={true} // Cycles naturally
                            triggerOnHover={false}
                            speed={35}
                            delay={0}
                            className="text-white font-bold whitespace-nowrap"
                        />
                        <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-white" />
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-white/80">
              <TOC/>
            </div>
        </div>
      </div>
    </div>
  );
}