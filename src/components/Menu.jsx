import React, { useState } from 'react';

const Menu = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);

    const menuItems = [
        {
            id: 1,
            name: 'Signature Beef Lok Lak',
            category: 'Food',
            price: '$12.50',
            image: '/images/loklak.png',
            desc: 'Premium marinated beef cubes, sautéed with onions and served with lime-pepper sauce. Accompanied by fresh garden salad and a traditional lime-black pepper dipping sauce.'
        },
        {
            id: 2,
            name: 'Classic Espresso',
            category: 'Drinks',
            price: '$3.50',
            image: '/images/espresso.png',
            desc: 'Intense, aromatic double shot espresso with a rich golden crema. Sourced from organic beans in the Mondulkiri highlands.'
        },
        {
            id: 3,
            name: 'Royal Fish Amok',
            category: 'Food',
            price: '$14.90',
            image: '/images/amok.png',
            desc: 'Traditional Khmer steam-cooked curry with freshwater fish, coconut milk, and noni leaves. A delicately balanced masterpiece of Khmer spice paste (kroeung).'
        },
        {
            id: 4,
            name: 'Velvet Iced Latte',
            category: 'Drinks',
            price: '$4.75',
            image: '/images/latte.png',
            desc: 'Smooth layers of espresso and chilled creamy milk over ice. Perfectly sweetened and topped with a sprig of fresh house-grown mint.'
        },
        {
            id: 5,
            name: 'Khmer Fried Rice',
            category: 'Food',
            price: '$8.50',
            image: '/images/amok.png',
            desc: 'Fragrant jasmine rice wok-tossed with local vegetables, signature spices, and your choice of protein.'
        },
        {
            id: 6,
            name: 'Matcha Zen',
            category: 'Drinks',
            price: '$5.25',
            image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80',
            desc: 'Premium ceremonial grade matcha blended with silky steamed milk for a meditative and creamy experience.'
        }
    ];

    const filteredItems = activeTab === 'All' 
        ? menuItems 
        : menuItems.filter(item => item.category === activeTab);

    return (
        <section className="py-12 bg-transparent">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="font-['Playfair_Display'] text-5xl font-bold mb-4">Our <span className="text-[#d4af37]">Menu</span></h2>
                        <p className="text-white/50 max-w-md font-['Outfit']">A curated selection of authentic Khmer flavors and premium beverages crafted for the refined palate.</p>
                    </div>

                    {/* Category Switcher */}
                    <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-lg">
                        {['All', 'Food', 'Drinks'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-2.5 rounded-xl font-['Outfit'] text-sm font-medium transition-all duration-300 ${
                                    activeTab === tab 
                                    ? 'bg-[#d4af37] text-white shadow-[0_4px_15px_rgba(212,175,55,0.3)]' 
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {filteredItems.map((item) => (
                        <div 
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className="group relative bg-white/[0.02] border border-white/[0.05] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden hover:bg-white/[0.04] hover:border-[#d4af37]/30 transition-all duration-500 cursor-pointer"
                        >
                            {/* Image Container - Square Aspect Ratio */}
                            <div className="aspect-square overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#000] to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
                                <div className="absolute top-3 right-3 md:top-6 md:right-6 bg-[#d4af37] px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-white text-[10px] md:text-sm font-bold font-['Outfit'] shadow-lg z-10">
                                    {item.price}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-8">
                                <div className="flex items-center gap-2 mb-1.5 md:mb-3">
                                    <span className="text-[8px] md:text-[10px] tracking-[0.2em] font-bold uppercase text-[#d4af37]">
                                        {item.category}
                                    </span>
                                </div>
                                <h3 className="font-['Playfair_Display'] text-lg md:text-2xl mb-1.5 md:mb-3 group-hover:text-[#d4af37] transition-colors leading-tight">
                                    {item.name}
                                </h3>
                                <p className="hidden md:block text-white/40 text-sm leading-relaxed mb-8 font-['Outfit'] line-clamp-2">
                                    {item.desc}
                                </p>
                                
                                <button className="w-full py-2.5 md:py-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-[10px] md:text-sm font-semibold font-['Outfit'] group-hover:bg-[#d4af37] group-hover:text-white group-hover:border-[#d4af37] transition-all duration-300 active:scale-[0.98]">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal Overlay */}
                {selectedItem && (
                    <div 
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setSelectedItem(null)}
                    >
                        <div 
                            className="relative w-full max-w-4xl bg-[#1e1814] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all"
                            >
                                ✕
                            </button>

                            {/* Modal Image - Centered with substantial padding and large border radius */}
                            <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
                                <div className="w-full aspect-square overflow-hidden rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative border border-white/5">
                                    <img 
                                        src={selectedItem.image} 
                                        alt={selectedItem.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                                </div>
                            </div>

                            {/* Modal Details */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <span className="text-xs tracking-[0.3em] font-bold uppercase text-[#d4af37] mb-4">
                                    {selectedItem.category}
                                </span>
                                <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold mb-6">
                                    {selectedItem.name}
                                </h2>
                                <div className="text-3xl font-['Outfit'] text-white mb-8">
                                    {selectedItem.price}
                                </div>
                                <p className="text-white/60 leading-relaxed font-['Outfit'] text-base md:text-lg mb-10">
                                    {selectedItem.desc}
                                </p>
                                
                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 md:py-5 rounded-2xl bg-[#d4af37] text-white text-sm md:text-base font-bold font-['Outfit'] shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:-translate-y-1 transition-all active:scale-[0.98]">
                                        Add to Cart
                                    </button>
                                    <button 
                                        onClick={() => setSelectedItem(null)}
                                        className="hidden sm:flex items-center justify-center px-6 py-4 md:py-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Menu;
;