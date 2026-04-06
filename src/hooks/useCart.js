import { useState } from 'react';

export const useCart = (showToast) => {
    const [cart, setCart] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [skipCartAnimation, setSkipCartAnimation] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setSkipCartAnimation(false);
        setIsCartOpen(!isCartOpen);
    };

    const handleEditCartItem = (item) => {
        setSkipCartAnimation(true);
        setEditingItem(item);
        setIsCartOpen(false);
    };

    const addToCart = (product) => {
        const itemKey = `${product.id}-${product.size || 'M'}-${product.sugar || '100%'} -${product.ice || 'Normal'}`;
        
        setCart(prev => {
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
        
        if (!editingItem && showToast) showToast(`Added ${product.name} to cart!`);
        if (editingItem) {
            setSkipCartAnimation(true);
            setIsCartOpen(true);
        }
        setEditingItem(null);
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

    const clearCart = () => {
        setCart([]);
    };

    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    const subtotal = cart.reduce((acc, item) => {
        const priceNum = parseFloat(item.price.replace('$', ''));
        return acc + (priceNum * item.qty);
    }, 0);
    const finalTotal = subtotal * 1.1; // 10% tax

    return {
        cart,
        setCart,
        editingItem,
        setEditingItem,
        skipCartAnimation,
        setSkipCartAnimation,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        handleEditCartItem,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartCount,
        subtotal,
        finalTotal
    };
};
