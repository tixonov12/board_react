import type {ReactNode} from "react";
import {clsx} from "clsx";
import {AnimatePresence, motion} from "motion/react";

interface ModalProps {
    isOpen: boolean;
    className?: string;
    onClose: () => void;
    children: ReactNode;
}

export default function Modal({isOpen, onClose, className, children}: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={clsx(
                        'w-full h-full bg-black/60 backdrop-blur-xs',
                        'fixed top-0 left-0 z-999',
                        'flex justify-center items-center',
                        isOpen ? 'block' : 'hidden',
                    )}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    onClick={onClose}
                >
                    <motion.div
                        className={clsx('bg-white rounded-standard p-5', className)}
                        initial={{scale: .8, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        exit={{scale: .8, opacity: 0}}
                        transition={{type: 'spring', damping: 25, stiffness: 300}}
                        onClick={e => e.stopPropagation()}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
