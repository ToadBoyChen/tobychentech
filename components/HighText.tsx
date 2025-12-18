interface HighlightTextProps {
  text: string;
  className?: string;
  colour?: "yellow" | "blue" | "red"; 
  variant?: "light" | "dark";
}

export default function HighlightText({ 
  text, 
  className = "", 
  colour = "yellow",
  variant = "dark"
}: HighlightTextProps) {

  const textColor = variant === "light" ? "text-stone-50" : "text-zinc-900";
  const underlineBase = variant === "light" ? "decoration-lime-500" : "decoration-lime-500";

  const hoverColors = {
    yellow: "group-hover:decoration-yellow-400",
    blue: "group-hover:decoration-blue-500",
    red: "group-hover:decoration-red-500",
  };

  return (
    <span 
      className={`
        ${textColor} font-bold underline ${underlineBase} decoration-4 underline-offset-4 transition-all 
        ${hoverColors[colour]} 
        ${className}
      `}
    >
      {text}
    </span>
  );
}