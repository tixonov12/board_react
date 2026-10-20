import type {ReactNode} from "react";
import {Link} from "react-router";

interface UserMenuNavProps {
    to: string;
    icon: ReactNode;
    children: ReactNode;
}

export default function UserMenuNav({to, icon, children}: UserMenuNavProps) {
    return (
        <Link to={to} className="flex items-center gap-1.5">
            <div className="w-4 h-4">
                {icon}
            </div>

            <span>{children}</span>
        </Link>
    );
}
