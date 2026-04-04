import React, { useEffect } from 'react';

const Toast = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="z-[200] animate-in slide-in-from-right-10 fade-in duration-300">
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#2ed573] text-white shadow-[0_15px_40px_rgba(46,213,115,0.3)] border border-white/20">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div>
                    <p className="text-sm font-bold font-['Outfit'] tracking-wide">Success!</p>
                    <p className="text-xs text-white/80 font-['Outfit']">{message}</p>
                </div>
                <button 
                    onClick={onClose}
                    className="ml-4 hover:scale-110 transition-transform opacity-50 hover:opacity-100"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default Toast;
