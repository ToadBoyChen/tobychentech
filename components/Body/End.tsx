"use client";
import { useEffect } from "react";
import HackerText from "../HackerText";
import { motion, useAnimation, Variants } from "framer-motion";

interface CardProps {
  isEndActive: boolean;
}

const TESTIMONIALS = [
  {
    name: "Sarah Jenkins",
    role: "Senior Product Manager",
    company: "TechFlow",
    text: "He didn't just build what we asked for; he built what we actually needed. The attention to detail in the frontend architecture saved us months of technical debt down the line.",
    initials: "SJ"
  },
  // Add other testimonials back if needed
];

export default function End({ isEndActive }: CardProps) {
  const controls = useAnimation();

  const cardVariants = {
    hidden: { y: 100 },
    visible: { y: 0, transition: { duration: 0.6 } },
  };

  useEffect(() => {
    if (isEndActive) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isEndActive, controls]);

  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}>
      <div className="w-full top-0 left-0 z-10">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-[30px] md:h-[50px] fill-zinc-100 block overflow-visible"
        >
          <use href="#fixed-convex" />
        </svg>
      </div>
      
      <section className="px-4 md:px-8 lg:px-16 py-20 md:py-36 items-center justify-center z-50 bg-zinc-100 min-h-screen">
        {/* --- HEADER DECORATION --- */}
        <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-16 w-full max-w-6xl mx-auto">
          <div className="h-px bg-zinc-400 flex-1" />
          <span className="font-mono text-[10px] md:text-sm uppercase tracking-widest text-zinc-500 whitespace-nowrap">
            05 // INITIALISE_THANKYOU
          </span>
          <div className="h-px bg-zinc-300 flex-1" />
        </div>

        {/* --- MAIN THANK YOU TEXT --- */}
        <div className="flex flex-col items-center group max-w-4xl mx-auto text-center mb-20 md:mb-32">
          <HackerText
            text="THANK_YOU"
            triggerOnMount={true}
            triggerOnHover={false}
            speed={50}
            className="font-black text-4xl md:text-6xl tracking-tighter text-zinc-900 font-mono mb-6 md:mb-8"
          />
          <p className="text-zinc-500 leading-relaxed text-base md:text-xl font-medium max-w-2xl px-2">
            Thanks for stopping by,{" "}
            <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-cyan-500 transition-all">
              every visit counts
            </span>
            . I hope this portfolio showcases my skills. If it does, and you're impressed,{" "}
            <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-sky-500 transition-all">
              reach out
            </span>
            ! If you have any feedback, also get in touch, I'm{" "}
            <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all">
              always looking to improve
            </span>
            .
          </p>
        </div>

        {/* --- TESTIMONIALS SECTION --- */}
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto">
          <div className="mb-8 md:mb-12 text-center">
            <HackerText
              text="TESTIMONIALS"
              triggerOnMount={true}
              triggerOnHover={false}
              speed={50}
              className="font-black text-3xl md:text-6xl tracking-tighter text-zinc-900 font-mono mb-4 md:mb-8"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-6 w-full">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 md:p-8 rounded-sm border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-400 transition-all duration-300 group flex flex-col justify-between w-full md:max-w-2xl"
              >
                <div>
                  <div className="text-3xl md:text-4xl text-zinc-300 font-serif mb-4 group-hover:text-zinc-800 transition-colors">
                    &ldquo;
                  </div>
                  
                  <p className="text-zinc-600 font-medium leading-relaxed mb-6 md:mb-8 text-base md:text-lg">
                    {item.text}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                  <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-xs font-black text-zinc-400 border border-zinc-200 font-mono group-hover:bg-zinc-900 group-hover:text-white transition-colors shrink-0">
                    {item.initials}
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-zinc-900 font-bold text-sm tracking-tight">
                      {item.name}
                    </span>
                    <span className="text-zinc-400 text-[10px] md:text-xs font-mono uppercase tracking-wider">
                      {item.role} @ {item.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}