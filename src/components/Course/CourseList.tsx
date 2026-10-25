import CourseCard from "./CourseCard.tsx";
import type {Course} from "../../types/course.ts";
import {useEffect, useRef} from "react";
import CourseListSkeleton from "./Skeletons/CourseListSkeleton.tsx";
import {AnimatePresence, motion} from "motion/react";

interface Props {
    courses: Course[] | undefined;
    isLoading: boolean;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isUserCourses?: boolean;
}

export default function CourseList({
                                       courses,
                                       isLoading,
                                       fetchNextPage,
                                       hasNextPage,
                                       isFetchingNextPage,
                                       isUserCourses = false
                                   }: Props) {
    const observerTarget = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {threshold: 1.0}
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (!courses?.length && isLoading) return <CourseListSkeleton isUserCourses={isUserCourses}/>;

    return (
        <>
            <section className="grid grid-cols-1 auto-rows-fr gap-4 xl:grid-cols-2">
                <AnimatePresence mode="popLayout">
                    {courses?.map(course => (
                        <motion.div
                            key={course.id}
                            layout
                        >
                            <CourseCard
                                courseId={course.id}
                                name={course.name}
                                totalTasks={course.total_tasks}
                                completedTasks={course.completed_tasks}
                                hasCourse={course.has_course}
                                isUserCourses={isUserCourses}
                                isDeleting={course.isDeleting}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </section>

            <div ref={observerTarget} className="mt-4">
                {isFetchingNextPage && <CourseListSkeleton isUserCourses={isUserCourses}/>}

                {!hasNextPage && courses && courses.length > 0 && (
                    <div className="text-gray-500 text-center">Больше нет курсов</div>
                )}
            </div>
        </>
    );
}
