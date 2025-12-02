import HackerText from "../HackerText";

export default function End() {
    const DARK_TEXT = "text-zinc-900"; 
    const LIGHT_DIVIDER = "bg-zinc-300";

    return (
        <section 
            id="end" 
            className="px-16 py-36 items-center justify-center z-50 bg-white"
        >   
            {/* Section Header - Updated to reflect Action */}
            <div className="flex items-center gap-6 mb-16 w-full">
                <div className={`h-px ${LIGHT_DIVIDER} flex-1`} />
                <span className={`font-mono text-sm ${DARK_TEXT}/70 uppercase tracking-widest`}>
                05 // INITIALISE_THANKYOU
                </span>
                <div className={`h-px ${LIGHT_DIVIDER} flex-1`} />
            </div>
            {/* Main Hacker Text - Direct Question */}
            <div className="flex flex-col items-center">
                <HackerText
                    text="THANKS FOR VISITING"
                    triggerOnMount={true}
                    triggerOnHover={false}
                    speed={50}
                    className={`font-black text-6xl md:text-7xl tracking-tighter text-center font-mono ${DARK_TEXT}`}
                />
                <p className="text-zinc-500 leading-relaxed text-lg font-medium my-12">
                    Thanks for stopping by, <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-cyan-500 transition-all">every visit counts</span>. I hope this portfolio showcases my skills. If it does, and you're impressed, <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-sky-500 transition-all">reach out</span>! If you have any feedback, also get in touch with me, I'm <span className="text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all">always looking to improve</span>.
              </p>
            </div>
        </section>
    );
}