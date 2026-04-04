import React, { useState } from 'react';
import Navbar from "./components/Navbar"
import Menu from "./components/Menu"
import CartSidebar from "./components/CartSidebar"
import Toast from "./components/Toast"
import CheckoutModal from "./components/CheckoutModal"

function App() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [toasts, setToasts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [tableName, setTableName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [editingItem, setEditingItem] = useState(null);
    const [skipCartAnimation, setSkipCartAnimation] = useState(false);

    const toggleCart = () => {
        setSkipCartAnimation(false); // Normal toggle always has animation
        setIsCartOpen(!isCartOpen);
    };
    
    const handleEditCartItem = (item) => {
        setSkipCartAnimation(true); // Instant close for edit
        setEditingItem(item);
        setIsCartOpen(false); 
    };
    
    const handleCheckout = () => {
        if (cart.length === 0) return;
        setIsCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const handleCheckoutConfirm = (method) => {
        setIsCheckoutOpen(false);
        // eslint-disable-next-line react-hooks/purity
        const orderId = Date.now().toString().slice(-4);
        showToast(`Order #${orderId} confirmed via ${method}!`);
        setCart([]);
        setTableName('');
        setCustomerName('');
    };

    const showToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const addToCart = (product) => {
        // Create a unique key for the item based on its ID and customizations
        const itemKey = `${product.id}-${product.size || 'M'}-${product.sugar || '100%'}-${product.ice || 'Normal'}`;
        
        setCart(prev => {
            // If we are editing, first remove the original item
            let updatedCart = [...prev];
            if (editingItem) {
                updatedCart = updatedCart.filter(item => item.cartKey !== editingItem.cartKey);
            }

            const existing = updatedCart.find(item => item.cartKey === itemKey);
            if (existing) {
                return updatedCart.map(item => 
                    item.cartKey === itemKey ? { ...item, qty: item.qty + (product.qty || 0) } : item
                );
            }
            return [...updatedCart, { ...product, cartKey: itemKey, qty: product.qty || 1 }];
        });
        
        if (!editingItem) showToast(`Added ${product.name} to cart!`);
        if (editingItem) {
            setSkipCartAnimation(true); // Instant open after edit
            setIsCartOpen(true); // Return to sidebar after edit
        }
        setEditingItem(null); // Clear editing state after add/update
    };

    const removeFromCart = (cartKey) => {
        setCart(prev => prev.filter(item => item.cartKey !== cartKey));
    };

    const updateCartQty = (cartKey, newQty) => {
        if (newQty < 1) {
            removeFromCart(cartKey);
            return;
        }
        setCart(prev => prev.map(item => 
            item.cartKey === cartKey ? { ...item, qty: newQty } : item
        ));
    };

    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    const subtotal = cart.reduce((acc, item) => {
        const priceNum = parseFloat(item.price.replace('$', ''));
        return acc + (priceNum * item.qty);
    }, 0);
    const finalTotal = subtotal * 1.1; // 10% tax included

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
            
            {/* Multi-Toast Container */}
            <div className="fixed top-24 right-6 z-[200] flex flex-col gap-4 pointer-events-none">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast 
                            message={toast.message} 
                            isVisible={true} 
                            onClose={() => removeToast(toast.id)} 
                        />
                    </div>
                ))}
            </div>

            {/* Checkout Payment Modal */}
            <CheckoutModal 
                isOpen={isCheckoutOpen} 
                onClose={() => setIsCheckoutOpen(false)} 
                total={finalTotal}
                onConfirm={handleCheckoutConfirm}
                tableName={tableName}
                customerName={customerName}
            />

            <main className="max-w-7xl mx-auto px-1 pt-14 md:pt-28 lg:py-32 pb-20 md:pb-32">
                




                {/* Menu Section */}
                <div id="menu">
                    <Menu onAddToCart={addToCart} searchQuery={searchQuery} editingItem={editingItem} setEditingItem={setEditingItem} />
                </div>

            </main>
        </div>
    )
}

export default App
