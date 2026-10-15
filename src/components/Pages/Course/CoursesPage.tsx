import {useCourses} from "../../../hooks/useCourses.ts";
import Heading from "../../UI/Typography/Heading.tsx";
import CourseList from "../../Course/CourseList.tsx";

export default function CoursesPage() {
    const {data: courses, isLoading} = useCourses();

    return (
        <>
            <Heading className="mb-5">Все курсы</Heading>

            <CourseList
                courses={courses}
                isLoading={isLoading}
            />
        </>
    );
}
