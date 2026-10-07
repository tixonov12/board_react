import {clsx} from "clsx";

type LoaderSize = 'xs' | 'sm' | 'md';

interface LoaderProps {
    size?: LoaderSize;
}

const sizeStyles: Record<LoaderSize, string> = {
    xs: 'w-6 h-6 border-3',
    sm: 'w-8 h-8 border-4',
    md: 'w-12 h-12 border-5',
};

export default function Loader({size = 'sm'}: LoaderProps) {
    return (
        <div className={clsx(
            'rounded-full border-gray-300 border-t-primary-500 animate-spin',
            sizeStyles[size],
        )}/>
    );
}
