"use client";
import { useEffect, useState } from "react";

export default function CodeTerminal() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const fullText1 = "def solve_complexity(problem):";
  const fullText2 = "    if problem.is_hard():";
  const fullText3 = "        return find_elegant_solution()";

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    fullText1.split("").forEach((char, i) => {
      timeouts.push(setTimeout(() => setLine1(prev => prev + char), i * 50));
    });

    const delay2 = fullText1.length * 50 + 500;
    fullText2.split("").forEach((char, i) => {
      timeouts.push(setTimeout(() => setLine2(prev => prev + char), delay2 + i * 50));
    });

    const delay3 = delay2 + fullText2.length * 50 + 500;
    fullText3.split("").forEach((char, i) => {
      timeouts.push(setTimeout(() => setLine3(prev => prev + char), delay3 + i * 50));
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    // Removed 'group' class as it's no longer needed
    <div className="relative w-full max-w-lg mx-auto">
        
      {/* Removed the glow effect div that was here */}
      
      <div className="relative w-full bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
        
        <div className="flex items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <div className="ml-auto text-xs text-zinc-500 font-mono">solver.py</div>
        </div>

        <div className="p-6 font-mono text-sm md:text-base leading-relaxed overflow-hidden">
          
          <div className="text-purple-400">
            {line1}<span className="animate-pulse text-zinc-500">|</span>
          </div>
          
          <div className="text-blue-400 pl-4">
            {line1.length === fullText1.length && (
              <>{line2}<span className="animate-pulse text-zinc-500">|</span></>
            )}
          </div>
          
          <div className="text-green-400 pl-8">
            {line2.length === fullText2.length && (
              <>{line3}<span className="animate-pulse text-zinc-500">|</span></>
            )}
          </div>

          <div className="mt-4 text-zinc-700 select-none">
            <p># Optimization complete</p>
            <p># Execution time: 0.04ms</p>
          </div>

        </div>
      </div>
    </div>
  );
}