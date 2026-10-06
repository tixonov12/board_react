import {useCourses} from "../../hooks/useCourses.ts";
import CourseCard from "./CourseCard.tsx";
import Skeleton from "react-loading-skeleton";

export default function CourseList() {
    const {data: courses, isLoading} = useCourses();

    if (!courses || isLoading) return (
        <section className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-4 bg-white rounded-lg p-5 shadow-xs">
                    <div>
                        <Skeleton height={28}/>
                        <Skeleton height={24}/>
                    </div>

                    <div>
                        <div>
                            <Skeleton height={6}/>
                            <Skeleton width={114} height={24}/>
                        </div>

                        <div className="flex justify-end">
                            <Skeleton width={89} height={32}/>
                        </div>
                    </div>

                    <Skeleton height={36}/>
                </div>
            ))}
        </section>
    );

    return (
        <section className="grid grid-cols-2 gap-4">
            {courses.map(course => (
                <CourseCard
                    key={course.id}
                    courseId={course.id}
                    name={course.name}
                    totalTasks={course.total_tasks}
                    completedTasks={course.completed_tasks}
                />
            ))}
        </section>
    );
}
