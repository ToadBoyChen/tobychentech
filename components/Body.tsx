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
            
            <div className="w-full px-10 min-h-screen flex items-center justify-center py-20 flex-col">
                <section id="about">
                <Card />
            </section>
            
            <section id="stats">
                <Statistics />
            </section>

            <section id="projects">
                <Projects />
            </section>

            <section id="services">
                <Services />
            </section>
            </div>
        </div>
    );
}