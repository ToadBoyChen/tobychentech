import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Sprout,
  Trees,
  Leaf,
  Microscope,
  Map,
  Binary,
  Terminal,
  Activity,
} from "lucide-react";
import BoxedHeader from "@/components/BoxedHeader";
import NatureText from "@/components/HackerText";
import MagneticPill from "@/components/MagneticPill";

// --- CONFIGURATION ---
// The path logic: X is % of screen width (0-100), Y is 'units' down.
const PATH_POINTS = [
  { x: 50, y: 0 }, // Start Center
  { x: 20, y: 400 }, // Curve Left (Exp 1)
  { x: 80, y: 900 }, // Curve Right (Edu 1)
  { x: 30, y: 1500 }, // Curve Left (Exp 2)
  { x: 60, y: 2100 }, // Curve Right (Edu 2)
  { x: 50, y: 2600 }, // End Center
];

const DATA = [
  {
    id: "START",
    title: "INIT_SEQUENCE",
    subtitle: "2022_PRES",
    icon: Binary,
    desc: "Origin of the system.",
    pointIndex: 0, // Corresponds to PATH_POINTS[0]
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

  // --- CAMERA LOGIC ---
  // We map the scroll progress (0 to 1) to specific coordinates (X, Y)
  // To "follow" the line, we move the WORLD in the opposite direction of the point.

  // 1. Calculate Shift in X (Pan Left/Right)
  // If point is at 20vw, we want to shift the world so 20vw is at center (50vw). Shift = 50 - 20 = +30vw
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
      {/* FIX APPLIED: 
        Changed 'w-full' to 'w-screen' and added 'ml-[calc(50%-50vw)]'
        This forces the sticky container to break out of any parent padding 
        and span the full viewport width, preventing premature clipping.
      */}
      <div className="sticky top-0 h-screen w-screen ml-[calc(50%-50vw)] overflow-hidden flex flex-col items-center justify-center">
        {/* --- THE MOVABLE WORLD --- */}
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
      {/* Background "Track" Line */}
      <path
        d={d}
        stroke="#E7E5E4"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
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
                    relative w-[300px] md:w-[400px] bg-lime-200
                    rounded-2xl p-6 transition-all group
                    shadow-xl
                `}
      >
        <div className="mb-4 flex flex-row items-center justify-between">
          <MagneticPill className="flex flex-row justify-between w-full text-lime-800 rounded-tl-3xl rounded-br-3xl p-3 rounded-xl group-hover:bg-lime-900 group-hover:text-lime-300 transition-colors">
            <Icon size={20} />
          </MagneticPill>

          <MagneticPill className="flex flex-row justify-between w-full text-lime-800 rounded-tr-3xl rounded-bl-3xl p-3 rounded-xl group-hover:bg-lime-900 group-hover:text-lime-300 transition-colors">
            <p className="text-xs font-bold tracking-widest">{item.subtitle}</p>
          </MagneticPill>
        </div>
        <h3 className="text-2xl font-black text-lime-950 uppercase leading-none mb-2">
          <NatureText text={item.title} />
        </h3>

        <p className="text-sm text-stone-600 leading-relaxed mb-4">
          {item.desc}
        </p>

        {item.tags && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
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