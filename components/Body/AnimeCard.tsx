"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import HackerHeader from "../HackerHeader";

import VinlandImg from "@/public/vinland.webp";
import AotImg from "@/public/aot.jpg";
import MhaImg from "@/public/mha.jpeg";

interface AnimeItem {
  rank: number;
  title: string;
  jpTitle: string;
  quote: string;
  desc: string;
  image: StaticImageData | string;
}

const ANIME_LIST: AnimeItem[] = [
  {
    rank: 1,
    title: "Vinland Saga",
    jpTitle: "ヴィンランド・サガ",
    quote: "I have no enemies.",
    desc: "A masterclass in character development. Thorfinn's journey from vengeance to pacifism is storytelling at its peak. It asks the hard question: what does it mean to be a true warrior?",
    image: VinlandImg,
  },
  {
    rank: 2,
    title: "Attack on Titan",
    jpTitle: "進撃の巨人",
    quote: "If you don't fight, you can't win.",
    desc: "A political thriller disguised as a shonen. The foreshadowing is unparalleled.",
    image: AotImg,
  },
  {
    rank: 3,
    title: "My Hero Academia",
    jpTitle: "僕のヒーローアカデミア",
    quote: "Go beyond! Plus Ultra!",
    desc: "The essence of heroism. It captures the weight of a legacy.",
    image: MhaImg,
  },
];

export default function AnimeCard() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isHovering = hoveredIndex !== null;

  return (
    <div className="relative w-full">
      <div className="mb-8 md:mb-12">
        <HackerHeader
          text="02 01 03 // ANIME ISN'T CRINGE"
          lineSide="left"
          variant="light"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-x-8 gap-y-8 w-full min-h-[600px]">
        {ANIME_LIST.map((anime, idx) => {
          const isItemHovered = idx === hoveredIndex;
          const isDimmed = isHovering && !isItemHovered;
          const spanClasses = idx === 0 ? "lg:row-span-2" : "lg:row-span-1";

          return (
            <div
              key={idx}
              className={`${spanClasses} flex gap-4 group`}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`
                  relative flex-1 overflow-hidden rounded-3xl 
                  transition-all duration-500 ease-out 
                  group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-lime-900/30
                  ${
                    isDimmed
                      ? "opacity-40 blur-[2px] scale-95 grayscale"
                      : "opacity-100 scale-100"
                  }
                `}
              >
                {/* BACKGROUND LAYER */}
                <div className="absolute inset-0 z-0 bg-yellow-100">
                  <Image
                    src={anime.image}
                    alt={anime.title}
                    fill
                    className="object-cover opacity-20 grayscale transition-all duration-700 ease-in-out group-hover:opacity-50 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-yellow-200/90 via-yellow-200/80 to-yellow-200/60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-70" />
                </div>

                {/* CONTENT LAYER */}
                <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col w-full">
                      <div
                        className={`flex flex-row w-full justify-between font-mono text-xs font-bold tracking-widest mb-1 ${
                          idx === 0 ? "text-yellow-900" : "text-lime-800/80"
                        }`}
                      >
                        <p>RANK [0{anime.rank}]</p>
                        <p>{anime.jpTitle}</p>
                      </div>
                      {idx === 0 && (
                        <div className="flex uppercase items-center gap-2 text-yellow-800 font-mono font-semibold text-xs">
                          <span>My Favourite</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <p className="font-black text-lime-950 group-hover:text-yellow-900 mb-4 leading-none uppercase tracking-tighter drop-shadow-sm text-4xl">
                    {anime.title}
                  </p>

                  {/* Quote */}
                  <div className="mb-6 pl-3 border-l-2 border-lime-900/30">
                    <p className="font-mono text-sm text-lime-900/80 italic font-semibold">
                      "{anime.quote}"
                    </p>
                  </div>

                  {/* Description */}
                  <div className="flex flex-row justify-center items-center">
                    <p className="text-lime-950/90 drop-shadow-lg">
                      {anime.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}