import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useToasts } from '../../hooks/useToasts';

const Login = () => {
    const { login } = useAuth();
    const { showToast } = useToasts();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) return;
        
        // Mock login
        login({ name, email: email || `${name.toLowerCase()}@angkor.com`, avatar: null });
        showToast(`Welcome back, ${name}!`);
        window.location.hash = 'home';
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#d4af37] mb-2">Welcome Back</h1>
                    <p className="text-white/50 text-sm font-['Outfit']">Sign in to manage your Angkor Cafe POS</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2 ml-1">Full Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]/50 transition-all font-['Outfit']"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 focus:border-[#d4af37]/50 transition-all font-['Outfit']"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full py-4 bg-[#d4af37] text-[#1e1814] rounded-2xl font-bold tracking-wide hover:bg-white transition-all duration-300 transform active:scale-95 shadow-[0_10px_20px_rgba(212,175,55,0.1)] font-['Outfit']"
                    >
                        SIGN IN
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-white/30 text-xs font-['Outfit']">
                        DEMO MODE: Enter any name to sign in
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
