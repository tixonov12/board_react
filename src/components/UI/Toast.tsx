import {type ToastType, useToastContext} from "../../hooks/useToast.ts";
import TriangleExclamation from "./Icons/TriangleExclamation.tsx";
import type {FC} from "react";
import {clsx} from "clsx";
import CircleCheck from "./Icons/CircleCheck.tsx";
import {AnimatePresence, motion} from "motion/react";

interface ToastConfig {
    icon?: FC;
    styles: string;
}

const toastConfig: Record<ToastType, ToastConfig> = {
    info: {
        styles: 'bg-primary-400/40 border-primary-400',
    },
    success: {
        icon: CircleCheck,
        styles: 'bg-success-400/40 border-success-400',
    },
    danger: {
        icon: TriangleExclamation,
        styles: 'bg-danger-400/40 border-danger-400',
    },
};

export const Toast = () => {
    const {toasts} = useToastContext();

    return (
        <div className="fixed bottom-5 left-5 flex flex-col gap-3">
            <AnimatePresence>
                {toasts.map(toast => {
                    const config = toastConfig[toast.type];
                    const Icon = config.icon;

                    return (
                        <motion.div
                            key={toast.id}
                            className={clsx(
                                'backdrop-blur-xl rounded-standard border px-3 py-1.5 flex items-center gap-2',
                                config.styles,
                            )}
                            layout
                            initial={{opacity: 0, x: 'calc(-100% - 20px)'}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 'calc(-100% - 20px)'}}
                            transition={{duration: .4}}
                        >
                            {Icon && (
                                <div className="h-full">
                                    <Icon/>
                                </div>
                            )}
                            <p>{toast.message}</p>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
