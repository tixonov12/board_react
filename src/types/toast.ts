export type ToastType = 'info' | 'success' | 'danger' | 'loading';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}
