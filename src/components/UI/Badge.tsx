import type {ReactNode} from "react";

export default function Badge({children}: { children: ReactNode }) {
    return (
        <span className="text-sm font-medium text-primary-400 bg-primary-300/20 px-2.5 py-0.5 rounded-full">
            {children}
        </span>
    );
}
