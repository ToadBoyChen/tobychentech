"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
  ChartOptions,
} from "chart.js";
import "katex/dist/katex.min.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- SYMLOG HELPER FUNCTIONS ---
const toSymlog = (val: number) => Math.sign(val) * Math.log10(Math.abs(val) + 1);
const fromSymlog = (val: number) => Math.sign(val) * (Math.pow(10, Math.abs(val)) - 1);
const formatNumber = (num: number) => {
  if (Math.abs(num) >= 1000) return (num / 1000).toFixed(1) + "k";
  return Math.round(num * 100) / 100;
};
// -------------------------------

const AnimatedCounter = ({
  end,
  label,
  suffix = "",
}: {
  end: number;
  label: string;
  suffix?: string;
}) => {
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
    <div ref={ref} className="flex flex-col text-left md:text-right">
      <span className="font-mono text-xs md:text-sm text-stone-400 tracking-widest uppercase mb-1 md:mb-2">
        // {label}
      </span>
      <span className="text-3xl md:text-5xl font-black text-lime-600 leading-none">
        {count}
        <span className="text-stone-400 text-lg md:text-2xl ml-1">
          {suffix}
        </span>
      </span>
    </div>
  );
};

type TimeRange = "7d" | "14d" | "30d" | "90d";

export default function Velocity({
  labels = [],
  data = [],
}: {
  labels?: string[];
  data?: number[];
}) {
  const [range, setRange] = useState<TimeRange>("7d");
  const [isLog, setIsLog] = useState(false);
  const [visibility, setVisibility] = useState({
    commits: true,
    velocity: true,
    acceleration: false,
  });

  const toggleMetric = (key: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const {
    visibleLabels,
    // rawVisibleData, // Unused in render, removed to silence linter
    totalCommits,
    plotData,
    plotVelocity,
    plotAcceleration,
  } = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        visibleLabels: [],
        rawVisibleData: [],
        totalCommits: 0,
        plotData: [],
        plotVelocity: [],
        plotAcceleration: [],
      };
    }

    const fullVelocity = data.map((val, i) =>
      i === 0 ? 0 : val - data[i - 1]
    );
    const fullAcceleration = fullVelocity.map((val, i) =>
      i === 0 ? 0 : val - fullVelocity[i - 1]
    );

    let count = data.length;
    if (range === "7d") count = 7;
    if (range === "14d") count = 14;
    if (range === "30d") count = 30;
    const sliceCount = Math.min(count, data.length);

    const slicedData = data.slice(-sliceCount);
    const slicedVelocity = fullVelocity.slice(-sliceCount);
    const slicedAcceleration = fullAcceleration.slice(-sliceCount);

    const transform = isLog ? toSymlog : (v: number) => v;

    return {
      visibleLabels: labels.slice(-sliceCount),
      rawVisibleData: slicedData,
      totalCommits: slicedData.reduce((a, b) => a + b, 0),
      plotData: slicedData.map(transform),
      plotVelocity: slicedVelocity.map(transform),
      plotAcceleration: slicedAcceleration.map(transform),
    };
  }, [data, labels, range, isLog]);

  const chartData = {
    labels: visibleLabels,
    datasets: [
      {
        label: "Commits",
        data: plotData,
        hidden: !visibility.commits,
        borderColor: "#65a30d",
        fill: "origin",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea, scales } = chart;
          if (!chartArea) return undefined;

          const yScale = scales.y;
          const top = chartArea.top;
          const bottom = chartArea.bottom;
          const zeroPixel = yScale.getPixelForValue(0);

          let zeroRatio = (zeroPixel - top) / (bottom - top);
          zeroRatio = Math.min(Math.max(zeroRatio, 0), 1);

          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, "rgba(101, 163, 13, 0.2)");
          gradient.addColorStop(zeroRatio, "rgba(101, 163, 13, 0)");
          gradient.addColorStop(1, "rgba(101, 163, 13, 0.2)");
          return gradient;
        },
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#65a30d",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        tension: 0.45,
        order: 3,
      },
      {
        label: "Velocity",
        data: plotVelocity,
        hidden: !visibility.velocity,
        borderColor: "#0ea5e9",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#0ea5e9",
        pointBorderColor: "#fff",
        tension: 0.45,
        order: 2,
      },
      {
        label: "Acceleration",
        data: plotAcceleration,
        hidden: !visibility.acceleration,
        borderColor: "#f43f5e",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#f43f5e",
        pointBorderColor: "#fff",
        tension: 0.45,
        order: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1c1917",
        bodyColor: "#57534e",
        borderColor: "#e7e5e4",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        boxPadding: 4,
        titleFont: { family: "monospace", size: 12 },
        bodyFont: { family: "monospace", size: 11 },
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              const val = isLog
                ? fromSymlog(context.parsed.y)
                : context.parsed.y;
              label += formatNumber(val);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "monospace", size: 10 },
          color: "#d6d3d1",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
        border: { display: false },
      },
      y: {
        type: "linear",
        display: false,
        grid: { display: false },
        border: { display: false },
        ticks: {
          callback: (value) => {
            const num = Number(value);
            const realVal = isLog ? fromSymlog(num) : num;
            return formatNumber(realVal);
          },
        },
      },
    },
    interaction: { mode: "index", intersect: false },
  };

  if (!data || data.length === 0) return null;

  return (
    // RESPONSIVE UPDATE: Adjusted padding (p-4 mobile -> p-12 desktop)
    <div className="h-full col-span-1 md:col-span-2 lg:col-span-7 flex flex-col p-4 sm:p-8 lg:p-12">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col mb-6 md:mb-8 gap-6 border-b border-stone-100/0">
        
        {/* Row 1: Title and Total Counter */}
        {/* RESPONSIVE UPDATE: Stack on mobile, Row on md */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4 md:gap-0">
          <div>
            <p className="font-mono text-stone-400 text-xs md:text-sm tracking-wider uppercase mb-1 md:mb-2">
              // CODE_VELOCITY
            </p>
            <p className="font-bold text-stone-800 text-2xl tracking-tight leading-none">
              Code Frequency
            </p>
          </div>
          
          <AnimatedCounter end={totalCommits} label={`TOTAL (${range})`} />
        </div>

        {/* Row 2: Controls (Time Left, Scale Right) */}
        {/* RESPONSIVE UPDATE: Stack on mobile, Row on md. Buttons expand to w-full on mobile. */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 md:gap-0">
          
          {/* Time Range Selector */}
          <div className="flex bg-lime-100 p-1.5 rounded-xl w-full md:w-fit justify-between md:justify-start">
            {(["7d", "14d", "30d", "90d"] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`flex-1 md:flex-none px-2 md:px-4 py-2 rounded-lg text-[10px] md:text-xs font-bold font-mono transition-all duration-300 ${
                  range === r
                    ? "bg-yellow-50 shadow-md text-lime-800"
                    : "text-lime-600 hover:text-lime-950"
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Scale Toggle (LIN / SYMLOG) */}
          <div className="flex bg-stone-100 p-1.5 rounded-xl w-full md:w-fit">
            <button
              onClick={() => setIsLog(false)}
              className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
                !isLog
                  ? "bg-white shadow-sm text-stone-800"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              LIN
            </button>
            <button
              onClick={() => setIsLog(true)}
              className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
                isLog
                  ? "bg-white shadow-sm text-stone-800"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              SYMLOG
            </button>
          </div>
        </div>
      </div>

      {/* --- CHART SECTION --- */}
      <div className="flex-1 flex flex-col gap-6 md:gap-10 w-full justify-between">
        {/* RESPONSIVE UPDATE: Reduced min-height on mobile (250px) -> 350px on desktop */}
        <div className="w-full relative min-h-[250px] md:min-h-[350px] flex-1">
          <Line data={chartData} options={options} />
        </div>

        {/* Legend / Metrics Control */}
        <div className="bg-stone-50 rounded-2xl p-4 md:p-6 border border-stone-100/50">
          <div className="flex justify-between items-center mb-4">
            <p className="font-mono text-xs text-stone-400 uppercase tracking-widest">
              // DISPLAY_METRICS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            <button
              onClick={() => toggleMetric("commits")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                visibility.commits ? "bg-lime-200" : "bg-white"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  visibility.commits ? "bg-lime-600" : "bg-stone-300"
                }`}
              ></div>
              <div className="text-left flex flex-col">
                <span className="text-xs font-bold text-stone-700">
                  Commits
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  f(x)
                </span>
              </div>
            </button>

            <button
              onClick={() => toggleMetric("velocity")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                visibility.velocity ? "bg-lime-200" : "bg-white"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full border-4 transition-colors ${
                  visibility.velocity ? "border-sky-500" : "border-stone-300"
                }`}
              ></div>
              <div className="text-left flex flex-col">
                <span className="text-xs font-bold text-stone-700">
                  Velocity
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  f'(x)
                </span>
              </div>
            </button>

            <button
              onClick={() => toggleMetric("acceleration")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                visibility.acceleration ? "bg-lime-200" : "bg-white"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full border-4 transition-colors ${
                  visibility.acceleration
                    ? "border-rose-500"
                    : "border-stone-300"
                }`}
              ></div>
              <div className="text-left flex flex-col">
                <span className="text-xs font-bold text-stone-700">
                  Acceleration
                </span>
                <span className="text-[10px] text-stone-400 font-mono">
                  f''(x)
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}