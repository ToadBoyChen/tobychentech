"use client";
import Introduction from "@/components/Body/Introduction";
import Card from "@/components/Body/Card";
import Statistics from "@/components/Body/Statistics";
import Projects from "@/components/Body/Projects";
import Services from "@/components/Body/Services";
import ScrollTracker, { useEarlyActiveSection } from "@/components/ScrollTracker";
import End from "@/components/Body/End";

export default function Body() {
    // This hook currently drives both the Tracker and the Animations
    const activeSection = useEarlyActiveSection();
    
    // This boolean triggers TRUE when the #about section enters the "early" threshold
    const isAboutActive = activeSection === 'about';

    return (
        <div>
            <ScrollTracker activeSection={activeSection} />
            
            <div className="flex flex-col">

                <Introduction isAboutActive={isAboutActive} />
                <div id="about">
                    <Card isAboutActive={isAboutActive} />
                </div>
                
                <div id="stats">
                    <Statistics />
                </div>
                
                <div id="projects">
                    <Projects />
                </div>

                <div id="services">
                    <Services />
                </div>
                
                <div id="end">
                    <End />
                </div>
            </div>
        </div>
    );
}