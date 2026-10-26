import {useAuth} from "../../../hooks/useAuth.ts";
import MyNavLink from "./MyNavLink.tsx";
import UserMenu from "../UserMenu/UserMenu.tsx";
import Bars from "../../UI/Icons/Bars.tsx";
import {useEffect, useState} from "react";
import {clsx} from "clsx";
import Links from "./Links.tsx";

export default function Nav() {
    const {isAuthenticated} = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <nav className="flex justify-between items-center">
            <div className="sm:flex sm:items-center sm:gap-2">
                {isAuthenticated && (
                    <>
                        <div className="h-8 sm:hidden" onClick={() => setIsOpen(true)}>
                            <Bars/>
                        </div>

                        <div
                            className={clsx(
                                'sm:hidden fixed top-0 left-0 z-999',
                                'w-screen h-screen bg-black/50 backdrop-blur-xs',
                                'transition-opacity ease-in-out duration-300',
                                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
                            )}
                            onClick={() => setIsOpen(false)}
                        >
                            <div className={clsx(
                                'h-full w-[60%] bg-background p-3',
                                'flex flex-col gap-2',
                                '-translate-x-full transition-transform',
                                'ease-in-out duration-300',
                                isOpen && 'translate-x-0'
                            )}>
                                <Links/>
                            </div>
                        </div>

                        <div className="hidden sm:flex items-center gap-2">
                            <Links/>
                        </div>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2">
                {!isAuthenticated ? (
                    <MyNavLink to="/login">Вход</MyNavLink>
                ) : (
                    <UserMenu/>
                )}
            </div>
        </nav>
    );
}
