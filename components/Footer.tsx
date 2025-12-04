import Link from 'next/link';
import HackerText from '@/components/HackerText';
import { motion, useAnimation } from "framer-motion";
import { useEffect } from 'react';
import CustomDiv from './CustomDiv';
import Dots from '@/components/Dots'

interface CardProps {
  isFooterActive: boolean;
}

export default function Footer({isFooterActive} : CardProps) {
  const currentYear = new Date().getFullYear();
  const controls = useAnimation();
  
  const cardVariants = {
      hidden: { y: 100},
      visible: { y: 0, transition: { duration: 0.6 }},
  };
  
  useEffect(() => {
      if (isFooterActive) {
      controls.start("visible");
      } else {
      controls.start("hidden");
      }
  }, [isFooterActive, controls]);

  return (
    <motion.div initial="hidden" animate={controls} variants={cardVariants}>
      <div className="w-full top-0 left-0 z-10">
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none" 
          className="w-full h-[30px] md:h-[50px] fill-zinc-900 block overflow-visible"
        >
          <use href="#fixed-convex"/> 
        </svg>
      </div>
      <footer className="w-full px-4 md:px-8 lg:px-16 py-20 md:py-36 items-center justify-center relative z-10 bg-zinc-900">
        <CustomDiv
          label="< Footer />"
          lineColor='bg-zinc-100'
          textColor='text-zinc-100'
        />
        <Dots/>

        {/* --- MAIN GRID CONTAINER --- */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-0 items-start tracking-wider relative z-10">
          
          {/* 1. Logo/Copyright Info: Left Aligned */}
          <div className="flex flex-col items-start space-y-3">
            <p className="text-zinc-400 text-xs tracking-widest font-mono block mb-1">
              {`// WEBSITE_END`}
            </p>
            <Link href="/" className="pointer-events-auto text-xl font-bold tracking-tighter text-white transition-all">
              <HackerText 
                text={`[TOBY CHEN]`}
                triggerOnMount={false} 
                triggerOnHover={true} 
                speed={30}
                className="block" 
              />
            </Link>
            <p className="text-sm font-medium text-zinc-100">
              &copy; {currentYear} ALL RIGHTS RESERVED.
            </p>
            
            <p className="text-[10px] md:text-xs text-zinc-100 tracking-normal">
              BUILT WITH NEXT.JS & LOVE.
            </p>
          </div>
          <div className="text-right md:text-center flex flex-col space-y-2 pt-1 font-mono text-base tracking-normal lg:border-l border-zinc-600 lg:items-center">
              <span className="text-zinc-400 text-xs tracking-widest block mb-1">
                {`// GET_IN_TOUCH`}
              </span>
              <p className="text-white font-extrabold text-lg tracking-tighter">
                  ALWAYS OPEN TO COLLABORATE.
              </p>
              <p className="text-zinc-100 text-xs md:text-sm font-medium tracking-normal">
                  SEE MY{' '} 
                  <Link 
                      href="/contact"
                      className="inline-block align-baseline text-white hover:text-blue-600 transition-colors"
                  >
                      <HackerText 
                          text={`[CONTACT PAGE]`} 
                          triggerOnMount={false} 
                          triggerOnHover={true} 
                          speed={30} 
                          className="text-xs md:text-sm"
                      />
                  </Link> 
                  {' '}FOR DETAILS.
              </p>
              <a href="mailto:toby.chen1337@outlook.com" className="block mt-2">
                <HackerText 
                    text={`[TOBY.CHEN1337@OUTLOOK.COM]`} 
                    triggerOnMount={false} 
                    triggerOnHover={true} 
                    speed={30} 
                    className="text-xs md:text-sm font-bold text-zinc-100 hover:text-blue-600 transition duration-300 underline underline-offset-4 break-all"
                />
              </a>
          </div>
          <div className="text-md flex flex-col space-y-2 font-mono lg:items-end lg:border-l border-zinc-600 lg:pl-20 font-bold">
            <span className="text-zinc-400 text-xs mb-1 font-mono tracking-widest block">
              {`// SOCIALS`}
            </span>
            
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="text-zinc-100 hover:text-blue-600  transition duration-300 text-sm">
              <HackerText 
                  text="[GITHUB]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>

            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition text-zinc-100 duration-300 text-sm">
              <HackerText 
                  text="[LINKEDIN]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>

            <a href="https://x.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-zinc-100 hover:text-blue-600  transition duration-300 text-sm">
              <HackerText 
                  text="[SUBSTACK]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>

            <a href="https://x.com/your-handle" target="_blank" rel="noopener noreferrer" className="text-zinc-100 hover:text-blue-600 transition duration-300 text-sm">
              <HackerText 
                  text="[INSTAGRAM]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>
          </div> 
        </div>
      </footer>
    </motion.div>
  );
}