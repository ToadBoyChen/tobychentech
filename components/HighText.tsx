interface HighlightTextProps {
  text: string;
  className?: string;
  colour?: string; // e.g. "lime-500", "sky-500"
}

export default function HighlightText({ 
  text, 
  className = "", 
  colour = "lime-500" 
}: HighlightTextProps) {
  return (
    <span 
      className={`
        text-zinc-900 font-bold underline decoration-zinc-300 decoration-4 underline-offset-4 transition-all 
        group-hover:decoration-${colour} 
        ${className}
      `}
    >
      {text}
    </span>
  );
}