import CourseCard from "./CourseCard.tsx";
import type {Course} from "../../types/course.ts";
import Skeleton from "../UI/Skeleton.tsx";

interface CourseListProps {
    courses: Course[] | undefined;
    isLoading: boolean;
    isUserCourses?: boolean;
}

export default function CourseList({courses, isLoading, isUserCourses = false}: CourseListProps) {
    if (!courses || isLoading) return (
        isUserCourses ? (
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-xs">
                        <div className="flex justify-between items-center">
                            <Skeleton width={50} height={24}/>

                            <div className="flex items-center gap-2">
                                <Skeleton width={28} height={28}/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <Skeleton width={450} height={32}/>
                            <Skeleton width={130} height={24}/>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <Skeleton width={70} height={28}/>
                                <Skeleton width={25} height={28}/>
                            </div>

                            <div>
                                <Skeleton height={10}/>
                            </div>
                        </div>

                        <Skeleton height={52}/>
                    </div>
                ))}
            </section>
        ) : (
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-xs">
                        <div className="flex justify-between items-center">
                            <Skeleton width={50} height={24}/>

                            <div className="flex items-center gap-2">
                                <Skeleton width={28} height={28}/>
                                <Skeleton width={28} height={28}/>
                                <Skeleton width={28} height={28}/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <Skeleton width={450} height={32}/>
                            <Skeleton width={130} height={24}/>
                        </div>
                    </div>
                ))}
            </section>
        )
    );

    return (
        <section className="grid grid-cols-1 auto-rows-fr gap-4 xl:grid-cols-2">
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    courseId={course.id}
                    name={course.name}
                    totalTasks={course.total_tasks}
                    completedTasks={course.completed_tasks}
                    hasCourse={course.has_course}
                    isUserCourses={isUserCourses}
                />
            ))}
        </section>
    );
}
