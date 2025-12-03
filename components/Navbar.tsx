"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HackerText from "./HackerText";

export default function Navbar() {
  const [isPastIntro, setIsPastIntro] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Adjusted threshold slightly for better mobile feel
      const threshold = window.innerHeight - 100;
      setIsPastIntro(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 z-50 w-full 
        pointer-events-none transition-all duration-300
        
        /* RESPONSIVE PADDING */
        px-4 pt-4 
        md:px-8 md:pt-8
        
        /* BLEND MODE */
        ${isPastIntro ? "mix-blend-difference" : ""} 
      `}
    >
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        
        {/* LOGO / HOME LINK */}
        <Link 
          href="/" 
          className={`
            pointer-events-auto font-extrabold tracking-tighter text-white transition-all
            
            /* RESPONSIVE FONT SIZE */
            text-2xl md:text-3xl
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
              pointer-events-auto font-extrabold tracking-tighter text-white transition-all
              
              /* RESPONSIVE FONT SIZE */
              text-2xl md:text-3xl
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
    </nav>
  );
}