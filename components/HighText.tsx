interface HighlightTextProps {
  text: string;
  className?: string;
  colour?: "lime" | "blue" | "red"; 
  variant?: "light" | "dark";
}

export default function HighlightText({ 
  text, 
  className = "", 
  colour = "lime",
  variant = "dark"
}: HighlightTextProps) {

  const textColor = variant === "light" ? "text-stone-50" : "text-zinc-900";
  const underlineBase = variant === "light" ? "decoration-lime-800" : "decoration-zinc-300";

  const hoverColors = {
    lime: "group-hover:decoration-lime-400",
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