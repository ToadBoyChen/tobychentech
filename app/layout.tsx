import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/context/CursorContext";
import CustomCursor from "@/components/CustomCursor";
import SectionShape from "@/components/SectionShape";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Toby Chen",
  description: "Full Stack Developer, Mathematician and Amateur Fighter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased font-sans bg-white text-zinc-900`}
      >
        <CursorProvider>
          <CustomCursor />
          <SectionShape />
          {children}
        </CursorProvider>
      </body>
    </html>
  );
}
