import Navbar from "@/components/Navbar";
import Body from "@/components/Body";

export default function Home() {
    return (
        <main className="flex justify-center text-zinc-900 selection:bg-zinc-900 selection:text-white">
            <div>
                <Navbar/>
                <Body/>
            </div>
        </main>
    );
}