import {useAddCompletedTask, useRemoveCompletedTask} from "../../hooks/useCourses.ts";
import MyButton from "../UI/MyButton.tsx";

interface CourseControlProps {
    courseId: number;
    totalTasks: number;
    completedTasks: number;
}

export default function CourseControl({courseId, totalTasks, completedTasks}: CourseControlProps) {
    const {mutate: add} = useAddCompletedTask(courseId);
    const {mutate: remove} = useRemoveCompletedTask(courseId);

    const handleDecrement = () => {
        if (completedTasks > 0) remove();
    }

    const handleIncrement = () => {
        if (completedTasks < totalTasks) add();
    }

    return (
        <div className="flex justify-between items-center bg-secondary-100 rounded-2xl px-4 py-2.5">
            <div className="text-sm font-medium uppercase text-gray-500">Выполнено</div>

            <div className="flex items-center gap-4">
                <MyButton
                    variant="danger-outline"
                    onClick={handleDecrement}
                    className="w-8 h-8 text-lg bg-white"
                >
                    -
                </MyButton>

                <span className="text-lg font-medium">{completedTasks}</span>

                <div>
                    <MyButton
                        variant="success-outline"
                        onClick={handleIncrement}
                        className="w-8 h-8 text-lg bg-white"
                    >
                        +
                    </MyButton>
                </div>
            </div>
        </div>
    );
}
