"use client";
import { useState, useEffect } from "react";
import HackerHeader from "../HackerHeader";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import CustomDiv from "../CustomDiv";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

import Contribution from "../Stats/Contribution";
import Language from "../Stats/Language";
import Velocity from "../Stats/Velocity";
import Rank from "../Stats/Rank";
import HackerText from "../HackerText";
import HackerRank from "../Stats/Hackerrank";

// Register ChartJS
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

// --- TYPES ---
export type LangDetail = {
  name: string;
  percent: number;
  count: number;
  color: string;
};

export interface StatisticsData {
  totalCommits: number;
  heatmapData: number[];
  bestStreak: number;
  currentStreak: number;
  avgCommits: number;
  mostActiveDay: string;
  historyLabels: string[];
  historyData: number[];
  weeklyLabels: string[];
  weeklyData: number[];
  langData: LangDetail[];
}

interface StatisticsProps {
  isStatisticsActive: boolean;
  data: StatisticsData;
}

// --- CONFIGURATION FOR MENUS ---
type Category = "GIT" | "HABITS" | "SOCIAL" | null;
type SubView = "ALL" | "CONTRIBUTION" | "VELOCITY" | "LANGUAGES" | "BADGES" | null;

export default function Statistics({ isStatisticsActive, data }: StatisticsProps) {
  // 1. STATE: Track the "Path" the user is in
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [activeSubView, setActiveSubView] = useState<SubView>(null);

  const controls = useAnimation();

  useEffect(() => {
    if (isStatisticsActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
      // Optional: Reset state when scrolling away? 
      // setActiveCategory(null); setActiveSubView(null);
    }
  }, [isStatisticsActive, controls]);

  // --- RENDERING HELPERS ---

  // Handle Category Selection (Opens the "folder")
  const handleCategoryClick = (cat: Category) => {
    if (activeCategory === cat) {
      setActiveCategory(null); // Close if clicking same
      setActiveSubView(null);
    } else {
      setActiveCategory(cat);
      setActiveSubView(null); // Reset subview when switching categories
    }
  };

  // Helper to determine if a specific component should show
  // Logic: It shows if the SubView matches specific name OR 'ALL'
  const shouldShow = (cat: Category, view: SubView) => {
    if (activeCategory !== cat) return false;
    if (activeSubView === "ALL") return true;
    return activeSubView === view;
  };

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { y: 50 },
        visible: { y: 0, transition: { duration: 0.5 } },
      }}
    >
      <div className="w-full top-0 left-0 z-50">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[30px] md:h-[50px] fill-stone-50 block overflow-visible">
          <use href="#fixed-convex" />
        </svg>
      </div>

      <section className="relative px-6 md:px-20 lg:px-32 py-20 min-h-screen z-20 bg-stone-50">
        <div className="max-w-[1600px] mx-auto w-full">
          
          {/* --- MAIN HEADER --- */}
          <div className="flex flex-col items-center mb-12">
            <HackerText
              text="STATISTICS"
              triggerOnMount={true}
              triggerOnHover={false}
              className="font-bold text-5xl md:text-6xl lg:text-8xl tracking-tighter text-center font-mono mb-8"
            />

            {/* --- LEVEL 1: CATEGORY MENU (The "Folders") --- */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6">
              {(["GIT", "HABITS", "SOCIAL"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`
                    px-6 py-2 text-sm md:text-base font-bold font-mono tracking-widest transition-all duration-300 border-b-2
                    ${activeCategory === cat 
                      ? "border-lime-500 text-stone-900 scale-110" 
                      : "border-transparent text-stone-400 hover:text-stone-600 hover:border-stone-300"}
                  `}
                >
                  {`> ${cat}`}
                </button>
              ))}
            </div>

            {/* --- LEVEL 2: SUB-MENU (The "Files") --- */}
            <div className="h-12 flex items-center justify-center"> {/* Fixed height to prevent jump */}
              <AnimatePresence mode="wait">
                {activeCategory === "GIT" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3"
                  >
                    <SubMenuButton label="ALL" active={activeSubView} onClick={() => setActiveSubView("ALL")} />
                    <SubMenuButton label="CONTRIBUTION" active={activeSubView} onClick={() => setActiveSubView("CONTRIBUTION")} />
                    <SubMenuButton label="VELOCITY" active={activeSubView} onClick={() => setActiveSubView("VELOCITY")} />
                  </motion.div>
                )}

                {activeCategory === "HABITS" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3"
                  >
                    <SubMenuButton label="ALL" active={activeSubView} onClick={() => setActiveSubView("ALL")} />
                    <SubMenuButton label="LANGUAGES" active={activeSubView} onClick={() => setActiveSubView("LANGUAGES")} />
                    <SubMenuButton label="BADGES" active={activeSubView} onClick={() => setActiveSubView("BADGES")} />
                  </motion.div>
                )}
                
                {activeCategory === "SOCIAL" && (
                   <span className="text-stone-400 font-mono text-xs animate-pulse">
                      // DIRECT LINK ESTABLISHED
                   </span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <CustomDiv label="< DATA >" />

          {/* --- CONTENT AREA --- */}
          <div className="min-h-[500px] w-full mt-8 relative">
            
            {/* 1. EMPTY STATE (Prompt) */}
            {!activeCategory && (
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                 <div className="text-center font-mono">
                    <p className="text-4xl md:text-6xl text-stone-300 font-black mb-2">AWAITING INPUT</p>
                    <p className="text-stone-400 text-sm">SELECT A CATEGORY TO MOUNT DATA STREAM</p>
                 </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              
              {/* --- GIT GROUP --- */}
              {activeCategory === "GIT" && activeSubView && (
                <motion.div
                  key="git-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="mb-12">
                     <HackerHeader text="03 01 // PROGRAMMING STATS" lineSide="right" size="large"/>
                  </div>
                  
                  {/* Contribution Section */}
                  {shouldShow("GIT", "CONTRIBUTION") && (
                    <div className="mb-16">
                      <HackerHeader text="03 01 01 // CONTRIBUTION STARS" lineSide="left" />
                      <div className={`mt-8 ${activeSubView === "CONTRIBUTION" ? "max-w-4xl mx-auto" : ""}`}>
                         <Contribution data={data} />
                      </div>
                    </div>
                  )}

                  {/* Velocity Section */}
                  {shouldShow("GIT", "VELOCITY") && (
                    <div className="mb-16">
                      {/* Only show this specific header if we are looking at ALL or VELOCITY specifically */}
                      <div className="mb-8"><HackerHeader text="03 01 02 // CODE FREQUENCY" lineSide="right" /></div>
                      <div className={`mt-8 ${activeSubView === "VELOCITY" ? "max-w-5xl mx-auto" : ""}`}>
                        <Velocity labels={data.historyLabels} data={data.historyData} />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {/* --- HABITS GROUP --- */}
              {activeCategory === "HABITS" && activeSubView && (
                <motion.div
                  key="habits-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <div className="mb-12">
                    <HackerHeader text="03 02 // PROGRAMMING HABITS" lineSide="left" size="large" />
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Languages */}
                    {shouldShow("HABITS", "LANGUAGES") && (
                      <div className={activeSubView === "LANGUAGES" ? "col-span-1 xl:col-span-2 max-w-4xl mx-auto w-full" : "col-span-1"}>
                        <Language data={data.langData} />
                      </div>
                    )}

                    {/* Badges */}
                    {shouldShow("HABITS", "BADGES") && (
                      <div className={activeSubView === "BADGES" ? "col-span-1 xl:col-span-2 max-w-4xl mx-auto w-full" : "col-span-1"}>
                        <HackerRank username="toby_chen13371" />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* --- SOCIAL GROUP (Instant Load) --- */}
              {activeCategory === "SOCIAL" && (
                <motion.div
                  key="social-group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <div className="mb-12">
                     <HackerHeader text="02 01 // CUSTOMERS" lineSide="right" size="large" />
                  </div>
                  <Rank count={0} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          <CustomDiv label="</ Data >" />
        </div>
      </section>
    </motion.div>
  );
}

// --- SUB COMPONENT FOR BUTTONS ---
function SubMenuButton({ label, active, onClick }: { label: string, active: string | null, onClick: () => void }) {
  const isActive = active === label;
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-1 rounded-md font-mono text-xs font-bold transition-all duration-200
        ${isActive 
          ? "bg-lime-400 text-stone-900 shadow-lg" 
          : "bg-stone-200 text-stone-500 hover:bg-stone-300"}
      `}
    >
      {label}
    </button>
  );
}