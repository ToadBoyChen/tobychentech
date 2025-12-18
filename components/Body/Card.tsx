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
import Pt2 from "./card/pt2";

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

interface CardProps {
  isAboutActive: boolean;
}

export default function Card({ isAboutActive }: CardProps) {
  const controls = useAnimation();
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

        <div className="mb-8">
          <HackerHeader
            prefix1="01"
            prefix2="02"
            title="Hobby Stack"
            lineSide="right"
            bgColour="bg-lime-800"
            className="text-stone-50"
          />
        </div>

        <Pt2/>

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
