import {useCallback, useContext, useState} from "react";
import {ToastContext} from "../contexts/Toast/ToastContext.ts";

export type ToastType = 'info' | 'success' | 'danger';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

export const useToastContext = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToastContext должен использоваться внутри ToastProvider');
    }

    return context;
}

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(7);
        setToasts(prev => [...prev, {id, message, type}]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return {toasts, addToast, removeToast};
}
