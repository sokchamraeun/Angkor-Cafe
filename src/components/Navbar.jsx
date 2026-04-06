import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Navbar = ({ onOpenCart, cartCount, onSearch, searchQuery }) => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);
    const { user, logout } = useAuth();
    
    // Mock login for demonstration until a full login page is implemented
    const handleLoginClick = () => {
        // If there's a login page, we would navigate to it. 
        // For now, let's assume clicking login shows the profile page or we can provide a small helper.
        window.location.hash = 'profile';
    };

    const navItems = [
        { label: 'Home', path: '#home' },
        { label: 'Menu', path: '#menu' },
        { label: 'Cart', path: '#cart', badge: cartCount, isCart: true },
        { label: user ? 'Profile' : 'Login', path: '#profile' }
    ];

    return (
        <>
            {/* Top Desktop Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-[100] h-16 md:h-20 px-4 md:px-10 flex items-center bg-[#1e1814]/90 backdrop-blur-xl border-b border-[#d4af37]/20 transition-all duration-300">
                <div className="w-full max-w-7xl mx-auto flex justify-between items-center text-white">
                    
                    {/* Logo Section */}
                    {(!isSearchOpen || window.innerWidth > 768) && (
                        <div className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0">
                            <span className="text-2xl md:text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">☕</span>
                            <span className="font-['Playfair_Display'] text-sm md:text-2xl font-bold tracking-[1px] md:tracking-[2px] text-white">
                                ANGKOR <span className="text-[#d4af37]">CAFE</span>
                            </span>
                        </div>
                    )}

                    {/* Search Bar - Center */}
                    <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'flex-1 mx-2' : 'flex-none'} md:flex-1 md:max-w-md md:mx-8`}>
                        <div className="relative w-full group flex items-center justify-end">
                            {/* Mobile Toggle Icon (When closed) */}
                            {!isSearchOpen && (
                                <button 
                                    onClick={() => setIsSearchOpen(true)}
                                    className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white/70"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </button>
                            )}

                            {/* Actual Search Input (Shown always on desktop, shown on mobile when opened) */}
                            <div className={`${isSearchOpen ? 'flex' : 'hidden'} md:flex relative w-full items-center`}>
                                <input 
                                    type="text"
                                    placeholder="Search..."
                                    autoFocus={isSearchOpen}
                                    value={searchQuery}
                                    onChange={(e) => onSearch(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-2 md:py-2.5 pl-9 md:pl-12 pr-10 text-[11px] md:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]/50 transition-all group-hover:bg-white/10"
                                />
                                <div className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-white/30 group-hover:text-[#d4af37] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-[18px] md:h-[18px]"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                </div>
                                {/* Close Search Button (Mobile Only) */}
                                {isSearchOpen && (
                                    <button 
                                        onClick={() => { setIsSearchOpen(false); onSearch(''); }}
                                        className="md:hidden absolute right-3 text-white/30 hover:text-white"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Links - Hidden on Mobile */}
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
                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-[#2ed573]/10 border border-[#2ed573]/30 text-[#2ed573] text-[10px] md:text-[12px] font-semibold font-['Outfit']">
                            <span className="w-2 h-2 bg-[#2ed573] rounded-full shadow-[0_0_8px_#2ed573] animate-pulse"></span>
                            ONLINE
                        </div>
                        
                        {/* Shopping Cart Icon (Desktop) */}
                        <div 
                            onClick={onOpenCart}
                            className="relative cursor-pointer group"
                        >
                            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#d4af37]/30 transition-all duration-300 active:scale-95">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-[#d4af37] transition-colors"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.1-5.38H5.12"></path></svg>
                            </div>
                            {cartCount > 0 && (
                                <span 
                                    key={cartCount}
                                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-[#1e1814] border-2 border-[#1e1814] shadow-lg animate-shake"
                                >
                                    <span>{cartCount}</span>
                                </span>
                            )}
                        </div>

                        {user ? (
                            <div className="flex items-center gap-2 md:gap-3 p-1.5 md:pr-4 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer border border-white/5 active:scale-95 relative group/profile">
                                <img 
                                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=d4af37&color=fff`} 
                                    alt="Profile" 
                                    className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#d4af37]" 
                                />
                                <span className="hidden sm:inline text-white text-sm font-medium font-['Outfit']">{user.name}</span>
                                
                                {/* Simple Logout Dropdown */}
                                <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-[#1e1814] border border-[#d4af37]/20 rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover/profile:opacity-100 group-hover/profile:translate-y-0 group-hover/profile:pointer-events-auto transition-all duration-300 z-[110]">
                                    <div className="px-4 py-2 border-b border-white/5 mb-2">
                                        <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Logged in as</p>
                                        <p className="text-sm font-medium text-white truncate">{user.email || user.name}</p>
                                    </div>
                                    <button 
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button 
                                onClick={handleLoginClick}
                                className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-xl bg-[#d4af37] text-[#1e1814] text-xs md:text-sm font-bold font-['Outfit'] hover:bg-white transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
                                LOGIN
                            </button>
                        )}
                    </div>

                </div>
            </nav>

            {/* Mobile Bottom Navbar - Visible only on mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1e1814]/95 backdrop-blur-2xl border-t border-[#d4af37]/20 pb-[env(safe-area-inset-bottom)]">
                <div className="flex justify-around items-center h-16 max-w-md mx-auto relative">
                    {navItems.map((item) => (
                        <a 
                            key={item.label}
                            href={item.isCart ? undefined : item.path}
                            onClick={item.isCart ? (e) => { e.preventDefault(); onOpenCart(); } : undefined}
                            className="flex flex-col items-center justify-center w-full h-full relative group transition-all duration-300"
                        >
                            <div className="relative">
                                <span className="text-xl mb-1 filter drop-shadow-md group-hover:scale-110 transition-transform block">
                                    {item.label === 'Home' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#d4af37]"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    )}
                                    {item.label === 'Menu' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/70 group-hover:text-[#d4af37] transition-colors"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>
                                    )}
                                    {item.label === 'Cart' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/70 group-hover:text-[#d4af37] transition-colors"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.1-5.38H5.12"></path></svg>
                                    )}
                                    {item.label === 'Profile' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/70 group-hover:text-[#d4af37] transition-colors"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    )}
                                </span>
                                {item.badge > 0 && (
                                    <span 
                                        key={item.badge}
                                        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#d4af37] text-[10px] font-bold text-[#1e1814] border border-[#1e1814] animate-shake"
                                    >
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <span className={`text-[10px] font-['Outfit'] font-semibold tracking-wider transition-colors duration-300 ${item.label === 'Home' ? 'text-[#d4af37]' : 'text-white/50 group-hover:text-[#d4af37]'}`}>
                                {item.label.toUpperCase()}
                            </span>
                            
                            {/* Active Indicator Dot */}
                            {item.label === 'Home' && (
                                <span className="absolute -bottom-1 w-1 h-1 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]"></span>
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Navbar;