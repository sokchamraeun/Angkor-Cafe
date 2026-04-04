import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQty, onRemove, tableName, setTableName, customerName, setCustomerName, onCheckout, onEditItem, skipAnimation }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price.replace('$', '')) * item.qty), 0);

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <div 
                className={`fixed top-0 right-0 z-[110] h-screen w-full max-w-sm bg-[#1e1814] border-l border-[#d4af37]/20 shadow-[-10px_0_40px_rgba(0,0,0,0.5)] ${skipAnimation ? '' : 'transition-transform duration-500 ease-in-out'} ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-black/20">
                        <div>
                            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-white flex items-center gap-3">
                                🛒 Your <span className="text-[#d4af37]">Cart</span>
                            </h2>
                            <p className="text-xs text-white/40 mt-1 font-['Outfit'] uppercase tracking-[0.2em]">{cartItems.length} Items Selected</p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#d4af37] hover:text-[#1e1814] text-white flex items-center justify-center transition-all duration-300 border border-white/10"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Order Details */}
                    <div className="p-6 border-b border-white/5 bg-black/10 flex flex-col gap-3">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="text-[9px] font-bold text-[#d4af37] uppercase tracking-widest block mb-1.5 ml-1">Table</label>
                                <input 
                                    type="text"
                                    value={tableName}
                                    onChange={(e) => setTableName(e.target.value)}
                                    placeholder="e.g. T-12"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50 transition-all placeholder:text-white/10"
                                />
                            </div>
                            <div className="flex-[2]">
                                <label className="text-[9px] font-bold text-[#d4af37] uppercase tracking-widest block mb-1.5 ml-1">Guest Name</label>
                                <input 
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    placeholder="Enter name"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#d4af37]/50 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
                                <span className="text-6xl">🛍️</span>
                                <p className="font-['Outfit'] uppercase tracking-[0.2em] text-sm">Your cart is empty</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div 
                                    key={item.cartKey} 
                                    onClick={() => onEditItem(item)}
                                    className="group flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-[#d4af37]/30 hover:bg-white/10 transition-all cursor-pointer"
                                >
                                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-lg relative">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute top-1 right-1 bg-[#d4af37] text-white text-[8px] px-1.5 py-0.5 rounded-lg font-bold shadow-lg uppercase">{item.size}</div>
                                    </div>
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-['Playfair_Display'] text-sm font-bold text-white leading-tight pr-4">
                                                {item.name}
                                            </h3>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); onRemove(item.cartKey); }}
                                                className="text-white/20 hover:text-red-400 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        
                                        {/* Customization Details */}
                                        <div className="flex gap-2 mb-2 text-[8px] font-bold font-['Outfit'] uppercase tracking-widest text-[#d4af37]/60">
                                            <span>Ice: {item.ice}</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full my-auto"></span>
                                            <span>Sugar: {item.sugar}</span>
                                        </div>

                                        <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/5">
                                            <div className="flex items-center gap-3 bg-black/30 px-3 py-1 rounded-lg border border-white/5" onClick={(e) => e.stopPropagation()}>
                                                <button 
                                                    onClick={() => onUpdateQty(item.cartKey, item.qty - 1)}
                                                    className="text-[#d4af37] text-xs font-bold hover:scale-125 transition-transform"
                                                >
                                                    -
                                                </button>
                                                <span className="text-xs font-bold font-['Outfit']">{item.qty}</span>
                                                <button 
                                                    onClick={() => onUpdateQty(item.cartKey, item.qty + 1)}
                                                    className="text-[#d4af37] text-xs font-bold hover:scale-125 transition-transform"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-white font-bold font-['Outfit'] text-sm">
                                                ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Summary & Footer */}
                    <div className="p-8 bg-black/40 border-t border-white/10 space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between text-white/50 text-sm font-['Outfit']">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white/50 text-sm font-['Outfit']">
                                <span>Service Fee (5%)</span>
                                <span>${(subtotal * 0.05).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-white text-xl font-bold font-['Playfair_Display'] pt-3 border-t border-white/5">
                                <span>Total Price</span>
                                <span className="text-[#d4af37]">${(subtotal * 1.05).toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            onClick={onCheckout}
                            disabled={cartItems.length === 0}
                            className="w-full py-4 md:py-5 rounded-[1.5rem] bg-[#d4af37] text-white text-lg font-bold font-['Outfit'] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 hover:bg-[#c49b2f] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>PROCEED TO CHECKOUT</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </button>
                        <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.3em]">Angkor Cafe Premium POS</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
