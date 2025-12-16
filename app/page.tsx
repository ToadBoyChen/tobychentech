import Navbar from "@/components/Navbar";
import Body from "@/components/Body";

export default function Home() {
    return (
        <main className="flex justify-center bg-black text-zinc-900 text-xl md:text-2xl leading-relaxed text-justify transition-all duration-300 ease-in-out">
            <div>
                <Navbar/>
                <Body/>
            </div>
        </main>
    );
}