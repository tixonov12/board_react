import type {ButtonHTMLAttributes} from "react";
import {clsx} from "clsx";

type ButtonVariant = 'primary' | 'danger' | 'danger-outline' | 'success' | 'success-outline';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    isOnlyIcon?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-300 hover:bg-primary-400',
    danger: 'bg-danger-400 hover:bg-danger-500',
    'danger-outline': 'bg-white border border-gray-200 hover:bg-danger-400/40 hover:border-danger-400',
    success: 'bg-success-400 hover:bg-success-500',
    'success-outline': 'bg-white border border-gray-200 hover:bg-success-400/40 hover:border-success-400',
};

export default function MyButton({
                                     className,
                                     variant = 'primary',
                                     isOnlyIcon = false,
                                     type = 'button',
                                     children,
                                     ...rest
                                 }: MyButtonProps) {
    return (
        <button
            className={clsx(
                'flex justify-center items-center rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95',
                !isOnlyIcon ? 'px-3 py-1.5' : 'p-1',
                variantStyles[variant],
                className,
            )}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
}
