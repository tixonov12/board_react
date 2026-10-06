import {clsx} from "clsx";

type LoaderSize = 'sm' | 'md';

interface LoaderProps {
    size?: LoaderSize;
}

export default function Loader({size = 'sm'}: LoaderProps) {
    return (
        <div className="flex justify-center items-center">
            <div className={clsx(
                'rounded-full border-gray-300 border-t-blue-300 animate-spin',
                size === 'sm' ? 'w-8 h-8 border-4' : 'w-12 h-12 border-5',
            )}/>
        </div>
    );
}
