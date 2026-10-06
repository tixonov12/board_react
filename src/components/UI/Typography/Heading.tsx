import type {ReactNode} from "react";
import {clsx} from "clsx";

type HeadingType = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
    level?: HeadingType;
    className?: string;
    children: ReactNode;
}

export default function Heading({level = 1, className, children}: HeadingProps) {
    switch (level) {
        case 2:
            return <h2 className={clsx('text-xl font-medium', className)}>{children}</h2>
    }
}
