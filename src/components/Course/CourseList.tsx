import {useCourses} from "../../hooks/useCourses.ts";
import CourseCard from "./CourseCard.tsx";
import Loader from "../UI/Loader.tsx";

export default function CourseList() {
    const {data: courses, isLoading} = useCourses();

    if (isLoading) return <Loader/>;
    if (!courses) return null;

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
