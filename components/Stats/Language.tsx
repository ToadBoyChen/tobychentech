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

const limeAmberPalette = [
  "#fde047", // Yellow 300 (Lighter start)
  "#facc15", // Yellow 400
  "#eab308", // Yellow 500 (Bridge between Yellow/Amber)
  "#fbbf24", // Amber 400
  "#f59e0b", // Amber 500
  "#d97706", // Amber 600
];

export default function Language({ data }: { data: LangDetail[] }) {
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

  const activeItem = processedData[hoveredIndex ?? 0] || processedData[0];
  const isHovering = hoveredIndex !== null;
  const activeColor =
    limeAmberPalette[(hoveredIndex ?? 0) % limeAmberPalette.length];

  const chartData: ChartData<"doughnut"> = {
    labels: processedData.map((d) => d.name),
    datasets: [
      {
        data: processedData.map((d) => d.percent),
        backgroundColor: processedData.map((_, i) => {
          const color = limeAmberPalette[i % limeAmberPalette.length];
          if (isHovering && hoveredIndex !== i) {
            return "#e7e5e4"; // stone-200 (faded out)
          }
          return color;
        }),
        borderWidth: 0,
        borderRadius: 20,
        spacing: 5,
        hoverOffset: 30,
      },
    ],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
    layout: { padding: 32 },
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
    <div className="col-span-1 md:col-span-2 lg:col-span-12 flex flex-col p-6 md:p-8 h-full">
      {/* Header Section */}
      <div className="flex flex-col mb-8 md:mb-12">
        <div className="mb-4">
          <HackerHeader
            text="LANGUAGES"
            lineColor="bg-lime-300"
            className="text-sm text-lime-500"
          />
        </div>
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

      <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-20 h-full">
        {/* CHART SECTION */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 shrink-0 group">
          <div
            className={`absolute inset-8 rounded-full blur-3xl transition-all duration-700 ${
              isHovering ? "opacity-30" : "opacity-10"
            }`}
            style={{ backgroundColor: activeColor }}
          />
          <Doughnut data={chartData} options={chartOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <span
              className="text-6xl md:text-7xl font-black tracking-tighter transition-colors duration-300"
              style={{ color: isHovering ? activeColor : "#57534e" }}
            >
              {activeItem.percent}
              <span className="text-2xl font-bold opacity-40 text-stone-400">
                %
              </span>
            </span>
            <span className="text-sm font-bold uppercase tracking-widest text-stone-400 mt-1">
              {activeItem.name}
            </span>
          </div>
        </div>

        {/* LIST SECTION - UPDATED */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 content-center">
          {processedData.map((lang, idx) => {
            const isItemHovered = idx === hoveredIndex;
            const isDimmed = isHovering && !isItemHovered;
            const itemColor = limeAmberPalette[idx % limeAmberPalette.length];

            return (
              <div
                key={lang.name}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group cursor-pointer transition-all duration-500 bg-lime-100 rounded-xl ${
                  isDimmed
                    ? "opacity-20 blur-[1px] scale-95 grayscale"
                    : "opacity-100 scale-100"
                }`}
              >
                {/* Background Card */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    isItemHovered
                      ? "opacity-10 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                  style={{ backgroundColor: itemColor }}
                />

                {/* Content - UPDATED LAYOUT */}
                <div
                  className={`relative flex lg:flex-col items-center gap-4 p-4 rounded-2xl transition-all duration-300}`}
                >
                  {/* Left: Dot & Name (Shrink 0 prevents crushing) */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div
                      className={`w-3 h-3 rounded-full shadow-sm transition-all duration-500 ${
                        isItemHovered
                          ? "scale-125 ring-2 ring-offset-2 ring-offset-white"
                          : "opacity-60"
                      }`}
                      style={{
                        backgroundColor: itemColor,
                        boxShadow: isItemHovered
                          ? `0 0 10px ${itemColor}`
                          : "none",
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

                  <div className="w-full flex flex-row">
                    <div className="flex-1 h-2 bg-lime-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${lang.percent}%`,
                          backgroundColor: itemColor,
                          opacity: isItemHovered ? 1 : 0.6,
                        }}
                      />
                    </div>

                    {/* Right: Percent (Fixed Width) */}
                    <p
                      className={`text-xs font-mono w-9 text-right shrink-0 transition-colors ${
                        isItemHovered
                          ? "font-bold text-stone-800"
                          : "text-stone-400"
                      }`}
                    >
                      {lang.percent}%
                    </p>
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
