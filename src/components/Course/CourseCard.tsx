import {motion} from "motion/react";
import CourseControl from "./CourseControl.tsx";
import MyButton from "../UI/MyButton.tsx";
import {useNavigate} from "react-router";
import Heading from "../UI/Typography/Heading.tsx";
import Badge from "../UI/Badge.tsx";
import Pencil from "../UI/Icons/Pencil.tsx";
import TrashBin from "../UI/Icons/TrashBin.tsx";
import {useDeleteCourse, useJoinCourse, useLeaveCourse} from "../../hooks/useCourses.ts";
import Plus from "../UI/Icons/Plus.tsx";
import {useMemo} from "react";

interface CourseCardProps {
    courseId: number;
    name: string;
    totalTasks: number;
    completedTasks?: number;
    hasCourse?: boolean;
    isUserCourses?: boolean;
}

export default function CourseCard({
                                       courseId,
                                       name,
                                       totalTasks = 0,
                                       completedTasks = 0,
                                       hasCourse,
                                       isUserCourses = false,
                                   }: CourseCardProps) {
    const navigate = useNavigate();
    const {mutate: destroy} = useDeleteCourse(courseId);
    const {mutate: leave} = useLeaveCourse(courseId);
    const {mutate: join} = useJoinCourse(courseId);

    const completedPercentage = useMemo(() => {
        if (!totalTasks || !completedTasks) return 0;

        return Math.round((completedTasks / totalTasks) * 100);
    }, [completedTasks, totalTasks]);

    const handleDelete = () => {
        const confirm = window.confirm('Вы уверены, что хотите удалить курс?');

        if (!confirm) return;

        if (isUserCourses) {
            leave();
        } else {
            destroy();
        }
    }

    return (
        <div className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-xs">
            <div className="flex justify-between items-center">
                <Badge>Курс</Badge>

                <div className="flex items-center gap-2">
                    {!isUserCourses && (
                        <>
                            {!hasCourse && (
                                <MyButton
                                    onClick={() => join()}
                                    className="text-gray-600 bg-transparent w-7 h-7 hover:text-white"
                                    variant="success"
                                    isOnlyIcon
                                >
                                    <Plus/>
                                </MyButton>
                            )}

                            <MyButton
                                onClick={() => navigate(`/courses/${courseId}/edit`)}
                                className="text-gray-600 bg-transparent w-7 h-7 hover:text-white"
                                isOnlyIcon
                            >
                                <Pencil/>
                            </MyButton>
                        </>
                    )}

                    <MyButton
                        onClick={handleDelete}
                        className="text-gray-600 bg-transparent w-7 h-7 hover:text-white"
                        variant="danger"
                        isOnlyIcon
                    >
                        <TrashBin/>
                    </MyButton>
                </div>
            </div>

            <div className="flex flex-col gap-0.5">
                <Heading level={2} className="line-clamp-1">{name}</Heading>

                <p>
                    <span className="text-gray-600">Всего заданий: </span>
                    {totalTasks}
                </p>
            </div>

            {isUserCourses && (
                <>
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
                </>
            )}
        </div>
    );
}
