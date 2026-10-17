import {createContext} from "react";
import {type Toast, type ToastType} from "../../hooks/useToast.ts";

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
