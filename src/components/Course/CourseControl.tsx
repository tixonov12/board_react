import {useAddCompletedTask, useRemoveCompletedTask} from "../../hooks/useCourses.ts";
import MyButton from "../UI/MyButton.tsx";
import Plus from "../UI/Icons/Plus.tsx";
import Minus from "../UI/Icons/Minus.tsx";

interface CourseControlProps {
    courseId: number;
    totalTasks: number;
    completedTasks: number;
}

export default function CourseControl({courseId, totalTasks, completedTasks}: CourseControlProps) {
    const {mutate: add} = useAddCompletedTask(courseId);
    const {mutate: remove} = useRemoveCompletedTask(courseId);

    const canIncrement = completedTasks < totalTasks;
    const canDecrement = completedTasks > 0;

    const handleDecrement = () => {
        if (!canDecrement) return;
        remove();
    }

    const handleIncrement = () => {
        if (!canIncrement) return;
        add();
    }

    return (
        <div className="flex justify-between items-center bg-secondary-100 rounded-2xl px-4 py-2.5">
            <div className="text-xs md:text-sm font-medium uppercase text-gray-500">Выполнено</div>

            <div className="flex items-center gap-3 md:gap-4">
                <MyButton
                    variant="danger-outline"
                    onClick={handleDecrement}
                    disabled={!canDecrement}
                    className="w-7.5 h-7.5 md:w-8 md:h-8 bg-white p-2"
                    isOnlyIcon
                >
                    <Minus/>
                </MyButton>

                <span className="md:text-lg font-medium">
                    {completedTasks}
                </span>

                <MyButton
                    variant="success-outline"
                    onClick={handleIncrement}
                    disabled={!canIncrement}
                    className="w-7.5 h-7.5 md:w-8 md:h-8 bg-white p-2"
                    isOnlyIcon
                >
                    <Plus/>
                </MyButton>
            </div>
        </div>
    );
}
