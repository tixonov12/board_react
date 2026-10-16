interface SkeletonProps {
    width?: number | string;
    height?: number | string;
}

export default function Skeleton({width, height}: SkeletonProps) {
    const style = {
        width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
        height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
    };

    return (
        <div
            className="animate-pulse bg-gray-200 rounded-md"
            style={style}
        />
    );
}
