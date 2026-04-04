import React, { useState, useEffect } from 'react';

const MenuItem = ({ item, onOpenModal, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = (e) => {
        e.stopPropagation();
        setQuantity(prev => prev + 1);
    };

    const handleDecrease = (e) => {
        e.stopPropagation();
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        onAddToCart(item, quantity);
        setQuantity(1);
    };

    return (
        <div className="flex flex-col bg-white/[0.03] border border-white/10 rounded-[1.5rem] overflow-hidden shadow-2xl transition-transform active:scale-[0.98] group">
            {/* Image Section with Optimized Padding */}
            <div className="p-1.5 md:p-3">
                <div 
                    className="relative aspect-square overflow-hidden cursor-pointer rounded-2xl border border-white/5 shadow-inner"
                    onClick={() => onOpenModal(item)}
                >
                    <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Category Badge over Image */}
                    <div className="absolute top-2 left-2 py-1 px-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5 pointer-events-none">
                        <span className="w-1 h-1 bg-[#d4af37] rounded-full animate-pulse"></span>
                        <span className="text-[8px] font-bold text-white tracking-widest uppercase">{item.category}</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-3 md:p-4 flex flex-col gap-3">
                {/* Name and Price on one line */}
                <div className="flex flex-col gap-1 min-h-[4rem] flex-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-['Playfair_Display'] text-[13px] md:text-lg font-bold text-white line-clamp-2 flex-1 leading-tight">
                            {item.name}
                        </h3>
                        <span className="text-[#d4af37] font-bold font-['Outfit'] text-[13px] md:text-lg whitespace-nowrap">
                            {item.price}
                        </span>
                    </div>
                </div>

                {/* Action Section: Stacked on mobile, Row on desktop */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-3">
                    {/* Compact Quantity Selector */}
                    <div className="flex items-center justify-between bg-white/5 rounded-xl border border-white/10 p-0.5 md:p-1 flex-1 md:flex-none md:min-w-[100px]">
                        <button 
                            onClick={handleDecrease}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-all active:scale-90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <span className="text-sm md:text-base font-bold font-['Outfit'] text-white">
                            {quantity}
                        </span>
                        <button 
                            onClick={handleIncrease}
                            className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-all active:scale-90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>

                    {/* Add To Cart Button */}
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 py-2.5 md:py-3 rounded-xl md:rounded-2xl bg-[#d4af37]/80 hover:bg-[#d4af37] text-white text-[11px] md:text-sm font-bold font-['Outfit'] flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#d4af37]/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.1-5.38H5.12"></path></svg>
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

const Menu = ({ onAddToCart, searchQuery, editingItem, setEditingItem }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalQuantity, setModalQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedSugar, setSelectedSugar] = useState('100%');
    const [selectedIce, setSelectedIce] = useState('Normal');
    const [openSection, setOpenSection] = useState(null); // Track expanded dropdown section

    const categories = ['All', 'Espresso', 'Tea & Refreshers', 'Signatures', 'Blended'];

    const menuItems = [
        {
            id: 1,
            name: 'Mondulkiri Phum Coffee',
            category: 'Espresso',
            price: '$3.50',
            image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
            desc: 'Traditional Cambodian coffee beans from the Mondulkiri highlands, known for their chocolatey notes and bold aroma. Served with condensed milk.'
        },
        {
            id: 2,
            name: 'Rose Gold Matcha',
            category: 'Signatures',
            price: '$5.25',
            image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80',
            desc: 'Premium ceremonial grade matcha infused with organic rose water, creating a delicate, floral, and creamy masterpiece.'
        },
        {
            id: 3,
            name: 'Velvet Iced Latte',
            category: 'Espresso',
            price: '$4.75',
            image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
            desc: 'A smooth, multi-layered espresso experience with chilled whole milk, finished with a hint of Madagascar vanilla.'
        },
        {
            id: 4,
            name: 'Iced Tamarind Sparkler',
            category: 'Tea & Refreshers',
            price: '$4.25',
            image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
            desc: 'A vibrant, tangy refresher made with fresh local tamarind, sparkling water, and Thai basil for an exotic burst of flavour.'
        },
        {
            id: 5,
            name: 'Caramel Cloud Frappe',
            category: 'Blended',
            price: '$5.50',
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
            desc: 'Whipped, buttery caramel blended with rich espresso ice and topped with a mountain of cloud-like whipped cream.'
        },
        {
            id: 6,
            name: 'Angkor Royal Tea',
            category: 'Tea & Refreshers',
            price: '$4.90',
            image: 'https://images.unsplash.com/photo-1544787210-2213d84ad96b?auto=format&fit=crop&w=800&q=80',
            desc: 'Smokey black tea leaves steeped with cardamom and cinnamon, balanced with local palm sugar and a splash of cream.'
        },
        {
            id: 7,
            name: 'Pandan Coco Refresher',
            category: 'Signatures',
            price: '$4.80',
            image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
            desc: 'Fragrant pandan leaf infusion blended with fresh coconut water and soft coconut meat. Naturally sweet and incredibly cooling.'
        },
        {
            id: 8,
            name: 'Double Choco Blended',
            category: 'Blended',
            price: '$5.00',
            image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
            desc: 'For the chocolate purist: rich dark cocoa blended with crushed ice and house-made chocolate ganache drizzles.'
        }
    ];
    useEffect(() => {
        if (editingItem) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedItem(editingItem);
            setModalQuantity(editingItem.qty);
            setSelectedSize(editingItem.size || 'M');
            setSelectedSugar(editingItem.sugar || '100%');
            setSelectedIce(editingItem.ice || 'Normal');
        }
    }, [editingItem]);

    const openModal = (item) => {
        setSelectedItem(item);
        setModalQuantity(1);
        setSelectedSize('M');
        setSelectedSugar('100%');
        setSelectedIce('Normal');
        setOpenSection(null);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setEditingItem(null);
        setOpenSection(null);
    };

    const handleModalAddToCart = () => {
        onAddToCart({
            ...selectedItem,
            qty: modalQuantity,
            size: selectedSize,
            sugar: selectedSugar,
            ice: selectedIce
        });
        handleCloseModal();
    };

    const filteredItems = menuItems.filter(item => {
        const matchesSearch = searchQuery && (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // If searching, show all matches regardless of category
        if (searchQuery) return matchesSearch;

        // Otherwise, filter by category tab
        return activeTab === 'All' || item.category === activeTab;
    });

    return (
        <section className="py-8 bg-transparent">
            <div className="max-w-7xl mx-auto px-0 md:px-6">
                
                {/* Header Section - Tightened for Mobile */}
                <div className="flex flex-col mb-4 md:mb-8 gap-3 md:gap-6 px-2 md:px-4">
                    <div>
                        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold mb-1 md:mb-4">Our <span className="text-[#d4af37]">Menu</span></h2>
                        <p className="hidden md:block text-white/50 max-w-md font-['Outfit'] text-sm md:text-base">A curated selection of authentic Khmer flavors.</p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-4 overflow-x-auto no-scrollbar pb-1">
                        {categories.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 md:px-8 py-2 md:py-3.5 rounded-xl md:rounded-2xl font-['Outfit'] text-[11px] md:text-sm font-bold tracking-[0.1em] uppercase transition-all duration-500 whitespace-nowrap ${activeTab === tab ? 'bg-[#d4af37] text-white shadow-[0_10px_25px_rgba(212,175,55,0.3)] scale-105' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid - 2 on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 mx-2 md:mx-0">
                    {filteredItems.map((item) => (
                        <MenuItem 
                            key={item.id} 
                            item={item} 
                            onOpenModal={openModal} 
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>

                {/* Modal Overlay */}
                {selectedItem && (
                    <div 
                        className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
                        onClick={handleCloseModal}
                    >
                        <div 
                            className="relative w-full max-w-md md:max-w-5xl bg-[#1e1814] border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300 shadow-3xl max-h-[95vh] md:max-h-none overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button 
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#d4af37] text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-all font-bold"
                            >
                                ✕
                            </button>

                            {/* Modal Image */}
                            <div className="w-full md:w-1/2 p-4 md:p-0 bg-white/3">
                                <div className="w-full aspect-square md:aspect-auto md:h-full overflow-hidden rounded-3xl md:rounded-none">
                                    <img 
                                        src={selectedItem.image} 
                                        alt={selectedItem.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* Modal Details */}
                            <div className="w-full md:w-1/2 p-6 md:p-14 flex flex-col">
                                <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-[#d4af37] mb-3 md:mb-4">
                                    {selectedItem.category}
                                </span>
                                <h2 className="font-['Playfair_Display'] text-2xl md:text-5xl font-bold mb-6 md:mb-8 text-white leading-tight">
                                    {selectedItem.name}
                                </h2>

                                {/* CUSTOMIZATION SECTION - CLASSIC SELECT DROPDOWN STYLE */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
                                    {/* Size Dropdown */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] ml-1">Select Size:</label>
                                        <div className="relative">
                                            <button 
                                                onClick={() => setOpenSection(openSection === 'size' ? null : 'size')}
                                                className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-between text-white hover:bg-white/10 transition-all font-['Outfit'] shadow-inner"
                                            >
                                                <span className="font-medium">{selectedSize === 'M' ? 'Regular (M)' : 'Large (L)'}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openSection === 'size' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"></path></svg>
                                            </button>
                                            {openSection === 'size' && (
                                                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#1e1814] border border-white/10 rounded-xl overflow-hidden z-[400] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                    {['M', 'L'].map(size => (
                                                        <button 
                                                            key={size}
                                                            onClick={() => { setSelectedSize(size); setOpenSection(null); }}
                                                            className={`w-full text-left px-5 py-4 hover:bg-[#d4af37] hover:text-white transition-colors border-b border-white/5 last:border-0 font-['Outfit'] ${selectedSize === size ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-white/60'}`}
                                                        >
                                                            <div className="flex justify-between items-center w-full">
                                                                <span className="font-bold">{size === 'M' ? 'Regular (M)' : 'Large (L)'}</span>
                                                                <span className="text-[10px] uppercase opacity-50">{size === 'L' ? '+$0.50' : 'Included'}</span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sugar Dropdown */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] ml-1">Sugar Level:</label>
                                        <div className="relative">
                                            <button 
                                                onClick={() => setOpenSection(openSection === 'sugar' ? null : 'sugar')}
                                                className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-between text-white hover:bg-white/10 transition-all font-['Outfit'] shadow-inner"
                                            >
                                                <span className="font-medium text-white">{selectedSugar} (Normal)</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openSection === 'sugar' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"></path></svg>
                                            </button>
                                            {openSection === 'sugar' && (
                                                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#1e1814] border border-white/10 rounded-xl overflow-hidden z-[400] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                    {['0%', '25%', '50%', '100%'].map(sugar => (
                                                        <button 
                                                            key={sugar}
                                                            onClick={() => { setSelectedSugar(sugar); setOpenSection(null); }}
                                                            className={`w-full text-left px-5 py-4 hover:bg-[#d4af37] hover:text-white transition-colors border-b border-white/5 last:border-0 font-['Outfit'] ${selectedSugar === sugar ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-white/60'}`}
                                                        >
                                                            <span className="font-bold">{sugar} Sugar</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Ice Dropdown */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[0.2em] ml-1">Ice preference:</label>
                                        <div className="relative">
                                            <button 
                                                onClick={() => setOpenSection(openSection === 'ice' ? null : 'ice')}
                                                className="w-full h-12 md:h-14 bg-white/5 border border-white/10 rounded-xl px-4 flex items-center justify-between text-white hover:bg-white/10 transition-all font-['Outfit'] shadow-inner"
                                            >
                                                <span className="font-medium text-white">{selectedIce} Ice</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${openSection === 'ice' ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"></path></svg>
                                            </button>
                                            {openSection === 'ice' && (
                                                <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-[#1e1814] border border-white/10 rounded-xl overflow-hidden z-[400] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                                                    {['No', 'Less', 'Normal'].map(ice => (
                                                        <button 
                                                            key={ice}
                                                            onClick={() => { setSelectedIce(ice); setOpenSection(null); }}
                                                            className={`w-full text-left px-5 py-4 hover:bg-[#d4af37] hover:text-white transition-colors border-b border-white/5 last:border-0 font-['Outfit'] ${selectedIce === ice ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-white/60'}`}
                                                        >
                                                            <span className="font-bold">{ice} Ice</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-auto pt-6 border-t border-white/5">
                                    {/* Action Row: Price + Qty + Add Button in 1 Row */}
                                    <div className="flex flex-row items-center gap-2 md:gap-4">
                                        <span className="text-xl md:text-4xl font-bold font-['Outfit'] text-white shrink-0">
                                            {selectedItem.price}
                                        </span>
                                        
                                        {/* Modal Quantity Selector */}
                                        <div className="flex items-center bg-white/5 rounded-xl border border-white/10 p-0.5 md:p-1 flex-1 justify-between max-w-[100px] md:max-w-[140px]">
                                            <button 
                                                onClick={() => modalQuantity > 1 && setModalQuantity(prev => prev - 1)}
                                                className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                            <span className="text-sm md:text-lg font-bold font-['Outfit'] text-white">
                                                {modalQuantity}
                                            </span>
                                            <button 
                                                onClick={() => setModalQuantity(prev => prev + 1)}
                                                className="w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                            </button>
                                        </div>

                                        <button 
                                            onClick={handleModalAddToCart}
                                            className="flex-1 py-3 md:py-5 rounded-xl md:rounded-2xl bg-[#d4af37] text-white text-xs md:text-lg font-bold font-['Outfit'] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 hover:bg-[#c49b2f] transition-all duration-300 active:scale-[0.98] uppercase"
                                        >
                                            {editingItem ? 'UPDATE ORDER' : `ADD • $${ (parseFloat(selectedItem.price.replace('$', '')) * modalQuantity + (selectedSize === 'L' ? 0.5 * modalQuantity : 0)).toFixed(2) }`}
                                        </button>
                                    </div>
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