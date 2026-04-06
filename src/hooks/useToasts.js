import { useState } from 'react';

export const useToasts = () => {
    const [toasts, setToasts] = useState([]);

    const showToast = (message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return {
        toasts,
        showToast,
        removeToast
    };
};
