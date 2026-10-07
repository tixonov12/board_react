import {motion} from "motion/react";
import CourseControl from "./CourseControl.tsx";
import MyButton from "../UI/MyButton.tsx";
import {useNavigate} from "react-router";
import Heading from "../UI/Typography/Heading.tsx";
import Badge from "../UI/Badge.tsx";
import Pencil from "../UI/Icons/Pencil.tsx";

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
        <div className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-xs">
            <div className="flex justify-between items-center">
                <Badge>Курс</Badge>

                <MyButton
                    onClick={() => navigate(`/courses/${courseId}/edit`)}
                    className="text-gray-600 bg-transparent w-7 h-7"
                    isOnlyIcon
                >
                    <Pencil/>
                </MyButton>
            </div>

            <div className="flex flex-col gap-0.5">
                <Heading level={2}>{name}</Heading>

                <p>
                    <span className="text-gray-600">Всего заданий: </span>
                    {totalTasks}
                </p>
            </div>

            <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center font-medium">
                    <span>Прогресс</span>
                    <span className="text-lg">{completedPercentage}%</span>
                </div>

                <div className="relative">
                    <div className="w-full h-2.5 bg-secondary-100 rounded-full"/>
                    <motion.div
                        className="h-2.5 bg-primary-300 rounded-full absolute inset-0"
                        initial={{width: 0}}
                        animate={{width: `${completedPercentage}%`}}
                        transition={{duration: .5, delay: .2, ease: 'easeInOut'}}
                    />
                </div>
            </div>

            <CourseControl
                courseId={courseId}
                totalTasks={totalTasks}
                completedTasks={completedTasks}
            />
        </div>
    );
}
