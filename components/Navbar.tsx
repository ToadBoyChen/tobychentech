"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import HackerText from "./HackerText";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 w-full px-6 pt-6 pointer-events-none transition-all duration-300">
      
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">

        <Link 
          href="/" 
          className={`
            pointer-events-auto font-extrabold text-xl tracking-tighter transition-colors duration-500
            ${isScrolled ? "text-zinc-900" : "text-white drop-shadow-md"}
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
            href="/contact"
            className={` pointer-events-auto font-extrabold text-xl tracking-tighter transition-colors duration-500
              ${isScrolled 
                ? "text-black"
                : "text-white" 
              }
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