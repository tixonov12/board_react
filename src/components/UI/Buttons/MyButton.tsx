import type {ButtonHTMLAttributes} from "react";
import {clsx} from "clsx";

type ButtonVariant = 'primary' | 'danger';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
}

export default function MyButton({className, variant = 'primary', type = 'button', children, ...rest}: MyButtonProps) {
    return (
        <button
            className={clsx(
                'rounded-lg px-3 py-1.5 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95',
                className,
                variant === 'primary'
                    ? 'bg-blue-300 hover:bg-blue-400'
                    : 'bg-red-300 hover:bg-red-400',
            )}
            type={type}
            {...rest}
        >
            {children}
        </button>
    );
}
