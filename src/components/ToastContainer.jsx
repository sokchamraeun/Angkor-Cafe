import React from 'react';
import Toast from './Toast';

const ToastContainer = ({ toasts, removeToast }) => {
    return (
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
    );
};

export default ToastContainer;
