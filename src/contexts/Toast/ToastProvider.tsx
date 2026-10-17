import {useToast} from "../../hooks/useToast.ts";
import {ToastContext} from "./ToastContext.ts";
import {Toast} from "../../components/UI/Toast.tsx";
import type {ReactNode} from "react";

export const ToastProvider = ({children}: { children: ReactNode }) => {
    const {toasts, addToast, removeToast} = useToast();

    return (
        <ToastContext.Provider value={{toasts, addToast, removeToast}}>
            {children}
            <Toast/>
        </ToastContext.Provider>
    );
}
