import {clsx} from "clsx";
import {AnimatePresence, motion} from "motion/react";
import {useEffect, useRef, useState} from "react";
import {useAuth, useLogout} from "../../../hooks/useAuth.ts";
import Person from "../../UI/Icons/Person.tsx";
import UserMenuNav from "./UserMenuNav.tsx";
import ArrowRightFromSquare from "../../UI/Icons/ArrowRightFromSquare.tsx";

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const {mutate: logout} = useLogout();
    const {user} = useAuth();

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;

            if (menuRef.current && !menuRef.current.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div
            className={clsx(
                `w-10 h-10 rounded-full relative`,
                'bg-primary-400 bg-center bg-cover bg-no-repeat',
                !isOpen && 'cursor-pointer',
            )}
            style={{
                backgroundImage: user?.avatar ? `url('${user.avatar}')` : 'none',
            }}
            onClick={() => setIsOpen(!isOpen)}
            ref={menuRef}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={clsx(
                            'absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2',
                            'bg-white shadow-sm rounded-standard p-3',
                            'flex flex-col gap-2',
                            '*:cursor-pointer',
                        )}
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0}}
                    >
                        <UserMenuNav to="/profile" icon={<Person/>}>
                            Профиль
                        </UserMenuNav>

                        <button
                            type="button"
                            className="text-left text-danger-500 flex items-center gap-1.5"
                            onClick={() => logout()}
                        >
                            <div className="w-4 h-4">
                                <ArrowRightFromSquare/>
                            </div>

                            Выйти
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
