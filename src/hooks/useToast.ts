import {useCallback, useContext, useState} from "react";
import {ToastContext} from "../contexts/Toast/ToastContext.ts";

export type ToastType = 'info' | 'success' | 'danger' | 'loading';

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

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const updateToast = useCallback((id: string, updates: Partial<Omit<Toast, 'id'>>) => {
        setToasts(prev => prev.map(t => {
            if (t.id === id) {
                const updatedToast = {...t, ...updates};

                if (updatedToast.type !== 'loading') {
                    setTimeout(() => {
                        removeToast(id);
                    }, 3000);
                }

                return updatedToast;
            }

            return t;
        }));
    }, [removeToast]);

    const addToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = `${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 9)}`;
        setToasts(prev => [...prev, {id, message, type}]);

        if (type !== 'loading') {
            setTimeout(() => {
                removeToast(id);
            }, 3000);
        }

        return id;
    }, [removeToast]);

    return {toasts, addToast, updateToast, removeToast};
}
