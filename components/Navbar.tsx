"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HackerText from "./HackerText"; 

export default function Navbar() {
  const [isPastIntro, setIsPastIntro] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight - 80;
      setIsPastIntro(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
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

      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
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
        <Link 
            href="/contact?source=navbar"
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