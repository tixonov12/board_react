import CounterButton from "../UI/Buttons/CounterButton.tsx";
import {useAddCompletedTask, useRemoveCompletedTask} from "../../hooks/useCourses.ts";

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
            <CounterButton type="minus" onClick={handleDecrement}/>
            <span>{completedTasks}</span>
            <CounterButton type="plus" onClick={handleIncrement}/>
        </div>
    );
}
