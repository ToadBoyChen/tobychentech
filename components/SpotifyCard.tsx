"use client";
import { useRef } from "react";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// --- SUB-COMPONENT: REUSABLE VINYL SLIDE ---
const VinylSection = ({ 
  track, 
  label, 
  index 
}: { 
  track: any, 
  label: string, 
  index: number 
}) => {
  return (
    <div className="relative w-screen h-full flex items-center justify-center p-8 shrink-0">
      <div className="relative w-full max-w-6xl h-[600px] flex items-center justify-center group">
        
        {/* Background Ambient Glow */}
        <div className="absolute inset-0 bg-lime-500/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

        {/* The Sleeve */}
        <div className="relative z-20 aspect-square w-md md:w-[500px] bg-stone-900 rounded shadow-2xl border border-stone-800 flex items-center justify-center overflow-hidden shrink-0 transition-transform duration-700 hover:-translate-x-12">
          {track?.coverImage ? (
            <Image
              src={track.coverImage}
              alt={track.title}
              fill
              className="object-cover opacity-90"
            />
          ) : (
             <div className="w-full h-full bg-stone-800 animate-pulse" />
          )}
          <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
        </div>

        {/* The Record */}
        <div className="absolute z-10 left-[50%] md:left-[calc(50%+40px)] top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out group-hover:translate-x-[30%] md:group-hover:translate-x-[40%] group-hover:rotate-360">
           <div className="relative aspect-square w-[300px] md:w-[480px] rounded-full bg-stone-950 border-[6px] border-stone-900 shadow-2xl flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full border border-stone-800 opacity-60"
              style={{ background: "repeating-radial-gradient(#1c1917 0, #1c1917 2px, #292524 3px)" }}
            />
            <div className="absolute w-1/3 h-1/3 bg-lime-500 rounded-full flex items-center justify-center text-center p-4 overflow-hidden">
              <div className="relative z-10 flex flex-col items-center mix-blend-multiply">
                 <span className="text-[10px] font-mono font-bold text-stone-900 uppercase tracking-widest mb-1">
                   {label}
                 </span>
                 <p className="text-[10px] font-bold leading-tight text-stone-900 line-clamp-2">
                   {track?.artist || "Unknown"}
                 </p>
              </div>
            </div>
           </div>
        </div>

        {/* Track Info */}
        <div className="absolute bottom-0 md:-bottom-8 right-0 md:right-12 z-30 pointer-events-none">
          <div className="bg-stone-950/90 backdrop-blur-md border border-stone-800 p-6 rounded-lg shadow-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            <span className="text-lime-500 text-[10px] font-bold uppercase tracking-widest block mb-2">
              {label}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase leading-[0.9] mb-2 max-w-md">
              {track?.title}
            </h2>
            <p className="font-mono text-stone-400 text-xs">
              {track?.album}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function SpotifyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useSWR("/api/spotify", fetcher);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // 5 Slides total: Intro + 3 Vinyls + Outro
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

  return (
    // 1. BREAKOUT WRAPPER (Modified)
    // Removed 'overflow-hidden' here to allow sticky behavior to work.
    <div 
      className="relative w-full"
      style={{ 
        width: "100vw", 
        marginLeft: "calc(-50vw + 50%)" 
      }}
    >
      {/* 2. SCROLL HEIGHT CONTAINER */}
      <div className="relative bg-stone-950 h-[500vh]" ref={containerRef}>
        
        {/* 3. STICKY VIEWPORT */}
        {/* 'overflow-hidden' HERE is correct—it crops the horizontal slides */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center z-10">
          
          {isLoading || !data ? (
            <LoadingScreen />
          ) : (
            <motion.div style={{ x }} className="flex h-full w-[500vw]">
              
              {/* --- SLIDE 1: INTRO --- */}
              <div className="w-screen h-full flex items-center justify-center p-8 shrink-0 relative">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-stone-900/40 via-stone-950 to-stone-950" />
                 <div className="relative z-10 text-center space-y-8">
                   <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-400 font-mono text-xs tracking-widest uppercase mb-4">
                     <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                     System Online
                   </div>
                   <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase">
                     Sonic<br />
                     <span className="text-transparent bg-clip-text bg-linear-to-r from-lime-400 to-emerald-600">
                      Archives
                     </span>
                   </h1>
                   <p className="text-stone-500 font-mono text-sm max-w-md mx-auto">
                     Scroll to decrypt audio signatures from the database.
                   </p>
                 </div>
              </div>

              {/* --- SLIDES 2, 3, 4: VINYLS --- */}
              <VinylSection track={data.heroAllTime} label="All Time Favorite" index={1} />
              <VinylSection track={data.heroMonth} label="Monthly Obsession" index={2} />
              <VinylSection track={data.heroRecent} label="Last Detected" index={3} />

              {/* --- SLIDE 5: OUTRO GRID --- */}
              <div className="w-screen h-full flex items-center justify-center p-8 md:p-24 shrink-0 bg-stone-950">
                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 h-full max-h-[800px]">
                  
                  {/* LEFT COL: Profile & Playlist */}
                  <div className="lg:col-span-5 flex flex-col gap-8">
                    <Link 
                      href={data.profile?.url || "#"} 
                      target="_blank"
                      className="flex-1 bg-stone-900/50 border border-stone-800 rounded-3xl p-8 relative overflow-hidden group hover:border-lime-500/30 transition-colors"
                    >
                       <div className="absolute inset-0 bg-linear-to-b from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                       <div className="relative z-10 flex flex-col h-full justify-between">
                          <div className="flex items-start justify-between">
                            {data.profile?.image && (
                              <div className="w-20 h-20 rounded-full border-2 border-stone-800 overflow-hidden">
                                <Image src={data.profile.image} width={80} height={80} alt="Profile" />
                              </div>
                            )}
                            <div className="text-right">
                               <h3 className="text-3xl font-bold text-white mb-1">{data.profile?.name}</h3>
                               <p className="font-mono text-lime-500 text-sm">{data.profile?.followers} Observers</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-stone-400 font-mono text-xs uppercase tracking-widest mt-8">
                             <span>Spotify Profile</span>
                             <ArrowUpRight className="w-4 h-4" />
                          </div>
                       </div>
                    </Link>

                    <Link 
                      href={data.playlist?.url || "#"} 
                      target="_blank"
                      className="h-48 bg-lime-500 rounded-3xl p-8 relative overflow-hidden group transition-transform hover:scale-[1.02]"
                    >
                      <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12 transition-transform group-hover:rotate-45 group-hover:scale-110">
                         <PlayIcon className="w-48 h-48 fill-black" />
                      </div>
                      <div className="relative z-10 h-full flex flex-col justify-between text-stone-900">
                         <div>
                           <span className="bg-stone-900 text-lime-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                             Featured Mix
                           </span>
                         </div>
                         <div>
                           <h3 className="text-3xl font-black leading-none uppercase tracking-tight">
                             {data.playlist?.name}
                           </h3>
                           <p className="font-bold opacity-80 mt-1 line-clamp-1">
                             {data.playlist?.description || "Curated Selection"}
                           </p>
                         </div>
                      </div>
                    </Link>
                  </div>

                  {/* RIGHT COL: Top 5 List */}
                  <div className="lg:col-span-7 bg-stone-900/30 border border-stone-800 rounded-3xl p-8 md:p-12 overflow-y-auto custom-scrollbar">
                    <h3 className="text-stone-500 font-mono text-xs uppercase tracking-widest mb-8 border-b border-stone-800 pb-4">
                      // Top_Frequency_Logs
                    </h3>
                    <div className="space-y-4">
                      {data.top5?.map((track: any, i: number) => (
                        <Link 
                          key={track.url} 
                          href={track.url}
                          target="_blank"
                          className="flex items-center gap-6 group p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                        >
                           <span className="font-mono text-stone-600 text-lg w-6">0{i + 1}</span>
                           {track.coverImage && (
                             <div className="w-12 h-12 bg-stone-800 rounded overflow-hidden relative shrink-0">
                               <Image src={track.coverImage} fill alt="art" className="object-cover" />
                             </div>
                           )}
                           <div className="flex-1 min-w-0">
                              <h4 className="text-white font-bold truncate group-hover:text-lime-400 transition-colors">
                                {track.title}
                              </h4>
                              <p className="text-stone-500 text-sm truncate">
                                {track.artist}
                              </p>
                           </div>
                           <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                             <PlayIcon className="w-5 h-5 text-lime-500 fill-current" />
                           </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- UTILS & ICONS ---
function LoadingScreen() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-950 z-50">
      <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="font-mono text-lime-500 text-xs animate-pulse">LOADING_ARCHIVES...</span>
    </div>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}