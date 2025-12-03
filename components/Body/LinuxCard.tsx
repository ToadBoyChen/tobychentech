import Image from "next/image";
import HackerHeader from "../HackerHeader";
// import T480 from "@/public/t480.jpg"; 

const SYSTEM_STATS = [
  { label: "OS", value: "Arch Linux x86_64", color: "text-sky-400" },
  { label: "HOST", value: "ThinkPad T480", color: "text-red-500" },
  { label: "KERNEL", value: "6.6.7-arch1-1", color: "text-lime-400" },
  { label: "UPTIME", value: "99.9%", color: "text-yellow-400" },
];

export default function LinuxCard() {
  return (
    <div>
      <HackerHeader
        text="02 01 02 // PASSIONATE ARCH + T480 GUY"
        lineSide="left"
        className="text-stone-50 my-4"
        lineColor="bg-stone-50"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 group/card">
        
        <div className="lg:col-span-3 flex flex-col justify-between">
          <div className="relative">
            
            {/* THE CORRECT ARCH LOGO (Detailed Version) */}
            <svg
              className="float-left w-24 h-24 mr-3 text-lime-200"
              viewBox="0 0 512 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 72c-14 35-23 57-39 91 10 11 22 23 41 36-21-8-35-17-45-26-21 43-53 103-117 220 50-30 90-48 127-55-2-7-3-14-3-22v-1c1-33 18-58 38-56 20 1 36 29 35 62l-2 17c36 7 75 26 125 54l-27-50c-13-10-27-23-55-38 19 5 33 11 44 17-86-159-93-180-122-250z" />
            </svg>

            <p className="text-justify leading-relaxed text-base md:text-lg font-medium text-stone-50 mb-8">
              There is a distinct beauty in the{" "}
              <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover/card:decoration-lime-500 transition-all">
                utilitarian
              </span>
              . My daily driver is the legendary{" "}
              <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover/card:decoration-red-600 transition-all">
                ThinkPad T480
              </span>
              —arguably the last great modular laptop. It’s built like a tank,
              repairable, and possesses that classic typing experience. Naturally,
              it runs{" "}
              <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover/card:decoration-sky-500 transition-all">
                Arch Linux
              </span>
              . I subscribe to the philosophy of{" "}
              <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover/card:decoration-indigo-500 transition-all">
                minimalism
              </span>{" "}
              and total control; building my system package-by-package ensures I
              have exactly what I need, and nothing I don't. It's not just an OS,
              it's a{" "}
              <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover/card:decoration-violet-500 transition-all">
                personalized craft
              </span>
              .
            </p>
          </div>

          {/* --- NEOFETCH STYLE STATS BLOCK --- */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl backdrop-blur-sm hover:border-zinc-700 transition-colors">
            {SYSTEM_STATS.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3 font-mono text-xs md:text-sm">
                    <span className={`font-bold ${stat.color}`}>{stat.label}:</span>
                    <span className="text-zinc-400">{stat.value}</span>
                </div>
            ))}
          </div>
        </div>

        {/* --- PHOTO SLOT (Right) --- */}
        <div className="lg:col-span-2 relative min-h-[300px] lg:h-auto rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-800 group/image hover:border-zinc-600 transition-colors">
            
            {/* Real Image Placeholder (Uncomment when you have the file) */}
            {/* <Image 
                src={T480} 
                alt="My ThinkPad Setup" 
                fill 
                className="object-cover transition-transform duration-700 group-hover/image:scale-105 opacity-80 group-hover/image:opacity-100"
            /> */}

            {/* Placeholder Visuals */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-700 group-hover/image:text-zinc-500 transition-colors">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span className="font-mono text-xs tracking-widest">[INSERT_T480_SETUP.JPG]</span>
            </div>

            {/* Scanline Effect Overlay */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-20" 
                style={{ backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}
            />
            
            {/* Status Badge */}
            <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 border border-zinc-800 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                    <span className="text-[10px] font-mono text-zinc-300 tracking-widest">SYSTEM_ONLINE</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}