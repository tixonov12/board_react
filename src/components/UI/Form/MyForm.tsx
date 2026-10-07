import type {FormHTMLAttributes, ReactElement, ReactNode} from "react";
import Heading from "../Typography/Heading.tsx";
import {clsx} from "clsx";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    icon?: ReactElement;
    title?: string;
    subtitle?: string;
    iconClassName?: string;
    children: ReactNode;
}

export default function MyForm({icon, title, subtitle, iconClassName, children, ...rest}: FormProps) {
    return (
        <form
            className="flex flex-col gap-5 bg-white shadow-sm max-w-md rounded-standard mx-auto p-10"
            {...rest}
        >
            <div className="flex flex-col items-center gap-1.5">
                {icon && (
                    <div className={clsx(
                        'w-20 h-20 rounded-full bg-primary-300/50 p-5 text-primary-500',
                        iconClassName,
                    )}>
                        {icon}
                    </div>
                )}

                {title && <Heading level={2} className="text-primary-600">{title}</Heading>}
                {subtitle && <Heading level={3} className="text-primary-400">{subtitle}</Heading>}
            </div>

            {children}
        </form>
    );
}
