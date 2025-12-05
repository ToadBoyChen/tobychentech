// components/Stats/HackerRank.tsx
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HackerText from "../HackerText"; // Adjust import path as needed

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

export default function HackerRank({ username }: HackerRankProps) {
  const [data, setData] = useState<Badge[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/hackerrank?username=${username}`);
        const result = await res.json();
        
        // Filter for badges that actually have stars
        if (result.models) {
            const activeBadges = result.models.filter((b: any) => b.stars > 0);
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

  // Helper to get color based on stars (Bronze, Silver, Gold logic)
  const getBadgeColor = (stars: number) => {
    if (stars === 5) return "text-yellow-400 border-yellow-400"; // Gold
    if (stars >= 3) return "text-stone-400 border-stone-400"; // Silver
    return "text-orange-700 border-orange-700"; // Bronze
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className="w-full h-48 border border-stone-300 border-dashed animate-pulse flex items-center justify-center font-mono text-stone-400">
        INITIALIZING CONNECTION...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
        <div className="w-full p-4 border border-red-500 font-mono text-red-500">
            ERROR: NO DATA STREAM DETECTED
        </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-6 border-b-2 border-stone-900 pb-2">
        <div className="flex flex-col">
            <span className="font-mono text-xs text-stone-500 mb-1">TARGET_USER</span>
            <HackerText 
                text={`@${username.toUpperCase()}`} 
                className="text-2xl font-bold font-mono" 
                triggerOnMount 
                triggerOnHover={false} 
            />
        </div>
        <div className="font-mono text-sm text-stone-500">
           BADGES_UNLOCKED: <span className="text-stone-900 font-bold">{data.length}</span>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {data.map((badge, index) => (
          <motion.div
            key={`${badge.badge_name}-${index}`}
            variants={itemVariants}
            className={`
                relative p-4 border-2 bg-stone-50 hover:bg-stone-100 transition-colors
                ${getBadgeColor(badge.stars)}
            `}
          >
            {/* Corner Accents for Tech Look */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-current" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-current" />

            <h3 className="font-mono font-bold text-sm tracking-tighter uppercase text-stone-900">
              {badge.badge_name.replace("Problem Solving", "ALGO")}
            </h3>
            
            <div className="flex items-center gap-1 mt-3 mb-2">
                {[...Array(5)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1.5 flex-1 ${i < badge.stars ? 'bg-current' : 'bg-stone-200'}`}
                    />
                ))}
            </div>

            <div className="flex justify-between items-end mt-2">
                <span className="font-mono text-xs text-stone-500">RANK</span>
                <span className="font-mono text-xl font-bold text-stone-900">
                    {badge.stars}
                    <span className="text-xs font-normal text-stone-400">/5</span>
                </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}