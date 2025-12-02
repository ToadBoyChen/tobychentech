import Link from 'next/link';
import HackerText from '@/components/HackerText';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="footer" 
      className="w-full px-16 py-36 items-center justify-center relative z-10 bg-black"
      style={{ clipPath: "url(#organic-footer)" }}
    >
        <div className="flex items-center gap-6 mb-16">
          <div className="h-px bg-zinc-100 flex-1" />
            <span className="font-mono text-sm text-zinc-100 uppercase tracking-widest">
              06 // FOOTER_LOADED
            </span>
          <div className="h-px bg-zinc-100 flex-1" />
      </div>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-lg font-mono tracking-wider relative z-10">

        <div className="flex flex-col items-center md:items-start space-y-3 mb-8 md:mb-0">
          <Link href="/" className="pointer-events-auto text-xl font-bold tracking-tighter text-white transition-all">
            <HackerText 
              text={`[TOBY CHEN]`}
              triggerOnMount={false} 
              triggerOnHover={true} 
              speed={30}
              className="block" 
            />
          </Link>
          <p className="text-sm font-medium text-white/70">
            &copy; {currentYear} ALL RIGHTS RESERVED.
          </p>
          
          <p className="text-xs text-white/50 tracking-normal">
            BUILT WITH NEXT.JS & TAILWIND CSS.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 text-xl font-extrabold uppercase">
          
          <div className="flex flex-col space-y-2 pt-1 font-mono text-base tracking-normal">
            <span className="text-white/50 text-xs tracking-widest block mb-1">
              {`// GET_IN_TOUCH`}
            </span>
            <p className="text-white font-extrabold text-lg tracking-tighter">
                ALWAYS OPEN TO COLLABORATE.
            </p>
            <p className="text-white/70 text-sm font-medium tracking-normal">
                SEE MY{' '} 
                <Link 
                    href="/contact"
                    className="inline-block align-baseline text-white hover:text-cyan-300 transition-colors"
                >
                    <HackerText 
                        text={`[CONTACT PAGE]`} 
                        triggerOnMount={false} 
                        triggerOnHover={true} 
                        speed={30} 
                        className="text-sm font-extrabold"
                    />
                </Link> 
                {' '}FOR DETAILS.
            </p>
            <Link href="/contact" className="text-sm font-bold text-cyan-300 hover:text-cyan-100 transition duration-300 underline underline-offset-4">
                [Toby.chen1337@outlook.com]
            </Link>
          </div>
          
          <div className="flex flex-col space-y-2 text-base font-medium uppercase mt-4 sm:mt-0 sm:space-x-0 sm:pl-8 md:pl-10 md:border-l md:border-white/20">
            <span className="text-white/50 text-xs font-mono mb-1 tracking-widest hidden md:block">
              {`// SOCIALS`}
            </span>
            
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300">
              <HackerText 
                  text="[GITHUB]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>

            <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300">
              <HackerText 
                  text="[LINKEDIN]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>

            <a href="https://x.com/your-handle" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300">
              <HackerText 
                  text="[SUBSTACK]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>

            <a href="https://x.com/your-handle" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300">
              <HackerText 
                  text="[INSTAGRAM]" 
                  triggerOnMount={false} 
                  triggerOnHover={true} 
                  speed={30}
              />
            </a>
          </div>
        </div> 
      </div>
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0">
          <svg 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              className="relative block w-full h-[50px] fill-white" 
          >
              <use href="#fixed-concave" /> 
          </svg>
      </div>
    </footer>
  );
}