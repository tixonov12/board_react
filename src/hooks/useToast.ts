import {useContext} from "react";
import {ToastContext} from "../contexts/Toast/ToastContext.ts";

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast должен использоваться внутри ToastProvider');
    }

    return context;
}
