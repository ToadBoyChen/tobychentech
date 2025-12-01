import Introduction from "@/components/Body/Introduction";
import Card from "@/components/Body/Card";
import Statistics from "@/components/Body/Statistics";
import Projects from "@/components/Body/Projects";
import Services from "@/components/Body/Services";
import ScrollTracker from "@/components/ScrollTracker";

export default function Body() {
    return (
        <div className="w-full">
            <ScrollTracker />

            <section id="intro">
                <Introduction/>
            </section>

            {/* 1. About Section */}
            <section id="about" className="min-h-screen flex items-center justify-center py-20">
                <Card />
            </section>

            {/* 2. Stats Section */}
            <section id="stats" className="min-h-[50vh] flex items-center justify-center py-20">
                <Statistics />
            </section>

            {/* 3. Projects Section */}
            <section id="projects" className="min-h-screen flex items-center justify-center py-20">
                <Projects />
            </section>

            {/* 4. Services Section */}
            <section id="services" className="min-h-screen flex items-center justify-center py-20">
                <Services />
            </section>
        </div>
    );
}