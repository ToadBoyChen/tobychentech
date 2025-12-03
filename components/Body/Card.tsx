"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Me from "@/public/me.jpg";
import HackerText from "../HackerText";
import { motion, useAnimation } from "framer-motion";
import CustomDiv from "../CustomDiv";
import HackerHeader from "../HackerHeader";
import Hike from "@/public/hike.jpeg";
import Kew from "@/public/kewfinger.jpg";
import HighText from "../HighText";

// --- DATA CONSTANTS ---
const METRICS = [
  { label: "CORE FOCUS", value: "FRONTEND" },
  { label: "CURRENTLY BASED IN", value: "LDN, UK" },
  { label: "EXPERIENCE", value: "1 YEAR" },
  { label: "STATUS", value: "AVAILABLE" },
];

const EXPERIENCE = [
  {
    year: "2025 - PRES",
    role: "FullStack Developer",
    org: "Freelance",
    desc: "Building beautiful web applications for clients.",
  },
  {
    year: "2023 - PRES",
    role: "Data Engineer",
    org: "DataAnnotation",
    desc: "Produce, test and validate training data for AIs.",
  },
];

const EDUCATION = [
  {
    year: "2023 - 2026",
    role: "BSc (Hons) Mathematics",
    org: "Queen Mary University of London",
    desc: "Focus on Group Theory, Number Theory, Ring Theory and Dynamical systems.",
  },
  {
    year: "2022 - 2024",
    role: "CertHE of Mathematics & Physics",
    org: "Heriot-Watt University",
    desc: "Intermediate mathematics and physics study, including basic Real Analysis and advanced Kinematics.",
  },
];

const INTERESTS = [
  {
    title: "Mathematics",
    desc: "Mathematics is my academic study of choice. I love it so much I have specialised in Pure Maths.",
  },
  {
    title: "Combat Sports",
    desc: "I am aiming to become a professional MMA fighter! I have fought in the UK nationals for Kickboxing.",
  },
  {
    title: "Nature",
    desc: "I love nature. I would love to work on conservation based projects.",
  },
  {
    title: "Travel",
    desc: "Travelling is what I intend to do after uni. I'd like to become a cosmopolitan.",
  },
];

interface CardProps {
  isAboutActive: boolean;
}

export default function Card({ isAboutActive }: CardProps) {
  // 1. Separate states for independent animation
  const [isMeVisible, setIsMeVisible] = useState(false);
  const [isKewVisible, setIsKewVisible] = useState(false);
  const [isHikeVisible, setIsHikeVisible] = useState(false);

  // 2. Separate refs to track each image location
  const meRef = useRef<HTMLDivElement>(null);
  const kewRef = useRef<HTMLDivElement>(null);
  const hikeRef = useRef<HTMLDivElement>(null);

  const [metricIndex, setMetricIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % METRICS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 3. Set up independent observers
  useEffect(() => {
    const createObserver = (setState: (val: boolean) => void) => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setState(true);
        },
        { threshold: 0.3 }
      );
    };

    const meObserver = createObserver(setIsMeVisible);
    const kewObserver = createObserver(setIsKewVisible);
    const hikeObserver = createObserver(setIsHikeVisible);

    if (meRef.current) meObserver.observe(meRef.current);
    if (kewRef.current) kewObserver.observe(kewRef.current);
    if (hikeRef.current) hikeObserver.observe(hikeRef.current);

    return () => {
      meObserver.disconnect();
      kewObserver.disconnect();
      hikeObserver.disconnect();
    };
  }, []);

  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}>
      <div className="w-full top-0 left-0 z-10">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-[50px] fill-stone-50 block overflow-visible"
        >
          <use href="#fixed-convex" />
        </svg>
      </div>

      <section className="relative px-6 md:px-20 lg:px-32 py-24 md:py-36 items-center justify-center z-10 bg-stone-50">
        <style jsx>{`
          @keyframes slideUpFade {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>

        <div className="flex flex-col items-center mb-16">
          <HackerText
            text="WHO AM I?"
            triggerOnMount={true}
            triggerOnHover={false}
            speed={50}
            className="font-bold text-5xl md:text-6xl lg:text-8xl tracking-tighter text-center font-mono"
          />
        </div>
        <CustomDiv label="< PROFILE >" />

        <div className="mb-6">
          <HackerHeader
            text="01 01 // MISSION STATEMENT"
            lineSide="right"
            size="large"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-auto mb-24">
          
          <div className="lg:col-span-2 bg-zinc-100 rounded-3xl p-8 md:p-12 flex flex-col justify-between group transition-all duration-300 ease-out min-h-[350px] md:min-h-[400px]">
            <div>
              <p className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">
                Building the Foundation.
              </p>
              <p className="text-lg lg:text-xl font-medium">
                I am currently <HighText text="making my mark"/>.. As a developer without years under their belt, I compensate my lack of experience with a <HighText text="real love for programming"/> and <HighText text="genuine curiosity"/>
                .
                <br />
                <br />
                I'm yet to find a niche. It could be fullstack, algo-trading or anything else. All I know is that I want to <HighText text="code for you"/>.
              </p>
            </div>
            <div className="mt-12 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 group-hover:text-zinc-900 transition-colors">
              <span>STATUS: STUDENT</span>
              <span className="h-px bg-current flex-1 opacity-20" />
              <span>TYPE: MATHEMATICS</span>
            </div>
          </div>

          <div
            ref={meRef}
            className="lg:col-span-1 lg:row-span-2 relative overflow-hidden bg-zinc-900 rounded-3xl h-[400px] lg:h-auto group"
          >
            <Image
              src={Me}
              alt="Toby Chen"
              fill
              className={`object-cover object-center transition-all duration-[1.5s] ease-out ${
                isMeVisible ? "grayscale-0 scale-105" : "grayscale scale-100" // Uses isMeVisible
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80" />
            <div
              className={`absolute top-4 right-4 transition-all duration-1000 delay-300 ${
                isMeVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p className="bg-white text-black text-xs font-bold px-2 py-1">
                TOBY_CHEN_01.jpg
              </p>
            </div>
          </div>
          <div className="lg:col-span-2 bg-zinc-900 rounded-3xl p-8 flex flex-col justify-center items-center overflow-hidden transition-transform duration-300 relative min-h-[250px]">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative z-10 w-full text-center">
              <div
                key={metricIndex}
                className="animate-slide-up flex flex-col gap-2"
              >
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.2em]">
                  {METRICS[metricIndex].label}
                </p>
                <p className="text-white font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter">
                  {METRICS[metricIndex].value}
                </p>
              </div>
              <div className="flex justify-center gap-2 mt-8">
                {METRICS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === metricIndex ? "w-8 bg-white" : "w-2 bg-zinc-700"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -right-4 -bottom-8 text-[6rem] md:text-[8rem] font-black text-white/5 select-none pointer-events-none">
              2004
            </div>
          </div>
        </div>

        <div className="mb-6">
          <HackerHeader
            text="01 02 // MY HOBBIES"
            lineSide="right"
            size="large"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24 w-full">
          <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4 h-full">
            <div className="flex items-center justify-between border-b border-zinc-300 pb-2 mb-2">
              <span className="font-mono text-xs text-zinc-400">
                ARRAY[{INTERESTS.length}]
              </span>
            </div>

            {INTERESTS.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-3xl p-6 flex flex-col justify-center gap-2 hover:shadow-lg transition-all group flex-1 min-h-[140px]"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black uppercase group-hover:text-lime-400 transition-colors">
                    {item.title}
                  </h3>
                  <div className="font-mono text-sm text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    [0{idx + 1}]
                  </div>
                </div>
                <p>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* --- COLUMN 2: IMAGE 1 (Kew) --- */}
          <div
            ref={kewRef} // Linked to kewRef
            className="md:col-span-1 relative bg-zinc-900 rounded-3xl min-h-[300px] md:min-h-[400px] lg:h-full group overflow-hidden flex items-center justify-center"
          >
            <Image
              src={Kew}
              alt="Toby in Kew Gardens"
              fill
              unoptimized
              className={`object-cover object-[center_55%] transition-all duration-[1.5s] ease-out ${
                isKewVisible // Uses isKewVisible
                  ? "grayscale-0 scale-105"
                  : "grayscale scale-100 opacity-70"
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

            <div
              className={`absolute bottom-6 right-6 transition-all duration-1000 delay-300 ${
                isKewVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p className="bg-white text-black text-xs font-bold px-2 py-1">
                KEW_GARDENS.jpg
              </p>
            </div>
          </div>

          {/* --- COLUMN 3: IMAGE 2 (Hike) --- */}
          <div
            ref={hikeRef} // Linked to hikeRef
            className="md:col-span-1 relative bg-zinc-900 rounded-3xl min-h-[300px] md:min-h-[400px] lg:h-full group overflow-hidden flex items-center justify-center"
          >
            <Image
              src={Hike}
              alt="Toby on a hike"
              unoptimized
              fill
              className={`object-cover object-center transition-all duration-[1.5s] ease-out ${
                isHikeVisible // Uses isHikeVisible
                  ? "grayscale-0 scale-105"
                  : "grayscale scale-100 opacity-70"
              }`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

            <div
              className={`absolute bottom-6 left-6 transition-all duration-1000 delay-300 ${
                isHikeVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <p className="bg-white text-black text-xs font-bold px-2 py-1">
                BRIGHTON_HIKE.jpg
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <HackerHeader
            text="01 03 // PAST EXPERIENCE"
            lineSide="right"
            size="large"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 w-full mx-auto">
          <div className="flex flex-col gap-8">
            <div className="mb-6 w-full">
              <HackerHeader
                text="01 03 01 // WORK EXPERIENCE"
                lineSide="left"
              />
            </div>

            {EXPERIENCE.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-8 border-l border-zinc-400 group hover:border-zinc-900 transition-colors py-2"
              >
                <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 bg-zinc-500 rounded-full group-hover:bg-zinc-900 transition-colors outline outline-stone-50" />
                <span className="font-mono text-sm text-zinc-400 mb-4 block group-hover:text-lime-500">
                  {item.year}
                </span>
                <h4 className="text-2xl md:3xl font-bold text-zinc-900">
                  {item.role}
                </h4>
                <p className="text-md font-bold text-zinc-500 mb-4 group-hover:text-lime-700">
                  {item.org}
                </p>
                <p className="text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-8 md:items-end w-full">
            <div className="mb-6 w-full text-right">
              <HackerHeader
                text="01 03 02 // HIGHER EDUCATION"
                lineSide="left"
                className="justify-end"
              />
            </div>

            {EDUCATION.map((item, idx) => (
              <div
                key={idx}
                className="relative pl-8 md:pl-0 md:pr-8 border-l md:border-l-0 md:border-r border-zinc-400 group hover:border-zinc-900 transition-colors py-2 flex flex-col md:items-end w-full"
              >
                <div className="absolute top-3 w-2.5 h-2.5 bg-zinc-500 rounded-full group-hover:bg-zinc-900 transition-colors outline outline-stone-50 -left-[5px] md:left-auto md:-right-[5px]" />

                <span className="font-mono text-sm text-zinc-400 mb-4 block group-hover:text-lime-500">
                  {item.year}
                </span>
                <h4 className="text-2xl md:text-right font-bold">
                  {item.role}
                </h4>
                <p className="text-md md:text-right font-bold text-zinc-500 mb-4 group-hover:text-lime-700">
                  {item.org}
                </p>
                <p className="text-lg md:text-right max-w-md">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12">
          <CustomDiv label="</ PROFILE >" />
        </div>
      </section>
    </motion.div>
  );
}