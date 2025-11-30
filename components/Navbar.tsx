import Link from "next/link";
import HackerText from "./HackerText";

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 flex justify-between items-center w-2/3 max-w-6xl z-50">
      
      {/* 1. Logo */}
      <Link href="/" className="font-bold text-xl tracking-tighter">
        <HackerText 
          text="Toby Chen" 
          triggerOnMount={false} 
          triggerOnHover={true} 
          speed={15}
        />
      </Link>
      
      {/* 2. The Contact Button */}
      <Link 
        href="/contact"
        className="
          bg-foreground text-background font-medium 
          px-5 py-2.5 rounded-full 
          hover:opacity-90 transition-opacity
          text-sm
        "
      >
        Contact Me
      </Link>

    </div>
  );
}