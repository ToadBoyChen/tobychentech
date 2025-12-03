"use client";
import { useState, useEffect } from "react";
import { ArrowRight, Code2, Globe, HeartHandshake, RefreshCw, Check } from "lucide-react";
import HackerText from "../HackerText";
import { motion, useAnimation } from "framer-motion";

const CURRENCIES = {
  GBP: { symbol: "£", rate: 1, label: "GBP" },
  USD: { symbol: "$", rate: 1.27, label: "USD" },
  EUR: { symbol: "€", rate: 1.17, label: "EUR" }
};
// ... [Type definitions remain the same] ...
type CurrencyKey = keyof typeof CURRENCIES;
const SPAN_BASE = "text-white font-bold underline decoration-white/30 decoration-4 underline-offset-4 transition-all";

const SERVICES_DATA = [
    // ... [Your existing service data] ...
    {
        id: "01",
        title: "PASSION_PROJECT_VOLUNTEER",
        icon: <HeartHandshake className="w-8 h-8" />,
        desc: (
            <>
                Got a non-profit or a genuinely cool idea? I will help you <span className={`${SPAN_BASE} group-hover:decoration-green-400`}>build it for free</span>. 
                I'm looking for <span className={`${SPAN_BASE} group-hover:decoration-green-400`}>interesting problems</span>, not just paychecks.
            </>
        ),
        features: ["Code Contribution", "Technical Consulting", "Zero Cost"],
        basePrice: 0,
        priceLabel: "FREE / PRO BONO"
    },
    {
        id: "02",
        title: "FRONTEND_WEBSITE",
        icon: <Globe className="w-8 h-8" />,
        desc: (
            <>
                A <span className={`${SPAN_BASE} group-hover:decoration-cyan-400`}>visually stunning</span> landing page or portfolio. 
                Perfect for showcasing your work with <span className={`${SPAN_BASE} group-hover:decoration-cyan-400`}>modern animations</span> and responsive design.
            </>
        ),
        features: ["React / Next.js", "Responsive Design", "SEO Optimized", "CMS Integration"],
        basePrice: 300, 
        priceLabel: "STARTING AT"
    },
    {
        id: "03",
        title: "FULLSTACK_APPLICATION",
        icon: <Code2 className="w-8 h-8" />,
        desc: (
            <>
                A <span className={`${SPAN_BASE} group-hover:decoration-pink-400`}>complete web application</span> with a database and user auth. 
                Ideal for SaaS dashboards, e-commerce, or <span className={`${SPAN_BASE} group-hover:decoration-pink-400`}> internal tools</span>.
            </>
        ),
        features: ["Database (SQL/NoSQL)", "User Auth", "API Integration", "Admin Dashboard"],
        basePrice: 800,
        priceLabel: "STARTING AT"
    }
];

interface CardProps {
  isServicesActive: boolean;
}

export default function Services({isServicesActive} : CardProps) {
    const [currency, setCurrency] = useState<CurrencyKey>("GBP");
    const [conversionRates, setConversionRates] = useState(CURRENCIES);
    const [loadingRates, setLoadingRates] = useState(false);
    const controls = useAnimation();
    
    const cardVariants = {
      hidden: { y: 100},
      visible: { y: 0, transition: { duration: 0.6 }},
    };
  
    useEffect(() => {
      if (isServicesActive) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [isServicesActive, controls]);

    // ... [Fetch useEffect remains the same] ...
    useEffect(() => {
        const fetchRates = async () => {
            setLoadingRates(true);
            try {
                const response = await fetch('https://api.exchangerate.host/latest?base=GBP&symbols=GBP,USD,EUR');
                const data = await response.json();
                if (data.success && data.rates) {
                    const { USD: rateUSD, EUR: rateEUR } = data.rates;
                    setConversionRates({
                        GBP: { symbol: "£", rate: 1, label: "GBP" },
                        USD: { symbol: "$", rate: rateUSD, label: "USD" },
                        EUR: { symbol: "€", rate: rateEUR, label: "EUR" }
                    });
                }
            } catch (error) {
                console.error("Failed to fetch current exchange rates:", error);
            } finally {
                setLoadingRates(false);
            }
        };
        fetchRates();
    }, []);

    const handleCurrencyToggle = () => {
        const keys = Object.keys(conversionRates) as CurrencyKey[];
        const currentIndex = keys.indexOf(currency);
        setCurrency(keys[(currentIndex + 1) % keys.length]);
    };

    return (
        <motion.div initial="hidden" animate={controls} variants={cardVariants}>
            <div className="w-full top-0 left-0 z-10">
                <svg 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none" 
                    className="w-full h-[30px] md:h-[50px] fill-blue-600 block overflow-visible"
                >
                    <use href="#fixed-convex"/> 
                </svg>
            </div>
            <section className="px-4 md:px-8 lg:px-16 py-20 md:py-36 items-center justify-center z-40 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" 
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} 
                />

                <div className="max-w-6xl mx-auto relative z-10">
                    
                    {/* --- HEADER --- */}
                    <div className="flex items-center gap-4 md:gap-6 mb-12">
                        <div className="h-px bg-white/30 flex-1" />
                        <span className="font-mono text-[10px] md:text-sm text-blue-100 uppercase tracking-widest whitespace-nowrap">
                            04 // Services_Offered
                        </span>
                        <div className="h-px bg-white/30 flex-1" />
                    </div>

                    <div className="mb-12 md:mb-20 flex flex-col items-center">
                        <HackerText 
                            text="SELECT_YOUR_TIER"
                            className="text-3xl md:text-5xl font-black text-white tracking-tighter text-center"
                            speed={40}
                            triggerOnMount={true}
                            triggerOnHover={false}
                        />
                    </div>

                    {/* --- CARDS --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {SERVICES_DATA.map((service, index) => {
                            const currentCurrency = conversionRates[currency];
                            const rawPrice = Math.round(service.basePrice * currentCurrency.rate);
                            
                            const displayPrice = service.basePrice === 0 
                                ? "FREE" 
                                : `${currentCurrency.symbol}${rawPrice} ${currentCurrency.label}`;

                            const displayRateLabel = loadingRates 
                                ? "Fetching Rates..." 
                                : service.priceLabel;

                            return (
                                <div 
                                    key={service.id}
                                    className={`
                                        relative flex flex-col justify-between p-6 md:p-8 rounded-2xl backdrop-blur-md border border-white/20 transition-all duration-300 group
                                        ${index === 0 ? "bg-white/10 hover:bg-white/15" : "bg-white/5 hover:bg-white/10"}
                                        hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]
                                    `}
                                >
                                    {/* Top Section */}
                                    <div>
                                        <div className="flex justify-between items-start mb-6 md:mb-8">
                                            <div className="p-3 md:p-4 bg-white text-blue-600 rounded-xl shadow-lg">
                                                {service.icon}
                                            </div>
                                            <span className="font-mono text-xs text-white/50 border border-white/20 px-2 py-1 rounded-full">
                                                {service.id}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[0.95] min-h-[3rem] md:min-h-[4rem] flex items-end">
                                            {/* Replace underscores with spaces for wrapping */}
                                            {service.title.replace(/_/g, " ")}
                                        </h3>
                                        
                                        {/* DESCRIPTION */}
                                        <div className="text-white/80 leading-relaxed text-base md:text-lg font-medium mb-6 md:mb-8">
                                            {service.desc}
                                        </div>

                                        {/* FEATURES LIST */}
                                        <ul className="space-y-3 mb-8">
                                            {service.features.map(feat => (
                                                <li key={feat} className="flex items-center gap-3 text-sm text-white font-medium opacity-90">
                                                    <Check className="w-4 h-4 text-blue-200" strokeWidth={3} />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom Section: Price & Action */}
                                    <div className="pt-6 border-t border-white/10">
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="block text-[10px] font-mono text-white/50 uppercase tracking-widest">
                                                    {displayRateLabel}
                                                </span>
                                                
                                                {service.basePrice > 0 && (
                                                    <button 
                                                        onClick={handleCurrencyToggle}
                                                        className={`flex items-center gap-1 text-[10px] font-mono transition-colors ${loadingRates ? 'text-zinc-400' : 'text-blue-200 hover:text-white'}`}
                                                        disabled={loadingRates}
                                                    >
                                                        <RefreshCw className="w-3 h-3" />
                                                        <span>{loadingRates ? 'LOADING' : 'CONVERT'}</span>
                                                    </button>
                                                )}
                                            </div>

                                            <button 
                                                onClick={handleCurrencyToggle} 
                                                disabled={service.basePrice === 0 || loadingRates}
                                                className={`text-left w-full group/price ${service.basePrice === 0 || loadingRates ? 'cursor-default' : 'cursor-pointer'}`}
                                            >
                                                <HackerText 
                                                    key={displayPrice} 
                                                    text={displayPrice}
                                                    className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover/price:text-blue-100 transition-colors"
                                                    speed={30}
                                                    triggerOnMount={true}
                                                    triggerOnHover={false}
                                                />
                                            </button>
                                        </div>
                                        
                                        <a 
                                            href="mailto:contact@toadboy.com" 
                                            className="flex items-center justify-between w-full px-6 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-all group-hover:scale-[1.02] shadow-lg shadow-black/5"
                                        >
                                            <span>INITIATE</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <p className="text-center text-white/40 text-[10px] md:text-xs font-mono mt-8 md:mt-12 px-4">
                        * Prices are indicative estimates based on typical project complexity. They are updated once per component load using current exchange rates.
                    </p>
                </div>
            </section>
        </motion.div>
    );
}