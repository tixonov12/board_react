import type {ButtonHTMLAttributes} from "react";
import {clsx} from "clsx";

type ButtonVariant = 'primary' | 'danger' | 'success';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-blue-300 hover:bg-blue-400',
    danger: 'bg-red-300 hover:bg-red-400',
    success: 'bg-green-300 hover:bg-green-400',
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
