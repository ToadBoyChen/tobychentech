import Introduction from "@/components/Body/Introduction";
import Card from "@/components/Body/Card";
import Statistics from "@/components/Body/Statistics";
import Projects from "@/components/Body/Projects";
import Services from "@/components/Body/Services";
import ScrollTracker from "@/components/ScrollTracker";

export default function Body() {
    return (
        <div className="w-screen flex flex-col items-center">
            
            <ScrollTracker />

            <section id="intro" className="w-screen relative">
                <Introduction/>
            </section>

            <section id="about" className="w-full px-16 py-36 min-h-screen items-center justify-center">
                <Card />
            </section>
            
            <section 
                id="stats" 
                className="w-full bg-zinc-950 py-32 relative z-10 -my-16"
                style={{
                    clipPath: "polygon(0 0, 50% 5vw, 100% 0, 100% calc(100% - 5vw), 50% 100%, 0 calc(100% - 5vw))"
                }}
            >
                <div className="flex justify-center w-full px-16 min-h-screen items-center">
                    <Statistics />
                </div>
            </section>

            <section id="projects" className="w-full px-16 py-36 min-h-screen items-center justify-center">
                <Projects />
            </section>

            <section 
                id="services" 
                className="w-full bg-blue-600 py-32 relative z-10 -my-16"
                style={{
                    clipPath: "polygon(0 0, 50% 5vw, 100% 0, 100% calc(100% - 5vw), 50% 100%, 0 calc(100% - 5vw))"
                }}
            >
                <div className="flex justify-center w-full px-16 min-h-screen items-center">
                    <Services />
                </div>
            </section>
        </div>
    );
}