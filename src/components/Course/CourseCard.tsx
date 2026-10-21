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
import {useMemo, useState} from "react";
import Modal from "../UI/Modal.tsx";
import {clsx} from "clsx";
import Paragraph from "../UI/Typography/Paragraph.tsx";

interface CourseCardProps {
    courseId: number;
    name: string;
    totalTasks: number;
    completedTasks: number;
    hasCourse: boolean;
    isUserCourses?: boolean;
    isDeleting?: boolean;
}

export default function CourseCard({
                                       courseId,
                                       name,
                                       totalTasks,
                                       completedTasks,
                                       hasCourse,
                                       isUserCourses = false,
                                       isDeleting = false,
                                   }: CourseCardProps) {
    const navigate = useNavigate();
    const {mutate: destroy} = useDeleteCourse(courseId);
    const {mutate: leave} = useLeaveCourse(courseId);
    const {mutate: join} = useJoinCourse(courseId);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const completedPercentage = useMemo(() => {
        if (!totalTasks || !completedTasks) return 0;
        return Math.round((completedTasks / totalTasks) * 100);
    }, [completedTasks, totalTasks]);

    const handleDelete = () => {
        setIsModalOpen(false);

        if (isUserCourses) {
            leave();
        } else {
            destroy();
        }
    }

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="flex flex-col gap-5"
            >
                <div>
                    <p className="md:text-lg font-medium">
                        Вы уверены, что хотите удалить курс?
                    </p>

                    <p className="text-xs md:text-sm">
                        После удаления курс будет невозможно восстановить
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <MyButton
                        onClick={() => setIsModalOpen(false)}
                    >
                        Отмена
                    </MyButton>

                    <MyButton
                        onClick={handleDelete}
                        variant="danger"
                        icon={<TrashBin/>}
                        withIcon
                    >
                        Удалить
                    </MyButton>
                </div>
            </Modal>

            <div className={clsx(
                'flex flex-col gap-3 md:gap-5 bg-white rounded-2xl p-5 shadow-xs',
                isDeleting && 'opacity-50 pointer-events-none',
            )}>
                <div className="flex justify-between items-center">
                    <Badge>Курс</Badge>

                    <div className="flex items-center gap-2">
                        {!isUserCourses && (
                            <>
                                {!hasCourse && (
                                    <MyButton
                                        onClick={() => join()}
                                        className="text-gray-600 bg-transparent w-6.5 h-6.5 md:w-7 md:h-7 hover:text-white"
                                        variant="success"
                                        isOnlyIcon
                                    >
                                        <Plus/>
                                    </MyButton>
                                )}

                                <MyButton
                                    onClick={() => navigate(`/courses/${courseId}/edit`)}
                                    className="text-gray-600 bg-transparent w-6.5 h-6.5 md:w-7 md:h-7 hover:text-white"
                                    isOnlyIcon
                                >
                                    <Pencil/>
                                </MyButton>
                            </>
                        )}

                        <MyButton
                            onClick={() => setIsModalOpen(true)}
                            className="text-gray-600 bg-transparent w-6.5 h-6.5 md:w-7 md:h-7 hover:text-white"
                            variant="danger"
                            isOnlyIcon
                        >
                            <TrashBin/>
                        </MyButton>
                    </div>
                </div>

                <div className="flex flex-col gap-0.5">
                    <Heading
                        level={2}
                        className="whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                        {name}
                    </Heading>

                    <Paragraph>
                        <span className="text-gray-600">Всего заданий: </span>
                        {totalTasks}
                    </Paragraph>
                </div>

                {isUserCourses && (
                    <>
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center font-medium">
                                <span className="text-sm md:text-base">Прогресс</span>
                                <span className="md:text-lg">{completedPercentage}%</span>
                            </div>

                            <div className="relative">
                                <div className="w-full h-2 md:h-2.5 bg-secondary-100 rounded-full"/>
                                <motion.div
                                    className="h-2 md:h-2.5 bg-primary-300 rounded-full absolute inset-0"
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
        </>
    );
}
