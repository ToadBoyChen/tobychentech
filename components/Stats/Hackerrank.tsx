"use client";

import React, { useEffect, useState, useMemo } from "react";
import HackerHeader from "../HackerHeader"; // Ensure this path is correct

interface Badge {
  badge_name: string;
  badge_category: string;
  stars: number;
  current_points: number;
  icon_url?: string;
}

interface HackerRankProps {
  username: string;
}

// Consistent Palette: Lime -> Yellow -> Amber
const limeAmberPalette = [
  "#84cc16", // Lime 500
  "#a3e635", // Lime 400
  "#d9f99d", // Lime 200
  "#facc15", // Yellow 400
  "#fbbf24", // Amber 400
  "#f59e0b", // Amber 500
  "#d97706", // Amber 600
];

export default function HackerRank({ username }: HackerRankProps) {
  const [data, setData] = useState<Badge[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/hackerrank?username=${username}`);
        const result = await res.json();
        
        if (result.models) {
            // Filter empty badges and sort by stars (highest first)
            const activeBadges = result.models
                .filter((b: any) => b.stars > 0)
                .sort((a: any, b: any) => b.stars - a.stars);
            setData(activeBadges);
        }
      } catch (error) {
        console.error("Error fetching HackerRank stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  // Helper: Map star count (1-5) to a color in our palette
  // 1 star = Lime (low index), 5 stars = Amber (high index)
  const getBadgeColor = (stars: number) => {
    // Map 0-5 stars to 0-6 palette index roughly
    const index = Math.min(Math.floor(stars * 1.2), limeAmberPalette.length - 1);
    return limeAmberPalette[index];
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-12 flex items-center justify-center p-12 bg-stone-50/50 rounded-3xl">
            <span className="text-stone-300 font-mono text-xs tracking-widest">
                // NO_BADGE_DATA
            </span>
        </div>
    );
  }

  const isHovering = hoveredIndex !== null;

  return (
    <div className="w-full flex flex-col p-6 md:p-8 bg-white/50 rounded-3xl">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col mb-8 md:mb-10">
        <div className="flex justify-between items-end">
          <div>
            <HackerHeader
              text="HACKERRANK"
              lineColor="bg-lime-200"
              className="text-xs font-bold text-lime-600 mb-2"
            />
            <div className="flex items-center gap-4">
              <h2 className="font-black text-stone-800 text-3xl md:text-4xl tracking-tighter uppercase">
                Badges
              </h2>
               {/* Decorative Indicator */}
               <div className="hidden md:flex gap-1 h-2">
                  <div className="w-2 rounded-full bg-lime-400 animate-pulse" />
                  <div className="w-2 rounded-full bg-yellow-400" />
                  <div className="w-2 rounded-full bg-amber-500" />
               </div>
            </div>
          </div>

          {/* User Handle Display */}
          <div className="text-right hidden sm:block">
             <span className="block text-xs font-bold text-stone-400 tracking-widest uppercase mb-1">Target ID</span>
             <span className="font-mono font-bold text-stone-600 bg-stone-100 px-3 py-1 rounded-full text-sm">
                @{username}
             </span>
          </div>
        </div>
      </div>

      {/* BADGE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.map((badge, index) => {
          const itemColor = getBadgeColor(badge.stars);
          const isItemHovered = index === hoveredIndex;
          const isDimmed = isHovering && !isItemHovered;

          return (
            <div
              key={`${badge.badge_name}-${index}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                relative group cursor-pointer transition-all duration-500 rounded-2xl overflow-hidden
                ${isDimmed ? "opacity-20 blur-[1px] scale-95 grayscale" : "opacity-100 scale-100"}
              `}
            >
              {/* Background Glow (Active State) */}
              <div
                className={`absolute inset-0 transition-all duration-500 ease-out opacity-0 group-hover:opacity-10`}
                style={{ backgroundColor: itemColor }}
              />
              
              {/* Subtle ambient glow always present but stronger on hover */}
              <div 
                 className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 blur-2xl group-hover:opacity-20 transition-opacity duration-500"
                 style={{ backgroundColor: itemColor }}
              />

              {/* Card Content */}
              <div className="relative p-5 flex flex-col h-full bg-white/40 hover:bg-transparent transition-colors duration-300">
                
                {/* Top Row: Icon & Name */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mb-1">
                        Algorithm
                    </span>
                    <h3 className="font-bold text-lg leading-tight text-stone-700 group-hover:text-stone-900 transition-colors">
                        {badge.badge_name.replace("Problem Solving", "Problem Solving")}
                    </h3>
                  </div>
                  
                  {/* Star Count Number */}
                  <div 
                    className="flex items-center justify-center w-8 h-8 rounded-full font-mono font-bold text-sm shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: itemColor, color: badge.stars > 3 ? '#fff' : '#44403c' }}
                  >
                    {badge.stars}
                  </div>
                </div>

                {/* Bottom Row: Progress Visual */}
                <div className="mt-auto">
                    <div className="flex gap-1 h-1.5 w-full">
                        {[...Array(5)].map((_, i) => (
                            <div 
                                key={i}
                                className="h-full rounded-full flex-1 transition-all duration-500"
                                style={{ 
                                    backgroundColor: i < badge.stars ? itemColor : '#e7e5e4', // stone-200 for empty
                                    opacity: i < badge.stars ? 1 : 0.5
                                }}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                         <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${isItemHovered ? 'text-stone-600' : 'text-stone-300'}`}>
                            {badge.stars === 5 ? "Gold Level" : badge.stars >= 3 ? "Silver Level" : "Bronze Level"}
                         </span>
                         {badge.stars === 5 && (
                             <span className="animate-pulse text-amber-500 text-[10px]">●</span>
                         )}
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

// Modern pulsing skeleton instead of dashed borders
function LoadingSkeleton() {
    return (
        <div className="w-full p-8 bg-white/50 rounded-3xl animate-pulse">
            <div className="h-8 w-48 bg-stone-200 rounded-lg mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-40 bg-stone-100 rounded-2xl" />
                ))}
            </div>
        </div>
    )
}