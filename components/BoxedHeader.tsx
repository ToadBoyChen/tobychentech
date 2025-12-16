import React from "react";

interface BoxedHeaderProps {
  text: string;
  className?: string;
  fillColor?: string;
  textSize?: string;
  padding?: string;      // e.g. "p-4" or "p-8"
  borderWidth?: string;  // e.g. "border-2" or "border-4"
}

const BoxedHeader = ({ 
  text, 
  className = "", 
  fillColor = "bg-lime-950",
  textSize = "text-4xl md:text-5xl lg:text-7xl",
  padding = "p-4",
  borderWidth = "border-3"
}: BoxedHeaderProps) => {
  return (
    <div
      className={`
        relative overflow-hidden 
        ${borderWidth} border-lime-950 rounded-xl 
        ${padding} mb-8 isolate 
        ${className}
      `}
    >
      <div
        className={`
            absolute inset-y-0 left-0 w-[200%] z-[-1] 
            transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]
            -translate-x-[110%] group-hover:translate-x-0 
            rounded-r-4xl
            ${fillColor}
        `}
      />
      <h2 
        className={`
          ${textSize} 
          font-black transition-colors duration-500 
          group-hover:text-lime-100 relative z-10
        `}
      >
        {text}
      </h2>
    </div>
  );
};

export default BoxedHeader;