import {ToastContext} from "./ToastContext.ts";
import {type ReactNode, useCallback, useState} from "react";
import type {Toast as ToastProps, ToastType} from "../../types/toast.ts";
import {Toast} from "../../components/UI/Toast.tsx";

export const ToastProvider = ({children}: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const updateToast = useCallback((id: string, updates: Partial<Omit<ToastProps, 'id'>>) => {
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

    return (
        <ToastContext.Provider value={{toasts, addToast, updateToast, removeToast}}>
            {children}
            <Toast/>
        </ToastContext.Provider>
    );
}
