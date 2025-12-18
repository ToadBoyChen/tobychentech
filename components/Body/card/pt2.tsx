import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import Hike from "@/public/hike.jpeg";
import Kew from "@/public/kewfinger.jpg";
import Me from "@/public/me.jpg";
import Image from "next/image";
import { useCursor } from "@/context/CursorContext";
import MagneticPill from "@/components/MagneticPill";
import BoxedHeader from "@/components/BoxedHeader"; 

// --- DATA STRUCTURE ---
const HOBBIES = [
  {
    id: "01",
    title: "MATHEMATICS",
    desc: "My academic study of choice. I specialize in Group Theory and finding patterns where others see chaos.",
    images: [Me, Kew], 
    align: "object-center",
    keywords: [
      { 
        label: "GROUP_THEORY", 
        title: "Group Theory & Symmetry",
        content: "The study of symmetry operations. From molecular chemistry to cryptography, group theory allows us to map complex systems into predictable algebraic structures." 
      },
      { 
        label: "TOPOLOGY", 
        title: "Topology",
        content: "Understanding space through continuous deformation. It teaches that the specific shape matters less than the fundamental connectivity of the system." 
      }
    ]
  },
  {
    id: "02",
    title: "CONSERVATION",
    desc: "Deep appreciation for the wild. My long-term goal is to engineer tech solutions for reforestation.",
    images: [Kew, Hike, Me],
    align: "object-[center_60%]",
    keywords: [
        { 
          label: "IOT_SENSORS", 
          title: "Remote IoT Sensing",
          content: "Deploying low-power LoRaWAN sensor networks to monitor soil moisture and canopy density in real-time without disturbing local wildlife." 
        },
        { 
          label: "DRONE_MAPPING", 
          title: "LIDAR Drone Mapping",
          content: "Utilizing autonomous drones to create 3D point clouds of forest structures, enabling precise calculation of biomass and carbon sequestration." 
        }
      ]
  },
  {
    id: "03",
    title: "EXPLORATION",
    desc: "Aspiring cosmopolitan. I don't just want to visit places; I want to code from every continent.",
    images: [Hike, Kew],
    align: "object-center",
    keywords: [
        { 
          label: "ASYNC_WORK", 
          title: "Asynchronous Workflows",
          content: "Mastering the art of async communication. When working across 3 timezones, documentation and clear handoffs become more valuable than raw code." 
        }
      ]
  },
  {
    id: "04",
    title: "COMBAT SPORTS",
    desc: "Aiming to turn Pro. Competing in UK Nationals requires the same discipline as shipping complex code.",
    images: [Me, Hike],
    align: "object-top",
    keywords: [
        { 
          label: "FLOW_STATE", 
          title: "Cognitive Flow State",
          content: "The mental state in sparring is identical to debugging a race condition. Total immersion, pattern recognition, and rapid reaction to changing inputs." 
        },
        { 
          label: "DISCIPLINE", 
          title: "Iterative Improvement",
          content: "Martial arts is the physical manifestation of the Kaizen philosophy. 1% better every day, compounding over years." 
        }
      ]
  },
];

interface ModalContent {
    title: string;
    content: string;
}

export default function Pt2() {
  const [activeHobby, setActiveHobby] = useState<string | null>("01");
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);
  
  // Carousel State
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const { setCursor, resetCursor } = useCursor();

  // --- AUTO ROTATION EFFECT ---
  useEffect(() => {
    if (!activeHobby || isCarouselPaused) return;

    const currentHobbyData = HOBBIES.find(h => h.id === activeHobby);
    if (!currentHobbyData || currentHobbyData.images.length <= 1) return;

    const interval = setInterval(() => {
        setCurrentImgIdx((prev) => (prev + 1) % currentHobbyData.images.length);
    }, 3000); // 3 Seconds

    return () => clearInterval(interval);
  }, [activeHobby, isCarouselPaused]);


  // --- HANDLERS ---

  const handleCardClick = (e: React.MouseEvent, id: string, currentlyActive: boolean) => {
    const nextState = currentlyActive ? null : id;
    setActiveHobby(nextState);
    setCurrentImgIdx(0); 
    setIsCarouselPaused(false);

    if (nextState) {
        resetCursor();
    } else {
        setCursor("EXPAND", "text");
    }
  };

  const handleMouseEnter = (isActive: boolean) => {
    if (!isActive) {
        setCursor("EXPAND", "text");
    } else {
        resetCursor();
    }
  };

  const stopCursor = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetCursor();
  };

  const restoreCursor = (e: React.MouseEvent, isActive: boolean) => {
    e.stopPropagation();
    if (!isActive) {
        setCursor("EXPAND", "text");
    } else {
        resetCursor();
    }
  };

  const handleManualSlideChange = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImgIdx(index);
  };

  // --- ANIMATION VARIANTS ---
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <>
      <div className="flex flex-col w-full mb-24 gap-4">
        {HOBBIES.map((hobby) => {
          const isActive = activeHobby === hobby.id;

          return (
            <motion.div
              layout
              key={hobby.id}
              onClick={(e) => handleCardClick(e, hobby.id, isActive)}
              onMouseEnter={() => handleMouseEnter(isActive)}
              onMouseLeave={resetCursor}
              className={`
                relative cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${
                  isActive
                    ? "bg-lime-200 border-lime-200 shadow-xl scale-[1.01]"
                    : "bg-lime-900 border-lime-900 hover:border-lime-700 hover:scale-[1.005]"
                }
              `}
            >
              {/* HEADER */}
              <div 
                className={`
                    flex items-center justify-between p-6 md:p-8 transition-opacity duration-500
                    ${isActive ? "opacity-50 hover:opacity-100" : "opacity-100"}
                `}
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <div 
                    onMouseEnter={stopCursor} 
                    onMouseLeave={(e) => restoreCursor(e, isActive)}
                  >
                    <MagneticPill strength={0.2}>
                        <span
                        className={`font-mono text-xl tracking-widest font-bold ${
                            isActive ? "text-lime-900" : "text-lime-500/50"
                        }`}
                        >
                        {hobby.id}
                        </span>
                    </MagneticPill>
                  </div>
                  
                  <h3
                    className={`text-2xl md:text-5xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                      isActive ? "text-lime-950" : "text-stone-50"
                    }`}
                  >
                    {hobby.title}
                  </h3>
                </div>

                <div 
                    onMouseEnter={stopCursor}
                    onMouseLeave={(e) => restoreCursor(e, isActive)}
                >
                    <MagneticPill strength={0.3}>
                    <div
                        className={`p-3 rounded-full border transition-all duration-500 ${
                        isActive
                            ? "border-lime-900 rotate-135 bg-lime-900"
                            : "border-lime-500/30 rotate-0 bg-transparent hover:bg-lime-500/10"
                        }`}
                    >
                        <Plus 
                        className={`transition-colors duration-300 ${
                            isActive ? "text-lime-200" : "text-lime-200"
                        }`} 
                        />
                    </div>
                    </MagneticPill>
                </div>
              </div>

              {/* EXPANDED CONTENT */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden" 
                  >
                    <motion.div 
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        onMouseEnter={stopCursor} 
                        onMouseLeave={(e) => restoreCursor(e, isActive)}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8 pt-0 cursor-default"
                        onClick={(e) => e.stopPropagation()} 
                    >
                      
                      {/* --- LEFT: IMAGE CAROUSEL (1/3 Width) --- */}
                      <motion.div 
                        variants={itemVariants}
                        // Pause Logic
                        onMouseEnter={() => setIsCarouselPaused(true)}
                        onMouseLeave={() => setIsCarouselPaused(false)}
                        // ADDED: Perspective for 3D flip effect
                        className="relative h-[250px] lg:h-auto min-h-[300px] w-full rounded-xl overflow-hidden bg-black lg:col-span-1 group/carousel perspective-[1000px]"
                      >
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImgIdx}
                                // UPDATED ANIMATIONS: 3D Flip (Match Pt1)
                                initial={{ rotateX: -90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                exit={{ rotateX: 90, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "backOut" }}
                                style={{ transformStyle: "preserve-3d" }}
                                className="absolute inset-0"
                            >
                                <Image
                                src={hobby.images[currentImgIdx]}
                                alt={hobby.title}
                                fill
                                className={`object-cover ${hobby.align}`}
                                />
                                <div className="absolute inset-0 bg-lime-900/10 mix-blend-multiply pointer-events-none" />
                            </motion.div>
                         </AnimatePresence>

                         {/* CONTROLS: Vertical Pill Sidebar */}
                         {hobby.images.length > 1 && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                                {hobby.images.map((_, idx) => (
                                    <MagneticPill key={idx} strength={0.3}>
                                        <button 
                                            onClick={(e) => handleManualSlideChange(e, idx)}
                                            className={`
                                                w-3 rounded-full transition-all duration-300 
                                                border border-lime-100/20 backdrop-blur-sm shadow-lg
                                                ${idx === currentImgIdx 
                                                    ? "h-12 bg-lime-200 opacity-100" 
                                                    : "h-3 bg-lime-900/50 hover:bg-lime-200/50"
                                                }
                                            `}
                                            aria-label={`Go to image ${idx + 1}`}
                                        />
                                    </MagneticPill>
                                ))}
                            </div>
                         )}
                      </motion.div>

                      {/* --- RIGHT: DETAILS (2/3 Width) --- */}
                      <div className="flex flex-col justify-start py-2 lg:col-span-2">
                          
                          {/* KEYWORD PILLS */}
                          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
                            {hobby.keywords.map((kw, i) => (
                                <MagneticPill key={i} strength={0.3}>
                                    <button 
                                        onClick={() => setActiveModal({ title: kw.title, content: kw.content })}
                                        className="outline-none"
                                    >
                                        <BoxedHeader
                                            text={kw.label}
                                            fillColor="bg-lime-900"
                                            hoverTextColor="group-hover:text-lime-100"
                                            className="bg-lime-900/10 border border-lime-900/20 px-4 py-2 rounded-full text-xs font-bold text-lime-900 uppercase"
                                        />
                                    </button>
                                </MagneticPill>
                            ))}
                          </motion.div>

                          {/* DESCRIPTION */}
                          <motion.p 
                            variants={itemVariants} 
                            className="text-lg md:text-xl text-lime-950 font-medium leading-relaxed max-w-2xl"
                          >
                            {hobby.desc}
                          </motion.p>
                          
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* --- POPUP MODAL --- */}
      <AnimatePresence>
        {activeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 backdrop-blur-sm z-[100]"
            />
            
            <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4">
                <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-stone-50 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl pointer-events-auto"
                >
                    <div className="bg-lime-900 p-6 flex items-center justify-between">
                        <h3 className="text-lime-200 font-mono text-lg font-bold uppercase tracking-widest">
                            {activeModal.title}
                        </h3>
                        <button 
                            onClick={() => setActiveModal(null)}
                            className="text-lime-200 hover:text-white transition-colors"
                        >
                            <X />
                        </button>
                    </div>
                    <div className="p-8">
                        <p className="text-lime-950 text-lg leading-relaxed">
                            {activeModal.content}
                        </p>
                        <div className="mt-8 flex justify-end">
                             <MagneticPill strength={0.3}>
                                <button 
                                    onClick={() => setActiveModal(null)}
                                    className="px-6 py-2 bg-lime-200 text-lime-900 font-bold uppercase text-xs tracking-widest rounded-full hover:bg-lime-300 transition-colors"
                                >
                                    Close
                                </button>
                             </MagneticPill>
                        </div>
                    </div>
                </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}