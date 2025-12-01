import Introduction from "@/components/Body/Introduction";
import Card from "@/components/Body/Card";
import Statistics from "@/components/Body/Statistics";
import Projects from "@/components/Body/Projects";
import Services from "@/components/Body/Services";
import ScrollTracker from "@/components/ScrollTracker";

export default function Body() {
    return (
        <div className="w-full flex flex-col items-center">
            
            <ScrollTracker />

            <section id="intro" className="w-screen relative">
                <Introduction/>
            </section>

            <section id="about" className="w-full max-w-5xl px-6 min-h-screen flex items-center justify-center py-20">
                <Card />
            </section>
            
            <section id="stats" className="w-full max-w-5xl px-6 min-h-[50vh] flex items-center justify-center py-20">
                <Statistics />
            </section>

            <section id="projects" className="w-full max-w-5xl px-6 min-h-screen flex items-center justify-center py-20">
                <Projects />
            </section>

            <section id="services" className="w-full max-w-5xl px-6 min-h-screen flex items-center justify-center py-20">
                <Services />
            </section>
        </div>
    );
}