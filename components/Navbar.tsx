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
      className={`fixed max-w-3/4 top-0 left-1/2 -translate-x-1/2 z-50 w-full pointer-events-none transition-all duration-300 pt-5 md:pt-8 ${isPastIntro ? "mix-blend-difference" : ""} 
      `}
    >
      <div className="w-full flex items-center justify-between">
        
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