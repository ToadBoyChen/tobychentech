import { useEffect } from "react";
import HackerText from "../HackerText";
import { motion, useAnimation } from "framer-motion";

interface CardProps {
  isEndActive: boolean;
}

export default function End({isEndActive} : CardProps) {
    const controls = useAnimation();
    
    const cardVariants = {
        hidden: { y: 100},
        visible: { y: 0, transition: { duration: 0.6 }},
    };
    
    useEffect(() => {
        if (isEndActive) {
        controls.start("visible");
        } else {
        controls.start("hidden");
        }
    }, [isEndActive, controls]);

    return (
        <motion.div
            initial="hidden"
            animate={controls}
            variants={cardVariants}
        >
            <div 
                className="w-full top-0 left-0 z-10"
            >
                <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-[50px] fill-white block overflow-visible"
                >
                    <use href="#fixed-convex"/> 
                </svg>
            </div>
            <section
                className="px-16 py-36 items-center justify-center z-50 bg-white"
            > 
                <div className="flex items-center gap-6 mb-16 w-full">
                    <div className={`h-px bg-zinc-400 flex-1`} />
                    <span className={`font-mono text-sm bg-zinc-300 uppercase tracking-widest`}>
                    05 // INITIALISE_THANKYOU
                    </span>
                    <div className={`h-px bg-zinc-300 flex-1`} />
                </div>
                <div className="flex flex-col items-center">
                    <HackerText
                        text="THANKS FOR VISITING"
                        triggerOnMount={true}
                        triggerOnHover={false}
                        speed={50}
                        className={`font-black text-6xl md:text-7xl tracking-tighter text-center font-mono bg-zinc-300`}
                    />
                    <p className="text-zinc-500 leading-relaxed text-lg font-medium my-12">
                        Thanks for stopping by, <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-cyan-500 transition-all">every visit counts</span>. I hope this portfolio showcases my skills. If it does, and you're impressed, <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-sky-500 transition-all">reach out</span>! If you have any feedback, also get in touch with me, I'm <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all">always looking to improve</span>.
                </p>
                </div>
            </section>
        </motion.div>
    );
}