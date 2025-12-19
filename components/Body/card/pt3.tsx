import { Sprout, Trees, Leaf, Mountain, Map, Microscope, ArrowDownRight } from "lucide-react";
import MagneticPill from "@/components/MagneticPill";
import BoxedHeader from "@/components/BoxedHeader";
import NatureText from "@/components/HackerText";
import { useState } from "react";
// Removed Framer Motion imports for interaction

// --- DATA ---
const EXPERIENCE = [
  {
    id: "FIELD_01",
    year: "2025_PRES",
    role: "FullStack Developer",
    org: "Freelance",
    desc: "Cultivating bespoke digital ecosystems. Currently nurturing high-performance marketing engines using Next.js 14 and Server Components.",
    tags: ["REACT", "NEXT.JS", "TAILWIND"],
    icon: Trees,
  },
  {
    id: "FIELD_02",
    year: "2023_PRES",
    role: "Data Engineer",
    org: "DataAnnotation",
    desc: "Pruning and training RLHF datasets. Ensuring Large Language Models grow with accuracy, safety, and reduced hallucination.",
    tags: ["PYTHON", "RLHF", "LLMS"],
    icon: Leaf,
  },
];

const EDUCATION = [
  {
    id: "ROOT_01",
    year: "2023_2026",
    role: "BSc Mathematics",
    org: "Queen Mary University",
    desc: "Studying the geometry of nature. Specializing in Group Theory, Dynamical Systems, and the intersection of logic and computation.",
    tags: ["PURE_MATHS", "CHAOS_THEORY"],
    icon: Microscope,
  },
  {
    id: "ROOT_02",
    year: "2022_2024",
    role: "CertHE Phys & Math",
    org: "Heriot-Watt University",
    desc: "Foundational laws of the physical world. Mechanics, Analysis, and Computational Modeling.",
    tags: ["PHYSICS", "CALCULUS"],
    icon: Map,
  },
];

export default function Pt3() {
  return (
    <div className="w-full mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* --- COLUMN 1: FIELD WORK (Experience) --- */}
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-4 pl-4">
            <div className="p-3 bg-stone-100 rounded-full text-lime-800 shadow-sm">
                <Mountain size={22} strokeWidth={1.5} />
            </div>
            <BoxedHeader 
                text="FIELD_WORK" 
                className="font-mono font-black text-3xl text-lime-900 tracking-tighter"
                fillColor="bg-lime-200"
                hoverTextColor="group-hover:text-lime-900"
            />
        </div>
        
        <div className="flex flex-col gap-8">
            {EXPERIENCE.map((item, i) => (
                <SpecimenCard key={item.id} item={item} />
            ))}
        </div>
      </div>

      {/* --- COLUMN 2: ROOT SYSTEMS (Education) --- */}
      {/* Added margin-top to stagger the columns for a less blocky look */}
      <div className="flex flex-col gap-12 lg:mt-32">
        <div className="flex items-center gap-4 pl-4">
            <div className="p-3 bg-stone-100 rounded-full text-lime-800 shadow-sm">
                <Sprout size={22} strokeWidth={1.5} />
            </div>
             <BoxedHeader 
                text="ROOT_SYSTEMS" 
                className="font-mono font-black text-3xl text-lime-900 tracking-tighter"
                fillColor="bg-lime-200"
                hoverTextColor="group-hover:text-lime-900"
            />
        </div>

        <div className="flex flex-col gap-8">
            {EDUCATION.map((item, i) => (
                <SpecimenCard key={item.id} item={item} />
            ))}
        </div>
      </div>

    </div>
  );
}

// --- SUB-COMPONENT: SPECIMEN CARD ---
function SpecimenCard({ item }: { item: any }) {
  const Icon = item.icon;

  return (
    <div className="group relative w-full perspective-[1000px]">
        {/* Organic Background Shape */}
        <div 
            className={`
                absolute inset-0 bg-stone-50 border border-stone-200 rounded-tl-4xl rounded-br-4xl rounded-tr-[5rem] rounded-bl-[3rem]
                transition-all duration-500 ease-out shadow-sm
                group-hover:shadow-2xl group-hover:scale-[1.02] group-hover:bg-white group-hover:border-lime-200
            `}
        />

        {/* Content Container */}
        <div className="relative p-8 z-10 flex flex-col">
            
            {/* Header: Icon + Year */}
            <div className="flex justify-between items-start mb-6">
                <MagneticPill strength={0.3}>
                    <div 
                        className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500
                            bg-lime-50 text-lime-800 group-hover:bg-lime-400 group-hover:text-lime-950 group-hover:rotate-12
                        `}
                    >
                        <Icon size={28} strokeWidth={1.5} />
                    </div>
                </MagneticPill>

                <span className="px-4 py-2 bg-stone-100 rounded-full font-mono text-xs font-bold text-lime-900/60 tracking-widest group-hover:bg-lime-100 group-hover:text-lime-800 transition-colors duration-300">
                    {item.year}
                </span>
            </div>

            {/* Role Title */}
            <div className="mb-2 min-h-[4rem] flex flex-col justify-center">
                <NatureText
                    text={item.role}
                    className="text-3xl md:text-4xl font-black uppercase text-lime-950 leading-[0.9] tracking-tight group-hover:text-lime-800 transition-colors duration-300"
                    speed={25}
                    triggerOnHover={true}
                />
            </div>

            {/* Org Label */}
            <div className="flex items-center gap-2 mb-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowDownRight size={16} className="text-lime-600" />
                <span className="font-mono text-sm font-bold text-lime-800 uppercase tracking-wider">
                    {item.org}
                </span>
            </div>

            {/* CSS ACCORDION: Height Transition */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
                <div className="overflow-hidden">
                    <div className="pt-6 border-t border-lime-100">
                        <p className="text-lg text-lime-900/80 font-medium leading-relaxed mb-6">
                            {item.desc}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag: string, i: number) => (
                                <span 
                                    key={i}
                                    className="px-3 py-1 bg-lime-50 border border-lime-100 text-lime-700 text-[10px] font-mono font-bold rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}