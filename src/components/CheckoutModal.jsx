import React, { useState } from 'react';

const CheckoutModal = ({ isOpen, onClose, total, onConfirm, tableName, customerName }) => {
    const [selectedMethod, setSelectedMethod] = useState('KHQR');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-[#1e1814] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-3xl animate-in zoom-in-95 duration-300 flex flex-col">
                
                {/* Header */}
                <div className="p-8 text-center border-b border-white/5">
                    <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white mb-2">Complete <span className="text-[#d4af37]">Order</span></h2>
                    <p className="text-white/40 text-sm font-['Outfit']">Table: {tableName || 'N/A'} • Guest: {customerName || 'Walk-in'}</p>
                </div>

                {/* Amount Display */}
                <div className="p-8 bg-white/3 flex flex-col items-center">
                    <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">Total Amount Due</span>
                    <span className="text-5xl font-bold font-['Outfit'] text-white">
                        ${total.toFixed(2)}
                    </span>
                </div>

                {/* Payment Method Selector */}
                <div className="p-8 flex flex-col gap-6">
                    <h3 className="text-white text-sm font-bold font-['Outfit'] px-1">Select Payment Method</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                        {/* KHQR Option */}
                        <button 
                            onClick={() => setSelectedMethod('KHQR')}
                            className={`relative p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'KHQR' ? 'bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                        >
                            <div className={`p-3 rounded-xl bg-white/10 ${selectedMethod === 'KHQR' ? 'text-[#d4af37]' : 'text-white/50'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3"></rect><rect width="5" height="5" x="16" y="3"></rect><rect width="5" height="5" x="3" y="16"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v.01"></path></svg>
                            </div>
                            <span className={`font-bold font-['Outfit'] text-sm ${selectedMethod === 'KHQR' ? 'text-white' : 'text-white/40'}`}>KHQR Pay</span>
                            {selectedMethod === 'KHQR' && <div className="absolute top-3 right-3 w-3 h-3 bg-[#d4af37] rounded-full"></div>}
                        </button>

                        {/* Cash Option */}
                        <button 
                            onClick={() => setSelectedMethod('CASH')}
                            className={`relative p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${selectedMethod === 'CASH' ? 'bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                        >
                            <div className={`p-3 rounded-xl bg-white/10 ${selectedMethod === 'CASH' ? 'text-[#d4af37]' : 'text-white/50'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01"></path><path d="M18 12h.01"></path></svg>
                            </div>
                            <span className={`font-bold font-['Outfit'] text-sm ${selectedMethod === 'CASH' ? 'text-white' : 'text-white/40'}`}>Cash</span>
                            {selectedMethod === 'CASH' && <div className="absolute top-3 right-3 w-3 h-3 bg-[#d4af37] rounded-full"></div>}
                        </button>
                    </div>

                    {/* Conditional KHQR QR Display */}
                    {selectedMethod === 'KHQR' && (
                        <div className="bg-white p-4 rounded-2xl flex flex-col items-center animate-in slide-in-from-top-4 duration-500">
                            <div className="w-48 h-48 bg-slate-100 flex items-center justify-center border-4 border-[#d4af37] rounded-xl relative overflow-hidden">
                                {/* Placeholder QR Content */}
                                <div className="text-slate-300 transform scale-150">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="5" height="5" x="3" y="3"></rect><rect width="5" height="5" x="16" y="3"></rect><rect width="5" height="5" x="3" y="16"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v.01"></path></svg>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
                                <div className="absolute top-2 left-2 bg-[#d4af37] text-white text-[8px] font-bold px-1 rounded">KHQR</div>
                            </div>
                            <span className="text-slate-900 text-xs font-bold font-['Outfit'] mt-3">Scan to Pay</span>
                        </div>
                    )}
                </div>

                {/* Confirm Button */}
                <div className="p-8 pt-0">
                    <button 
                        onClick={() => onConfirm(selectedMethod)}
                        className="w-full py-5 rounded-[1.5rem] bg-[#d4af37] text-white text-lg font-bold font-['Outfit'] shadow-[0_10px_30px_rgba(212,175,55,0.4)] hover:-translate-y-1 hover:bg-[#c49b2f] transition-all duration-300 active:scale-[0.98]"
                    >
                        CONFIRM PAYMENT
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full py-3 mt-3 rounded-xl text-white/30 text-sm font-bold font-['Outfit'] hover:text-white transition-colors"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
