import type {InputHTMLAttributes, ReactElement} from "react";
import {clsx} from "clsx";
import type {FieldError} from "react-hook-form";
import Error from "./Error.tsx";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    placeholder: string;
    icon?: ReactElement;
    error?: FieldError;
}

export default function MyInput({
                                    label,
                                    id,
                                    placeholder,
                                    icon,
                                    error,
                                    type = 'text',
                                    ...rest
                                }: MyInputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-medium text-primary-600">
                {label}
            </label>

            <div className="relative">
                {icon && (
                    <div className="w-4 h-4 absolute top-1/2 left-5 -translate-1/2 text-primary-400">
                        {icon}
                    </div>
                )}

                <input
                    className={clsx(
                        'w-full bg-primary-300/15 outline-none rounded-xl px-3 py-2',
                        'ring-2 ring-primary-300/50',
                        'transition-all duration-500',
                        'focus:ring-primary-400 focus:bg-white',
                        'placeholder:text-primary-300',
                        icon && 'pl-10',
                    )}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    {...rest}
                />
            </div>

            <Error error={error}/>
        </div>
    );
}
