"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HackerHeader from "../HackerHeader";
import T480 from "@/public/t480_1.jpg";
import { Code, Wrench, Globe, Shield } from "lucide-react";

const ICON_MAP: { [key: string]: React.ElementType } = {
  Code: Code,
  Wrench: Wrench,
  Globe: Globe,
  Shield: Shield,
};

const INTERESTS = [
  {
    title: "Arch Linux (Btw)",
    desc: "Achieving total control by building my system package-by-package. It's an exercise in technological mastery.",
    icon: "Code",
  },
  {
    title: "Repairable Tech",
    desc: "I choose hardware like the T480 because I believe in the Right to Repair. Less waste, more longevity.",
    icon: "Wrench",
  },
  {
    title: "Open Source Community",
    desc: "The open-source ethos aligns with my belief in shared knowledge, sustainable systems, and transparency.",
    icon: "Globe",
  },
  {
    title: "Knowing your Tech",
    desc: "Full stack knowledge, from BIOS to OS. Understanding the system is the first step to securing and optimizing it.",
    icon: "Shield",
  },
];

export default function LinuxCard() {
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const photoRef = useRef<HTMLDivElement>(null);

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

  const isHovering = hoveredIndex !== null;

  return (
    <div className="relative w-full">
      <div className="mb-8 md:mb-12">
        <HackerHeader
          text="02 01 02 // TECHNOLOGICAL FREEDOM"
          lineSide="left"
          variant="light"
        />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-10 relative z-10">
        <div className="w-full h-64 md:h-96 lg:h-full lg:col-span-5 flex flex-col">
          <div
            ref={photoRef}
            className="relative w-full h-full rounded-3xl overflow-hidden shadow-lg shadow-lime-950/20 group"
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10 z-10" />

            <Image
              src={T480}
              alt="ThinkPad T480 Arch Linux"
              fill
              className={`object-cover transition-all duration-[1.5s] ease-out ${
                isPhotoVisible
                  ? "grayscale-0 opacity-100 scale-100"
                  : "grayscale opacity-60 scale-110"
              }`}
            />
            <div
              className={`absolute top-2 right-2 z-20 transition-all duration-1000 delay-500 ${
                isPhotoVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-4 opacity-0"
              }`}
            >
              <span className="text-lime-900 font-bold font-mono text-xs tracking-widest bg-yellow-200 px-3 py-1 rounded-lg shadow-sm">
                THINKPAD T480
              </span>
            </div>
            <div
              className={`absolute bottom-2 left-2 z-20 transition-all duration-1000 delay-300 ${
                isPhotoVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <span className="text-stone-50 font-black text-3xl uppercase">
                The Daily Driver
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-4">
            <span className="font-mono text-xs text-stone-100">
              ARRAY[{INTERESTS.length}]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative">
            {INTERESTS.map((item, idx) => {
              const IconComponent = ICON_MAP[item.icon];
              const isItemHovered = idx === hoveredIndex;
              const isDimmed = isHovering && !isItemHovered;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative bg-yellow-200 shadow-sm shadow-lime-950/10 rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 ${
                    isDimmed
                      ? "opacity-20 blur-[1px] scale-95 grayscale"
                      : "opacity-100 scale-100"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-mono text-sm text-lime-600/70 group-hover:text-lime-600 transition-colors">
                        [0{idx + 1}]
                      </span>
                      {IconComponent && (
                        <div className="text-yellow-600 group-hover:scale-110 transition-all">
                          <IconComponent size={28} strokeWidth={2} />
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-lime-950 group-hover:text-yellow-700 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-lime-900 group-hover:text-lime-950">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 w-full h-px bg-yellow-500" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}