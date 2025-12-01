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
  ChartOptions
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const GITHUB_USERNAME = "ToadBoyChen";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#2563eb", // Royal Blue
  JavaScript: "#60a5fa", // Lighter Blue
  Python: "#0284c7",     // Deep Sky Blue
  HTML: "#1e40af",       // Dark Blue
  CSS: "#3b82f6",        // Bright Blue
  Java: "#1e3a8a",       // Navy
  Go: "#0ea5e9",         // Cyan
  Rust: "#93c5fd",       // Pale Blue
  Shell: "#0369a1",      // Steel Blue
  default: "#94a3b8"     // Blue-Grey (Slate)
};

type LangDetail = { name: string; percent: number; count: number; color: string };

const AnimatedCounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
  }, [end]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-3xl lg:text-4xl font-black text-white tracking-tighter tabular-nums">
        {count}<span className="text-zinc-600 text-xl ml-1">{suffix}</span>
      </span>
      <span className="font-mono text-[10px] text-zinc-500 mt-1">{label}</span>
    </div>
  );
};


const ActivityHeatmap = ({ data }: { data: number[] }) => {
  return (
    <div className="grid grid-cols-12 gap-1 w-full"> 
      {data.length === 0 
        ? Array.from({ length: 84 }).map((_, i) => (
            <div 
                key={i}
                className="w-full aspect-square rounded-sm bg-zinc-800/50" 
            />
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
          ))
      }
    </div>
  );
};

const SystemLoad = ({ data, loading }: { data: LangDetail[], loading: boolean }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-full w-full animate-pulse">
            <div className="w-32 h-32 rounded-full border-4 border-zinc-800 border-t-zinc-600 animate-spin" />
        </div>
    );
  }

  // Handle empty data
  if (!data || data.length === 0) return <div className="text-zinc-500 font-mono text-xs">NO_DATA_STREAM</div>;

  const activeItem = data[activeIndex] || data[0];

  const chartData: ChartData<"doughnut"> = {
    labels: data.map(d => d.name),
    datasets: [{
      data: data.map(d => d.percent),
      backgroundColor: data.map((d, i) => 
        i === activeIndex ? d.color : `${d.color}33` // 33 is ~20% opacity hex
      ),
      borderColor: '#18181b', 
      borderWidth: 2, 
      hoverOffset: 0, 
    }],
  };

  const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '0%',
    plugins: { 
        legend: { display: false }, 
        tooltip: { enabled: false }
    },
    animation: { animateScale: true, animateRotate: true },
    onHover: (_: any, elements: string | any[]) => {
        if (elements && elements.length > 0) {
            setActiveIndex(elements[0].index);
        }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center w-full h-full gap-8 lg:gap-12">
      
      {/* LEFT: The Chart */}
      <div className="relative w-48 h-48 group cursor-crosshair">
        <Doughnut data={chartData} options={chartOptions} />
        
        {/* Decorative Ring */}
        <div className="absolute inset-[-10px] border border-zinc-800 rounded-full border-dashed animate-[spin_10s_linear_infinite] opacity-30 pointer-events-none" />
      </div>

      <div className="flex-1 w-full grid grid-cols-1 gap-1">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-2 mb-2">
            <div>
                <span className="text-xs font-mono text-zinc-500 block mb-1">SELECTED_MODULE</span>
                <span className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ color: activeItem.color, backgroundColor: activeItem.color }} />
                   {activeItem.name}
                </span>
            </div>
        </div>

        {/* Legend List */}
        <div className="space-y-1">
            {data.map((lang, idx) => (
                <div 
                    key={lang.name}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`
                        flex items-center justify-between px-3 py-2 rounded border transition-all duration-200 cursor-pointer
                        ${idx === activeIndex 
                            ? "bg-zinc-800/80 border-zinc-600 text-zinc-200" 
                            : "bg-transparent border-transparent text-zinc-500"}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <span className="font-mono w-4">0{idx + 1}</span>
                        <span className={`text-sm font-bold ${idx === activeIndex ? "text-white" : "text-zinc-500"}`}>
                            {lang.name}
                        </span>
                    </div>
                    
                    {/* Visual Progress Bar in List */}
                    <div className="flex items-center gap-3">
                        <div className="w-56 h-2 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full rounded-full transition-all duration-500 font-mono"
                                style={{ 
                                    width: `${lang.percent}%`, 
                                    backgroundColor: idx === activeIndex ? lang.color : '#3f3f46'
                                }} 
                            />
                        </div>
                        <span className="font-mono w-8 text-right">{lang.percent}%</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

// --- 4. PERFORMANCE CHART (Same Logic, Better Style) ---
const PerformanceChart = ({ labels, dataPoints }: { labels: string[], dataPoints: number[] }) => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Commits',
          data: dataPoints,
          borderColor: '#ffffff',
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            return gradient;
          },
          borderWidth: 2,
          pointBackgroundColor: '#000',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.3,
        },
      ],
    };
  
    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: true, intersect: false, mode: 'index' } },
      scales: {
        x: { 
            grid: { display: true, color: '#27272a' }, // Visible grid
            ticks: { font: { family: 'monospace', size: 10 }, color: '#71717a' } 
        },
        y: { display: false, min: 0 }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    };
  
    return (
        <div className="w-full h-full min-h-[180px] relative">
             <Line data={data} options={options} />
        </div>
    );
};


export default function Statistics() {
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState<number[]>([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [avgCommits, setAvgCommits] = useState(0);
  const [langData, setLangData] = useState<LangDetail[]>([]);
  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
        const contribJson = await contribRes.json();
        
        const last84 = contribJson.contributions.slice(-84);
        const total = contribJson.contributions.reduce((acc: number, day: any) => acc + day.count, 0);
        setTotalCommits(total);
        setHeatmapData(last84.map((day: any) => day.count));

        let maxStreak = 0;
        let currentStreak = 0;
        let activeDays = 0;
        
        contribJson.contributions.forEach((day: any) => {
            if (day.count > 0) {
                currentStreak++;
                activeDays++;
                if (currentStreak > maxStreak) maxStreak = currentStreak;
            } else {
                currentStreak = 0;
            }
        });
        setBestStreak(maxStreak);
        setAvgCommits(Math.round(total / (activeDays || 1))); 

        const last7 = contribJson.contributions.slice(-7);
        const days = last7.map((day: any) => new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }));
        const counts = last7.map((day: any) => day.count);
        setWeeklyLabels(days);
        setWeeklyData(counts);

        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const reposJson = await reposRes.json();

        if (Array.isArray(reposJson)) {
            const langStats: Record<string, number> = {};
            
            reposJson.forEach((repo: any) => {
                if (repo.language) {
                    langStats[repo.language] = (langStats[repo.language] || 0) + 1;
                }
            });

            const totalReposWithLang = Object.values(langStats).reduce((a, b) => a + b, 0);
            
            const processedLangs: LangDetail[] = Object.entries(langStats)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([name, count]) => ({
                    name,
                    count,
                    percent: Math.round((count / totalReposWithLang) * 100),
                    color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.default
                }));
            
            setLangData(processedLangs);
        }
      } catch (e) {
        console.error("GitHub API Error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section className="w-full max-w-none px-6 lg:px-12">
      
      {/* HEADER */}
      <div className="flex items-center gap-6 mb-16">
        <div className="h-px bg-zinc-800 flex-1" />
        <div className="font-mono text-sm text-zinc-500 uppercase tracking-widest flex items-center gap-2 group">
          <span className="text-zinc-600">02 // CURRENT_STATISTICS</span>
        </div>
        <div className="h-px bg-zinc-800 flex-1" />
      </div>

      <div className="flex flex-col items-center mb-12">
        <HackerText
            text="GITHUB_STATS"
            triggerOnMount={true}
            triggerOnHover={false}
            speed={50}
            className="font-bold text-white text-5xl tracking-tighter text-center font-mono"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 xl:gap-8">

        {/* 1. ACTIVITY LOG (Spans 4 columns) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-5 bg-zinc-900 border border-zinc-800 p-8 hover:border-zinc-600 transition-all group flex flex-col justify-between relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <p className="font-bold text-white text-lg">
                        Contributions
                    </p>
                </div>
                <div className="text-right">
                    <AnimatedCounter end={totalCommits} label="Total Commits" />
                </div>
            </div>
            
            <div className="flex flex-col gap-8 w-full">
                <div className="w-full bg-zinc-950/50 p-4 rounded-lg border border-zinc-800/50">
                    <ActivityHeatmap data={heatmapData} />
                </div>
                
                <div className="flex justify-between items-center border-t border-zinc-800 pt-6">
                    <div className="flex gap-8">
                        <div>
                            <span className="text-2xl font-bold text-white">{loading ? "-" : bestStreak}</span>
                            <span className="text-[10px] block text-zinc-500 font-mono tracking-widest mt-1">BEST_STREAK</span>
                        </div>
                        <div>
                            <span className="text-2xl font-bold text-white">{loading ? "-" : avgCommits}</span>
                            <span className="text-[10px] block text-zinc-500 font-mono tracking-widest mt-1">DAILY_AVG</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 2. SYSTEM LOAD / LANGUAGES (Spans 7 columns) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-7 bg-zinc-900 border border-zinc-800 p-8 flex flex-col hover:border-zinc-600 transition-colors group relative">
            <div className="flex justify-between items-start mb-6">
                 <div>
                    <p className="font-bold text-white text-lg tracking">Most Used Languages</p>
                    <p className="text-zinc-500 text-xs font-mono mt-1">LANGUAGE_DISTRIBUTION</p>
                </div>
            </div>
            
            <div className="flex-1 flex items-center">
                 <SystemLoad data={langData} loading={loading} />
            </div>
        </div>

        {/* 3. VELOCITY GRAPH (Full Width) */}
        <div className="col-span-1 md:col-span-2 lg:col-span-12 bg-zinc-900 border border-zinc-800 p-8 flex flex-col hover:border-zinc-600 transition-colors group h-[320px]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="font-bold text-white text-lg flex items-center gap-2">
                        Code Velocity
                        <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">7_DAYS</span>
                    </p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <span className="text-2xl font-black text-white">{weeklyData.reduce((a, b) => a + b, 0)}</span>
                        <span className="text-[10px] ml-2 text-zinc-500 font-mono tracking-widest">Commits this Week</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full relative">
                 {/* Grid Background Effect */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none" 
                      style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "40px 40px" }} 
                 />
                {loading ? (
                    <div className="w-full h-full animate-pulse bg-zinc-800/20 rounded" />
                ) : (
                    <PerformanceChart labels={weeklyLabels} dataPoints={weeklyData} />
                )}
            </div>
        </div>

      </div>

      <div className="flex mt-32 mb-12 flex-col items-center">
            <HackerText
                text="CLIENT_STATS"
                triggerOnMount={true}
                triggerOnHover={false}
                speed={50}
                className="font-bold text-white text-5xl tracking-tighter text-center font-mono"
            />
      </div>

      <div className="flex justify-center w-full pb-24">
        <div className="w-full max-w-4xl bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-zinc-500 transition-all duration-300 group relative overflow-hidden">
            
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

            <p className="text-9xl md:text-[160px] font-black text-zinc-800 mb-6 group-hover:text-zinc-700 transition-colors select-none relative z-10">
                0
            </p>
            
            <p className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                Total Customers Served <span className="text-sm"> so far </span>
            </p>
            
            <p className="text-zinc-400 font-mono text-sm md:text-base max-w-lg relative z-10 mb-8 leading-relaxed">
                Be the first to break the streak
                <br />
                <br />
                <span className="text-4xl">🥺👉👈</span>
            </p>
            
            <div className="relative z-10">
                <a 
                    href="/contact"
                    className="
                    inline-flex items-center justify-center gap-2 px-8 py-3 
                    bg-white text-black rounded-full font-bold text-lg
                    "
                >
                    <span>Lets Work Together</span>
                </a>
            </div>
        </div>
      </div>

    </section>
  );
}