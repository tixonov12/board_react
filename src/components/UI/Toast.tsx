import {useToast} from "../../hooks/useToast.ts";
import TriangleExclamation from "./Icons/TriangleExclamation.tsx";
import type {FC} from "react";
import {clsx} from "clsx";
import CircleCheck from "./Icons/CircleCheck.tsx";
import {AnimatePresence, motion} from "motion/react";
import Loader from "./Loader/Loader.tsx";
import XMark from "./Icons/XMark.tsx";
import type {ToastType} from "../../types/toast.ts";
import Paragraph from "./Typography/Paragraph.tsx";

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
    loading: {
        styles: 'bg-warning-400/40 border-warning-400',
    },
};

export const Toast = () => {
    const {toasts, removeToast} = useToast();

    return (
        <div className="fixed bottom-5 right-5 flex flex-col items-end gap-3">
            <AnimatePresence>
                {toasts.map(toast => {
                    const config = toastConfig[toast.type];
                    const Icon = config.icon;

                    return (
                        <motion.div
                            key={toast.id}
                            className={clsx(
                                'max-w-125 w-fit backdrop-blur-xl rounded-standard border px-3 py-1.5 flex items-center gap-3',
                                config.styles,
                            )}
                            layout
                            initial={{opacity: 0, x: 'calc(100% + 20px)'}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: 'calc(100% + 20px)'}}
                            transition={{duration: .4}}
                        >
                            <span>
                                {Icon ? (
                                    <Icon/>
                                ) : toast.type === 'loading' ? (
                                    <Loader size="xs"/>
                                ) : null}
                            </span>

                            <Paragraph>{toast.message}</Paragraph>

                            <button
                                type="button"
                                onClick={() => removeToast(toast.id)}
                                className="cursor-pointer"
                            >
                                <XMark/>
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
