import {motion} from "motion/react";
import CourseControl from "./CourseControl.tsx";
import MyButton from "../UI/Buttons/MyButton.tsx";
import {useNavigate} from "react-router";
import Heading from "../UI/Typography/Heading.tsx";

interface CourseCardProps {
    courseId: number;
    name: string;
    totalTasks: number;
    completedTasks: number;
}

export default function CourseCard({courseId, name, totalTasks, completedTasks}: CourseCardProps) {
    const navigate = useNavigate();

    const completedPercentage = (totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0).toFixed(0);

    return (
        <div className="flex flex-col gap-4 bg-white rounded-lg p-5 shadow-xs">
            <div>
                <Heading level={2}>{name}</Heading>
                <p>Всего заданий: {totalTasks}</p>
            </div>

            <div>
                <div className="relative">
                    <div className="w-full h-1.5 bg-gray-300 rounded-full"/>
                    <motion.div
                        className="h-1.5 bg-blue-300 rounded-full absolute inset-0"
                        initial={{width: 0}}
                        animate={{width: `${completedPercentage}%`}}
                        transition={{duration: .5, delay: .2, ease: 'easeInOut'}}
                    />
                </div>

                <p>Выполнено: {completedPercentage}%</p>
            </div>

            <CourseControl
                courseId={courseId}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
            />

            <MyButton onClick={() => navigate(`/courses/${courseId}/edit`)}>
                Изменить
            </MyButton>
        </div>
    );
}
