"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HackerText from "./HackerText"; 

export default function Navbar() {
  // 1. State to track position
  const [isPastIntro, setIsPastIntro] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 2. Logic: If we scroll past the window height (the Intro), toggle state
      const threshold = window.innerHeight - 80; // Buffer for smooth transition
      setIsPastIntro(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to check initial position
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`
        fixed top-0 left-0 z-50 w-full px-6 pt-6 pointer-events-none transition-all duration-300
        ${isPastIntro ? "mix-blend-difference" : ""} 
      `}
    >
      {/* LOGIC EXPLAINED:
         1. Inside Intro (!isPastIntro):
            - No Blend Mode.
            - Text is White.
            - Result: Pure White text on top of your photo.
         
         2. Past Intro (isPastIntro):
            - mix-blend-difference is applied.
            - Text is White.
            - Background is White (Body).
            - Result: White - White = BLACK text.
      */}

      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">

        {/* LEFT LINK */}
        <Link 
          href="/" 
          className={`
            pointer-events-auto font-extrabold text-xl tracking-tighter text-white transition-all
          `}
        >
            <HackerText 
              text="[Toby Chen]" 
              triggerOnMount={false} 
              triggerOnHover={true} 
              speed={30}
              className="block" 
            />
        </Link>

        {/* RIGHT LINK */}
        <Link 
            href="/contact"
            className={`
              pointer-events-auto font-extrabold text-xl tracking-tighter text-white transition-all
            `}
        >
            <HackerText 
              text="[Contact Me]" 
              triggerOnMount={false} 
              triggerOnHover={true} 
              speed={30}
              direction="rtl"
              className="block" 
            />
        </Link>

      </div>
    </div>
  );
}