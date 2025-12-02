// src/components/Footer.jsx or where your component resides
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  // Get the current year dynamically for copyright
  const currentYear = new Date().getFullYear();

  return (
    // Use the `footer` semantic HTML tag for accessibility
    <footer className="w-full bg-black/90 text-zinc-400 border-t border-zinc-800 p-6 mt-60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm font-sans">
        
        {/* --- Left Section: Copyright & Attribution --- */}
        <div className="flex flex-col items-center md:items-start space-y-2 mb-4 md:mb-0">
          <p className="text-sm">
            &copy; {currentYear} My Portfolio. All rights reserved.
          </p>
          <p className="text-xs text-zinc-500">
            Cover photo thanks to **Martin Bennie** via Unsplash.
          </p>
        </div>

        {/* --- Right Section: Navigation/Links --- */}
        <div className="flex space-x-4">
          {/* Use Next.js Link for client-side navigation */}
          <Link href="#introduction" className="hover:text-white transition duration-200">
            Home
          </Link>
          <Link href="#contact" className="hover:text-white transition duration-200">
            Contact
          </Link>
          <Link href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" className="hover:text-white transition duration-200">
            GitHub
          </Link>
        </div>
        
      </div>
    </footer>
  );
}