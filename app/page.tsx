import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Body from "@/components/Body";
import Background from "@/components/Background"; 
import Introduction from "@/components/Body/Introduction";

export default function Home() {
    return (
        <main className="flex justify-center text-zinc-900 selection:bg-zinc-900 selection:text-white">
            
            <Background />

            <div>
                <Navbar/>
                <Body/>
                <Footer/>
            </div>
        </main>
    );
}