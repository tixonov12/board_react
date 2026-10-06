import {clsx} from "clsx";

type CounterButtonType = 'plus' | 'minus';

interface CounterButtonProps {
    type: CounterButtonType;
    onClick: () => void;
}

export default function CounterButton({type, onClick}: CounterButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                'w-8 h-8 flex justify-center items-center rounded-md text-lg cursor-pointer',
                type === 'plus' ? 'bg-green-300' : 'bg-red-300',
            )}
        >
            {type === 'plus' ? '+' : '-'}
        </button>
    );
}
