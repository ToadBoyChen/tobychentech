import Navbar from "@/components/Navbar";
import Body from "@/components/Body";

export default function Home() {
    return (
        <main className="flex justify-center bg-black text-zinc-900 text-lg leading-relaxed">
            <div>
                <Navbar/>
                <Body/>
            </div>
        </main>
    );
}