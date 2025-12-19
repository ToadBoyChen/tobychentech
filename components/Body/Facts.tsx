import { motion, useAnimation } from "framer-motion";
import CustomDiv from "../CustomDiv";
import HackerHeader from "../HackerHeader";
import HackerText from "../HackerText";
import SpotifyCard from "../SpotifyCard";
import LinuxCard from "./LinuxCard";
import { useEffect } from "react";
import AnimeCard from "./AnimeCard";
import StatsCard from "./StatsCard";

interface FactsProps {
  isFactsActive: boolean;
}

export default function Facts({ isFactsActive }: FactsProps) {
  const controls = useAnimation();
  const cardVariants = {
    hidden: { y: 100 },
    visible: { y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    if (isFactsActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isFactsActive, controls]);

  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}>
      <div className="w-full top-0 left-0 z-50">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-[50px] fill-lime-200 block overflow-visible"
        >
          <use href="#fixed-convex" />
        </svg>
      </div>
      <section className="relative px-6 md:px-20 lg:px-32 py-20 md:py-36 items-center justify-center z-20 bg-lime-200">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <HackerText
            text="SOME FACTS"
            triggerOnMount={true}
            triggerOnHover={false}
            className="text-stone-50 font-bold text-5xl md:text-6xl lg:text-8xl tracking-tighter text-center font-mono"
          />
        </div>
        <div className="mb-12">
          <CustomDiv
            label="< FACTS >"
            lineColor="bg-stone-50"
            textColor="text-stone-50"
          />
        </div>

        <div className="mb-8">
          <HackerHeader
            text="02 01 // FUN FACTS"
            lineSide="right"
          />
        </div>

        <SpotifyCard />
        <div className="mt-46">
          <LinuxCard />
        </div>
        <div className="mt-46">
          <AnimeCard />
        </div>
        <div className="mt-46">
          <StatsCard />
        </div>
        <div className="mt-12">
          <CustomDiv
            label="</ FACTS >"
            lineColor="bg-stone-50"
            textColor="text-stone-50"
          />
        </div>
      </section>
    </motion.div>
  );
}
