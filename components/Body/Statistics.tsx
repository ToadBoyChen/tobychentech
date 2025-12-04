"use client";
import { useEffect, useState, useRef } from "react";
import HackerText from "../HackerText";
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
  ScriptableContext,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { motion, useAnimation } from "framer-motion";
import CustomDiv from "../CustomDiv";
import HackerHeader from "../HackerHeader";
import SpotifyCard from "../SpotifyCard";
import LinuxCard from "./LinuxCard"; 
import HighText from "../HighText";

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
  avgCommits: number;
  weeklyLabels: string[];
  weeklyData: number[];
  langData: LangDetail[];
}

// --- SUB-COMPONENTS ---

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
      <span className="text-3xl md:text-5xl font-black text-lime-600 tracking-tighter tabular-nums leading-none">
        {count}
        <span className="text-zinc-400 text-lg md:text-2xl ml-1">{suffix}</span>
      </span>
      <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase mt-1">{label}</span>
    </div>
  );
};

const ActivityHeatmap = ({ data }: { data: number[] }) => {
  return (
    <div className="grid grid-cols-12 gap-1.5 w-full min-w-[250px]">
      {data.length === 0
        ? Array.from({ length: 84 }).map((_, i) => (
            <div key={i} className="w-full aspect-square rounded-2 bg-zinc-200" />
          ))
        : data.map((val, i) => (
            <div
              key={i}
              title={`${val} contributions`}
              className={`w-full aspect-square rounded-xl transition-all duration-500 border
                ${val === 0 ? "bg-zinc-100 border-zinc-200" : ""} 
                ${val === 1 ? "bg-lime-200 border-lime-300" : ""} 
                ${val === 2 ? "bg-lime-400 border-lime-500" : ""} 
                ${val >= 3 ? "bg-lime-600 border-lime-700" : ""}`}
            />
          ))}
    </div>
  );
};

const SystemLoad = ({ data }: { data: LangDetail[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!data || data.length === 0)
    return <div className="text-zinc-400 font-mono text-xs">NO_DATA_STREAM</div>;

  const activeItem = data[activeIndex] || data[0];

  const chartData: ChartData<"doughnut"> = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.percent),
        backgroundColor: data.map((d, i) => (i === activeIndex ? d.color : "#e4e4e7")), // zinc-200 for inactive
        borderWidth: 0, 
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { animateScale: true, animateRotate: true },
    onHover: (_: any, elements: string | any[]) => {
      if (elements && elements.length > 0) setActiveIndex(elements[0].index);
    },
  };

  return (
    <div className="flex flex-col xl:flex-row items-center w-full h-full gap-8 md:gap-12 px-0 md:px-4 lg:px-8">
      {/* Chart */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 group cursor-crosshair shrink-0">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-zinc-800 tabular-nums">{activeItem.percent}%</span>
            <span className="text-[10px] font-mono text-zinc-400 uppercase mt-1">{activeItem.name}</span>
        </div>
      </div>

      {/* List - Light Theme */}
      <div className="flex-1 w-full grid grid-cols-1 gap-2">
        <div className="flex justify-between items-end border-b border-zinc-200 pb-2 mb-2">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Language_Index</span>
        </div>

        <div className="space-y-1">
          {data.map((lang, idx) => (
            <div
              key={lang.name}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`flex items-center justify-between px-2 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                idx === activeIndex
                  ? "bg-zinc-100 shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono w-4 text-[10px] opacity-30">0{idx + 1}</span>
                <span className="text-xs md:text-sm font-bold tracking-tight text-zinc-700">
                  {lang.name}
                </span>
              </div>
              
              <div className="w-16 md:w-24 h-1 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                  />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PerformanceChart = ({ labels, dataPoints }: { labels: string[]; dataPoints: number[] }) => {
    const data = {
        labels: labels,
        datasets: [{
            label: "Commits",
            data: dataPoints,
            borderColor: "#65a30d", // Lime-600 (Darker for light mode visibility)
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, "rgba(101, 163, 13, 0.2)"); 
              gradient.addColorStop(1, "rgba(101, 163, 13, 0)");
              return gradient;
            },
            borderWidth: 2,
            pointBackgroundColor: "#fff", 
            pointBorderColor: "#65a30d",
            pointRadius: 0,
            pointHoverRadius: 4,
            fill: true,
            tension: 0.4,
        }]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { 
            enabled: true, 
            backgroundColor: '#fff', 
            titleColor: '#65a30d', 
            bodyColor: '#3f3f46',
            borderColor: '#e4e4e7',
            borderWidth: 1,
            displayColors: false,
            intersect: false,
        } },
        scales: {
          x: { 
              grid: { display: false },
              ticks: { font: { family: "monospace", size: 10 }, color: "#a1a1aa" },
              border: { display: false }
          },
          y: { display: false, min: 0 },
        },
        interaction: { mode: "index", intersect: false },
    };

  return (
    <div className="w-full h-full min-h-[180px] relative">
      <Line data={data} options={options} />
    </div>
  );
};

interface StatisticsProps {
  isStatisticsActive: boolean;
  data: StatisticsData;
}

export default function Statistics({ isStatisticsActive, data }: StatisticsProps) {
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
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[30px] md:h-[50px] fill-stone-50 block overflow-visible">
          <use href="#fixed-convex" />
        </svg>
      </div>
      
      {/* Light Theme Background */}
      <section className="relative px-6 md:px-20 lg:px-32 py-20 md:py-36 items-center justify-center z-20 bg-stone-50">
        
        <div className="mt-32 mb-12">
          <HackerHeader text="02 02 // GITHUB STATISTICS" lineSide="right" size="large" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-12">
            
          {/* 1. Heatmap Card - LIGHT CARD */}
          <div className="col-span-1 md:col-span-2 lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
            <div className="flex justify-between items-start mb-6 relative z-10 border-b border-zinc-100 pb-4">
              <div>
                  <p className="font-mono text-zinc-400 text-xs tracking-wider uppercase mb-1">// GIT_CONTRIBUTIONS</p>
                  <p className="font-bold text-zinc-900 text-xl tracking-tight">Activity Log</p>
              </div>
              <AnimatedCounter end={data.totalCommits} label="TOTAL_COMMITS" />
            </div>
            
            <div className="flex flex-col gap-8 w-full relative z-10">
              <div className="w-full">
                <ActivityHeatmap data={data.heatmapData} />
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-3xl font-black text-zinc-800 tabular-nums">{data.bestStreak}</span>
                    <span className="text-[10px] block text-zinc-400 font-mono tracking-widest mt-1 uppercase">Best Streak</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-zinc-800 tabular-nums">{data.avgCommits}</span>
                    <span className="text-[10px] block text-zinc-400 font-mono tracking-widest mt-1 uppercase">Daily Avg</span>
                  </div>
              </div>
            </div>
          </div>

          {/* 2. Languages Card - LIGHT CARD */}
          <div className="col-span-1 md:col-span-2 lg:col-span-7 flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="font-mono text-zinc-400 text-xs tracking-wider uppercase mb-1">// LANGUAGE_DISTRIBUTION</p>
                <p className="font-bold text-zinc-900 text-xl tracking-tight">System Load</p>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center"><SystemLoad data={data.langData} /></div>
          </div>

          {/* 3. Velocity Card - LIGHT CARD */}
          <div className="col-span-1 md:col-span-2 lg:col-span-12 flex flex-col bg-white rounded-3xl p-8 shadow-sm border border-zinc-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-mono text-zinc-400 text-xs tracking-wider uppercase mb-1">// 7_DAY_VELOCITY</p>
                <p className="font-bold text-zinc-900 text-xl flex items-center gap-3">
                  Code Frequency
                  <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                </p>
              </div>
              <div className="text-right">
                  <span className="text-4xl font-black text-zinc-800 tabular-nums">{data.weeklyData.reduce((a, b) => a + b, 0)}</span>
                  <span className="text-[10px] block text-zinc-400 font-mono tracking-widest mt-1">WEEKLY_TOTAL</span>
              </div>
            </div>
            <div className="flex-1 w-full relative h-[250px]">
              <PerformanceChart labels={data.weeklyLabels} dataPoints={data.weeklyData} />
            </div>
          </div>
        </div>

        <div className="mb-6 mt-24">
          <HackerHeader text="02 01 // CUSTOMERS" lineSide="right" size="large" />
        </div>

        {/* 4. "Total Customers" Card - Light Void Style */}
        <div className="flex justify-center w-full pb-12 md:pb-24">
            <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center relative overflow-hidden group py-12 bg-white rounded-3xl border border-zinc-100 shadow-sm">
                
                <div className="relative z-10 flex flex-col items-center">
                    <span className="font-mono text-zinc-400 text-xs tracking-[0.3em] mb-4">DATABASE_QUERY_RESULT</span>
                    
                    {/* The Big Zero - Light Theme Gradient */}
                    <p className="text-9xl md:text-[180px] font-black text-transparent bg-clip-text bg-linear-to-b from-zinc-200 to-zinc-400 mb-2 select-none">
                        0
                    </p>
                    
                    <p className="text-xl md:text-2xl font-bold text-zinc-800 mb-6">
                        Total Customers Served <span className="text-zinc-400 text-sm font-normal block mt-1">(so far)</span>
                    </p>
                    
                    <a href="/contact" className="inline-flex items-center gap-3 px-8 py-3 border border-lime-600 text-lime-700 hover:bg-lime-50 font-bold font-mono text-sm rounded-full transition-all duration-300">
                        <span>INITIATE_CONTACT</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>
            </div>
        </div>

        <CustomDiv label="</ Data >" />
      </section>
    </motion.div>
  );
}