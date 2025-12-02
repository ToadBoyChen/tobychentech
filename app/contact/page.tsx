"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import HackerText from "@/components/HackerText";
import { ArrowRight } from "lucide-react";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from "@/components/Footer";

function ContactContent({ formState, handleChange }: { 
    formState: any, 
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void 
}) {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  const welcomeText = useMemo(() => {
    switch (source) {
      case 'navbar':
        return "WANT TO SAY HELLO?";
      case 'footer':
        return "WANT TO WORK WITH ME?";
      case 'volunteering':
        return "HAPPY TO VOLUNTEER.";
      case 'frontend':
        return "LET'S IMPROVE UI/UX FOR ALL.";
      case 'fullstack':
        return "LET'S BUILD SOMETHING AMAZING.";
      default:
        return "LET'S BUILD SOMETHING.";
    }
  }, [source]);

  return (
    <div className="min-h-screen pb-12 w-full px-4 sm:px-8 xl:px-16 mx-auto  text-white overflow-hidden opacity-0 animate-slide-up">
      <p className="min-h-32"></p>
      <style jsx>{`
        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUpFade 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* --- Custom Gradient Hover Effect (KEPT for consistency) --- */
        .group-hover:decoration-blue-to-purple {
          transition: all 300ms ease-out;
          text-decoration-color: #f4f4f5; /* zinc-100 default */
        }
        .group:hover .group-hover:decoration-blue-to-purple {
          text-decoration-color: transparent;
          text-decoration-style: solid;

          background-image: linear-gradient(
            to right,
            #1d4ed8,
            /* blue-700 */ #6d28d9,
            /* violet-700 */ #9333ea /* fuchsia-700 */
          );
          background-repeat: repeat-x;
          background-position: 0 bottom;
          background-size: 100% 4px;
        }
      `}</style>
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div
          className="flex items-center gap-6 mb-12 relative z-10 opacity-0 animate-slide-up"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="h-px bg-white/30 flex-1" />
          <span className="font-mono text-sm text-blue-100 uppercase tracking-widest">
            00 // CONTACT_ME
          </span>
          <div className="h-px bg-white/30 flex-1" />
        </div>

        <div className="relative z-10">
          <div
            className="flex flex-col items-center mb-12 opacity-0 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <HackerText
              text={welcomeText}
              triggerOnMount={true}
              triggerOnHover={false}
              speed={50}
              className="font-black text-7xl tracking-tighter text-center font-mono text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div
              className="bg-white/30 backdrop-blur-md border border-white/20 p-8 md:p-12 flex flex-col justify-between group transition-all duration-300 min-h-[400px] opacity-0 animate-slide-up rounded-xl hover:bg-white/35"
              style={{ animationDelay: "0.3s" }}
            >
              <div>
                <p className="text-5xl font-black text-white mb-6 tracking-tighter leading-none">
                  GET IN TOUCH.
                </p>
                <p className="text-white/80 leading-relaxed text-base font-medium mb-8"> I am <span className="text-white font-extrabold underline decoration-white/30 decoration-4 underline-offset-4 group-hover:decoration-cyan-300 transition-all"> available </span> for projects and collaborations, <span className="text-white font-extrabold underline decoration-white/30 decoration-4 underline-offset-4 group-hover:decoration-sky-300 transition-all"> paid or unpaid</span>. I'm really just looking to gain some experience. If you have any <span className="text-white font-extrabold underline decoration-white/30 decoration-4 underline-offset-4 group-hover:decoration-blue-500 transition-all"> project ideas, research, questions, etc</span>, please reach out. I always aim to respond within <span className="text-white font-extrabold underline decoration-white/30 decoration-4 underline-offset-4 group-hover:decoration-indigo-500 transition-all"> 48hrs </span>.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-white/50 uppercase tracking-widest">
                    EMAIL ADDRESS
                  </span>
                  <a
                    href="mailto:Toby.chen1337@outlook.com"
                    className="text-xl font-black text-white hover:text-blue-100 transition-colors"
                  >
                    Toby.chen1337@outlook.com
                  </a>
                </div>

                <div className="h-px bg-white/30 w-full" />

                <div className="flex justify-between items-center text-xs font-mono text-white/50">
                  <span>LOCATION: LONDON, UK</span>
                  <span>TIMEZONE: GMT</span>
                </div>
              </div>
            </div>

            <div
              className="bg-white/30 backdrop-blur-md border border-white/20 p-8 md:p-12 relative overflow-hidden flex flex-col justify-center opacity-0 animate-slide-up rounded-xl hover:bg-white/35"
              style={{ animationDelay: "0.4s" }}
            >

              <form
                className="relative z-10 flex flex-col gap-8"
                action="#"
                method="POST"
              >
                <div className="space-y-6">
                  <div className="group">
                    <label
                      htmlFor="name"
                      className="block text-sm text-white/50 mb-2 font-mono tracking-widest group-focus-within:text-white transition-colors"
                    >
                      str VISITOR_NAME:
                    </label>
                    <div className="flex flex-row items-center justify-center">
                      <span className="text-white/50 font-mono text-4xl">
                        {"{"}
                      </span>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full text-white font-mono rounded-none px-10 py-4 focus:outline-none focus:ring-0 transition-all placeholder:text-white/40 text-lg font-bold"
                        required
                      />
                      <span className="text-white/50 font-mono text-4xl">
                        {"}"}
                      </span>
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="email"
                      className="block text-sm text-white/50 mb-2 font-mono tracking-widest group-focus-within:text-white transition-colors"
                    >
                      str VISITOR_EMAIL:
                    </label>
                    <div className="flex flex-row items-center justify-center">
                      <span className="text-white/50 font-mono text-4xl">
                        {"{"}
                      </span>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="JohnDoe@example.com"
                        className="w-full text-white font-mono rounded-none px-10 py-4 focus:outline-none focus:ring-0 transition-all placeholder:text-white/40 text-lg font-bold"
                        required
                      />
                      <span className="text-white/50 font-mono text-4xl">
                        {"}"}
                      </span>
                    </div>
                  </div>
                  <div className="group">
                    <label
                      htmlFor="message"
                      className="block text-sm text-white/50 mb-2 font-mono tracking-widest group-focus-within:text-white transition-colors"
                    >
                      str VISITOR_QUERY:
                    </label>
                    <div className="flex flex-row items-stretch justify-center">
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Hey Toby your website is awesome..."
                        className="w-full text-white font-mono rounded-none px-10 py-4 focus:outline-none focus:ring-0 transition-all placeholder:text-white/40 text-lg font-bold min-h-[150px]"
                        rows={6} 
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <a
                    href="mailto:contact@toadboy.com"
                    className="flex items-center justify-between gap-3 font-mono px-8 py-4 bg-white text-blue-600 font-black uppercase tracking-widest hover:bg-blue-50 transition-all duration-300 shadow-xl shadow-black/20 group"
                  >
                    <HackerText 
                      text="SEND MESSAGE"
                      triggerOnMount={false} 
                      triggerOnHover={true}
                      speed={30}
                      className="block" 
                    />
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </form>
              <div className="absolute bottom-4 left-6 text-[10px] text-white/50 font-mono">
                <span className="animate-pulse text-white mr-1">●</span>{" "}
                  CURRENTLY AVAILABLE FOR WORK
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-blue-600">
      <div className={`fixed top-6 left-6 z-50 w-full px-6 pt-6 pointer-events-none transition-all duration-300 mix-blend-difference`}>
        <Link
          href="/"
          className={`
              pointer-events-auto font-extrabold text-xl tracking-tighter text-white transition-all
            `}
        >
          <HackerText
            text="[Toby Chen]"
            triggerOnMount={false}
            triggerOnHover={true}
            speed={30}
            className="block"
          />
        </Link>
      </div>

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center text-white/50">
            <p className="font-mono">LOADING CONTACT FORM...</p>
        </div>
      }> 
        <ContactContent formState={formState} handleChange={handleChange} />
      </Suspense>
      <Footer isFooterActive={true}/>
    </div>
  );
}