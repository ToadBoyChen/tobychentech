"use client";

import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

// Define locally to avoid complex circular imports
type LangDetail = {
  name: string;
  percent: number;
  count: number; // Kept in type to match parent data, but not displayed
  color: string;
};

export default function Language({ data }: { data: LangDetail[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!data || data.length === 0)
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-12 flex items-center justify-center p-8 bg-white rounded-3xl border border-stone-100 shadow-sm">
        <span className="text-stone-400 font-mono text-xs">NO_DATA_STREAM</span>
      </div>
    );

  const activeItem = data[activeIndex] || data[0];

  const chartData: ChartData<"doughnut"> = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.percent),
        backgroundColor: data.map((d, i) =>
          // Active gets true color, others get very light gray to make active pop
          i === activeIndex ? d.color : "#f5f5f4"
        ),
        borderWidth: 0,
        hoverOffset: 0, // Handled by state
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "88%", // Thinner ring for sleeker look
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { animateScale: true, animateRotate: true },
    onHover: (_: any, elements: string | any[]) => {
      if (elements && elements.length > 0) setActiveIndex(elements[0].index);
    },
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-12 flex flex-col bg-white p-8 shadow-xl shadow-stone-200/40 hover:shadow-lime-200/20 transition-all duration-500 border border-stone-100 group/card">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="font-mono text-lime-600/60 text-xs tracking-widest uppercase mb-1">
            // LANGUAGE_DISTRIBUTION
          </p>
          <div className="flex items-center gap-3">
            <p className="font-bold text-stone-800 text-2xl tracking-tight">
              Tech Stack
            </p>
            {/* Animated blinking cursor block */}
            <div className="w-2 h-5 bg-lime-500 animate-pulse hidden md:block" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col xl:flex-row items-center justify-between w-full gap-10 md:gap-16 px-0 md:px-4">
        {/* Chart Section */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 cursor-crosshair shrink-0">
          {/* Decorative outer ring */}
          <div className="absolute inset-[-10px] rounded-full border border-stone-100 border-dashed animate-[spin_10s_linear_infinite]" />
          
          <Doughnut data={chartData} options={chartOptions} />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span 
              className="text-5xl md:text-6xl font-black text-lime-600 tabular-nums tracking-tighter drop-shadow-sm"
              style={{ color: activeItem.color }} 
            >
              {activeItem.percent}<span className="text-2xl align-top opacity-50">%</span>
            </span>
            <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest mt-2 bg-stone-50 px-3 py-1 rounded-full border border-stone-100">
              {activeItem.name}
            </span>
          </div>
        </div>

        {/* Interactive List Section */}
        <div className="flex-1 w-full flex flex-col justify-center h-full max-w-3xl">
          {/* Updated Grid:
             Using 'gap-2' and 'py-2' to make the list more compact so it can 
             gracefully handle more languages (e.g., 6-10 items) without becoming too tall.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            {data.map((lang, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={lang.name}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`relative flex items-center justify-between px-4 py-2 rounded-2xl border transition-all duration-300 cursor-pointer group
                    ${
                      isActive
                        ? "bg-lime-50/50 border-lime-200 shadow-sm translate-x-1"
                        : "bg-white border-transparent hover:bg-stone-50 hover:border-stone-100"
                    }`}
                >
                  {/* Left: Indicator & Name */}
                  <div className="flex items-center gap-3">
                    <div 
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? "scale-125" : "scale-100 opacity-30"}`}
                        style={{ backgroundColor: lang.color }}
                    />
                    <div className="flex flex-col">
                        <span className={`text-xs md:text-sm font-bold tracking-tight transition-colors ${isActive ? "text-stone-800" : "text-stone-500"}`}>
                            {lang.name}
                        </span>
                    </div>
                  </div>

                  {/* Right: Percent Bar & Value */}
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: lang.color,
                          opacity: isActive ? 1 : 0.6
                        }}
                      />
                    </div>
                    <span className={`text-xs font-mono w-8 text-right ${isActive ? "text-stone-800 font-bold" : "text-stone-400"}`}>
                        {lang.percent}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}