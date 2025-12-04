"use client";

import { useEffect, useRef, useState, useMemo } from "react";
// Import StatisticsData interface
import { StatisticsData } from "@/components/Body/Statistics"; 

// --- Sub-components ---

// 1. Smooth Height Wrapper (Replaces Framer Motion layout animation)
const SmoothWrapper = ({ children }: { children: React.ReactNode }) => {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Use ResizeObserver to detect changes in the inner content's size
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Update the wrapper height to match the content
        setHeight(entry.contentRect.height);
      }
    });

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{ height }}
      className="overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[height]"
    >
      <div ref={contentRef} className="pb-1">
        {children}
      </div>
    </div>
  );
};

const AnimatedCounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const increment = end <= 0 ? 1 : end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col text-right">
      <span className="text-3xl md:text-5xl font-black text-lime-600 tracking-tighter tabular-nums leading-none drop-shadow-sm">
        {count}
        <span className="text-stone-400 text-lg md:text-2xl ml-1">{suffix}</span>
      </span>
      <span className="font-mono text-[10px] text-stone-400 tracking-widest uppercase mt-1">{label}</span>
    </div>
  );
};

const ActivityHeatmap = ({ data }: { data: number[] }) => {
  return (
    // Wrap the grid in our SmoothWrapper
    <SmoothWrapper>
      <div className="grid grid-cols-12 gap-2 w-full min-w-[250px]">
        {data.length === 0
          ? Array.from({ length: 84 }).map((_, i) => (
              <div 
                key={`empty-${i}`} 
                className="w-full aspect-square rounded-md bg-stone-100 animate-in fade-in zoom-in duration-300 fill-mode-backwards" 
                style={{ animationDelay: `${i * 5}ms` }}
              />
            ))
          : data.map((val, i) => (
              <div
                // Use index as key to trigger simple re-renders, or use unique ID if available
                key={i} 
                title={`${val} contributions`}
                // Tailwind animate-in utility for smooth entry without Framer Motion
                className={`
                  w-full aspect-square rounded-md shadow-sm 
                  animate-in fade-in zoom-in-75 duration-300 fill-mode-backwards
                  transition-transform hover:scale-110
                  ${val === 0 ? "bg-stone-100" : ""} 
                  ${val === 1 ? "bg-yellow-300" : ""} 
                  ${val === 2 ? "bg-lime-400" : ""} 
                  ${val >= 3 ? "bg-lime-600" : ""}
                `}
                // Stagger effect
                style={{ animationDelay: `${i * 10}ms` }}
              />
            ))}
      </div>
    </SmoothWrapper>
  );
};

const StatBlock = ({ 
  value, 
  label, 
  isText = false,
  highlight = false 
}: { 
  value: string | number; 
  label: string; 
  isText?: boolean;
  highlight?: boolean;
}) => (
  <div className="flex flex-col justify-center animate-in slide-in-from-bottom-2 fade-in duration-500">
    <span 
      className={`font-black text-stone-800 tabular-nums truncate transition-all duration-300
      ${isText ? "text-xl md:text-2xl" : "text-3xl"} 
      ${highlight ? "text-lime-600" : ""}`}
    >
      {value}
    </span>
    <span className="text-[10px] block text-stone-400 font-mono tracking-widest mt-1 uppercase truncate">
      {label}
    </span>
  </div>
);

// --- Main Component ---

type TimeRange = "7d" | "14d" | "30d" | "90d";

export default function Contribution({ data }: { data: StatisticsData }) {
  const [range, setRange] = useState<TimeRange>("90d");

  // Recalculate stats based on the selected Time Range
  const { 
    viewTotal, 
    viewHeatmap, 
    viewBestStreak, 
    viewCurrentStreak, 
    viewAvg, 
    viewTopDay 
  } = useMemo(() => {
    const sourceData = data.historyData && data.historyData.length > 0 
      ? data.historyData 
      : data.heatmapData || [];

    let count = sourceData.length; 
    if (range === "7d") count = 7;
    if (range === "14d") count = 14;
    if (range === "30d") count = 30;
    if (range === "90d") count = 90;

    const slice = sourceData.slice(-Math.min(count, sourceData.length));
    const total = slice.reduce((a, b) => a + b, 0);
    
    let activeDays = 0;
    let maxStreak = 0;
    let currStreak = 0;
    const dayCounts: Record<string, number> = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    
    const today = new Date();
    const endIndex = slice.length - 1;

    slice.forEach((val, idx) => {
      if (val > 0) {
        activeDays++;
        currStreak++;
        if (currStreak > maxStreak) maxStreak = currStreak;
      } else {
        currStreak = 0;
      }

      if (val > 0) {
         const d = new Date();
         d.setDate(today.getDate() - (endIndex - idx));
         const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
         dayCounts[dayName] = (dayCounts[dayName] || 0) + val;
      }
    });

    const avg = activeDays > 0 ? Math.round(total / activeDays) : 0;
    const topDay = Object.keys(dayCounts).reduce((a, b) => dayCounts[a] > dayCounts[b] ? a : b);

    return {
      viewTotal: total,
      viewHeatmap: slice,
      viewBestStreak: maxStreak,
      viewCurrentStreak: currStreak,
      viewAvg: avg,
      viewTopDay: topDay === "Sun" && total === 0 ? "N/A" : topDay
    };

  }, [data, range]);

  return (
    <div className="h-full col-span-1 md:col-span-2 lg:col-span-5 flex flex-col bg-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 hover:shadow-stone-300/50 transition-shadow duration-500 border border-stone-100">
      
      {/* Header Section */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 border-b border-stone-100 pb-4 gap-4">
        <div>
          <p className="font-mono text-stone-400 text-xs tracking-wider uppercase mb-1">
            // GIT_CONTRIBUTIONS
          </p>
          <p className="font-bold text-stone-800 text-2xl tracking-tight mb-3">
            Activity Log
          </p>
          
          {/* Time Range Selector */}
          <div className="flex bg-stone-100 p-1 rounded-xl w-fit">
            {(["7d", "14d", "30d", "90d"] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold font-mono transition-all duration-300 ${
                  range === r
                    ? "bg-white text-stone-800 shadow-sm"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <AnimatedCounter end={viewTotal} label={`TOTAL_COMMITS (${range})`} />
      </div>

      <div className="flex-1 flex flex-col gap-8 w-full justify-between">
        <div className="w-full">
          <ActivityHeatmap data={viewHeatmap} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 bg-stone-50 rounded-2xl p-6 border border-stone-100/50">
          <StatBlock value={viewBestStreak} label="Best Streak" />
          
          <StatBlock 
            value={viewCurrentStreak} 
            label="Curr. Streak" 
            highlight={viewCurrentStreak > 0}
          />
          
          <StatBlock value={viewAvg} label="Daily Avg" />
          
          <StatBlock 
            value={viewTopDay} 
            label="Top Day" 
            isText={true}
          />
        </div>
      </div>
    </div>
  );
}