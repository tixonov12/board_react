import {type InputHTMLAttributes, useState} from "react";
import {clsx} from "clsx";
import Check from "../Icons/Check.tsx";
import {motion} from "motion/react";

interface MyCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export default function MyCheckbox({label, ...rest}: MyCheckboxProps) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <input type="checkbox" className="peer sr-only" {...rest} onChange={e => setIsChecked(e.target.checked)}/>

            <motion.span
                className={clsx(
                    'w-4 h-4 bg-primary-300/15 rounded text-white',
                    'flex justify-center items-center',
                    'ring-2 ring-primary-300/50',
                    'peer-checked:bg-primary-400 peer-checked:ring-primary-400',
                    'peer-focus-visible:ring-primary-400',
                )}
                animate={{
                    scaleX: isChecked ? [1, 1.25, .75, 1.15, .95, 1.05, 1] : 1,
                    scaleY: isChecked ? [1, .75, 1.25, .85, 1.05, .95, 1] : 1,
                }}
                transition={{
                    duration: 0.6,
                    times: [0, .3, .4, .5, .65, .75, 1],
                    ease: 'easeInOut',
                }}
            >
                <motion.span
                    initial={{opacity: 0}}
                    animate={{opacity: isChecked ? 1 : 0}}
                    transition={{duration: .3}}
                >
                    <Check/>
                </motion.span>
            </motion.span>

            <span className="text-sm text-primary-600">{label}</span>
        </label>
    );
}
