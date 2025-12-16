"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import HackerText from "../HackerText";
import TOC from "./TOC";
import Wallpaper from "@/public/martin-bennie-LDAEJ1rySaQ-unsplash.jpg";

interface IntroductionProps {
  onLoadComplete?: () => void;
  shouldAnimate: boolean;
}

export default function Introduction({
  onLoadComplete,
  shouldAnimate,
}: IntroductionProps) {
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
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="w-full max-w-3/4 relative z-10 pb-8 md:pb-10">
        <div className="grid">
          <div className="flex flex-col items-center justify-center text-4xl md:text-5xl lg:text-6xl w-full text-stone-50 font-mono mb-2">
              <HackerText
                key={roles[index]}
                text={roles[index]}
                triggerOnMount={shouldAnimate}
                triggerOnHover={false}
                speed={60}
                className="font-black tracking-widest"
              />
          </div>

          <div className="mt-8 text-stone-100">
            <TOC />
          </div>
        </div>
      </div>
    </section>
  );
}
