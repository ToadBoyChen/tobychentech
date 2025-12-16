import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import BoxedHeader from "../../BoxedHeader";
import HighText from "../../HighText";
import Me from "@/public/me.jpg";
import { useEffect, useRef, useState } from "react";
import MagneticPill from "@/components/MagneticPill";

const METRICS = [
  { label: "CORE FOCUS", value: "FRONTEND" },
  { label: "CURRENTLY BASED IN", value: "LDN, UK" },
  { label: "EXPERIENCE", value: "1 YEAR" },
  { label: "STATUS", value: "AVAILABLE" },
];

const FACTS = ["Python", "Maths", "Systems", "Design"];

export default function Pt1() {
  const [isMeVisible, setIsMeVisible] = useState(false);
  const meRef = useRef<HTMLDivElement>(null);

  const [metricIndex, setMetricIndex] = useState(0);

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
    if (meRef.current) meObserver.observe(meRef.current);

    return () => {
      meObserver.disconnect();
    };
  }, []);

  // Metrics Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % METRICS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full my-16">
      <div className="bg-lime-200 flex flex-col justify-between group p-8 border-3 border-lime-950 rounded-xl transition-all duration-300 h-full sm:col-span-2">
        <BoxedHeader
          text="Building Velocity."
          fillColor="bg-lime-800"
          className="bg-yellow-200"
        />
        <p>
          I am currently <HighText text="accelerating" />. I trade years of
          tenure for <HighText text="relentless curiosity" /> and an obsession
          with how things work.
          <br />
          <br />I am niche-agnostic by design. Whether it's algo-trading,
          fullstack, or systems engineering, I don't just want to write code. I
          want to <HighText text="ship impact" />.
        </p>
      </div>

      <div
        ref={meRef}
        className="border-3 border-lime-950 relative overflow-hidden rounded-xl h-[400px] sm:col-span-1 sm:h-full group"
      >
        <Image
          src={Me}
          alt="Toby Chen"
          fill
          className={`object-cover object-center transition-all duration-[1.5s] ease-out ${
            isMeVisible ? "grayscale-0 scale-105" : "grayscale scale-100"
          }`}
        />

        {/* PILLS CONTAINER */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-3 z-10">
          {FACTS.map((fact, i) => (
            <div
              key={fact}
              className={`transition-all duration-500 ${
                isMeVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
              // Pass the index-based delay logic to the wrapper style
              style={{ transitionDelay: `${i * 100 + 300}ms` }}
            >
              <MagneticPill children={fact} />
            </div>
          ))}
        </div>
      </div>

      {/* 3. METRICS (Bottom Full Width) */}
      <div className="sm:col-span-3 border-3 border-lime-950 bg-yellow-200 rounded-xl relative overflow-hidden p-8 md:p-12 flex flex-row items-stretch min-h-[250px] md:min-h-[300px]">
        <div className="absolute -top-[50px] -right-[50px] w-[300px] h-[300px] bg-linear-to-br from-lime-500/20 to-transparent blur-[80px] rounded-full pointer-events-none" />

        {/* LEFT SIDE: CONTENT */}
        <div className="flex-1 flex flex-col justify-between z-10 mr-8">
          {/* Top Label */}
          <div className="h-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={METRICS[metricIndex].label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lime-700 font-mono text-xs md:text-sm uppercase tracking-widest font-bold"
              >
                {METRICS[metricIndex].label}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="relative w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={METRICS[metricIndex].value}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
                className="p-4 border-3 border-lime-950 rounded-xl bg-lime-200 text-lime-950 font-black text-5xl md:text-7xl lg:text-8xl"
              >
                {METRICS[metricIndex].value}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-3 z-10 w-4">
          {METRICS.map((_, i) => (
            <div
              key={i}
              className={`border-2 border-lime-950 w-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                i === metricIndex
                  ? "h-16 bg-pink-400 opacity-100"
                  : "h-2 bg-lime-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
