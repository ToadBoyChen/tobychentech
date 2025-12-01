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
  ScriptableContext
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

const GITHUB_USERNAME = "ToadBoyChen";
const START_YEAR = 2021; 

// --- 1. ANIMATED COUNTER ---
const AnimatedCounter = ({ end, label }: { end: number; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
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
      <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
        {count}<span className="text-zinc-600 text-2xl ml-1">+</span>
      </span>
      <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
};

// --- 2. ACTIVITY HEATMAP ---
const ActivityHeatmap = ({ data }: { data: number[] }) => {
  return (
    <div className="flex flex-wrap gap-1 max-w-[300px]">
      {data.length === 0 
        ? Array.from({ length: 84 }).map((_, i) => <div key={i} className="w-3 h-3 rounded-sm bg-zinc-800 animate-pulse" />)
        : data.map((val, i) => (
            <div key={i} 
              className={`w-3 h-3 rounded-sm transition-all duration-1000 ${val === 0 ? "bg-zinc-800" : ""} ${val === 1 ? "bg-zinc-600" : ""} ${val === 2 ? "bg-zinc-400" : ""} ${val >= 3 ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" : ""}`} 
            />
          ))
      }
    </div>
  );
};

// --- 3. DYNAMIC TECH DONUT ---
const TechDonut = ({ labels, values }: { labels: string[], values: number[] }) => {
  const data = {
    labels: labels,
    datasets: [{
        data: values,
        backgroundColor: ['#ffffff', '#a1a1aa', '#3b82f6', '#10b981'], 
        borderColor: '#18181b', 
        borderWidth: 4, 
        hoverOffset: 10,
    }],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '85%',
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
    animation: { animateScale: true, animateRotate: true }
  };

  return (
    <div className="flex items-center gap-8 h-full w-full">
      <div className="relative w-32 h-32 flex-shrink-0">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
            <span className="text-xl font-bold text-white">100%</span>
            <span className="text-[8px] font-mono text-zinc-500">EFFICIENCY</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {labels.map((label, i) => (
            <div key={i} className="flex items-center justify-between w-full group cursor-default">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: data.datasets[0].backgroundColor[i] }} />
                    <span className="text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">{label}</span>
                </div>
                <span className="font-mono text-xs text-zinc-500">{values[i]}%</span>
            </div>
        ))}
      </div>
    </div>
  );
};

// --- 4. PERFORMANCE CHART ---
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
            gradient.addColorStop(0, "rgba(255, 255, 255, 0.15)");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
            return gradient;
          },
          borderWidth: 2,
          pointBackgroundColor: '#18181b',
          pointBorderColor: '#ffffff',
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: true } },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'monospace', size: 10 }, color: '#52525b' } },
        y: { display: false, min: 0 }
      }
    };
  
    return (
        <div className="w-full h-full min-h-[200px] relative">
             <Line data={data} options={options} />
        </div>
    );
};


export default function Statistics() {
  const [heatmapData, setHeatmapData] = useState<number[]>([]);
  const [totalCommits, setTotalCommits] = useState(0);
  const [repoCount, setRepoCount] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [avgCommits, setAvgCommits] = useState(0);
  
  const [langLabels, setLangLabels] = useState<string[]>(["Loading...", "Loading...", "Loading..."]);
  const [langValues, setLangValues] = useState<number[]>([33, 33, 33]);
  const [weeklyLabels, setWeeklyLabels] = useState<string[]>([]);
  const [weeklyData, setWeeklyData] = useState<number[]>([]);

  const yearsExp = new Date().getFullYear() - START_YEAR;

  useEffect(() => {
    async function fetchData() {
      try {
        // 1. FETCH CONTRIBUTIONS
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

        // 2. FETCH REPOS
        const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);
        const reposJson = await reposRes.json();

        if (Array.isArray(reposJson)) {
            setRepoCount(reposJson.length || 0);

            const langCount: Record<string, number> = {};
            reposJson.forEach((repo: any) => {
                if (repo.language) {
                    langCount[repo.language] = (langCount[repo.language] || 0) + 1;
                }
            });

            const sortedLangs = Object.entries(langCount)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3);
            
            const totalLangs = sortedLangs.reduce((acc, [, count]) => acc + count, 0);
            
            if (totalLangs > 0) {
                setLangLabels(sortedLangs.map(([name]) => name));
                setLangValues(sortedLangs.map(([, count]) => Math.round((count / totalLangs) * 100)));
            }
        }

      } catch (e) {
        console.error("GitHub API Error:", e);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="w-full max-w-none px-6 lg:px-12">
      
      {/* 1. SEPARATOR LINE */}
      <div className="flex items-center gap-6 mb-8">
        <div className="h-px bg-zinc-800 flex-1" />
        <div className="font-mono text-sm text-zinc-400 uppercase tracking-widest flex items-center gap-2">
          <span>02 // CURRENT_STATISTICS</span>
        </div>
        <div className="h-px bg-zinc-800 flex-1" />
      </div>

      {/* 2. HEADER */}
      <div className="flex mb-16 flex-col items-center">
        <HackerText
          text="GITHUB_STATS"
          triggerOnMount={true}
          triggerOnHover={false}
          speed={50}
          className="font-bold text-white text-5xl md:text-7xl tracking-tighter text-center font-mono"
        />
      </div>

      {/* --- GITHUB GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">

        {/* 1. ACTIVITY LOG */}
        <div className="col-span-1 md:col-span-2 bg-zinc-900 border border-zinc-800 p-8 hover:border-zinc-600 transition-colors group">
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-white text-lg">Activity Log</h3>
                <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">LAST_90_DAYS</span>
            </div>
            <div className="flex items-end gap-8">
                <ActivityHeatmap data={heatmapData} />
                <div className="hidden sm:flex flex-col gap-2">
                    <div className="text-3xl font-black text-white">{totalCommits}</div>
                    <div className="text-xs font-mono text-zinc-500">TOTAL_COMMITS</div>
                    <div className="w-full h-px bg-zinc-800 my-2" />
                    <div className="text-xs text-zinc-500">
                        @{GITHUB_USERNAME}
                    </div>
                </div>
            </div>
        </div>

        {/* 2. SYSTEM LOAD */}
        <div className="col-span-1 bg-zinc-900 border border-zinc-800 p-8 flex flex-col justify-between group hover:border-zinc-600 transition-colors">
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold text-white text-lg">System Load</h3>
                <span className="text-xs font-mono text-zinc-400 bg-zinc-800 px-2 py-1 rounded">LANGUAGES</span>
            </div>
            <div className="flex-1 flex items-center">
                <TechDonut labels={langLabels} values={langValues} />
            </div>
        </div>

        {/* 3. METRICS */}
        <div className="col-span-1 flex flex-col gap-6">
            <div className="flex-1 bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-center items-center hover:border-zinc-600 transition-colors">
                <AnimatedCounter end={bestStreak} label="Best Streak" />
            </div>
            <div className="flex-1 bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-center items-center hover:border-zinc-600 transition-colors">
                <AnimatedCounter end={avgCommits} label="Avg Commits/Day" />
            </div>
        </div>

        {/* 4. PERFORMANCE GRAPH (MOVED UP) */}
        {/* Now part of the main grid, spanning full width at the bottom of the github section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-zinc-900 border border-zinc-800 p-8 flex flex-col hover:border-zinc-600 transition-colors group min-h-[300px]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="font-bold text-white text-lg tracking-tight">Code Velocity</h3>
                    <p className="text-zinc-500 text-xs font-mono mt-1">COMMITS // LAST_7_DAYS</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-2xl font-black text-white">{weeklyData.reduce((a, b) => a + b, 0)}</p>
                        <p className="text-[10px] text-zinc-500 font-mono tracking-widest">WEEKLY_TOTAL</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                        <span className="text-xl">⚡</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full">
                <PerformanceChart labels={weeklyLabels} dataPoints={weeklyData} />
            </div>
        </div>

      </div>


      {/* --- CUSTOMER SECTION --- */}
      
      <div className="flex my-24 flex-col items-center">
            <HackerText
                text="CUSTOMER_STATS"
                triggerOnMount={true}
                triggerOnHover={false}
                speed={50}
                className="font-bold text-white text-5xl tracking-tighter text-center font-mono"
            />
      </div>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-3xl bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-zinc-600 transition-colors group relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
            <h2 className="text-9xl font-black text-zinc-800 mb-4 group-hover:text-zinc-700 transition-colors">0</h2>
            <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Total Customers Served</h3>
            <p className="text-zinc-400 font-mono text-sm max-w-md relative z-10 mb-8">
                SYSTEM_STATUS: <span className="text-yellow-500">WAITING_FOR_INPUT</span>. 
                <br />
                <br />
                Be the first to break the streak. (please) 🥺👉👈
            </p>
            
            {/* BUTTON LINK */}
            <div className="relative z-10">
                <a 
                    href="/contact"
                    className="
                    pointer-events-auto font-extrabold text-xl tracking-tighter transition-all
                    inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-black rounded-full"
                >
                    Contact Me
                </a>
            </div>
        </div>
      </div>

    </section>
  );
}