import {createContext} from "react";
import {type Toast} from "../../hooks/useToast.ts";

interface ToastContextType {
    toasts: Toast[];
    addToast: (message: string) => void;
    removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);
