"use client";

import { useEffect, useState, useRef } from "react";

export default function TwinklingGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [squares, setSquares] = useState<
    { id: number; x: number; y: number; duration: number; delay: number }[]
  >([]);

  useEffect(() => {
    const squareCount = 100;

    const generateSquares = () => {
      const cols = Math.floor(window.innerWidth / 40);
      const rows = Math.floor((window.innerHeight * 2) / 40); 

      return Array.from({ length: squareCount }).map((_, i) => ({
        id: i,
        x: Math.floor(Math.random() * cols) * 40,
        y: Math.floor(Math.random() * rows) * 40,
        duration: Math.random() * 5 + 3,
        delay: Math.random() * -10,
      }));
    };

    setSquares(generateSquares());
  }, []);

  useEffect(() => {
    let requestAnimationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const maxScroll = documentHeight - windowHeight;

      if (maxScroll <= 0) return;

      const scrollPercentage = Math.max(0, Math.min(scrollY / maxScroll, 1));
      const moveDistance = scrollPercentage * windowHeight;

      containerRef.current.style.transform = `translate3d(0, -${moveDistance}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-50 h-[200vh] w-screen bg-white overflow-hidden pointer-events-none will-change-transform"
    >
      
      <style jsx>{`
        @keyframes soft-pulse {
          0% { opacity: 0; }
          20% { opacity: 0; }
          50% { opacity: 0.4; }
          80% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>

      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {squares.map((sq) => (
          <rect
            key={sq.id}
            width="39"
            height="39"
            x={sq.x + 1}
            y={sq.y + 1}
            fill="#18181b"
            style={{
              animationName: 'soft-pulse',
              animationDuration: `${sq.duration}s`,
              animationDelay: `${sq.delay}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
              opacity: 0,
              willChange: 'opacity'
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-60" />
    </div>
  );
}