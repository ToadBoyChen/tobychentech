"use client";
import { useEffect } from "react";
import { Github, Globe, Terminal, Box } from "lucide-react"; 
import HackerText from "../HackerText";
import { motion, useAnimation } from "framer-motion";

interface ProjectProps {
  isProjectActive: boolean;
}

// --- DATA ---
const projects = [
  // --- COMPLETED ---
  { 
    id: "comp-01", 
    featured: true, 
    status: "COMPLETED",
    name: "TOADTrade V1", 
    cat: "Quant Finance", 
    year: "2024",
    desc: "Python based trading algorithm using technical indicators to generate signals.",
    stack: ["Python", "Pandas", "yFinance"],
    links: { repo: "https://github.com/ToadBoyChen/trade-algo" },
    // "Big Bold" Financial/Data Image
    img: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop" 
  },
  // --- WIP ---
  { 
    id: "wip-01", 
    status: "IN_DEV",
    name: "Toadstone", 
    cat: "TUI Note Taker", 
    year: "2025",
    desc: "Vibe coded TUI note-taking app. Essentially Obsidian for the terminal.",
    stack: ["Python", "Textual"],
    links: { repo: "https://github.com/ToadBoyChen/Toadstone" },
    // Retro Terminal/Matrix Image
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: "wip-02", 
    status: "IN_DEV",
    featured: true,
    name: "TOADTrade V2", 
    cat: "Quant Architecture", 
    year: "2025",
    desc: "Complete rebuild of the trading algo using Event-Driven architecture, Docker, and SQLite.",
    stack: ["SQLite3", "Docker", "Python"],
    links: { repo: "https://github.com/ToadBoyChen/TOADTrade2" },
    // Server/Infrastructure Image
    img: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: "wip-03", 
    status: "IN_DEV",
    name: "Arch Dotfiles", 
    cat: "DevOps", 
    year: "2025",
    desc: "Automated Arch Linux setup scripts and configs.",
    stack: ["Bash", "Linux"],
    links: { repo: "https://github.com/ToadBoyChen/dotfiles" },
    // Abstract Tech/Circuit Image
    img: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop"
  },
  // --- LEGACY ---
  { 
    id: "leg-01", 
    status: "LEGACY",
    name: "Portfolio V2", 
    cat: "Frontend", 
    year: "2025",
    desc: "RPG themed pixel-art portfolio.",
    stack: ["React", "Tailwind"],
    links: { demo: "#", repo: "#" },
    // Pixel Art/Gaming Image
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop"
  },
  { 
    id: "leg-02", 
    status: "LEGACY",
    name: "Portfolio V1", 
    cat: "Static Site", 
    year: "2024",
    desc: "My first HTML/CSS site.",
    stack: ["HTML", "CSS"],
    links: { demo: "#", repo: "#" },
    // Code/Editor Image
    img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1000&auto=format&fit=crop"
  }
];

// --- COMPONENTS ---

const FillerCard = () => (
    <div className="col-span-1 border border-dashed border-lime-950/30 p-8 flex items-center justify-center min-h-[300px] h-full cursor-default">
        <div className="flex flex-col items-center justify-center gap-4">
            <motion.div 
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-3 h-3 bg-lime-950"
            />
            <span className="font-mono text-[10px] text-lime-950/40 tracking-[0.2em] uppercase">
                Slot_Empty
            </span>
        </div>
    </div>
);

const BentoCard = ({ project, index }: any) => {
    return (
        <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`
                group relative flex flex-col justify-between p-6 md:p-8 
                border border-lime-950 bg-lime-950
                min-h-[350px] h-full cursor-default
                col-span-1 overflow-hidden
            `}
        >
            {/* --- BACKGROUND IMAGE LAYER --- */}
            <div className="absolute inset-0 z-0 w-full h-full">
                {/* The Image */}
                <img 
                    src={project.img} 
                    alt={project.name}
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                
                {/* Gradient Overlay: Ensures text is readable at the bottom, but lets image shine at top */}
                <div className="absolute inset-0 bg-gradient-to-t from-lime-950 via-lime-950/80 to-lime-950/20 z-10 opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Scanline Effect (optional aesthetic) */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-overlay pointer-events-none" />
            </div>

            {/* CORNER ACCENTS (Adjusted for dark background) */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-lime-200 z-20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-lime-200 z-20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-lime-200 z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-lime-200 z-20" />

            {/* HEADER */}
            <div className="relative z-20 flex justify-between items-start mb-6">
                <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-lime-400 group-hover:text-white transition-colors">
                        {project.status} // {project.year}
                    </span>
                    <span className="font-mono text-[10px] text-lime-200/60 group-hover:text-lime-200 uppercase">
                        ID: {project.id}
                    </span>
                </div>
                <div className="p-2 border border-lime-200/30 bg-lime-950/50 backdrop-blur-sm rounded-full">
                   {project.cat.includes("Quant") ? <Terminal size={16} className="text-lime-200"/> : <Box size={16} className="text-lime-200"/>}
                </div>
            </div>

            {/* CONTENT */}
            <div className="relative z-20 flex-grow flex flex-col justify-end">
                <h3 className="text-3xl md:text-4xl font-black text-lime-100 group-hover:text-white mb-3 transition-colors tracking-tighter drop-shadow-lg">
                    {project.name}
                </h3>
                <p className="font-mono text-sm text-lime-200/80 group-hover:text-lime-100 leading-relaxed mb-6 max-w-[90%] drop-shadow-md">
                    {project.desc}
                </p>
            </div>

            {/* STACK & LINKS */}
            <div className="relative z-20 mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech: string) => (
                        <span key={tech} className="px-2 py-1 text-[10px] font-bold border border-lime-200/20 bg-lime-900/40 backdrop-blur-sm text-lime-200 uppercase tracking-wider">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-lime-200/20">
                    {project.links.repo && (
                        <a href={project.links.repo} target="_blank" className="flex items-center gap-2 text-xs font-bold font-mono text-lime-300 group-hover:text-white hover:underline decoration-dashed underline-offset-4 shadow-black drop-shadow-sm">
                            <Github size={14} /> SRC_CODE
                        </a>
                    )}
                    {project.links.demo && (
                        <a href={project.links.demo} target="_blank" className="flex items-center gap-2 text-xs font-bold font-mono text-lime-300 group-hover:text-white hover:underline decoration-dashed underline-offset-4 shadow-black drop-shadow-sm">
                            <Globe size={14} /> LIVE_DEMO
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const SectionHeader = ({ title, count }: { title: string, count: string }) => (
    <div className="flex items-end gap-4 mb-8 border-b border-lime-950 pb-2">
        <h2 className="text-2xl md:text-3xl font-black text-lime-950 tracking-tight">
            {title}
        </h2>
        <span className="font-mono text-sm text-lime-950/60 mb-1">
            [{count}]
        </span>
    </div>
);

export default function ProjectsGrid({isProjectActive} : ProjectProps) {
  const controls = useAnimation();
  
  const containerVariants = {
    hidden: { y: 100 },
    visible: { y: 0, transition: { duration: 0.6 }},
  };
  
  useEffect(() => {
    if (isProjectActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isProjectActive, controls]);

  const completed = projects.filter(p => p.status === "COMPLETED");
  const wip = projects.filter(p => p.status === "IN_DEV");
  const legacy = projects.filter(p => p.status === "LEGACY");

  return (
    <motion.div initial="hidden" animate={controls} variants={containerVariants}>
        {/* TOP CURVE */}
        <div className="w-full top-0 left-0 z-10">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[30px] md:h-[50px] fill-lime-200 block overflow-visible">
                <use href="#fixed-convex"/> 
            </svg>
        </div>

        <section className="px-4 md:px-8 lg:px-16 py-20 bg-lime-200 min-h-screen">
            
            {/* MAIN HEADER */}
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 border-b border-lime-950 pb-8">
                <div className="flex flex-col">
                    <span className="font-mono text-xs text-lime-950 mb-2">/// ARCHIVE_SYSTEM_V3</span>
                    <HackerText
                        text="SELECTED_WORKS"
                        triggerOnMount={true}
                        speed={40}
                        className="text-5xl md:text-7xl font-black text-lime-950 tracking-tighter"
                    />
                </div>
                <div className="hidden md:block text-right">
                    <p className="font-mono text-xs text-lime-900 max-w-xs">
                        A collection of quantitative algorithms, systems engineering, and frontend experiments.
                    </p>
                </div>
            </div>

            {/* --- COMPLETED SECTION --- */}
            <div className="mb-24">
                <SectionHeader title="DEPLOYED_SYSTEMS" count="01" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                    {completed.map((p, i) => (
                        <BentoCard key={p.id} project={p} index={i} />
                    ))}
                    {completed.length < 2 && <FillerCard />}
                </div>
            </div>

            {/* --- W.I.P SECTION --- */}
            <div className="mb-24">
                <SectionHeader title="IN_DEVELOPMENT" count="03" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                    {wip.map((p, i) => (
                        <BentoCard key={p.id} project={p} index={i} />
                    ))}
                    {wip.length < 2 && <FillerCard />}
                </div>
            </div>

            {/* --- LEGACY SECTION --- */}
            <div className="mb-12">
                <SectionHeader title="LEGACY_ARCHIVES" count="OLD" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
                    {legacy.map((p, i) => (
                        <BentoCard key={p.id} project={p} index={i} />
                    ))}
                    {legacy.length < 2 && <FillerCard />}
                </div>
            </div>
            
        </section>
    </motion.div>
  );
}