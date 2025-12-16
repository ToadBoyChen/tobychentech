"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BoxedHeader from "@/components/BoxedHeader";
import MagneticPill from "@/components/MagneticPill";

export default function TOC() {
  const navItems = [
    { id: "01", label: "ABOUT ME", href: "#about" },
    { id: "02", label: "SOME FACTS", href: "#facts" },
    { id: "03", label: "PROJECTS", href: "#projects" },
    { id: "04", label: "SERVICES", href: "#services" },
  ];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* HEADER */}
      <div className="w-full flex items-center justify-between text-[10px] sm:text-xs font-mono text-stone-300 uppercase tracking-widest mix-blend-difference">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
          </span>
          <p>Table of Contents</p>
        </div>

        <Link
          href="https://www.martinbenniephotography.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MagneticPill strength={0.3}>
            <BoxedHeader
              text="Photo by Martin Bennie"
              fillColor="bg-lime-500"
              className="px-2 py-1 rounded-full text-[10px] sm:text-xs cursor-pointer font-mono text-stone-300 uppercase"
            />
          </MagneticPill>
        </Link>
      </div>
      <nav className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 w-full">
        {navItems.map((item) => (
          <NavButton key={item.id} item={item} />
        ))}
      </nav>
    </div>
  );
}

function NavButton({
  item,
}: {
  item: { id: string; label: string; href: string };
}) {
  return (
    <MagneticPill strength={0.2} className="w-full h-24 md:h-32">
      <a
        href={item.href}
        className="group relative flex flex-col justify-between p-4 md:p-6 w-full h-full bg-lime-900/20 backdrop-blur-2xl border-3 border-lime-950 hover:border-lime-500/50 transition-colors duration-300 rounded-xl overflow-hidden cursor-pointer"
      >
        <div className="flex justify-between items-start z-10">
          <span className="font-mono text-xs text-stone-500 group-hover:text-lime-500 transition-colors">
            {item.id}
          </span>
          <ArrowUpRight className="text-stone-500 group-hover:text-lime-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 w-4 h-4" />
        </div>
        <div className="mt-auto z-10">
          <BoxedHeader
            text={item.label}
            fillColor="bg-lime-500"
            className="p-2 rounded-full text-center text-sm md:text-lg font-bold tracking-wider text-stone-300 cursor-pointer"
          />
        </div>
      </a>
    </MagneticPill>
  );
}
