import {useToastContext} from "../../hooks/useToast.ts";

export const Toast = () => {
    const {toasts} = useToastContext();

    return (
        <div>
            {toasts.map(toast => (
                <div key={toast.id}>
                    <p>{toast.message}</p>
                </div>
            ))}
        </div>
    );
}
