import HackerHeader from "../HackerHeader";

export default function LinuxCard() {
    return (
        <div>
            <HackerHeader 
                text="02 01 02 // PASSIONATE ARCH + T480 GUY"
                lineSide="left"
                className="text-stone-50 my-4"
                lineColor="bg-stone-50"
            />

            <div className="group relative">
                <svg 
                    className="float-left w-24 h-24 mr-6 mb-2 text-stone-50/20 group-hover:text-sky-500/20 transition-colors duration-500" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M11.99 1.996L1.008 21.99h3.51l1.503-3.007h11.958l1.503 3.008h3.51L11.99 1.996zm-1.502 13.01l1.502-3.992 1.502 3.992h-3.004z"/>
                </svg>

                <p className="text-justify leading-relaxed text-base md:text-lg font-medium text-stone-50 mb-12">
                    There is a distinct beauty in the <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover:decoration-sky-600 transition-all">utilitarian</span>. My daily driver is the legendary <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover:decoration-red-600 transition-all">ThinkPad T480</span>—arguably the last great modular laptop. It’s built like a tank, repairable, and possesses that classic typing experience. Naturally, it runs <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover:decoration-sky-500 transition-all">Arch Linux</span>. I subscribe to the philosophy of <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover:decoration-indigo-500 transition-all">minimalism</span> and total control; building my system package-by-package ensures I have exactly what I need, and nothing I don't. It's not just an OS, it's a <span className="font-bold underline decoration-stone-600 decoration-4 underline-offset-4 group-hover:decoration-violet-500 transition-all">personalized craft</span>.
                </p>
            </div>
        </div>
    );
}