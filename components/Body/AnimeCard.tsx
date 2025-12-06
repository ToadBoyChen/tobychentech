"use client";
import { useState } from "react";
import Image, { StaticImageData } from "next/image"; // Import Image
import HackerHeader from "../HackerHeader";
import { Sword, Skull, Zap, Trophy } from "lucide-react";

// !!! REPLACE THESE WITH YOUR ACTUAL IMAGE IMPORTS !!!
// Example: import VinlandImg from "@/public/vinland_saga.jpg";
import VinlandImg from "@/public/vinland.webp";
import AotImg from "@/public/aot.jpg";
import MhaImg from "@/public/mha.jpg";

interface AnimeItem {
  rank: number;
  title: string;
  jpTitle: string;
  quote: string;
  desc: string;
  icon: any;
  image: StaticImageData | string; // Add image type
}

const ANIME_LIST: AnimeItem[] = [
  {
    rank: 1,
    title: "Vinland Saga",
    jpTitle: "ヴィンランド・サガ",
    quote: "I have no enemies.",
    desc: "A masterclass in character development. Thorfinn's journey from vengeance to pacifism is storytelling at its peak. It asks the hard question: what does it mean to be a true warrior?",
    icon: Sword,
    image: VinlandImg,
  },
  {
    rank: 2,
    title: "Attack on Titan",
    jpTitle: "進撃の巨人",
    quote: "If you don't fight, you can't win.",
    desc: "A political thriller disguised as a shonen. The foreshadowing is unparalleled.",
    icon: Skull,
    image: AotImg,
  },
  {
    rank: 3,
    title: "My Hero Academia",
    jpTitle: "僕のヒーローアカデミア",
    quote: "Go beyond! Plus Ultra!",
    desc: "The essence of heroism. It captures the weight of a legacy.",
    icon: Zap,
    image: MhaImg,
  },
];

export default function AnimeCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isHovering = hoveredIndex !== null;

  return (
    <div className="relative w-full max-w-7xl mx-auto p-6 md:p-8">
      <div className="mb-8 md:mb-12">
        <HackerHeader
          text="02 01 03 // ANIME ISN'T CRINGE"
          lineSide="left"
          variant="light"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6 w-full min-h-[600px]">
        {ANIME_LIST.map((anime, idx) => {
          const Icon = anime.icon;
          const isItemHovered = idx === hoveredIndex;
          const isDimmed = isHovering && !isItemHovered;

          const spanClasses = idx === 0 ? "lg:row-span-2" : "lg:row-span-1";

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                ${spanClasses}
                group relative overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-900/30 w-full h-full border border-yellow-500/20
                ${
                  isDimmed
                    ? "opacity-40 blur-[2px] scale-95 grayscale"
                    : "opacity-100 scale-100"
                }
              `}
            >
              {/* --- BACKGROUND IMAGE LAYER --- */}
              <div className="absolute inset-0 z-0 bg-yellow-200">
                {/* The Image */}
                <Image
                  src={anime.image}
                  alt={anime.title}
                  fill
                  className="object-cover opacity-20 grayscale transition-all duration-700 ease-in-out group-hover:opacity-50 group-hover:grayscale-0 group-hover:scale-110"
                />
                
                {/* Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/90 via-yellow-200/80 to-yellow-200/60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-70" />
              </div>

              {/* --- CONTENT LAYER (z-10 to sit above image) --- */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest mb-1 ${
                        idx === 0 ? "text-yellow-900" : "text-lime-800/80"
                      }`}
                    >
                      RANK [0{anime.rank}]
                    </span>
                    {idx === 0 && (
                      <div className="flex items-center gap-2 text-yellow-800 font-bold text-sm uppercase tracking-tighter">
                        <Trophy size={14} />
                        <span>The G.O.A.T.</span>
                      </div>
                    )}
                  </div>

                  <div
                    className={`p-3 rounded-2xl shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                      idx === 0
                        ? "bg-yellow-500/30 text-yellow-950"
                        : "bg-white/40 text-yellow-900"
                    }`}
                  >
                    <Icon
                      size={idx === 0 ? 40 : 28}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`font-black text-lime-950 group-hover:text-yellow-900 mb-4 leading-none uppercase tracking-tighter drop-shadow-sm ${
                    idx === 0 ? "text-5xl md:text-6xl" : "text-3xl"
                  }`}
                >
                  {anime.title}
                </h3>

                {/* Quote */}
                <div className="mb-6 pl-3 border-l-2 border-lime-900/30">
                  <p className="font-mono text-xs text-lime-900/80 italic font-semibold">
                    "{anime.quote}"
                  </p>
                </div>

                {/* Description */}
                <div className="flex-grow">
                  <p
                    className={`text-lime-950/90 font-medium leading-relaxed drop-shadow-sm ${
                      idx === 0 ? "text-lg max-w-md" : "text-sm"
                    }`}
                  >
                    {anime.desc}
                  </p>
                </div>

                {/* Watermark (Japanese Title) */}
                {idx === 0 && (
                  <div className="hidden md:block absolute bottom-8 right-0 pointer-events-none">
                    <span className="text-8xl lg:text-9xl font-black writing-vertical-rl text-lime-950/10 select-none group-hover:text-lime-950/20 transition-colors duration-500">
                      {anime.jpTitle}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer Line */}
              <div className="relative z-10 mt-6 w-full h-px bg-lime-900/20 group-hover:bg-lime-900/40 transition-colors" />
            </div>
          );
        })}
      </div>
    </div>
  );
}