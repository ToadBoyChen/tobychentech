"use client";
import { useState, useEffect } from "react";
import HackerText from "../HackerText";

export default function Introduction() {
  const roles = [
    "Mathematician",
    "Kickboxer",
    "Programmer",
    "Hacker"
  ];

  const [index, setIndex] = useState(0);
  
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setHasLoaded(true);
    }, 900);

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3500); 

    return () => {
      clearInterval(interval);
      clearTimeout(loadTimer);
    };
  }, [roles.length]);

  return (
    <div className="relative flex flex-col justify-end items-center min-h-[90vh] pb-20 overflow-hidden z-10">
      <div className="w-full max-w-5xl px-6">
        <div className="flex flex-col items-start w-full">
            
            <HackerText 
                text="Welcome,"
                triggerOnMount={true}
                triggerOnHover={false}
                speed={50}
                delay={0}
                className="font-bold text-7xl md:text-9xl tracking-tighter mb-2 text-zinc-900 text-left"
            />

            <div className="flex flex-wrap items-center justify-start gap-x-3 md:gap-x-5 text-3xl md:text-5xl font-medium tracking-tight text-zinc-900 w-full">
                
                <HackerText 
                    text="I'm a"
                    triggerOnMount={true}
                    triggerOnHover={false}
                    speed={50}
                    delay={600} 
                    className="whitespace-nowrap"
                />

                <div className="relative flex justify-start"> 
                    
                    <HackerText 
                        key={roles[index]} 
                        text={roles[index]}
                        triggerOnMount={true}
                        triggerOnHover={false}
                        speed={50}
                        delay={index === 0 && !hasLoaded ? 900 : 0} 
                        className="text-zinc-900 font-bold whitespace-nowrap"
                    />
                    <div 
                      className="absolute -bottom-2 left-0 w-full h-[3px] bg-zinc-900"
                    />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}