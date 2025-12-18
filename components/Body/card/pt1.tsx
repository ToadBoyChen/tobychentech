import Image from "next/image";
import BoxedHeader from "../../BoxedHeader";
import HighText from "../../HighText";
import Me from "@/public/me.jpg";
import { useEffect, useRef, useState } from "react";
import MagneticPill from "@/components/MagneticPill";
import NatureText from "@/components/HackerText";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

const METRICS = [
  {
    label: "CORE FOCUS",
    value: "FRONTEND",
    details:
      "Specializing in React, Next.js, and high-performance UI engineering.",
  },
  {
    label: "CURRENTLY BASED IN",
    value: "LDN, UK",
    details:
      "Based in London. Available for hybrid or remote collaboration globally.",
  },
  {
    label: "EXPERIENCE",
    value: "1 YEAR",
    details:
      "Intensive commercial experience shipping production-grade applications.",
  },
  {
    label: "STATUS",
    value: "AVAILABLE",
    details:
      "Currently open to new opportunities. Ready to ship impact immediately.",
  },
];

export default function Pt1() {
  const [isMeVisible, setIsMeVisible] = useState(false);
  const meRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const [isPaused, setIsPaused] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // NEW: State to track if mouse is inside the flipper
  const [isHovering, setIsHovering] = useState(false);

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

  // Timer: Pauses on hover OR flip.
  useEffect(() => {
    if (isPaused || isFlipped) return;

    const interval = setInterval(() => {
      setMetricIndex((prev) => (prev + 1) % METRICS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isFlipped, metricIndex]);

  const handleManualChange = (index: number) => {
    setMetricIndex(index);
    setIsFlipped(false);
  };

  const cursorLabel = isFlipped ? "RESET" : "FLIP";
  useEffect(() => {
    if (isHovering) {
      setCursor(cursorLabel, "text");
    }
  }, [isFlipped, isHovering, cursorLabel, setCursor]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full my-16">
      <div className="sm:col-span-2 flex flex-col justify-center">
        <BoxedHeader
          text="Building Foundations."
          fillColor="bg-lime-500"
          className="bg-lime-900 px-8 py-4 mb-8 self-center rounded-xl text-5xl font-semibold text-lime-200 uppercase transition-all duration-300 w-full"
        />
        <div className="text-stone-50 bg-lime-900 p-8 flex flex-col justify-between group rounded-xl transition-all duration-300">
          <p>
            I am currently <HighText text="accelerating" variant="light" />. I
            trade years of tenure for{" "}
            <HighText text="relentless curiosity" variant="light" /> and an
            obsession with how things work.
            <br />
            <br />I am niche-agnostic by design. Whether it's algo-trading,
            fullstack, or systems engineering, I don't just want to write code.
            I want to <HighText text="ship impact" variant="light" />.
          </p>
        </div>
      </div>

      {/* 2. PHOTO SECTION */}
      <div
        ref={meRef}
        className="relative overflow-hidden rounded-xl h-[400px] sm:col-span-1 sm:h-full group"
      >
        <Image
          src={Me}
          alt="Toby Chen"
          fill
          className={`object-cover object-center transition-all duration-[1.5s] ease-out ${
            isMeVisible ? "grayscale-0 scale-105" : "grayscale scale-100"
          }`}
        />
        <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-linear-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-2 right-2 flex">
          <MagneticPill strength={0.3}>
            <BoxedHeader
              text="Toby_Beach.png"
              fillColor="bg-yellow-500"
              className="px-2 py-1 rounded-full text-xs font-semibold font-mono text-stone-50 uppercase"
            />
          </MagneticPill>
        </div>
      </div>

      {/* 3. METRICS SECTION */}
      <div className="sm:col-span-3 bg-lime-200 rounded-xl relative overflow-hidden p-8 flex flex-row items-stretch min-h-[250px] md:min-h-[300px]">
        {/* LEFT SIDE: CONTENT */}
        <div className="flex-1 flex flex-col justify-between z-10 mr-8">
          <div className="h-8">
            <NatureText
              key={METRICS[metricIndex].label}
              text={METRICS[metricIndex].label}
              className="text-lime-700 text-md uppercase tracking-widest font-bold"
              speed={20}
              triggerOnMount={true}
              triggerOnHover={false}
            />
          </div>

          <div className="w-full relative perspective-[1000px] min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={metricIndex}
                className="relative w-full preserve-3d cursor-pointer"
                initial={{ rotateX: -90, opacity: 0 }}
                animate={{ rotateX: isFlipped ? 180 : 0, opacity: 1 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.4, ease: "backOut" }}
                onClick={() => setIsFlipped(!isFlipped)}
                onMouseEnter={() => {
                  setIsHovering(true);
                  setCursor(cursorLabel, "text");
                }}
                onMouseLeave={() => {
                  setIsHovering(false);
                  resetCursor();
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* --- FRONT FACE --- */}
                <div
                  className="pt-8 rounded-xl w-full backface-hidden hover:shadow-none transition-all duration-300"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <MagneticPill>
                    <NatureText
                      key={METRICS[metricIndex].value}
                      text={METRICS[metricIndex].value}
                      className="text-lime-950 font-black text-5xl md:text-7xl lg:text-8xl block"
                      speed={40}
                      triggerOnMount={true}
                      forceHoverState={isHovering && !isFlipped}
                    />
                  </MagneticPill>
                </div>

                {/* --- BACK FACE --- */}
                <div
                  className="absolute inset-0 p-4 rounded-xl bg-lime-500 w-full h-full flex items-center justify-center backface-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateX(180deg)",
                  }}
                >
                  <p className="text-stone-50 font-mono text-lg">
                    {METRICS[metricIndex].details}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="group flex flex-col justify-center gap-3 z-10 w-6 group/sidebar">
          {METRICS.map((_, i) => (
           
            <MagneticPill key={i}>
              <button
                onClick={() => handleManualChange(i)}
                className={`
        w-6 rounded-full 
        transition-all duration-300 hover:bg-yellow-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
        cursor-pointer
        ${
          i === metricIndex
            ? "h-16 bg-lime-900 opacity-100"
            : "h-6 bg-lime-500"
        }
      `}
                aria-label={`Go to slide ${i + 1}`}
              />
            </MagneticPill>
          ))}
        </div>
      </div>
    </div>
  );
}
