import {clsx} from "clsx";

type LoaderSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg';

interface LoaderProps {
    size?: LoaderSize;
}

const sizeStyles: Record<LoaderSize, string> = {
    '2xs': 'w-4 h-4 border-2',
    xs: 'w-5 h-5 border-2',
    sm: 'w-6 h-6 border-3',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-5',
};

export default function Loader({size = 'md'}: LoaderProps) {
    return (
        <div className={clsx(
            'rounded-full border-primary-500 border-t-transparent animate-spin',
            sizeStyles[size],
        )}/>
    );
}
