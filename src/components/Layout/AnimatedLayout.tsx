import {motion} from "motion/react";
import type {ReactNode} from "react";

export default function AnimatedLayout({children}: { children: ReactNode }) {
    return (
        <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0, transition: {duration: .18, ease: 'easeOut'}}}
            exit={{opacity: 0, y: -10, transition: {duration: .12}}}
        >
            {children}
        </motion.div>
    );
}
