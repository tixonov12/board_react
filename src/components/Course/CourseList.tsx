import {useCourses} from "../../hooks/useCourses.ts";
import CourseCard from "./CourseCard.tsx";
import Skeleton from "react-loading-skeleton";

export default function CourseList() {
    const {data: courses, isLoading} = useCourses();

    if (!courses || isLoading) return (
        <section className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-xs">
                    <div className="flex justify-between items-center">
                        <Skeleton width={50} height={24} className="text-sm font-medium px-2.5 py-0.5"/>
                        <Skeleton width={28} height={28} className="p-1"/>
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <Skeleton height={28} className="text-xl font-medium"/>
                        <Skeleton width={130} height={24}/>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center font-medium">
                            <Skeleton width={70} height={28}/>
                            <Skeleton width={25} height={28}/>
                        </div>

                        <div>
                            <Skeleton height={10}/>
                        </div>
                    </div>

                    <Skeleton height={52} className="px-4 py-2.5"/>
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
