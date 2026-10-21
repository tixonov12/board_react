import type {ReactNode} from "react";
import {clsx} from "clsx";

interface ParagraphProps {
    className?: string;
    children: ReactNode;
}

export default function Paragraph({className, children}: ParagraphProps) {
    return (
        <p className={clsx(
            'text-sm md:text-base',
            className,
        )}>
            {children}
        </p>
    );
}
