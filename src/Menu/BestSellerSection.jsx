import React from 'react';

const bestSellers = [
    {
        id: 'bs1',
        name: 'Mondulkiri Phum Coffee',
        category: 'Espresso',
        price: '$3.50',
        image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80',
        desc: 'Traditional Cambodian coffee beans from the Mondulkiri highlands, known for their chocolatey notes and bold aroma.'
    },
    {
        id: 'bs2',
        name: 'Rose Gold Matcha',
        category: 'Signatures',
        price: '$5.25',
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=400&q=80',
        desc: 'Premium ceremonial grade matcha infused with organic rose water, creating a delicate, floral, and creamy masterpiece.'
    },
    {
        id: 'bs3',
        name: 'Caramel Cloud Frappe',
        category: 'Blended',
        price: '$5.50',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
        desc: 'Whipped, buttery caramel blended with rich espresso ice and topped with a mountain of cloud-like whipped cream.'
    },
    {
        id: 'bs4',
        name: 'Angkor Royal Tea',
        category: 'Tea & Refreshers',
        price: '$4.90',
        image: 'https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&w=400&q=80',
        desc: 'Smokey black tea leaves steeped with cardamom and cinnamon, balanced with local palm sugar and a splash of cream.'
    }
];

const BestSellerCard = ({ item, onAddToCart, idx }) => (
    <div className="w-[260px] md:w-[320px] shrink-0 bg-[#ffffff08] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col group transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-[#ffffff0d] hover:-translate-y-2 relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[2rem]">
            <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e1814]/95 via-[#1e1814]/40 to-transparent"></div>
            
            {/* Top Badge */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e5c048] text-[#1e1814] text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                #{idx + 1} BEST SELLER
            </div>

            {/* Content overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
                <span className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#d4af37]">
                    {item.category}
                </span>
                <div className="flex justify-between items-end gap-2">
                    <h3 className="font-['Playfair_Display'] text-xl font-bold text-white leading-tight drop-shadow-md line-clamp-2">
                        {item.name}
                    </h3>
                    <span className="text-[#d4af37] text-xl font-bold font-['Outfit'] drop-shadow-md">
                        {item.price}
                    </span>
                </div>
            </div>
        </div>
        
        <div className="p-4 mt-auto">
            <button 
                onClick={() => onAddToCart({ ...item, qty: 1, size: 'M', sugar: '100%', ice: 'Normal' })}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-[#d4af37] border border-white/10 hover:border-[#d4af37] text-white text-sm font-bold font-['Outfit'] transition-all duration-300 active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[#d4af37]/30 flex items-center justify-center gap-2 group-hover:text-black group-hover:shadow-[#d4af37]/40"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:opacity-100"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.1-5.38H5.12"></path></svg>
                QUICK ADD
            </button>
        </div>
    </div>
);

const BestSellerSection = ({ onAddToCart }) => {
    return (
        <section className="py-16 md:py-24 bg-transparent relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12 text-center">
                <div className="inline-block relative">
                    <span className="text-[12px] tracking-[0.3em] font-bold uppercase text-[#d4af37] mb-2 block">
                        Trending Now
                    </span>
                    <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white mb-4">
                        Crowd <span className="text-[#d4af37]">Favorites</span>
                    </h2>
                    <div className="absolute -top-4 -right-10 text-[#d4af37] animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"></path><path d="M7 3.34V5a3 3 0 0 0 3 3v0a2 2 0 0 1 2 2v0c0 1.1.9 2 2 2v0a2 2 0 0 0 2-2v0c0-1.1.9-2 2-2h1.66"></path><path d="M11 21.95V18a2 2 0 0 0-2-2v0a2 2 0 0 1-2-2v-1.66"></path><path d="M16.45 6.64 15 5.2a1 1 0 0 0-1.41 1.41l1.41 1.45"></path><path d="m11 6.54 1.45-1.41a1 1 0 0 0-1.41-1.41L9.6 5.13"></path><path d="M2.5 13.5A9.5 9.5 0 1 1 11 21.5"></path></svg>
                    </div>
                </div>
                <p className="text-white/50 font-['Outfit'] text-sm md:text-base max-w-md mx-auto">
                    Our most loved flavors, handcrafted to perfection and loved by everyone.
                </p>
            </div>

            {/* Marquee Wrapper */}
            <div className="relative w-full overflow-hidden flex pb-8 [mask-image:_linear-gradient(to_right,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)] md:[mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                
                <div className="flex w-max animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
                    {/* First Duplicate Set */}
                    <div className="flex gap-6 pr-6">
                        {bestSellers.map((item, idx) => (
                            <BestSellerCard key={`set1-${item.id}`} item={item} idx={idx} onAddToCart={onAddToCart} />
                        ))}
                        {/* Adding a few more to make a longer marquee before repeating */}
                        {bestSellers.map((item, idx) => (
                            <BestSellerCard key={`set1-copy-${item.id}`} item={item} idx={idx+4} onAddToCart={onAddToCart} />
                        ))}
                    </div>
                    {/* Second Duplicate Set (exact match of first to make the 50% jump seamless) */}
                    <div className="flex gap-6 pr-6" aria-hidden="true">
                        {bestSellers.map((item, idx) => (
                            <BestSellerCard key={`set2-${item.id}`} item={item} idx={idx} onAddToCart={onAddToCart} />
                        ))}
                        {bestSellers.map((item, idx) => (
                            <BestSellerCard key={`set2-copy-${item.id}`} item={item} idx={idx+4} onAddToCart={onAddToCart} />
                        ))}
                    </div>
                </div>
            </div>
            
            <style jsx="true">{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
};

export default BestSellerSection;