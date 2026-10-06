import {NavLink} from "react-router";
import type {ReactNode} from "react";
import {clsx} from "clsx";

interface MyNavLinkProps {
    to: string;
    children: ReactNode;
}

export default function MyNavLink({to, children}: MyNavLinkProps) {
    return (
        <NavLink
            to={to}
            className={({isActive}) => clsx(
                'rounded-lg py-1.5 px-3 transition-colors duration-300',
                isActive ? 'bg-blue-300' : 'hover:bg-blue-200',
            )}
        >
            {children}
        </NavLink>
    );
}
