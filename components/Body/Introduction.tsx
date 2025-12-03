"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; 
import HackerText from "../HackerText";
import TOC from "../../lib/TOC";
import Wallpaper from "@/public/martin-bennie-LDAEJ1rySaQ-unsplash.jpg"; 

interface IntroductionProps {
    onLoadComplete?: () => void;
    shouldAnimate: boolean; 
}

export default function Introduction({ onLoadComplete, shouldAnimate }: IntroductionProps) {
  const roles = ["Mathematician", "Kickboxer", "Programmer", "Hacker"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-end overflow-hidden">
      <div className="absolute inset-0 z-1 w-full h-full">
        <Image 
            src={Wallpaper} 
            alt="Deer in the Cairngorms"
            fill            
            priority
            quality={100}
            unoptimized
            onLoad={onLoadComplete} 
            className="object-cover object-center" 
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-linear-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="w-full lg:max-w-6/7 px-6 relative z-10 pb-20 md:pb-10">
        <div className="grid">
            <div className="flex flex-col text-white font-mono">
                <HackerText 
                    text="Welcome,"
                    triggerOnMount={shouldAnimate} 
                    triggerOnHover={false}
                    speed={50}
                    delay={600}
                    className="font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter mb-4 text-white drop-shadow-lg"
                />

                <div className="flex flex-wrap items-center justify-start gap-x-2 md:gap-x-3 text-xl md:text-3xl lg:text-4xl font-medium tracking-tight w-full">
                    <HackerText 
                        text="I'm a"
                        triggerOnMount={shouldAnimate}
                        triggerOnHover={false}
                        speed={40}
                        delay={800} 
                        className="whitespace-nowrap text-zinc-200"
                    />
                    <div className="relative flex justify-start"> 
                        <HackerText 
                            key={roles[index]} 
                            text={roles[index]}
                            triggerOnMount={shouldAnimate} 
                            triggerOnHover={false}
                            speed={35}
                            delay={900}
                            className="text-white font-bold whitespace-nowrap"
                        />
                        <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-[2px] md:h-[3px] bg-white" />
                    </div>
                </div>
            </div>
            
            <div className="mt-8 text-white/80">
              <TOC/>
            </div>
        </div>
      </div>
    </section>
  );
}