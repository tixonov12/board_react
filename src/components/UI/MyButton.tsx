import type {ButtonHTMLAttributes} from "react";
import {clsx} from "clsx";

type ButtonVariant = 'primary' | 'danger' | 'success';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-primary-300 hover:bg-primary-400',
    danger: 'bg-danger-400 hover:bg-danger-500',
    success: 'bg-success-400 hover:bg-success-500',
};

export default function MyButton({className, variant = 'primary', type = 'button', children, ...rest}: MyButtonProps) {
    return (
        <button
            className={clsx(
                'flex justify-center items-center rounded-lg px-3 py-1.5 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95',
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
