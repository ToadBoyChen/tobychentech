"use client";

import { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
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
import { InlineMath } from "react-katex";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeRange = "7d" | "14d" | "30d" | "90d";

export default function Velocity({
  labels = [],
  data = [],
}: {
  labels?: string[];
  data?: number[];
}) {
  const [range, setRange] = useState<TimeRange>("7d");
  const [visibility, setVisibility] = useState({
    commits: true,
    velocity: true,
    acceleration: true,
  });

  const toggleMetric = (key: keyof typeof visibility) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const { visibleLabels, visibleData, visibleVelocity, visibleAcceleration } = useMemo(() => {
    if (!data || data.length === 0) {
      return { visibleLabels: [], visibleData: [], visibleVelocity: [], visibleAcceleration: [] };
    }
    const fullVelocity = data.map((val, i) => (i === 0 ? 0 : val - data[i - 1]));
    const fullAcceleration = fullVelocity.map((val, i) => (i === 0 ? 0 : val - fullVelocity[i - 1]));
    let count = data.length;
    if (range === "7d") count = 7;
    if (range === "14d") count = 14;
    if (range === "30d") count = 30;
    const sliceCount = Math.min(count, data.length);

    return {
      visibleLabels: labels.slice(-sliceCount),
      visibleData: data.slice(-sliceCount),
      visibleVelocity: fullVelocity.slice(-sliceCount),
      visibleAcceleration: fullAcceleration.slice(-sliceCount),
    };
  }, [data, labels, range]);

  const chartData = {
    labels: visibleLabels,
    datasets: [
      {
        label: "Commits (x)",
        data: visibleData,
        hidden: !visibility.commits,
        borderColor: "#84cc16",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(132, 204, 22, 0.4)");
          gradient.addColorStop(1, "rgba(132, 204, 22, 0)");
          return gradient;
        },
        borderWidth: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#84cc16",
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4,
        order: 3,
      },
      {
        label: "Velocity (v)",
        data: visibleVelocity,
        hidden: !visibility.velocity,
        borderColor: "#0ea5e9",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#0ea5e9",
        pointRadius: 4,
        borderDash: [6, 6],
        tension: 0.4,
        order: 2,
      },
      {
        label: "Acceleration (a)",
        data: visibleAcceleration,
        hidden: !visibility.acceleration,
        borderColor: "#f43f5e",
        backgroundColor: "transparent",
        borderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#f43f5e",
        pointRadius: 4,
        borderDash: [3, 6],
        tension: 0.4,
        order: 1,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 750 },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#fff",
        titleColor: "#1c1917",
        bodyColor: "#57534e",
        borderColor: "#e7e5e4",
        borderWidth: 1,
        displayColors: true,
        padding: 16,
        titleFont: { family: "monospace", size: 13 },
        bodyFont: { family: "monospace", size: 12 },
        callbacks: {
          label: (context) => {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) {
              const val = context.parsed.y;
              const sign = context.datasetIndex > 0 && val > 0 ? "+" : "";
              label += sign + val;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "monospace", size: 11 }, color: "#a8a29e" },
        border: { display: false },
      },
      y: {
        display: true,
        grid: { color: "#f5f5f4" },
        border: { display: false },
        ticks: { display: false },
      },
    },
    interaction: { mode: "index", intersect: false },
  };

  if (!data || data.length === 0) return null;

  return (
    // Updated: Added 'h-full', changed rounded to '3xl', changed p-10 to 'p-8'
    <div className="h-full col-span-1 md:col-span-2 lg:col-span-7 flex flex-col bg-white rounded-3xl p-8 shadow-2xl shadow-stone-200/50 border border-stone-100">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <p className="font-mono text-stone-400 text-sm tracking-widest uppercase mb-2">
            // {range}_Overview
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-stone-800 text-3xl">
              Code Frequency
            </h2>
            <div className="text-stone-500 text-sm flex gap-3 items-center">
              <span className="bg-stone-50 px-3 py-1.5 rounded-lg text-sm font-mono border border-stone-100">
                Model: <InlineMath math="f(t) = x_t" />
              </span>
            </div>
          </div>
        </div>

        {/* Time Range Controls */}
        <div className="flex items-center gap-4">
            <div className="flex bg-stone-100 p-1 rounded-xl">
            {(["7d", "14d", "30d", "90d"] as TimeRange[]).map((r) => (
                <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all duration-300 ${
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
      </div>

      {/* Main Chart Area - Flex to fill available space */}
      <div className="flex-1 w-full relative min-h-[300px] mb-8">
        <Line data={chartData} options={options} />
      </div>

      {/* Interactive Legend / Controls */}
      <div className="flex flex-col md:flex-row justify-between items-end border-t border-stone-100 pt-8 gap-6">
        <div className="flex-1">
            <p className="font-mono text-xs text-stone-400 uppercase tracking-widest mb-4">
            Select Metrics:
            </p>
            <div className="flex flex-wrap gap-4">
                <button
                    onClick={() => toggleMetric("commits")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${
                    visibility.commits
                        ? "bg-white border-stone-200 shadow-sm hover:border-lime-500"
                        : "bg-stone-50 border-transparent opacity-50 hover:opacity-75"
                    }`}
                >
                    <div className={`w-3 h-3 rounded-full transition-colors ${visibility.commits ? "bg-lime-500" : "bg-stone-300"}`}></div>
                    <div className="text-left">
                    <span className="block text-xs font-bold text-stone-700 group-hover:text-lime-700 transition-colors">Commits</span>
                    <span className="text-xs text-stone-400"><InlineMath math="x" /></span>
                    </div>
                </button>

                <button
                    onClick={() => toggleMetric("velocity")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${
                    visibility.velocity
                        ? "bg-white border-stone-200 shadow-sm hover:border-sky-500"
                        : "bg-stone-50 border-transparent opacity-50 hover:opacity-75"
                    }`}
                >
                    <div className={`w-4 h-0 border-t-2 border-dashed transition-colors ${visibility.velocity ? "border-sky-500" : "border-stone-300"}`}></div>
                    <div className="text-left">
                    <span className="block text-xs font-bold text-stone-700 group-hover:text-sky-700 transition-colors">Velocity</span>
                    <span className="text-xs text-stone-400"><InlineMath math="v" /></span>
                    </div>
                </button>

                <button
                    onClick={() => toggleMetric("acceleration")}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 group ${
                    visibility.acceleration
                        ? "bg-white border-stone-200 shadow-sm hover:border-rose-500"
                        : "bg-stone-50 border-transparent opacity-50 hover:opacity-75"
                    }`}
                >
                    <div className={`w-4 h-0 border-t-2 border-dotted transition-colors ${visibility.acceleration ? "border-rose-500" : "border-stone-300"}`}></div>
                    <div className="text-left">
                    <span className="block text-xs font-bold text-stone-700 group-hover:text-rose-700 transition-colors">Accel</span>
                    <span className="text-xs text-stone-400"><InlineMath math="a" /></span>
                    </div>
                </button>
            </div>
        </div>
        
        <div className="text-right">
          <span className="text-5xl font-black text-stone-800 tabular-nums leading-none block">
            {visibleData.reduce((a, b) => a + b, 0)}
          </span>
          <span className="text-xs font-bold text-stone-400 font-mono tracking-widest uppercase mt-2 block">
            Total ({range})
          </span>
        </div>
      </div>
    </div>
  );
}