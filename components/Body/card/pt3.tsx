import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Trees, Leaf, Microscope, Map, Terminal, Baby } from "lucide-react";
import NatureText from "@/components/HackerText";
import MagneticPill from "@/components/MagneticPill";
import HackerHeader from "@/components/HackerHeader";

const PATH_POINTS = [
  { x: 20, y: 0 }, // Start Center
  { x: 10, y: 400 }, // Curve Left (Exp 1)
  { x: 30, y: 900 }, // Curve Right (Edu 1)
  { x: 5, y: 1500 }, // Curve Left (Exp 2)
  { x: 20, y: 2100 }, // Curve Right (Edu 2)
  { x: 50, y: 3000 },
];

const DATA = [
  {
    id: "START",
    title: "I AM BORN",
    subtitle: "2004",
    icon: Baby,
    desc: "I am born in the UK, Lymington. Growing up in a small seaside town I got my hands on old, crap desktops and began to code.",
    tags: ["CHINESE", "ENGLISH"],
    pointIndex: 0,
  },
  {
    id: "EXP_01",
    title: "FREELANCE DEV",
    subtitle: "FullStack Engineering",
    icon: Trees,
    desc: "Architecting bespoke digital ecosystems using Next.js 14 and Server Components.",
    tags: ["REACT", "TAILWIND"],
    pointIndex: 1,
    align: "left",
  },
  {
    id: "EDU_01",
    title: "BSC MATHEMATICS",
    subtitle: "Queen Mary University",
    icon: Microscope,
    desc: "Specializing in Group Theory and finding order within chaotic systems.",
    tags: ["LOGIC", "CHAOS_THEORY"],
    pointIndex: 2,
    align: "right",
  },
  {
    id: "EXP_02",
    title: "DATA ENGINEER",
    subtitle: "DataAnnotation",
    icon: Leaf,
    desc: "Training RLHF models to improve LLM accuracy and safety protocols.",
    tags: ["PYTHON", "AI/ML"],
    pointIndex: 3,
    align: "left",
  },
  {
    id: "EDU_02",
    title: "PHYSICS CERT",
    subtitle: "Heriot-Watt Uni",
    icon: Map,
    desc: "Foundational mechanics and computational modeling of physical laws.",
    tags: ["PHYSICS", "CALCULUS"],
    pointIndex: 4,
    align: "right",
  },
];

export default function Pt3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 100, height: 800 });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the raw scroll for the "Camera" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  const xInputRange = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const xOutputRange = PATH_POINTS.map((p) => 50 - p.x + "vw"); // Force center

  // 2. Calculate Shift in Y (Pan Up/Down)
  // We want the current point to be roughly in the middle of the screen height
  const yInputRange = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const yOutputRange = PATH_POINTS.map((p) => `calc(50vh - ${p.y}px)`);

  const cameraX = useTransform(smoothProgress, xInputRange, xOutputRange);
  const cameraY = useTransform(smoothProgress, yInputRange, yOutputRange);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-screen w-screen ml-[calc(50%-50vw)] overflow-hidden flex flex-col items-center justify-center">
        <motion.div
          style={{ x: cameraX, y: cameraY }}
          className="absolute top-0 left-0 w-full"
        >
          {/* 1. The SVG Line */}
          <SvgPath dimensions={dimensions} progress={smoothProgress} />

          {/* 2. The Nodes (Cards) */}
          {DATA.map((item) => (
            <Node key={item.id} item={item} dimensions={dimensions} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function SvgPath({
  dimensions,
  progress,
}: {
  dimensions: { width: number };
  progress: any;
}) {
  // Generate SVG path string dynamically based on window width
  // We convert % X coordinates to pixels for the SVG path
  const w = dimensions.width;

  // Construct Path command: M start Q cp1 end ...
  // Using simple logic: Current Point to Next Point via a control point
  const d = PATH_POINTS.reduce((acc, point, i, arr) => {
    const px = (point.x / 100) * w;
    const py = point.y;

    if (i === 0) return `M ${px} ${py}`;

    // Simple smoothing: Control point is halfway in Y, but aligned with previous X
    const prev = arr[i - 1];
    const prevPx = (prev.x / 100) * w;
    const prevPy = prev.y;

    const cpY = prevPy + (py - prevPy) / 2;

    return `${acc} C ${prevPx} ${cpY}, ${px} ${cpY}, ${px} ${py}`;
  }, "");

  return (
    <svg className="absolute top-0 left-0 overflow-visible w-full h-[3000px] pointer-events-none">
      {/* Active "Growth" Line */}
      <motion.path
        d={d}
        stroke="#84CC16"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}

function Node({
  item,
  dimensions,
}: {
  item: any;
  dimensions: { width: number };
}) {
  const px = (PATH_POINTS[item.pointIndex].x / 100) * dimensions.width;
  const py = PATH_POINTS[item.pointIndex].y;
  const Icon = item.icon;

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{
        left: px,
        top: py,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      <motion.div
        viewport={{ margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.5 }}
        className={`
                    relative bg-lime-200
                    rounded-2xl p-6 transition-all group
                `}
      >
        <div className="mb-4 flex flex-row w-full justify-between">
          <MagneticPill className="text-lime-200 bg-lime-600 px-2 py-1 rounded-l-3xl rounded-r-xl mr-4">
            <Icon size={25} />
          </MagneticPill>

          <HackerHeader
            text={item.subtitle}
            lineSide="left"
            className="w-full text-stone-50"
          />
        </div>
        <MagneticPill>
          <p className="text-3xl font-black text-lime-950 uppercase leading-none mb-2">
            <NatureText text={item.title} />
          </p>
        </MagneticPill>
        <p className="text-base mb-6">{item.desc}</p>

        {item.tags && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag: string) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-[9px] font-mono font-bold bg-lime-50 text-lime-700 px-2 py-1 rounded-md"
              >
                <Terminal size={8} /> {tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
