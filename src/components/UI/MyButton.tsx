import type {ButtonHTMLAttributes} from "react";
import {clsx} from "clsx";
import Loader from "./Loader.tsx";

type ButtonVariant = 'primary' | 'danger' | 'danger-outline' | 'success' | 'success-outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isOnlyIcon?: boolean;
    isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-400 hover:not-disabled:bg-primary-500 disabled:bg-primary-400/50',
    danger: 'bg-danger-400 hover:not-disabled:bg-danger-500 disabled:bg-danger-400/50',
    'danger-outline': 'bg-white border border-gray-200 hover:not-disabled:bg-danger-400/40 hover:not-disabled:border-danger-400',
    success: 'bg-success-400 hover:not-disabled:bg-success-500 disabled:bg-success-400/50',
    'success-outline': 'bg-white border border-gray-200 hover:not-disabled:bg-success-400/40 hover:not-disabled:border-success-400',
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
};

export default function MyButton({
                                     className,
                                     variant = 'primary',
                                     size = 'md',
                                     isOnlyIcon = false,
                                     isLoading = false,
                                     type = 'button',
                                     children,
                                     ...rest
                                 }: MyButtonProps) {
    return (
        <button
            className={clsx(
                'flex justify-center items-center',
                'rounded-lg cursor-pointer outline-none',
                'transition-all duration-300',
                'hover:not-disabled:scale-105 active:not-disabled:scale-95',
                'focus-visible:ring-2 focus-visible:ring-primary-500',
                'disabled:cursor-not-allowed',
                !isOnlyIcon ? 'px-3 py-1.5' : 'p-1',
                variantStyles[variant],
                sizeStyles[size],
                className,
            )}
            type={type}
            {...rest}
        >
            {!isLoading
                ? children
                : <Loader size="xs"/>}
        </button>
    );
}
