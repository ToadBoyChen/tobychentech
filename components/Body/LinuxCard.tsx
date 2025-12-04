"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HackerHeader from "../HackerHeader";
import T480 from "@/public/t480_2.jpg";
import HighText from "../HighText";

// EXPANDED SPECS LIST: 8 items for a balanced 4-row grid
const HARDWARE_SPECS = [
  { label: "DEVICE", value: "ThinkPad T480", detail: "Classic Chassis" },
  { label: "CPU", value: "Intel i7-8650U", detail: "4c/8t @ 4.2GHz" },
  { label: "GPU", value: "Intel UHD 620", detail: "Mesa Drivers" },
  { label: "RAM", value: "32GB DDR4", detail: "2400MHz Dual Ch." },
  { label: "DISK", value: "1TB NVMe SSD", detail: "Samsung 970 Evo" },
  { label: "OS", value: "Arch Linux", detail: "Kernel 6.6.7-zen" },
  { label: "WM", value: "Hyprland", detail: "Wayland / Tiling" },
  { label: "SHELL", value: "Zsh + Starship", detail: "Alacritty Term" },
];

export default function LinuxCard() {
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsPhotoVisible(true);
      },
      { threshold: 0.3 }
    );
    if (photoRef.current) observer.observe(photoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full">
      <div className="mb-12">
        <HackerHeader
          text="02 01 02 // PASSIONATE ARCH + T480 GUY"
          lineSide="left"
          variant="light"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10 group/card">
        
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-3 flex flex-col gap-10">
          
          <div className="relative">
            <svg
              className="float-left w-24 h-24 mr-4 mb-2 text-stone-50/20 group-hover/card:text-[#1793d1] transition-colors duration-500 ease-out"
              viewBox="0 0 512 512"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 72c-14 35-23 57-39 91 10 11 22 23 41 36-21-8-35-17-45-26-21 43-53 103-117 220 50-30 90-48 127-55-2-7-3-14-3-22v-1c1-33 18-58 38-56 20 1 36 29 35 62l-2 17c36 7 75 26 125 54l-27-50c-13-10-27-23-55-38 19 5 33 11 44 17-86-159-93-180-122-250z" />
            </svg>

            <p className="text-stone-50 text-lg leading-relaxed">
              There is a distinct beauty in the{" "}
              <HighText text="utilitarian" variant="light" />. My daily driver
              is the legendary <HighText text="ThinkPad T480" variant="light" />
              —arguably the last great modular laptop. It’s built like a tank,
              repairable, and possesses that classic typing experience.
              Naturally, it runs <HighText text="Arch Linux" variant="light" />.
              I subscribe to the philosophy of{" "}
              <HighText text="minimalism" variant="light" /> and total control;
              building my system package-by-package ensures I have exactly what
              I need, and nothing I don't. It's not just an OS, it's a{" "}
              <HighText text="personalized craft" variant="light" />.
            </p>
          </div>
        </div>
        {/* --- RIGHT COLUMN: IMAGE --- */}
        <div
          ref={photoRef}
          className="lg:col-span-2 relative aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl"
        >
          <Image
            src={T480}
            alt="My ThinkPad Setup"
            fill
            className={`object-cover transition-all duration-[1.5s] ease-out ${
              isPhotoVisible
                ? "grayscale-0 opacity-100 scale-100"
                : "grayscale opacity-60 scale-105"
            }`}
          />
          
          <div
            className={`absolute bottom-6 left-6 transition-all duration-1000 delay-300 ${
              isPhotoVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="bg-white text-black text-xs font-bold px-2 py-1 shadow-lg">
              T480_WITH_ARCH.jpg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}