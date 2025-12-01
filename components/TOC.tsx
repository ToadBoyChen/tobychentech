export default function TOC() {
  const navItems = [
    { id: "01", label: "About Me", href: "#about" },
    { id: "02", label: "Some Statistics", href: "#stats" },
    { id: "03", label: "Selected Work", href: "#projects" },
    { id: "04", label: "My Services", href: "#services" },
  ];

    return (
        <div>
            <div className="flex items-center gap-2 mb-6 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                <div className="w-2 h-2 bg-zinc-400 rounded-full" />
                <span>Directory_Index</span>
            </div>

            <nav className="flex flex-col space-y-1">
                {navItems.map((item) => (
                    <a 
                        key={item.id}
                        href={item.href}
                        className="group flex items-center justify-between py-3 border-b border-zinc-100 hover:border-zinc-300 transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <span className="font-mono text-xs text-zinc-400 group-hover:text-blue-600 transition-colors">
                                {item.id}
                            </span>
                            <span className="text-lg font-medium text-zinc-600 group-hover:text-zinc-900 group-hover:translate-x-2 transition-all duration-300">
                                {item.label}
                            </span>
                        </div>

                        <span className="text-zinc-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            →
                        </span>
                    </a>
                ))}
            </nav>
        </div>
    );
}