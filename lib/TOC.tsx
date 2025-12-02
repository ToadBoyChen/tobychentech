export default function TOC() {
  const navItems = [
    { id: "01", label: "About Me", href: "#about" },
    { id: "02", label: "Some Statistics", href: "#stats" },
    { id: "03", label: "Selected Work", href: "#projects" },
    { id: "04", label: "My Services", href: "#services" },
  ];

  return (
    <div>
      <div className="w-full flex items-center justify-between mb-6 text-xs font-mono text-zinc-300 uppercase tracking-widest">
        
        {/* LEFT GROUP: Dot + Title */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full" />
          <p>Table of Contents</p> 
        </div>

        {/* RIGHT SIDE: Credit */}
        <p className="text-right">Photo by Martin Bennie</p>
        
      </div>

      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="group flex items-center justify-between py-3 border-b border-white/20 hover:border-white/60 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-zinc-400 group-hover:text-blue-400 transition-colors">
                {item.id}
              </span>
              
              <span className="text-lg font-medium text-zinc-200 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                {item.label}
              </span>
            </div>

            <span className="text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              →
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}