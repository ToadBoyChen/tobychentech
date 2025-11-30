import HackerText from "../HackerText";

export default function Introduction() {
    return (
        <div className="relative flex flex-col items-center justify-end min-h-[95vh] pb-20 overflow-hidden">

            <HackerText 
                text="Welcome"
                triggerOnMount={true} 
                triggerOnHover={false} 
                speed={45}
                className="font-bold text-9xl tracking-widest z-10"
            />
        </div>
    );
}