import {clsx} from "clsx";

interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}

export default function Skeleton({width, height, className}: SkeletonProps) {
    const style = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
    };

    return (
        <div
            className={clsx('animate-pulse bg-gray-200 rounded-md', className)}
            style={style}
        />
    );
}
