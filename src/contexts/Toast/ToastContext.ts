import {createContext} from "react";
import type {Toast, ToastType} from "../../types/toast.ts";

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType) => string;
    updateToast: (id: string, updates: Partial<Omit<Toast, 'id'>>) => void;
    removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
