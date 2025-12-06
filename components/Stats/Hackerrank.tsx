"use client";

import React, { useEffect, useState, memo } from "react";
import HackerHeader from "../HackerHeader";
import Link from "next/link";
import HighText from "../HighText";
import { Star } from "lucide-react";

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

// --- Grade Logic & Colors ---
const MEDALS = {
  gold: {
    color: "#ca8a04", // Darker Yellow/Gold
    label: "GOLD",
    desc: "Gold Level. Mastery achieved.",
  },
  silver: {
    color: "#64748b", // Slate-500
    label: "SILVER",
    desc: "Silver Level. High competence.",
  },
  bronze: {
    color: "#b45309", // Amber-700
    label: "BRONZE",
    desc: "Bronze Level. Foundation laid.",
  },
};

// --- Helper Component: Single Star with Confetti ---
const StarWithConfetti = memo(
  ({
    filled,
    color,
    delay,
  }: {
    filled: boolean;
    color: string;
    delay: number;
  }) => {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
      if (isExploding) {
        const timer = setTimeout(() => setIsExploding(false), 800);
        return () => clearTimeout(timer);
      }
    }, [isExploding]);

    return (
      <div
        className="relative group/star cursor-pointer"
        onMouseEnter={() => setIsExploding(true)}
      >
        <div
          className={`transform transition-all duration-300 ${
            filled ? "scale-100" : "scale-90 opacity-40"
          } group-hover/star:scale-110 group-hover/star:rotate-12`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <Star
            size={20}
            strokeWidth={filled ? 0 : 2}
            fill={filled ? color : "none"}
            className={filled ? "" : "text-yellow-700"}
            color={filled ? color : "currentColor"}
          />
        </div>
        {isExploding && filled && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <ConfettiParticle key={i} index={i} color={color} />
            ))}
          </div>
        )}
      </div>
    );
  }
);
StarWithConfetti.displayName = "StarWithConfetti";

// --- Helper Component: Individual Particle ---
const ConfettiParticle = ({ index, color }: { index: number; color: string }) => {
  const angle = (index / 8) * 360 + Math.random() * 20;
  const distance = 20 + Math.random() * 15;
  const tx = Math.cos((angle * Math.PI) / 180) * distance;
  const ty = Math.sin((angle * Math.PI) / 180) * distance;

  return (
    <div
      className="absolute w-1 h-1 rounded-full animate-confetti"
      style={{
        backgroundColor: color,
        // @ts-ignore
        "--tx": `${tx}px`,
        "--ty": `${ty}px`,
        opacity: 0,
      }}
    />
  );
};

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

  const getBadgeDetails = (stars: number) => {
    if (stars >= 5) return MEDALS.gold;
    if (stars >= 3) return MEDALS.silver;
    return MEDALS.bronze;
  };

  if (loading) return <LoadingSkeleton />;

  if (!data || data.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center p-12 bg-stone-50/10 rounded-3xl border border-dashed border-stone-50/20 w-full">
          <span className="text-stone-300 font-mono text-xs tracking-widest">
            // NO_BADGE_DATA
          </span>
        </div>
      </div>
    );
  }

  const isHovering = hoveredIndex !== null;

  return (
    <div className="w-full flex justify-center p-6 md:p-10">
      <style jsx global>{`
        @keyframes confetti-explode {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        .animate-confetti { animation: confetti-explode 0.6s ease-out forwards; }
      `}</style>

      {/* Main Container - Added w-full */}
      <div className="w-full flex flex-col justify-center">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col mb-12 w-full">
          <div className="group text-stone-50">
            <p className="text-lg md:text-xl leading-relaxed text-stone-300">
              Maybe I don't seem so credible yet? Maybe you're looking around
              thinking, "
              <HighText
                text="yeah you have an eye for UI/UX, but can you really code?"
                variant="light"
              />
              " Well, why don't we look at some of my Hackerrank stats?
            </p>
            <p className="mt-2 text-sm text-stone-400 font-mono">
              (My stats aren't very good yet, forgive my cockiness)
            </p>
          </div>

          <div className="mt-10">
            <div className="mb-4">
              <HackerHeader
                text="HACKERRANK"
                lineColor="bg-lime-400"
                className="text-sm text-lime-400"
              />
            </div>
            
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-lime-900/30 pb-4 w-full">
              <h2 className="font-black text-lime-100/90 text-4xl md:text-5xl tracking-tighter uppercase">
                Badges
              </h2>
              <Link
                href={`https://www.hackerrank.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-lime-950 bg-lime-300 hover:bg-yellow-300 px-4 py-2 rounded-lg text-sm font-bold transition-all"
              >
                @{username}
              </Link>
            </div>
          </div>
        </div>

        {/* BADGE GRID - Ensure w-full is here */}
        <div className="grid grid-cols-1 gap-6 w-full">
          {data.map((badge, index) => {
            const badgeDetails = getBadgeDetails(badge.stars);
            const isItemHovered = index === hoveredIndex;
            const isDimmed = isHovering && !isItemHovered;

            return (
              <div
                key={`${badge.badge_name}-${index}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Added w-full and h-full here
                className={`
                  group relative bg-yellow-200 shadow-lg shadow-black/20 rounded-3xl p-6 w-full h-full flex flex-col justify-between transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-900/20
                  ${
                    isDimmed
                      ? "opacity-40 blur-[2px] scale-95 grayscale"
                      : "opacity-100 scale-100"
                  }
                `}
              >
                <div className="w-full">
                  {/* Header: Label + Number Badge */}
                  <div className="flex justify-between items-start mb-6 w-full">
                    <span
                      className="font-mono text-xs tracking-wider font-bold uppercase transition-opacity duration-300"
                      style={{ color: badgeDetails.color, opacity: 0.8 }}
                    >
                      [{badgeDetails.label}]
                    </span>

                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full font-mono font-bold text-base shadow-md transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: badgeDetails.color,
                        color: "#fff",
                      }}
                    >
                      {badge.stars}
                    </div>
                  </div>

                  {/* Title */}
                  <p className="text-2xl font-black text-lime-950 group-hover:text-yellow-800 mb-2 leading-tight tracking-tight">
                    {badge.badge_name.replace("Problem Solving", "Problem Solving")}
                  </p>

                  {/* Level Description */}
                  <p className="text-lime-900/80 group-hover:text-lime-950 text-sm font-medium mb-8 leading-snug">
                    {badgeDetails.desc}
                  </p>
                </div>

                {/* Footer: Star Confetti Row */}
                <div className="mt-auto border-t border-yellow-500/30 pt-4 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarWithConfetti
                          key={i}
                          filled={i < badge.stars}
                          color={i < badge.stars ? badgeDetails.color : "#d97706"}
                          delay={i * 50}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-yellow-700/50 uppercase tracking-widest">
                       Rank {badge.stars}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-white/5 rounded-3xl animate-pulse">
      <div className="h-8 w-48 bg-stone-700 rounded-lg mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-stone-800/50 rounded-3xl border border-stone-700/50 w-full" />
        ))}
      </div>
    </div>
  );
}