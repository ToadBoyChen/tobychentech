import { AnimatePresence, motion } from "framer-motion";
import { Plus, Hash, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Hike from "@/public/hike.jpeg";
import Kew from "@/public/kewfinger.jpg";
import Me from "@/public/me.jpg";
import Image from "next/image";
import { useCursor } from "@/context/CursorContext";
import MagneticPill from "@/components/MagneticPill";
import BoxedHeader from "@/components/BoxedHeader";
import HackerText from "@/components/HackerText";

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
        content:
          "The study of symmetry operations. From molecular chemistry to cryptography, group theory allows us to map complex systems into predictable algebraic structures.",
      },
      {
        label: "TOPOLOGY",
        title: "Topology",
        content:
          "Understanding space through continuous deformation. It teaches that the specific shape matters less than the fundamental connectivity of the system.",
      },
    ],
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
        content:
          "Deploying low-power LoRaWAN sensor networks to monitor soil moisture and canopy density in real-time without disturbing local wildlife.",
      },
      {
        label: "DRONE_MAPPING",
        title: "LIDAR Drone Mapping",
        content:
          "Utilizing autonomous drones to create 3D point clouds of forest structures, enabling precise calculation of biomass and carbon sequestration.",
      },
    ],
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
        content:
          "Mastering the art of async communication. When working across 3 timezones, documentation and clear handoffs become more valuable than raw code.",
      },
    ],
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
        content:
          "The mental state in sparring is identical to debugging a race condition. Total immersion, pattern recognition, and rapid reaction to changing inputs.",
      },
      {
        label: "DISCIPLINE",
        title: "Iterative Improvement",
        content:
          "Martial arts is the physical manifestation of the Kaizen philosophy. 1% better every day, compounding over years.",
      },
    ],
  },
];

interface ModalContent {
  title: string;
  content: string;
  label?: string;
}

const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
};

export default function Pt2() {
  const [activeHobby, setActiveHobby] = useState<string | null>("01");
  const [activeModal, setActiveModal] = useState<ModalContent | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModal(null);
    };
    if (activeModal) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  useEffect(() => {
    if (!activeHobby || isCarouselPaused) return;
    const currentHobbyData = HOBBIES.find((h) => h.id === activeHobby);
    if (!currentHobbyData || currentHobbyData.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % currentHobbyData.images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeHobby, isCarouselPaused]);

  const handleCardClick = (
    e: React.MouseEvent,
    id: string,
    currentlyActive: boolean
  ) => {
    const nextState = currentlyActive ? null : id;
    setActiveHobby(nextState);
    setCurrentImgIdx(0);
    setIsCarouselPaused(false);
    if (nextState) resetCursor();
    else setCursor("EXPAND", "text");
  };

  const handleMouseEnter = (isActive: boolean) => {
    if (!isActive) setCursor("EXPAND", "text");
    else resetCursor();
  };

  const stopCursor = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetCursor();
  };

  const restoreCursor = (e: React.MouseEvent, isActive: boolean) => {
    e.stopPropagation();
    if (!isActive) setCursor("EXPAND", "text");
    else resetCursor();
  };

  const handleManualSlideChange = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImgIdx(index);
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
                relative cursor-pointer overflow-hidden rounded-tl-[60px] rounded-br-[60px] rounded-xl transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                ${
                  isActive
                    ? "bg-lime-200 rounded-tr-[60px] rounded-bl-[60px] rounded-tl-xl rounded-br-xl"
                    : "bg-lime-900"
                }
              `}
            >
              <div className="flex items-center justify-between p-8 transition-all">
                <div className="flex items-center gap-6 md:gap-12">
                  <div
                    onMouseEnter={stopCursor}
                    onMouseLeave={(e) => restoreCursor(e, isActive)}
                  >
                    <span className="font-mono text-xl tracking-widest text-lime-500">
                      {hobby.id}
                    </span>
                  </div>
                  <h3
                    className={`text-5xl font-black uppercase tracking-tighter transition-colors duration-300 ${
                      isActive ? "text-lime-800" : "text-stone-50"
                    }`}
                  >
                    <HackerText text={hobby.title} />
                  </h3>
                </div>
                <div
                  onMouseEnter={stopCursor}
                  onMouseLeave={(e) => restoreCursor(e, isActive)}
                >
                  <MagneticPill strength={0.3}>
                    <div
                      className={`p-3 rounded-full transition-all duration-500 ${
                        isActive ? "rotate-135 bg-lime-900" : "rotate-0"
                      }`}
                    >
                      <Plus className="text-lime-200" />
                    </div>
                  </MagneticPill>
                </div>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      onMouseEnter={stopCursor}
                      onMouseLeave={(e) => restoreCursor(e, isActive)}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-8 pt-0 cursor-default"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* --- UPDATED CAROUSEL ANIMATION --- */}
                      <motion.div
                        variants={itemVariants}
                        onMouseEnter={() => setIsCarouselPaused(true)}
                        onMouseLeave={() => setIsCarouselPaused(false)}
                        className="relative h-[250px] lg:h-auto min-h-[300px] w-full rounded-xl overflow-hidden sm:col-span-1"
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImgIdx}
                            initial={{
                              opacity: 0,
                              scale: 1.1,
                              filter: "blur(12px)",
                              x: 10,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              filter: "blur(0px)",
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.95,
                              filter: "blur(12px)",
                              x: -20,
                            }}
                            transition={{
                              duration: 0.8,
                              ease: [0.22, 1, 0.36, 1],
                            }}
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

                        {hobby.images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row gap-2 z-10">
                            {hobby.images.map((_, idx) => (
                              <MagneticPill key={idx} strength={0.3}>
                                <button
                                  onClick={(e) =>
                                    handleManualSlideChange(e, idx)
                                  }
                                  className={`w-7 h-5 rounded-lg hover:bg-yellow-500 transition-all duration-300 cursor-pointer 
                                            ${
                                              idx === currentImgIdx
                                                ? "w-14 bg-lime-900"
                                                : "bg-lime-500"
                                            }
                                            ${idx === 0 ? "rounded-l-[60px] rounded-r-3xl" : ""}
                                            ${idx === hobby.images.length - 1 ? "rounded-r-[60px] rounded-l-3xl" : ""}
                                          `}
                                />
                              </MagneticPill>
                            ))}
                          </div>
                        )}
                      </motion.div>

                      <div className="flex flex-col justify-start py-2 sm:col-span-2">
                        <motion.div
                          variants={itemVariants}
                          className="flex flex-row flex-wrap justify-start gap-3 mb-6"
                        >
                          {hobby.keywords.map((kw, i) => (
                            <MagneticPill key={i} strength={0.3}>
                              <button
                                onClick={() =>
                                  setActiveModal({
                                    title: kw.title,
                                    content: kw.content,
                                    label: kw.label,
                                  })
                                }
                                className="outline-none"
                              >
                                <BoxedHeader
                                  text={kw.label}
                                  fillColor="bg-lime-700"
                                  hoverTextColor="group-hover:text-lime-100"
                                  className="bg-lime-300 px-4 py-2 rounded-full text-xs uppercase"
                                />
                              </button>
                            </MagneticPill>
                          ))}
                        </motion.div>
                        <motion.p
                          variants={itemVariants}
                          className="text-lg md:text-xl text-lime-900 leading-relaxed max-w-prose"
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

      <Portal>
        <AnimatePresence>
          {activeModal && (
            <div className="fixed inset-0 z-9999 flex items-center justify-center isolate">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="absolute inset-0 bg-stone-950/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="relative w-full max-w-lg mx-4 overflow-hidden rounded-3xl bg-lime-100 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                <div className="h-4 w-full bg-lime-500" />
                <div className="p-10">
                  <div className="flex items-start justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-lime-600">
                        <Hash className="w-3 h-3" />
                        <span className="font-mono text-xs font-bold tracking-widest uppercase">
                          {activeModal.label || "KEYWORD"}
                        </span>
                      </div>
                      <h3 className="text-4xl font-extrabold text-lime-900">
                        {activeModal.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-lg">{activeModal.content}</p>
                  <div className="mt-10 flex justify-end">
                    <MagneticPill>
                      <button
                        onClick={() => setActiveModal(null)}
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-lime-600 hover:text-lime-900 transition-colors"
                      >
                        <span>Dismiss</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </MagneticPill>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Portal>
    </>
  );
}
