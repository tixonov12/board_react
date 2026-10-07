import {AnimatePresence, motion} from "motion/react";
import type {FieldError} from "react-hook-form";

interface ErrorProps {
    error?: FieldError;
}

export default function Error({error}: ErrorProps) {
    return (
        <AnimatePresence mode="wait">
            {error && (
                <motion.p
                    className="text-sm text-danger-600"
                    initial={{opacity: 0, translateY: -20}}
                    animate={{opacity: 1, translateY: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: .2, ease: 'easeInOut'}}
                >
                    {error.message}
                </motion.p>
            )}
        </AnimatePresence>
    );
}
