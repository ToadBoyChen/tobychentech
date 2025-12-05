"use client";
import { useEffect } from "react";
import HackerHeader from "../HackerHeader";
import { motion, useAnimation } from "framer-motion";
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

export default function Statistics({
  isStatisticsActive,
  data,
}: StatisticsProps) {
  const controls = useAnimation();
  const cardVariants = {
    hidden: { y: 100 },
    visible: { y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    if (isStatisticsActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isStatisticsActive, controls]);

  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}>
      <div className="w-full top-0 left-0 z-50">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-[30px] md:h-[50px] fill-stone-50 block overflow-visible"
        >
          <use href="#fixed-convex" />
        </svg>
      </div>

      <section className="relative px-6 md:px-20 lg:px-32 py-20 md:py-36 items-center justify-center z-20 bg-stone-50">
        <div className="max-w-[1600px] mx-auto w-full"> 
          <div className="flex flex-col items-center mb-16">
            <HackerText
              text="STATISTICS"
              triggerOnMount={true}
              triggerOnHover={false}
              className="font-bold text-5xl md:text-6xl lg:text-8xl tracking-tighter text-center font-mono"
            />
          </div>

          <CustomDiv label="< DATA >" />

          <div className="my-12">
            <HackerHeader
              text="03 01 // PROGRAMMING STATS"
              lineSide="right"
              size="large"
            />
          </div>

          {/* Row 1 Header */}
          <div className="mb-8 mt-4">
             <HackerHeader text="03 01 01 // CONTRIBUTION STARS" lineSide="left" />
          </div>

          {/* Grid Container for Row 1 */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 w-full mb-16">
            {/* Column 1: Contribution (approx 40%) */}
            <div className="col-span-1 xl:col-span-5">
               <Contribution data={data} />
            </div>

            {/* Column 2: Velocity (approx 60%) */}
            <div className="col-span-1 xl:col-span-7">
               <Velocity labels={data.historyLabels} data={data.historyData} />
            </div>
          </div>

          {/* Row 2 Header */}
          <div className="mb-8 mt-12">
            <HackerHeader text="03 01 02 // PROGRAMMING HABITS" lineSide="left" />
          </div>

          {/* Grid Container for Row 2 - UPDATED */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 w-full">
             
             {/* Language: Takes 6 columns (50%) on XL screens, full width on smaller */}
             <div className="col-span-1 xl:col-span-6">
               <Language data={data.langData} />
             </div>

             {/* HackerRank: Takes 6 columns (50%) on XL screens, full width on smaller */}
             <div className="col-span-1 xl:col-span-6">
               <HackerRank username="toby_chen13371" />
             </div>

          </div>

          <div className="mb-6 mt-24">
            <HackerHeader
              text="02 01 // CUSTOMERS"
              lineSide="right"
              size="large"
            />
          </div>
          <Rank count={0} />

          <CustomDiv label="</ Data >" />
        </div>
      </section>
    </motion.div>
  );
}