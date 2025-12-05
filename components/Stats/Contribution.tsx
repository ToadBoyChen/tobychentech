"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { StatisticsData } from "@/components/Body/Statistics"; 
import HackerHeader from "../HackerHeader";

const SmoothWrapper = ({ children }: { children: React.ReactNode }) => {
  const [height, setHeight] = useState<number | undefined>(undefined);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{ height }}
      className="overflow-hidden transition-[height] duration-500 ease-in-out will-change-[height]"
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
      <span className="font-mono text-sm text-stone-400 tracking-widest uppercase mb-2">// {label}</span>
      <span className="text-4xl md:text-5xl font-black text-lime-600">
        {count}
        <span className="text-stone-400 text-lg md:text-2xl ml-1">{suffix}</span>
      </span>
    </div>
  );
};

const ActivityHeatmap = ({ data }: { data: number[] }) => {
  return (
    <SmoothWrapper>
      <div className="grid grid-cols-12 gap-3 w-full">
        {data.length === 0
          ? Array.from({ length: 84 }).map((_, i) => (
              <div 
                key={`empty-${i}`} 
                className="w-full aspect-square rounded-lg animate-out fade-in zoom-in duration-300 fill-mode-both" 
                style={{ animationDelay: `${i * 5}ms` }}
              />
            ))
          : data.map((val, i) => (
              <div
                key={i} 
                title={`${val} contributions`}
                className={`
                  w-full aspect-square rounded-lg 
                  animate-in fade-in zoom-in-75 duration-300 fill-mode-both
                  transition-transform
                  ${val === 0 ? "bg-stone-100" : ""} 
                  ${val === 1 ? "bg-[#f7fee7]" : ""} 
                  ${val === 2 ? "bg-[#ecfccb]" : ""} 
                  ${val === 3 ? "bg-[#d9f99d]" : ""}
                  ${val === 4 ? "bg-[#bef264]" : ""}
                  ${val === 5 ? "bg-[#a3e635]" : ""}
                  ${val === 6 ? "bg-[#84cc16]" : ""}
                  ${val === 7 ? "bg-[#76b813]" : ""}
                  ${val === 8 ? "bg-[#65a30d]" : ""}
                  ${val === 9 ? "bg-[#588d0b]" : ""}
                  ${val === 10 ? "bg-[#4d7c0f]" : ""}
                  ${val === 11 ? "bg-[#456e0d]" : ""}
                  ${val === 12 ? "bg-[#3f6212]" : ""}
                  ${val === 13 ? "bg-[#365314]" : ""}
                  ${val === 14 ? "bg-[#2a420f]" : ""}
                  ${val >= 15 ? "bg-[#1a2e05]" : ""}
                `}
                style={{ animationDelay: `${i * 10}ms` }}
              />
            ))}
      </div>
    </SmoothWrapper>
  );
};


const HEATMAP_KEY_STEPS = [
  { val: 0, color: "bg-stone-100", label: "0" },
  { val: 1, color: "bg-[#f7fee7]", label: "1" },
  { val: 2, color: "bg-[#ecfccb]", label: "2" },
  { val: 3, color: "bg-[#d9f99d]", label: "3" },
  { val: 4, color: "bg-[#bef264]", label: "4" },
  { val: 5, color: "bg-[#a3e635]", label: "5" },
  { val: 6, color: "bg-[#84cc16]", label: "6" },
  { val: 7, color: "bg-[#76b813]", label: "7" },
  { val: 8, color: "bg-[#65a30d]", label: "8" },
  { val: 9, color: "bg-[#588d0b]", label: "9" },
  { val: 10, color: "bg-[#4d7c0f]", label: "10" },
  { val: 11, color: "bg-[#456e0d]", label: "11" },
  { val: 12, color: "bg-[#3f6212]", label: "12" },
  { val: 13, color: "bg-[#365314]", label: "13" },
  { val: 14, color: "bg-[#2a420f]", label: "14" },
  { val: 15, color: "bg-[#1a2e05]", label: "15+" },
];

const HeatmapKey = () => {
  return (
    <div className="flex items-center mt-8 animate-in slide-in-from-bottom-2 fade-in duration-500 w-full justify-between">
      <span className="font-mono text-xs text-stone-400 mr-3">LESS</span>
      <div className="flex gap-2">
        {HEATMAP_KEY_STEPS.map((step, index) => (
          <div 
            key={step.val} 
            title={`${step.label} contributions`}
            className={`w-4 h-4 ${step.color} rounded-sm`}
          />
        ))}
      </div>
      
      <span className="font-mono text-xs text-stone-400 ml-3">MORE</span>
    </div>
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
    <span className="text-xs block text-stone-400 font-mono tracking-widest mt-2 uppercase truncate">
      {label}
    </span>
  </div>
);

type TimeRange = "1w" | "2w" | "1m" | "3m";

export default function Contribution({ data }: { data: StatisticsData }) {
  const [range, setRange] = useState<TimeRange>("3m");
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
    if (range === "1w") count = 7;
    if (range === "2w") count = 14;
    if (range === "1m") count = 30;
    if (range === "3m") count = 90;

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
    <div className="h-full col-span-1 md:col-span-2 lg:col-span-5 flex flex-col p-12">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-12 pb-6 gap-6">
        <div className="flex flex-row justify-between w-full">
          <div>
            <p className="font-mono text-stone-400 text-sm tracking-wider uppercase mb-2">
              // GIT_CONTRIBUTIONS
            </p>
            <p className="font-bold text-stone-800 text-2xl tracking-tight mb-4">
              Activity Log
            </p>
            
            <div className="flex bg-lime-100 p-1.5 rounded-xl w-fit">
              {(["1w", "2w", "1m", "3m"] as TimeRange[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
                    range === r
                      ? "bg-yellow-50 shadow-md"
                      : "text-lime-600 hover:text-lime-950"
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <AnimatedCounter end={viewTotal} label={`TOTAL_COMMITS (${range})`} />
        </div>
      </div>
      <div className="mb-2">
        <HackerHeader
          text="Commits"
          lineColor="bg-zinc-300"
          className="text-sm text-zinc-500"
        />
      </div>
      <div className="flex-1 flex flex-col gap-16 w-full justify-between">
        <div className="w-full">
          <ActivityHeatmap data={viewHeatmap} />
          <HeatmapKey />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 bg-stone-50 rounded-2xl p-10 border border-stone-100/50">
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