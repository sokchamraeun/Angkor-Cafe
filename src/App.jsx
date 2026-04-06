import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar"
import Menu from "./components/Menu"
import CartSidebar from "./components/CartSidebar"
import ToastContainer from "./components/ToastContainer"
import CheckoutModal from "./components/CheckoutModal"
import Login from "./Pages/profile/login"
import BestSellerSection from "./Menu/BestSellerSection"
import { useCart } from './hooks/useCart';
import { useToasts } from './hooks/useToasts';
import { useAuth } from './hooks/useAuth';

function App() {
    // Custom Hooks
    const { toasts, showToast, removeToast } = useToasts();
    const { user } = useAuth();
    const cartState = useCart(showToast);
    
    // Hash-based routing
    const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');
    useEffect(() => {
        const handleHashChange = () => setCurrentPath(window.location.hash || '#home');
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    // Components Logic Constants
    const { 
        cart, setCart, editingItem, setEditingItem, skipCartAnimation, 
        isCartOpen, setIsCartOpen, toggleCart, handleEditCartItem, addToCart, removeFromCart, 
        updateCartQty, cartCount, finalTotal 
    } = cartState;

    // Remaining App-specific state
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableName, setTableName] = useState('');
    const [customerName, setCustomerName] = useState('');

    const handleCheckout = () => {
        if (cart.length === 0) return;
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleCheckoutConfirm = (method) => {
        setIsCheckoutOpen(false);
        const orderId = Date.now().toString().slice(-4);
        showToast(`Order #${orderId} confirmed via ${method}!`);
        setCart([]);
        setTableName('');
        setCustomerName('');
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#1e1814,#000)] text-white font-['Outfit'] relative overflow-x-hidden">
            <Navbar onOpenCart={toggleCart} cartCount={cartCount} onSearch={setSearchQuery} searchQuery={searchQuery} />
            
            <CartSidebar 
                isOpen={isCartOpen} 
                onClose={toggleCart} 
                cartItems={cart}
                onUpdateQty={updateCartQty}
                onRemove={removeFromCart}
                tableName={tableName}
                setTableName={setTableName}
                customerName={customerName}
                setCustomerName={setCustomerName}
                onCheckout={handleCheckout}
                onEditItem={handleEditCartItem}
                skipAnimation={skipCartAnimation}
            />
            
            <ToastContainer toasts={toasts} removeToast={removeToast} />

            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
                total={finalTotal}
                onConfirm={handleCheckoutConfirm}
                tableName={tableName}
                customerName={customerName}
            />

            <main className="max-w-7xl mx-auto px-1 pt-14 md:pt-28 lg:py-32 pb-20 md:pb-32">
                {currentPath === '#profile' && !user ? (
                    <Login />
                ) : (
                    <div id="menu">
                        <BestSellerSection onAddToCart={addToCart} />
                        <Menu 
                            onAddToCart={addToCart} 
                            searchQuery={searchQuery} 
                            editingItem={editingItem} 
                            setEditingItem={setEditingItem} 
                        />
                    </div>
                )}
            </main>
        </div>
    )
}

export default App

