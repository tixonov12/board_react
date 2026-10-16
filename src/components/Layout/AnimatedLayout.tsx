import {motion} from "motion/react";
import type {ReactNode} from "react";

export default function AnimatedLayout({children}: { children: ReactNode }) {
    return (
        <motion.div
            initial={{opacity: 0, scale: .95}}
            animate={{opacity: 1, scale: 1, transition: {duration: .5, ease: 'easeInOut'}}}
            exit={{opacity: 0, scale: 1.05, transition: {duration: .2}}}
        >
            {children}
        </motion.div>
    );
}
