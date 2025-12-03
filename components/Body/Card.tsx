"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Me from "@/public/me.jpg"; 
import HackerText from "../HackerText";
import { motion, useAnimation } from "framer-motion";
import CustomDiv from "../CustomDiv";
import HackerHeader from "../HackerHeader";
import Hike from "@/public/hike.jpeg"
import Kew from "@/public/kewfinger.jpg"

// --- DATA CONSTANTS ---
const METRICS = [
  { label: "CORE FOCUS", value: "FRONTEND" },
  { label: "CURRENTLY BASED IN", value: "LDN, UK" },
  { label: "EXPERIENCE", value: "1 YEAR" },
  { label: "STATUS", value: "AVAILABLE" }
];

const EXPERIENCE = [
  { year: "2025 - PRES", role: "FullStack Developer", org: "Freelance", desc: "Building beautiful web applications for clients." },
  { year: "2023 - PRES", role: "Data Engineer", org: "DataAnnotation", desc: "Produce, test and validate training data for AIs." },
];

const EDUCATION = [
  { year: "2023 - 2026", role: "BSc (Hons) Mathematics", org: "Queen Mary University of London", desc: "Focus on Group Theory, Number Theory, Ring Theory and Dynamical systems." },
  { year: "2022 - 2024", role: "CertHE of Mathematics & Physics", org: "Heriot-Watt University", desc: "Intermediate mathematics and physics study, including basic Real Analysis and advanced Kinematics." },
];

const INTERESTS = [
  { title: "Mathematics", desc: "Mathematics is my academic study of choice. I love it so much I have specialised in Pure Maths." },
  { title: "Combat Sports", desc: "I am aiming to become a professional MMA fighter! I have fought in the UK nationals for Kickboxing." },
  { title: "Nature", desc: "I love nature. I would love to work on conservation based projects." },
  { title: "Travel", desc: "Travelling is what I intend to do after uni. I'd like to become a cosmopolitan." },
];

interface CardProps {
  isAboutActive: boolean;
}

export default function Card({ isAboutActive }: CardProps) {
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsPhotoVisible(true);
      },
      { threshold: 0.3 } 
    );
    if (photoRef.current) observer.observe(photoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}> 
      <div className="w-full top-0 left-0 z-10">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-[50px] fill-stone-50 block overflow-visible">
          <use href="#fixed-convex"/> 
        </svg>
      </div>
      
      <section className="relative px-6 md:px-20 lg:px-32 py-24 md:py-36 items-center justify-center z-10 bg-stone-50">
        <style jsx>{`
          @keyframes slideUpFade {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
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
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-auto mb-24">
          
          {/* 1. BIO CARD */}
          <div className="lg:col-span-2 bg-zinc-100 p-8 md:p-12 flex flex-col justify-between group transition-all duration-300 ease-out min-h-[350px] md:min-h-[400px]">
              <div>
                <p className="text-3xl md:text-5xl font-black text-zinc-900 mb-8 tracking-tighter leading-[0.95]">
                    Building the <br/> Foundation.
                </p>
                <p className="text-zinc-500 leading-relaxed text-base md:text-lg font-medium">
                    I am currently <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-cyan-500 transition-all">making my mark</span>.
                    As a developer without years under their belt, I compensate my lack of experience with a <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-sky-500 transition-all">real love for programming</span> and <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all">genuine curiosity</span>. 
                    <br /><br />
                    I've yet to find a niche. All I know is that I want to <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-indigo-500 transition-all">code for you</span>.
                </p>
              </div>
              <div className="mt-12 flex items-center justify-between gap-4 text-xs font-mono text-zinc-400 group-hover:text-zinc-900 transition-colors">
                  <span>STATUS: STUDENT</span>
                  <span className="h-px bg-current flex-1 opacity-20" />
                  <span>TYPE: MATHEMATICS</span>
              </div>
          </div>

          {/* 2. PHOTO CARD */}
          {/* Mobile: Standard height, Desktop: Spans 2 rows to anchor the layout */}
          <div ref={photoRef} className="lg:col-span-1 lg:row-span-2 relative overflow-hidden bg-zinc-900 h-[400px] lg:h-auto group">
              <Image 
                  src={Me} 
                  alt="Toby Chen" 
                  fill 
                  className={`object-cover object-center transition-all duration-[1.5s] ease-out ${isPhotoVisible ? "grayscale-0 scale-105" : "grayscale scale-100"}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80" />
              <div className={`absolute top-4 right-4 transition-all duration-1000 delay-300 ${isPhotoVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                 <p className="bg-white text-black text-xs font-bold px-2 py-1">TOBY_CHEN_01.jpg</p>
              </div>
          </div>

          {/* 3. METRICS CARD */}
          <div className="lg:col-span-2 bg-zinc-900 p-8 flex flex-col justify-center items-center overflow-hidden transition-transform duration-300 relative min-h-[250px]">
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
               <div className="relative z-10 w-full text-center">
                  <div key={metricIndex} className="animate-slide-up flex flex-col gap-2">
                      <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.2em]">{METRICS[metricIndex].label}</p>
                      <p className="text-white font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter">{METRICS[metricIndex].value}</p>
                  </div>
                  <div className="flex justify-center gap-2 mt-8">
                      {METRICS.map((_, i) => (
                          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === metricIndex ? "w-8 bg-white" : "w-2 bg-zinc-700"}`} />
                      ))}
                  </div>
               </div>
               <div className="absolute -right-4 -bottom-8 text-[6rem] md:text-[8rem] font-black text-white/5 select-none pointer-events-none">2004</div>
          </div>
        </div>
      
        <div className="mb-6">
          <HackerHeader 
            text="01 02 // AUTHOR HOBBIES"
            lineSide="right"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
           
           <div className="md:col-span-2 lg:col-span-1 flex flex-col gap-4 h-full">
               {INTERESTS.map((item, idx) => (
                 <div key={idx} className="bg-zinc-50 border border-zinc-200 p-6 flex flex-col gap-2 hover:border-zinc-400 hover:shadow-lg transition-all group flex-1 justify-center min-h-[140px]">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-6 h-6 bg-zinc-200 rounded-full flex items-center justify-center font-mono text-[10px] group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                        0{idx + 1}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-zinc-900">{item.title}</h3>
                    </div>
                    <p className="text-zinc-500 font-medium text-sm leading-relaxed">{item.desc}</p>
                 </div>
               ))}
           </div>

           <div className="md:col-span-1 relative bg-zinc-100 border border-zinc-200 min-h-[300px] md:min-h-[400px] lg:h-full group overflow-hidden flex items-center justify-center">
              <Image 
                  src={Kew} 
                  alt="Toby in Kew Gardens"
                  fill 
                  unoptimized
                  className={`object-cover object-[center_55%] transition-all duration-[1.5s] ease-out ${isPhotoVisible ? "grayscale-0 scale-105" : "grayscale scale-100"}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80" />
                <div className={`absolute bottom-4 right-4 transition-all duration-1000 delay-300 ${isPhotoVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                 <p className="bg-white text-black text-xs font-bold px-2 py-1">KEW_GARDENS_01.jpg</p>
              </div>
           </div>
           <div className="md:col-span-1 relative min-h-[300px] md:min-h-[400px] lg:h-full group overflow-hidden flex items-center justify-center">
              <Image 
                  src={Hike} 
                  alt="Toby on a hike" 
                  unoptimized
                  fill 
                  className={`object-cover object-center transition-all duration-[1.5s] ease-out ${isPhotoVisible ? "grayscale-0 scale-105" : "grayscale scale-100"}`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent opacity-80" />
                <div className={`absolute bottom-4 left-4 transition-all duration-1000 delay-300 ${isPhotoVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                 <p className="bg-stone-50 text-black text-xs font-bold px-2 py-1">HIKING_01.jpg</p>
              </div>
           </div>

        </div>
        <div className="mb-6">
          <HackerHeader 
            text="01 03 // PAST EXPERIENCE"
            lineSide="right"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 w-full max-w-5xl mx-auto">
            <div className="flex flex-col gap-8">
                <h4 className="text-zinc-400 font-mono text-sm uppercase tracking-widest mb-4">Work_Experience</h4>
                {EXPERIENCE.map((item, idx) => (
                  <div key={idx} className="relative pl-8 border-l border-zinc-300 group hover:border-zinc-900 transition-colors py-2">
                      <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 bg-zinc-400 rounded-full group-hover:bg-zinc-900 transition-colors outline outline-stone-50" />
                      <span className="font-mono text-xs text-zinc-400 mb-1 block group-hover:text-zinc-600">{item.year}</span>
                      <h4 className="text-xl font-bold text-zinc-900">{item.role}</h4>
                      <p className="text-sm font-bold text-zinc-500 mb-2">{item.org}</p>
                      <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
            </div>
            <div className="flex flex-col gap-8 md:items-end md:text-right">
                <h4 className="text-zinc-400 font-mono text-sm uppercase tracking-widest mb-4">Education_Log</h4>
                {EDUCATION.map((item, idx) => (
                  <div key={idx} className="relative pl-8 md:pl-0 md:pr-8 border-l md:border-l-0 md:border-r border-zinc-300 group hover:border-zinc-900 transition-colors py-2 flex flex-col md:items-end">
                      <div className="absolute -left-[5px] md:left-auto md:-right-[5px] top-3 w-2.5 h-2.5 bg-zinc-400 rounded-full group-hover:bg-zinc-900 transition-colors outline outline-stone-50" />
                      <span className="font-mono text-xs text-zinc-400 mb-1 block group-hover:text-zinc-600">{item.year}</span>
                      <h4 className="text-xl font-bold text-zinc-900">{item.role}</h4>
                      <p className="text-sm font-bold text-zinc-500 mb-2">{item.org}</p>
                      <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
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