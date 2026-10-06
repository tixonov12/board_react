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
        <div className="flex justify-end items-center gap-2">
            <MyButton variant="danger" onClick={handleDecrement} className="w-8 h-8">-</MyButton>
            <span>{completedTasks}</span>
            <MyButton variant="success" onClick={handleIncrement} className="w-8 h-8">+</MyButton>
        </div>
    );
}
