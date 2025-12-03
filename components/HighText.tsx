interface HighlightTextProps {
  text: string;
  className?: string;
  colour?: string;
  variant?: "light" | "dark";
}

export default function HighlightText({ 
  text, 
  className = "", 
  colour = "lime-500",
  variant = "dark"
}: HighlightTextProps) {

  const textColor = variant === "light" ? "text-stone-50" : "text-zinc-900";
  const underlineBase = variant === "light" ? "decoration-lime-800" : "decoration-zinc-300";

  return (
    <span 
      className={`
        ${textColor} font-bold underline ${underlineBase} decoration-4 underline-offset-4 transition-all 
        group-hover:decoration-${colour} 
        ${className}
      `}
    >
      {text}
    </span>
  );
}