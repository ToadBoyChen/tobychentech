"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Github, Globe } from "lucide-react"; 
import HackerText from "../HackerText";
import { motion, useAnimation } from "framer-motion";

interface CardProps {
  isProjectActive: boolean;
}

const completed_projects = [
  { 
    id: "comp-01", 
    name: "TOADTrade V1", 
    cat: "Quant Finance", 
    year: "2024",
    desc: "Python based trading algorithm that uses multiple technical indicators to generate trading signals and backtest strategies on historical stock data.",
    stack: ["Python", "Pandas", "yFinance"],
    links: { 
        repo: "https://github.com/ToadBoyChen/trade-algo" 
    }
  },
];

const legacy_projects = [
  { 
    id: "leg-01", 
    name: "Portfolio V2", 
    cat: "Frontend Development", 
    year: "2025",
    desc: "Took on my first proper frontend development project. The website is RPG themed, using custom pixel art, animations and even a coffee character.",
    stack: ["Vite", "React", "TypeScript", "TailwindCSS"],
    links: { 
        demo: "https://portfolio-pn8df6k1h-toby-chens-projects.vercel.app/", 
        repo: "https://github.com/ToadBoyChen/portfolio" 
    }
  },
  { 
    id: "leg-02", 
    name: "Portfolio V1", 
    cat: "Legacy Site", 
    year: "2024",
    desc: "This was my second website. This was developed before I knew was TypeScript even was. It's a static website that is pretty bad.",
    stack: ["HTML", "JavaScript", "CSS"],
    links: { 
        demo: "https://toadboychen.github.io/", 
        repo: "https://github.com/ToadBoyChen/ToadBoyChen.github.io" 
    }
  },
  { 
    id: "leg-03", 
    name: "Portfolio V0", 
    cat: "Legacy Site", 
    year: "2023",
    desc: "This was my first website. It was made as I got an interview to be a web developer intern. It is a very simple static website that showcases my skills and projects. I obviously didn't get the internship.",
    stack: ["HTML", "JavaScript", "CSS"],
    links: { 
        demo: "https://old-website-eight.vercel.app/", 
        repo: "https://github.com/ToadBoyChen/Old-Website" 
    }
  },
];

const wip_projects = [
  { 
    id: "wip-01", 
    name: "Toadstone", 
    cat: "TUI Note Taker", 
    year: "2025",
    desc: "Vibe coded (so far) a TUI note-taking application. I aim to make it essentially Obsidian but in the terminal. This felt useful because I started to rely on tmux sessions a lot.",
    stack: ["Python", "Textual"],
    links: { repo: "https://github.com/ToadBoyChen/Toadstone" }
  },
  { 
    id: "wip-02", 
    name: "TOADTrade V2", 
    cat: "Quant Finance", 
    year: "2025",
    desc: "Through much study, I realised how unadequette TT1 was. That's why I'm rebuilding it from scratch. I'm coming into this project with a lot more knowledge on trading algorithms and software engineering principles, so hopefully the results will speak for themselves.",
    stack: ["SQLite3", "Docker", "Python"],
    links: { repo: "https://github.com/ToadBoyChen/TOADTrade2" }
  },
  { 
    id: "wip-03", 
    name: "Arch Dotfiles", 
    cat: "DevOps", 
    year: "2025",
    desc: "I have recently switched to Arch Linux as my main OS. As a result, I'm in the process of setting up my dotfiles and automating my system.",
    stack: ["Bash", "Linux"],
    links: { repo: "https://github.com/ToadBoyChen/dotfiles" }
  },
];

const open_projects = [
  { 
    id: "open-01", 
    name: "React Hacker", 
    cat: "Library", 
    year: "2023",
    desc: "The UI library used to build this portfolio. Glitch effects and terminal aesthetics.",
    stack: ["React", "TypeScript"],
    links: { repo: "#" }
  },
];

const ProjectRow = ({ project, index, isExpanded, onToggle, isHovered, onHover, onLeave }: any) => {
    return (
        <div 
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onClick={onToggle}
            className={`
                group relative border-b border-zinc-800 transition-colors cursor-pointer
                ${isExpanded ? "bg-zinc-900" : "hover:bg-zinc-900/50"}
            `}
        >
            <div className="py-8 md:py-12 px-2 md:px-4 flex items-center md:items-baseline justify-between relative z-10">
                <div className="flex items-center md:items-baseline gap-4 md:gap-8 overflow-hidden">
                    <span className="font-mono text-[10px] md:text-xs text-zinc-500 shrink-0">0{index + 1}</span>
                    <h3 className={`text-2xl md:text-4xl lg:text-6xl font-black transition-colors tracking-tighter truncate ${isExpanded ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                        {project.name}
                    </h3>
                </div>

                <div className="hidden md:flex flex-col items-end text-right shrink-0 ml-4">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">{project.cat}</span>
                    <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-300">YEAR: {project.year}</span>
                </div>
                
                {/* Mobile indicator */}
                <ArrowUpRight className={`md:hidden text-zinc-600 transition-transform shrink-0 ml-2 ${isExpanded ? "rotate-90" : ""}`} />
            </div>

            {/* EXPANDED CONTENT (Accordion) */}
            <div 
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="overflow-hidden">
                    <div className="px-2 md:px-4 pb-8 md:pb-12 md:pl-16 md:pr-12 flex flex-col lg:flex-row gap-8 md:gap-12">
                        
                        {/* Description & Stack */}
                        <div className="flex-1 space-y-6">
                            <div className="md:hidden flex gap-4 text-xs font-mono text-zinc-500 mb-4">
                                <span>{project.cat}</span>
                                <span>|</span>
                                <span>{project.year}</span>
                            </div>

                            <p className="text-zinc-400 font-mono text-sm leading-relaxed max-w-xl">
                                <span className="text-green-500 mr-2">root@system:~/desc$</span>
                                {project.desc}
                            </p>
                            
                            <div className="flex flex-wrap gap-2">
                                {project.stack?.map((tech: string) => (
                                    <span key={tech} className="px-2 py-1 md:px-3 bg-zinc-950 border border-zinc-800 rounded text-[10px] md:text-xs font-mono text-zinc-400">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 min-w-full lg:min-w-[200px]">
                            {project.links?.demo && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-3 bg-white text-black font-bold hover:bg-zinc-200 transition-colors text-sm md:text-base">
                                    <span>LIVE_DEMO</span>
                                    <Globe className="w-4 h-4" />
                                </a>
                            )}
                            
                            {project.links?.repo && (
                                <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-6 py-3 border border-zinc-700 text-white font-mono text-sm hover:border-zinc-500 transition-colors">
                                    <span>SOURCE_CODE</span>
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProjectsList({isProjectActive} : CardProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const controls = useAnimation();
    
  const cardVariants = {
    hidden: { y: 100},
    visible: { y: 0, transition: { duration: 0.6 }},
  };
  
  useEffect(() => {
    if (isProjectActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isProjectActive, controls]);
  
  const handleToggle = (id: string) => {
      setExpanded(prev => prev === id ? null : id);
  };

  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}>
        <div className="w-full top-0 left-0 z-10">
            <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="w-full h-[30px] md:h-[50px] fill-white block overflow-visible"
            >
            <use href="#fixed-convex"/> 
            </svg>
        </div>
        <section className="px-4 md:px-8 lg:px-16 py-20 md:py-36 items-center justify-center z-30 bg-white">
            <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16">
                <div className="h-px bg-zinc-800 flex-1" />
                <span className="font-mono text-[10px] md:text-sm text-zinc-500 uppercase tracking-widest whitespace-nowrap">
                    03 // NOTABLE_PROJECTS
                </span>
                <div className="h-px bg-zinc-800 flex-1" />
            </div>

            {/* --- COMPLETED --- */}
            <div className="flex flex-col items-center mt-8 md:mt-12 mb-8">
                <HackerText
                    text="COMPLETED_PROJECTS"
                    triggerOnMount={true}
                    triggerOnHover={false}
                    speed={50}
                    className="font-bold text-zinc-900 text-2xl md:text-5xl tracking-tighter text-center font-mono"
                />
            </div>
            <div className="flex flex-col border-t border-zinc-800">
                {completed_projects.map((p, i) => (
                    <ProjectRow 
                        key={p.id} 
                        project={p} 
                        index={i} 
                        isExpanded={expanded === p.id}
                        onToggle={() => handleToggle(p.id)}
                        isHovered={hovered === p.id}
                        onHover={() => setHovered(p.id)}
                        onLeave={() => setHovered(null)}
                    />
                ))}
            </div>

            {/* --- WIP --- */}
            <div className="flex flex-col items-center mt-16 md:mt-24 mb-8">
                <HackerText
                    text="[W.I.P]_PROJECTS"
                    triggerOnMount={true}
                    triggerOnHover={false}
                    speed={50}
                    className="font-bold text-zinc-900 text-2xl md:text-5xl tracking-tighter text-center font-mono"
                />
            </div>
            <div className="flex flex-col border-t border-zinc-800">
                {wip_projects.map((p, i) => (
                    <ProjectRow 
                        key={p.id} 
                        project={p} 
                        index={i} 
                        isExpanded={expanded === p.id}
                        onToggle={() => handleToggle(p.id)}
                        isHovered={hovered === p.id}
                        onHover={() => setHovered(p.id)}
                        onLeave={() => setHovered(null)}
                    />
                ))}
            </div>

            {/* --- LEGACY / OLD PORTFOLIOS --- */}
            <div className="flex flex-col items-center mt-16 md:mt-24 mb-8 group px-2 text-center">
                <HackerText
                    text="OLD_PORTFOLIOS"
                    triggerOnMount={true}
                    triggerOnHover={false}
                    speed={50}
                    className="font-bold text-zinc-900 text-2xl md:text-5xl tracking-tighter text-center font-mono mb-4"
                />
                <p className="text-zinc-500 leading-relaxed text-sm md:text-lg font-medium max-w-2xl">
                    I started web development during my <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-cyan-500 transition-all">first year</span> of Mathematics back in <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-sky-500 transition-all">2023</span>. It's Been <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all">3</span> years of learning. 
                    <br /><br />
                    Here is the work I have done over the past few years. We can see <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-indigo-500 transition-all">serious, consistent improvements</span> over the years.
                </p>
            </div>

            <div className="flex flex-col border-t border-zinc-800">
                {legacy_projects.map((p, i) => (
                    <ProjectRow 
                        key={p.id} 
                        project={p} 
                        index={i} 
                        isExpanded={expanded === p.id}
                        onToggle={() => handleToggle(p.id)}
                        isHovered={hovered === p.id}
                        onHover={() => setHovered(p.id)}
                        onLeave={() => setHovered(null)}
                    />
                ))}
            </div>
        </section>
    </motion.div>
  );
}