import type {FormHTMLAttributes, ReactNode} from "react";
import Heading from "../Typography/Heading.tsx";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    children: ReactNode;
}

export default function MyForm({title, children, ...rest}: FormProps) {
    return (
        <form
            className="flex flex-col gap-4 bg-white shadow-sm max-w-2xl rounded-lg mx-auto p-5"
            {...rest}
        >
            {title && <Heading level={2} className="text-center">{title}</Heading>}

            {children}
        </form>
    );
}
