"use client";
import { useEffect, useState } from "react";
import Introduction from "@/components/Body/Introduction";
import Card from "@/components/Body/Card";
import Statistics, { StatisticsData, LangDetail } from "@/components/Body/Statistics";
import Projects from "@/components/Body/Projects";
import Services from "@/components/Body/Services";
import ScrollTracker, { useActiveSection, useEarlyActiveSection } from "@/components/ScrollTracker";
import End from "@/components/Body/End";
import HackerText from "@/components/HackerText";
import Footer from "./Footer";

const SECTION_ORDER = ["intro", "about", "stats", "projects", "services", "end"];
const GITHUB_USERNAME = "ToadBoyChen";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#2563eb", JavaScript: "#60a5fa", Python: "#0284c7", HTML: "#1e40af",
  CSS: "#3b82f6", Java: "#1e3a8a", Go: "#0ea5e9", Rust: "#93c5fd", Shell: "#0369a1", default: "#94a3b8",
};

export default function Body() {
    const [statsData, setStatsData] = useState<StatisticsData | null>(null);
    const [isImageReady, setIsImageReady] = useState(false);
    const isSystemReady = statsData !== null && isImageReady;

    useEffect(() => {
        async function fetchGlobalData() {
            try {
                const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
                const contribJson = await contribRes.json();
                
                const last84 = contribJson.contributions.slice(-84);
                const total = contribJson.contributions.reduce((acc: number, day: any) => acc + day.count, 0);
                
                let maxStreak = 0, currentStreak = 0, activeDays = 0;
                contribJson.contributions.forEach((day: any) => {
                    if (day.count > 0) { 
                        currentStreak++; 
                        activeDays++; 
                        if (currentStreak > maxStreak) maxStreak = currentStreak; 
                    } else { 
                        currentStreak = 0; 
                    }
                });

                const last7 = contribJson.contributions.slice(-7);
                const weeklyLabels = last7.map((day: any) => new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }));
                const weeklyData = last7.map((day: any) => day.count);

                const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
                const reposJson = await reposRes.json();
                let langData: LangDetail[] = [];

                if (Array.isArray(reposJson)) {
                    const langStats: Record<string, number> = {};
                    reposJson.forEach((repo: any) => { 
                        if (repo.language) langStats[repo.language] = (langStats[repo.language] || 0) + 1; 
                    });
                    const totalReposWithLang = Object.values(langStats).reduce((a, b) => a + b, 0);
                    
                    langData = Object.entries(langStats)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 5)
                        .map(([name, count]) => ({
                            name, count, percent: Math.round((count / totalReposWithLang) * 100),
                            color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS.default,
                        }));
                }

                setStatsData({
                    totalCommits: total,
                    heatmapData: last84.map((day: any) => day.count),
                    bestStreak: maxStreak,
                    avgCommits: Math.round(total / (activeDays || 1)),
                    weeklyLabels,
                    weeklyData,
                    langData
                });
            } catch (e) {
                console.error("Critical Data Load Error:", e);
                setStatsData({} as any); 
            }
        }
        fetchGlobalData();
    }, []);

    const activeSection = useActiveSection(isSystemReady);
    const earlySection = useEarlyActiveSection(isSystemReady);

    const hasReached = (target: string) => {
        const currentIndex = SECTION_ORDER.indexOf(earlySection);
        const targetIndex = SECTION_ORDER.indexOf(target);
        return currentIndex >= targetIndex; 
    };

    return (
        <>
            {!isSystemReady && (
                <div className="fixed inset-0 z-100 bg-black flex items-center justify-center transition-opacity duration-500">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-white animate-progress-indeterminate origin-left" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                            <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
                                <HackerText text="INITIALIZING_SYSTEM..." speed={30} triggerOnMount={true} />
                            </span>
                        </div>
                        <div className="text-[10px] text-zinc-700 font-mono">
                            {!statsData ? "FETCHING DATA... " : "DATA READY. "} 
                            {!isImageReady ? "LOADING ASSETS..." : "ASSETS READY."}
                        </div>
                    </div>
                </div>
            )}

            <div className={`w-full animate-in fade-in duration-1000 ${!isSystemReady ? 'opacity-0' : 'opacity-100'}`}>
                <ScrollTracker activeSection={activeSection} />
                
                <div className="flex flex-col bg-black">
                    
                    <div id="intro">
                        <Introduction onLoadComplete={() => setIsImageReady(true)} shouldAnimate={isSystemReady}/>
                    </div>

                    <div id="about">
                        <Card isAboutActive={hasReached('about')} />
                    </div>

                    <div className="bg-stone-50">
                        <div id="stats">
                            {statsData && <Statistics isStatisticsActive={hasReached('stats')} data={statsData} />}
                        </div>
                
                        <div className="bg-lime-950">
                            <div id="projects">
                                <Projects isProjectActive={hasReached('projects')}/>
                            </div>

                            <div className="bg-stone-50">
                                <div id="services">
                                    <Services isServicesActive={hasReached('services')}/>
                                </div>

                                <div className="bg-lime-950">
                                    <div id="end">
                                        <End isEndActive={hasReached('end')}/>
                                    </div>

                                    <div id="footer" className="bg-stone-50">
                                        <Footer isFooterActive={hasReached('footer')}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}