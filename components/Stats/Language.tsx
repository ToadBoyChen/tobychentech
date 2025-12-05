"use client";

import { useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import { ArcElement, Chart as ChartJS, Tooltip, Legend } from "chart.js";
import HackerHeader from "../HackerHeader";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

type LangDetail = {
  name: string;
  percent: number;
  count: number;
  color: string;
};

// Custom Palette: Blends from Lime (Green) to Yellow to Amber
const limeAmberPalette = [
  "#84cc16", // Lime 500
  "#a3e635", // Lime 400
  "#d9f99d", // Lime 200
  "#facc15", // Yellow 400
  "#fbbf24", // Amber 400
  "#f59e0b", // Amber 500
  "#d97706", // Amber 600
];

export default function Language({ data }: { data: LangDetail[] }) {
  // We use null to represent "nothing is hovered"
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const processedData = useMemo(() => {
    return data || [];
  }, [data]);

  if (!processedData || processedData.length === 0)
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-12 flex items-center justify-center p-12 bg-stone-50/50 rounded-3xl">
        <span className="text-stone-300 font-mono text-xs tracking-widest">
          // NO_DATA_STREAM
        </span>
      </div>
    );

  // If nothing is hovered, default to showing the top item in the center text
  // But we track 'isHovering' to know if we should dim others
  const activeItem = processedData[hoveredIndex ?? 0] || processedData[0];
  const isHovering = hoveredIndex !== null;
  const activeColor = limeAmberPalette[(hoveredIndex ?? 0) % limeAmberPalette.length];

  const chartData: ChartData<"doughnut"> = {
    labels: processedData.map((d) => d.name),
    datasets: [
      {
        data: processedData.map((d) => d.percent),
        backgroundColor: processedData.map((_, i) => {
          const color = limeAmberPalette[i % limeAmberPalette.length];
          // LOGIC: If we are hovering something, and this index isn't it, make it gray/faded
          if (isHovering && hoveredIndex !== i) {
            return "#e7e5e4"; // stone-200 (faded out)
          }
          return color;
        }),
        borderWidth: 0,
        borderRadius: 20,
        spacing: 5,
        hoverOffset: 30, // Large pop, handled by padding below
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
    layout: {
      // THIS FIXES THE CLIPPING: Adds internal padding to the canvas so the
      // hoverOffset expansion doesn't hit the container edge.
      padding: 32, 
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: { animateScale: true, animateRotate: true },
    onHover: (_: any, elements: string | any[]) => {
      if (elements && elements.length > 0) {
        setHoveredIndex(elements[0].index);
      } else {
        setHoveredIndex(null);
      }
    },
  };

  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-12 flex flex-col p-6 md:p-8 bg-white/50 rounded-3xl">
      {/* Header Section */}
      <div className="flex flex-col mb-8 md:mb-12">
        <HackerHeader
          text="LANGUAGES"
          lineColor="bg-lime-200"
          className="text-xs font-bold text-lime-600 mb-2"
        />
        <div className="flex items-center gap-4">
          <h2 className="font-black text-stone-800 text-3xl md:text-4xl tracking-tighter">
            Most Used
          </h2>
          <div className="flex gap-1 h-2">
             <div className="w-2 rounded-full bg-lime-400 animate-pulse" />
             <div className="w-2 rounded-full bg-yellow-400" />
             <div className="w-2 rounded-full bg-amber-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20">
        
        {/* CHART SECTION */}
        {/* Increased width/height to accommodate the new padding */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 shrink-0 group">
          {/* Subtle glow behind chart - only visible when hovering that specific item */}
          <div 
            className={`absolute inset-8 rounded-full blur-3xl transition-all duration-700 ${
              isHovering ? "opacity-30" : "opacity-10"
            }`}
            style={{ backgroundColor: activeColor }}
          />
          
          <Doughnut data={chartData} options={chartOptions} />

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span
              className="text-6xl md:text-7xl font-black tracking-tighter transition-colors duration-300"
              style={{ color: isHovering ? activeColor : "#57534e" }} // stone-600 if idle
            >
              {activeItem.percent}
              <span className="text-2xl font-bold opacity-40 text-stone-400">%</span>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-stone-400 mt-1">
              {activeItem.name}
            </span>
          </div>
        </div>

        {/* LIST SECTION */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {processedData.map((lang, idx) => {
            const isItemHovered = idx === hoveredIndex;
            // logic: If we are hovering ANY item (isHovering), and it is NOT this one, dim it.
            const isDimmed = isHovering && !isItemHovered;
            
            const itemColor = limeAmberPalette[idx % limeAmberPalette.length];

            return (
              <div
                key={lang.name}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  isDimmed ? "opacity-20 blur-[1px] scale-95 grayscale" : "opacity-100 scale-100"
                }`}
              >
                {/* Background Card */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isItemHovered ? "opacity-10 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ backgroundColor: itemColor }}
                />
                
                {/* Content */}
                <div className={`relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${isItemHovered ? "translate-x-2" : "hover:bg-stone-50"}`}>
                  
                  {/* Left: Dot & Name */}
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full shadow-sm transition-all duration-500 ${
                        isItemHovered ? "scale-125 ring-2 ring-offset-2 ring-offset-white" : "opacity-60"
                      }`}
                      style={{ 
                        backgroundColor: itemColor,
                        boxShadow: isItemHovered ? `0 0 10px ${itemColor}` : 'none',
                       }}
                    />
                    <span
                      className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                        isItemHovered ? "text-stone-800" : "text-stone-500"
                      }`}
                    >
                      {lang.name}
                    </span>
                  </div>

                  {/* Right: Bar & Percent */}
                  <div className="flex items-center gap-4 w-1/2 justify-end">
                    <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: itemColor,
                          opacity: isItemHovered ? 1 : 0.6,
                        }}
                      />
                    </div>
                    <span
                      className={`text-xs font-mono w-9 text-right transition-colors ${
                        isItemHovered ? "font-bold text-stone-800" : "text-stone-400"
                      }`}
                    >
                      {lang.percent}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}