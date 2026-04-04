import React from 'react';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 h-20 px-10 flex items-center bg-[#1e1814]/85 backdrop-blur-xl border-b border-[#d4af37]/20 transition-all duration-300">
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
                
                {/* Logo Section */}
                <div className="flex items-center gap-3 group cursor-pointer">
                    <span className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">☕</span>
                    <span className="font-['Playfair_Display'] text-2xl font-bold tracking-[2px] text-white">
                        ANGKOR <span className="text-[#d4af37]">CAFE</span>
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8">
                    {['Menu', 'Orders', 'Inventory', 'Staff', 'Settings'].map((item, idx) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`} 
                            className={`relative py-2 font-['Outfit'] text-sm font-medium tracking-wide transition-all duration-300 hover:text-white ${idx === 0 ? 'text-[#d4af37]' : 'text-white/70'}`}
                        >
                            {item}
                            <span className={`absolute bottom-0 left-0 h-[2px] bg-[#d4af37] transition-all duration-300 ${idx === 0 ? 'w-full' : 'w-0 hover:w-full group-hover:w-full'}`}></span>
                        </a>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2ed573]/10 border border-[#2ed573]/30 text-[#2ed573] text-[12px] font-semibold font-['Outfit']">
                        <span className="w-2 h-2 bg-[#2ed573] rounded-full shadow-[0_0_8px_#2ed573] animate-pulse"></span>
                        ONLINE
                    </div>
                    
                    <div className="relative hidden md:block group">
                        <input 
                            type="text" 
                            placeholder="Search orders..." 
                            className="w-48 group-hover:w-64 focus:w-64 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl text-white text-sm font-['Outfit'] outline-none transition-all duration-300 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/20"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-50 text-xs">🔍</span>
                    </div>

                    <div className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/5">
                        <img 
                            src="https://ui-avatars.com/api/?name=Admin&background=d4af37&color=fff" 
                            alt="Profile" 
                            className="w-8 h-8 rounded-full border-2 border-[#d4af37]" 
                        />
                        <span className="hidden sm:inline text-white text-sm font-medium font-['Outfit']">Manager</span>
                    </div>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;