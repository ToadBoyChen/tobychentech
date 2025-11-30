import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Body from "@/components/Body";
import Background from "@/components/Background"; 

export default function Home() {
    return (
        <main className="relative min-h-screen flex justify-center text-zinc-900 selection:bg-zinc-900 selection:text-white">
            
            <Background />

            <div className="flex flex-col w-full max-w-5xl items-center font-sans z-10 px-6">
                <Navbar/>
                <Body/>
                <Footer/>
            </div>
        </main>
    );
}