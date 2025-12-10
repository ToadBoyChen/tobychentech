import HackerText from "@/components/HackerText";
import Link from "next/link";

export default function TOC() {
  const navItems = [
    { id: "01", label: "About Me", href: "#about" },
    { id: "02", label: "Some Facts", href: "#facts" },
    { id: "03", label: "Selected Work", href: "#projects" },
    { id: "04", label: "Services I Offer", href: "#services" },
  ];

  return (
    <div className="w-full">
      <div className="w-full flex items-end justify-between mb-4 md:mb-8 text-[10px] md:text-xs font-mono text-stone-300 uppercase tracking-wider">
        
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-lime-300 rounded-full shrink-0" />
          <p>Table of Contents</p> 
        </div>

        <Link 
          href="https://www.martinbenniephotography.com/"
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-right hover:text-white transition-colors"
        >
          <HackerText 
            text="Photo by Martin Bennie"
            triggerOnMount={false} 
            triggerOnHover={true} 
            speed={40}
            className="block" 
          />
        </Link>
      </div>

      <nav className="flex flex-col border-t border-stone-600">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="group flex items-center justify-between py-4 border-b border-stone-700 hover:border-stone-200 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-baseline gap-2 md:gap-8">
              <span className="font-mono text-xs md:text-sm text-stone-600 font-normal group-hover:text-lime-300 transition-colors shrink-0">
                {item.id}
              </span>
              <span className="text-lg md:text-xl lg:text-2xl font-medium text-zinc-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                {item.label}
              </span>
            </div>
            <span className="text-white text-lg md:text-2xl opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0">
              →
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}