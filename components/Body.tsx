import Introduction from "@/components/Body/Introduction";
import Card from "@/components/Body/Card";
import Statistics from "@/components/Body/Statistics";
import Projects from "@/components/Body/Projects";
import Services from "@/components/Body/Services";
import ScrollTracker from "@/components/ScrollTracker";
import End from "@/components/Body/End";

export default function Body() {
    return (
        <div>
            <ScrollTracker />
            <div className="grid gap-0">
                <Introduction/>
                <Card />
                <Statistics />
                <Projects />
                <Services />
                <End />
            </div>
        </div>
    );
}