"use client";

interface SectionHeaderProps {
  label: string;
  lineColor?: string; // e.g., "bg-zinc-600" or "bg-white"
  textColor?: string; // e.g., "text-zinc-800" or "text-white"
}

export default function SectionHeader({ 
  label, 
  lineColor = "bg-zinc-600",
  textColor = "text-zinc-900" 
}: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-6 mb-16 w-full">
      {/* Left Line */}
      <div className={`h-px flex-1 ${lineColor}`} />
      
      {/* Label Text */}
      <span className={`font-mono text-md uppercase tracking-widest ${textColor}`}>
        {label}
      </span>
      
      {/* Right Line */}
      <div className={`h-px flex-1 ${lineColor}`} />
    </div>
  );
}