"use client";
import { useEffect } from "react";
import HackerText from "../HackerText";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import CustomDiv from "../CustomDiv";
import HackerHeader from "../HackerHeader";
import Pt1 from "./card/pt1";
import Pt2 from "./card/pt2";
import Pt3 from "./card/pt3";

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

        <Pt1 />

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

        <Pt2 />

        <div className="mb-8">
          <HackerHeader
            prefix1="01"
            prefix2="03"
            title="Experiences"
            lineSide="right"
            bgColour="bg-lime-800"
            className="text-stone-50"
          />
        </div>

        <Pt3 />

        <CustomDiv
          label="PROFILE END"
          lineColor="bg-lime-800"
          textColor="text-stone-50"
        />
      </section>
    </motion.div>
  );
}
