import type {InputHTMLAttributes} from "react";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    placeholder: string;
}

export default function MyInput({label, id, placeholder, type = 'text', ...rest}: MyInputProps) {
    return (
        <div className="flex flex-col gap-0.5">
            <label htmlFor={id} className="text-sm">
                {label}
            </label>

            <input
                className="bg-background outline-none rounded-lg px-2.5 py-2 transition-shadow duration-300 focus:ring-2 focus:ring-primary-300"
                type={type}
                id={id}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
}
