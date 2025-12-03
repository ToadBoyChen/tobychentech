interface DotsProps {
  colour?: string;
}

export default function Dots({colour = 'white'} : DotsProps) {
  return (
    <div
      className="absolute inset-0 opacity-10 pointer-events-none z-20"
      style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, ${colour} 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }}
      aria-hidden="true"
    />
  );
}