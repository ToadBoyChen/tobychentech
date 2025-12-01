"use client";
import { useState, useEffect } from "react";
import HackerText from "../HackerText";
import TOC from "../TOC";

export default function Introduction() {
  const roles = ["Mathematician", "Kickboxer", "Programmer", "Hacker"];
  const [index, setIndex] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => setHasLoaded(true), 900);
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => { clearInterval(interval); clearTimeout(loadTimer); };
  }, [roles.length]);

  return (
    <div>
      <div className="grid mt-48">
        <div className="flex flex-col text-zinc-900 font-mono">
            <HackerText 
                text="Welcome,"
                triggerOnMount={true}
                triggerOnHover={false}
                speed={50}
                delay={0}
                className="font-bold text-8xl tracking-tighter mb-4"
            />

            <div className="flex flex-wrap items-center justify-start gap-x-3 text-3xl md:text-4xl font-medium tracking-tight text-zinc-900 w-full">
                <HackerText 
                    text="I'm a"
                    triggerOnMount={true}
                    triggerOnHover={false}
                    speed={40}
                    delay={600} 
                    className="whitespace-nowrap"
                />
                <div className="relative flex justify-start"> 
                    <HackerText 
                        key={roles[index]} 
                        text={roles[index]}
                        triggerOnMount={true}
                        triggerOnHover={false}
                        speed={35}
                        delay={index === 0 && !hasLoaded ? 900 : 0} 
                        className="text-zinc-900 font-bold whitespace-nowrap"
                    />
                    <div className="absolute -bottom-2 left-0 w-full h-[3px] bg-zinc-900" />
                </div>
            </div>
        </div>
        <div className="mt-16">
          <TOC/>
        </div>
      </div>
    </div>
  );
}