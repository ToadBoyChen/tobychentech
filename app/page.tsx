import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Body from "@/components/Body";
import Background from "@/components/Background";

export default function Home() {
    return (
        <main className="flex justify-center text-zinc-900 selection:bg-zinc-900 selection:text-white">
            <div>
                <Navbar/>
                <Body/>
                <Footer/>
            </div>
        </main>
    );
}