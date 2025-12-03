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
    <div ref={ref} className="flex flex-col">
      <span className="text-2xl md:text-4xl font-black text-white tracking-tighter tabular-nums">
        {count}
        <span className="text-zinc-600 text-lg md:text-xl ml-1">{suffix}</span>
      </span>
      <span className="font-mono text-[10px] text-zinc-500 mt-1">{label}</span>
    </div>
  );
};

const ActivityHeatmap = ({ data }: { data: number[] }) => {
  return (
    // Added overflow-x-auto for very small screens
    <div className="grid grid-cols-12 gap-1 w-full min-w-[250px]">
      {data.length === 0
        ? Array.from({ length: 84 }).map((_, i) => (
            <div key={i} className="w-full aspect-square rounded-sm bg-zinc-800/50" />
          ))
        : data.map((val, i) => (
            <div
              key={i}
              title={`${val} contributions`}
              className={`w-full aspect-square rounded-sm transition-all relative
                ${val === 0 ? "bg-zinc-800/50 hover:bg-zinc-700" : ""} 
                ${val === 1 ? "bg-zinc-600" : ""} 
                ${val === 2 ? "bg-zinc-400" : ""} 
                ${val >= 3 ? "bg-white" : ""}`}
            />
          ))}
    </div>
  );
};

const SystemLoad = ({ data }: { data: LangDetail[] }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!data || data.length === 0)
    return <div className="text-zinc-500 font-mono text-xs">NO_DATA_STREAM</div>;

  const activeItem = data[activeIndex] || data[0];

  const chartData: ChartData<"doughnut"> = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.percent),
        backgroundColor: data.map((d, i) => (i === activeIndex ? d.color : `${d.color}33`)),
        borderColor: "#18181b",
        borderWidth: 2,
        hoverOffset: 0,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "0%",
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { animateScale: true, animateRotate: true },
    onHover: (_: any, elements: string | any[]) => {
      if (elements && elements.length > 0) setActiveIndex(elements[0].index);
    },
  };

  return (
    <div className="flex flex-col xl:flex-row items-center w-full h-full gap-8 md:gap-12 px-0 md:px-4 lg:px-16">
      <div className="relative w-40 h-40 md:w-48 md:h-48 group cursor-crosshair shrink-0">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute inset-[-10px] border border-zinc-800 rounded-full border-dashed animate-[spin_10s_linear_infinite] opacity-30 pointer-events-none" />
      </div>

      <div className="flex-1 w-full grid grid-cols-1 gap-1">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-2 mb-2">
          <div>
            <span className="text-xs font-mono text-zinc-500 block mb-1">SELECTED_MODULE</span>
            <span className="text-lg md:text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                style={{ color: activeItem.color, backgroundColor: activeItem.color }}
              />
              {activeItem.name}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          {data.map((lang, idx) => (
            <div
              key={lang.name}
              onMouseEnter={() => setActiveIndex(idx)}
              className={`flex items-center justify-between px-3 py-2 rounded border transition-all duration-200 cursor-pointer ${
                idx === activeIndex
                  ? "bg-zinc-800/80 border-zinc-600 text-zinc-200"
                  : "bg-transparent border-transparent text-zinc-500"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono w-4 text-xs">0{idx + 1}</span>
                <span className={`text-xs md:text-sm font-bold ${idx === activeIndex ? "text-white" : "text-zinc-500"}`}>
                  {lang.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 md:w-56 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 font-mono"
                    style={{ width: `${lang.percent}%`, backgroundColor: idx === activeIndex ? lang.color : "#3f3f46" }}
                  />
                </div>
                <span className="font-mono w-8 text-right text-xs">{lang.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PerformanceChart = ({ labels, dataPoints }: { labels: string[]; dataPoints: number[] }) => {
    // ... logic remains same, just ensuring responsiveness via container
    const data = {
        labels: labels,
        datasets: [{
            label: "Commits",
            data: dataPoints,
            borderColor: "#ffffff",
            backgroundColor: (context: ScriptableContext<"line">) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 300);
              gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
              gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
              return gradient;
            },
            borderWidth: 2,
            pointBackgroundColor: "#000",
            pointBorderColor: "#fff",
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.3,
        }]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { enabled: true, intersect: false, mode: "index" } },
        scales: {
          x: { grid: { display: true, color: "#27272a" }, ticks: { font: { family: "monospace", size: 10 }, color: "#71717a" } },
          y: { display: false, min: 0 },
        },
        interaction: { mode: "nearest", axis: "x", intersect: false },
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
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[30px] md:h-[50px] fill-lime-950 block overflow-visible">
          <use href="#fixed-convex" />
        </svg>
      </div>
      <section className="relative px-6 md:px-20 lg:px-32 py-20 md:py-36 items-center justify-center z-20 bg-lime-950">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <HackerText text="SOME FACTS" triggerOnMount={true} triggerOnHover={false} speed={50} className="text-stone-50 font-bold text-5xl md:text-6xl lg:text-8xl tracking-tighter text-center font-mono" />
        </div>
        <CustomDiv
          label="< Data >"
          lineColor="bg-stone-50"
          textColor="text-stone-50"
        />
        <div className="mb-24">
          <HackerHeader 
            text="02 01 // FUN FACTS"
            lineSide="right"
            className="text-stone-50 text-xl"
            lineColor="bg-stone-50"
          />
          <SpotifyCard/>
        </div>
        <div className="mb-24">
          <LinuxCard/>
        </div>

        <HackerHeader 
          text="02 02 // GITHUB STATISTICS"
          lineSide="right"
          className="text-stone-50 text-xl"
          lineColor="bg-stone-50"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 xl:gap-8">
            {/* Heatmap Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-5 bg-zinc-900 border border-zinc-800 p-4 md:p-8 hover:border-zinc-600 transition-all group flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div><p className="font-bold text-white text-base md:text-lg">Contributions</p></div>
              <div className="text-right"><AnimatedCounter end={data.totalCommits} label="Total Commits" /></div>
            </div>
            <div className="flex flex-col gap-8 w-full">
              <div className="w-full bg-zinc-950/50 p-2 md:p-4 rounded-lg border border-zinc-800/50 overflow-x-auto">
                <ActivityHeatmap data={data.heatmapData} />
              </div>
              <div className="flex justify-between items-center border-t border-zinc-800 pt-6">
                <div className="flex gap-4 md:gap-8">
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-white">{data.bestStreak}</span>
                    <span className="text-[10px] block text-zinc-500 font-mono tracking-widest mt-1">BEST_STREAK</span>
                  </div>
                  <div>
                    <span className="text-xl md:text-2xl font-bold text-white">{data.avgCommits}</span>
                    <span className="text-[10px] block text-zinc-500 font-mono tracking-widest mt-1">DAILY_AVG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

            {/* Languages Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-7 bg-zinc-900 border border-zinc-800 p-4 md:p-8 flex flex-col hover:border-zinc-600 transition-colors group relative">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-bold text-white text-base md:text-lg tracking">Most Used Languages</p>
                <p className="text-zinc-500 text-[10px] md:text-xs font-mono mt-1">LANGUAGE_DISTRIBUTION</p>
              </div>
            </div>
            <div className="flex-1 flex items-center"><SystemLoad data={data.langData} /></div>
          </div>

            {/* Velocity Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-12 bg-zinc-900 border border-zinc-800 p-4 md:p-8 flex flex-col hover:border-zinc-600 transition-colors group h-[320px]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-bold text-white text-base md:text-lg flex items-center gap-2">
                  Code Velocity
                  <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">7_DAYS</span>
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-xl md:text-2xl font-black text-white">{data.weeklyData.reduce((a, b) => a + b, 0)}</span>
                  <span className="text-[10px] ml-2 text-zinc-500 font-mono tracking-widest">Commits this Week</span>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <PerformanceChart labels={data.weeklyLabels} dataPoints={data.weeklyData} />
            </div>
          </div>
        </div>

        <div className="mb-6 mt-24">
          <HackerHeader 
            text="02 01 // GITHUB STATISTICS"
            lineSide="right"
            className="text-stone-50"
            lineColor="bg-stone-50"
          />
        </div>

        <div className="flex justify-center w-full pb-12 md:pb-24">
            <div className="w-full max-w-4xl bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl p-6 md:p-12 flex flex-col items-center justify-center text-center hover:border-zinc-500 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                {/* Responsive text sizing for the big zero */}
                <p className="text-8xl md:text-9xl lg:text-[160px] font-black text-zinc-800 mb-6 group-hover:text-zinc-700 transition-colors select-none relative z-10">0</p>
                <p className="text-xl md:text-3xl font-bold text-white mb-4 relative z-10">Total Customers Served <span className="text-sm"> so far </span></p>
                <p className="text-zinc-400 font-mono text-xs md:text-base max-w-lg relative z-10 mb-8 leading-relaxed">
                    Be the first to break the streak<br /><br /><span className="text-2xl md:text-4xl">🥺👉👈</span>
                </p>
                <div className="relative z-10">
                    <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-3 bg-white text-black rounded-full font-bold text-base md:text-lg"><span>Lets Work Together</span></a>
                </div>
            </div>
        </div>
        <CustomDiv
          label="</ Data >"
          lineColor="bg-stone-50"
          textColor="text-stone-50"
        />
      </section>
    </motion.div>
  );
}