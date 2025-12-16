import React from "react";

interface BoxedHeaderProps {
  text: string;
  className?: string;     // Handles all shape/size/border styling now
  fillColor?: string;     // The color of the slide-in background
  hoverTextColor?: string; // The color the text turns into
}

const BoxedHeader = ({ 
  text, 
  className = "", 
  fillColor = "bg-lime-950",
  hoverTextColor = "group-hover:text-lime-100"
}: BoxedHeaderProps) => {
  return (
    <div
      className={`
        relative overflow-hidden isolate group
        cursor-default
        ${className} 
      `}
    >
      {/* THE FILL EFFECT LAYER */}
      <div
        className={`
            absolute inset-y-0 left-0 w-[200%] z-[-1] 
            transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
            -translate-x-[110%] group-hover:translate-x-0 
            rounded-r-full
            ${fillColor}
        `}
      />
      
      {/* TEXT LAYER */}
      {/* Changed from <h2> to <span> for versatility */}
      <span 
        className={`
          relative z-10 transition-colors duration-300
          ${hoverTextColor}
        `}
      >
        {text}
      </span>
    </div>
  );
};

export default BoxedHeader;