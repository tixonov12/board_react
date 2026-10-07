import type {JSX, ReactNode} from "react";
import {clsx} from "clsx";

type HeadingType = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
    level?: HeadingType;
    className?: string;
    children: ReactNode;
}

export default function Heading({level = 1, className, children}: HeadingProps) {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    const baseClasses = {
        1: 'text-3xl font-bold',
        2: 'text-2xl font-medium',
        3: 'text-lg',
        4: 'text-base',
        5: 'text-sm',
        6: 'text-xs',
    }[level];

    return <Tag className={clsx(baseClasses, className)}>{children}</Tag>
}
