"use client";
import Introduction from "@/components/Body/Introduction";
import Card from "@/components/Body/Card";
import Statistics from "@/components/Body/Statistics";
import Projects from "@/components/Body/Projects";
import Services from "@/components/Body/Services";
import ScrollTracker, { useActiveSection, useEarlyActiveSection } from "@/components/ScrollTracker";
import End from "@/components/Body/End";

const SECTION_ORDER = ["intro", "about", "stats", "projects", "services", "end"];

export default function Body() {
    const activeSection = useActiveSection();
    const earlySection = useEarlyActiveSection();

    const hasReached = (target: string) => {
        const currentIndex = SECTION_ORDER.indexOf(earlySection);
        const targetIndex = SECTION_ORDER.indexOf(target);
        return currentIndex >= targetIndex; 
    };

    return (
        <div>
            <ScrollTracker activeSection={activeSection} />
            
            <div className="flex flex-col">
                <Introduction isAboutActive={hasReached('about')} />
                <Card isAboutActive={hasReached('about')} />
                
                <Statistics />
                <Projects />
                <Services />
                <End />
            </div>
        </div>
    );
}