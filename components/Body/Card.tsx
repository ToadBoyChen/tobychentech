"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Me from "@/public/me.jpg";
import HackerText from "../HackerText";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import CustomDiv from "../CustomDiv";
import HackerHeader from "../HackerHeader";
import Hike from "@/public/hike.jpeg";
import Kew from "@/public/kewfinger.jpg";
import { ArrowUpRight, Plus, Briefcase, GraduationCap } from "lucide-react";
import Pt1 from "./card/pt1";

const EXPERIENCE = [
  {
    year: "2025 - PRES",
    role: "FullStack Developer",
    org: "Freelance",
    desc: "Building beautiful web applications for clients. Focusing on React, Next.js, and high-performance UI.",
  },
  {
    year: "2023 - PRES",
    role: "Data Engineer",
    org: "DataAnnotation",
    desc: "Producing, testing and validating RLHF training data for large language models.",
  },
];

const EDUCATION = [
  {
    year: "2023 - 2026",
    role: "BSc Mathematics",
    org: "Queen Mary University",
    desc: "Specializing in Abstract Algebra, Group Theory, and Dynamical Systems.",
  },
  {
    year: "2022 - 2024",
    role: "CertHE Phys & Math",
    org: "Heriot-Watt University",
    desc: "Advanced Kinematics, Real Analysis, and Computational Physics.",
  },
];

const HOBBIES = [
  {
    id: "01",
    title: "MATHEMATICS",
    subtitle: "Abstract Algebra",
    desc: "My academic study of choice. I specialize in Group Theory and finding patterns where others see chaos.",
    img: Me,
    align: "object-center",
  },
  {
    id: "02",
    title: "CONSERVATION",
    subtitle: "Eco-Tech",
    desc: "Deep appreciation for the wild. My long-term goal is to engineer tech solutions for reforestation.",
    img: Kew,
    align: "object-[center_60%]",
  },
  {
    id: "03",
    title: "EXPLORATION",
    subtitle: "Global Nomadism",
    desc: "Aspiring cosmopolitan. I don't just want to visit places; I want to code from every continent.",
    img: Hike,
    align: "object-center",
  },
  {
    id: "04",
    title: "COMBAT SPORTS",
    subtitle: "Kickboxing / MMA",
    desc: "Aiming to turn Pro. Competing in UK Nationals requires the same discipline as shipping complex code.",
    img: Me,
    align: "object-top",
  },
];

interface CardProps {
  isAboutActive: boolean;
}

export default function Card({ isAboutActive }: CardProps) {
  const controls = useAnimation();

  const [activeHobby, setActiveHobby] = useState<string | null>("01");

  const cardVariants = {
    hidden: { y: 100 },
    visible: { y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    if (isAboutActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isAboutActive, controls]);


  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}>
      <div className="w-full top-0 left-0 z-10">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-[50px] fill-lime-950 block overflow-visible"
        >
          <use href="#fixed-convex" />
        </svg>
      </div>

      <section className="relative px-8 md:px-16 lg:px-64 py-24 md:py-36 items-center justify-center z-10 bg-lime-950 min-h-screen">
        <div className="flex flex-col items-center mb-16 mt-8 gap-12">
          <CustomDiv
            label="PROFILE"
            lineColor="bg-lime-800"
            textColor="text-stone-50"
          />
          <HackerText
            text="WHO AM I?"
            triggerOnMount={true}
            triggerOnHover={false}
            className="font-semibold text-7xl font-mono tracking-wider text-lime-200"
          />
          <HackerHeader
            prefix1="01"
            prefix2="01"
            title="MISSION STATEMENT"
            lineSide="right"
            bgColour="bg-lime-800"
            className="text-stone-50"
          />
        </div>

        <Pt1/>

        {/* --- SECTION 2: THE HOBBY ARCHIVE --- */}
        <div className="mb-8">
          <HackerHeader
            prefix1="01"
            prefix2="01"
            title="MISSION STATEMENT"
            lineSide="right"
          />
        </div>

        <div className="flex flex-col w-full mb-24 gap-2 border-lime-950">
          {HOBBIES.map((hobby) => {
            const isActive = activeHobby === hobby.id;

            return (
              <motion.div
                key={hobby.id}
                onClick={() => setActiveHobby(isActive ? null : hobby.id)}
                className={`relative border-lime-950 cursor-pointer overflow-hidden transition-colors border-3 rounded-xl ${
                  isActive ? "bg-lime-950" : "hover:bg-lime-900 duration-300"
                }`}
              >
                {/* The Header Row */}
                <div className="flex items-center justify-between p-6 md:p-8">
                  <div className="flex items-center gap-6 md:gap-12">
                    <span
                      className={`font-mono text-base tracking-widest ${
                        isActive ? "text-lime-400" : "text-lime-950"
                      }`}
                    >
                      {hobby.id}
                    </span>
                    <h3
                      className={`text-2xl hover:text-stone-50 md:text-5xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                        isActive ? "text-white" : "text-lime-950"
                      }`}
                    >
                      {hobby.title}
                    </h3>
                  </div>

                  <div
                    className={`p-2 rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-lime-400 rotate-45"
                        : "border-lime-950/30 rotate-0"
                    }`}
                  >
                    {isActive ? (
                      <Plus className="text-lime-400" />
                    ) : (
                      <Plus className="text-lime-950" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8 pt-0">
                        <div className="relative h-[250px] md:h-[350px] w-full rounded-2xl overflow-hidden border border-white/10 group">
                          <Image
                            src={hobby.img}
                            alt={hobby.title}
                            fill
                            className={`object-cover ${hobby.align} grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100`}
                          />
                          <div className="absolute inset-0 bg-lime-950/20 mix-blend-multiply pointer-events-none" />
                          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20 pointer-events-none" />
                        </div>
                        <div className="flex flex-col justify-between py-2">
                          <div>
                            <div className="inline-block px-3 py-1 mb-4 border border-lime-400/30 rounded-full bg-lime-400/10">
                              <span className="font-mono text-xs text-lime-400 uppercase tracking-widest">
                                // {hobby.subtitle}
                              </span>
                            </div>
                            <p className="text-lg md:text-xl text-zinc-300 font-medium leading-relaxed max-w-md">
                              {hobby.desc}
                            </p>
                          </div>
                          <div className="mt-8 md:mt-0 pt-8 border-t border-white/10 flex items-center justify-between">
                            <span className="font-mono text-xs text-lime-400/50">
                              IMAGE_REF: IMG_{hobby.id}_001.JPG
                            </span>
                            <ArrowUpRight className="text-lime-400" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* --- SECTION 3: SYSTEM LOGS (EXPERIENCE & EDUCATION) --- */}
        <div className="mb-12">
          <HackerHeader
            prefix1="01"
            prefix2="01"
            title="MISSION STATEMENT"
            lineSide="right"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full">
          {/* COLUMN 1: RUNTIME HISTORY (Experience) */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-lime-950 rounded-lg text-lime-200">
                <Briefcase size={20} />
              </div>
              <h3 className="font-mono text-lg text-lime-950 font-bold tracking-[0.2em] uppercase">
                RUNTIME_HISTORY
              </h3>
            </div>

            <div className="relative border-l-2 border-lime-950/20 ml-4 space-y-12">
              {EXPERIENCE.map((item, idx) => (
                <div key={idx} className="group relative pl-10">
                  {/* Connector Dot */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-lime-950 bg-lime-200 group-hover:bg-lime-950 transition-colors duration-300 z-10" />

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    {/* Metadata Tag */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-lime-950/70 bg-lime-950/5 px-2 py-1 rounded group-hover:bg-lime-950 group-hover:text-lime-200 transition-colors">
                        [{item.year}]
                      </span>
                      <span className="h-[1px] w-8 bg-lime-950/20" />
                    </div>

                    {/* Main Text */}
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h4 className="text-3xl md:text-4xl font-black text-lime-950 uppercase leading-none tracking-tighter">
                        {item.role}
                      </h4>
                      <span className="block mt-2 font-mono text-sm font-bold text-lime-700 uppercase tracking-widest">
                        @ {item.org}
                      </span>
                      <p className="mt-4 text-lg text-lime-900/80 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: KERNEL MODULES (Education) */}
          <div>
            <div className="flex items-center gap-4 mb-12">
              <div className="p-3 bg-lime-950 rounded-lg text-lime-200">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-mono text-lg text-lime-950 font-bold tracking-[0.2em] uppercase">
                KERNEL_MODULES
              </h3>
            </div>

            <div className="relative border-l-2 border-lime-950/20 ml-4 space-y-12">
              {EDUCATION.map((item, idx) => (
                <div key={idx} className="group relative pl-10">
                  {/* Connector Dot */}
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-lime-950 bg-lime-200 group-hover:bg-lime-950 transition-colors duration-300 z-10" />

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    {/* Metadata Tag */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-lime-950/70 bg-lime-950/5 px-2 py-1 rounded group-hover:bg-lime-950 group-hover:text-lime-200 transition-colors">
                        [{item.year}]
                      </span>
                      <span className="h-[1px] w-8 bg-lime-950/20" />
                    </div>

                    {/* Main Text */}
                    <div className="group-hover:translate-x-2 transition-transform duration-300">
                      <h4 className="text-3xl md:text-4xl font-black text-lime-950 uppercase leading-none tracking-tighter">
                        {item.role}
                      </h4>
                      <span className="block mt-2 font-mono text-sm font-bold text-lime-700 uppercase tracking-widest">
                        @ {item.org}
                      </span>
                      <p className="mt-4 text-lg text-lime-900/80 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24">
          <CustomDiv label="</ PROFILE >" />
        </div>
      </section>
    </motion.div>
  );
}
