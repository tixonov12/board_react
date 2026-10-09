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
            className={clsx(
                'group outline-none rounded-lg px-3 py-1.5',
                'transition-shadow duration-300',
                'focus-visible:ring focus-visible:ring-primary-500',
            )}
        >
            {({isActive}) => (
                <>
                    {children}
                    <div className={clsx(
                        'h-0.5 mx-auto bg-primary-300 rounded-full transition-all duration-500',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full',
                    )}/>
                </>
            )}
        </NavLink>
    );
}
