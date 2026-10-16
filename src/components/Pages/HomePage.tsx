import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";
import {useUserCourses} from "../../hooks/useCourses.ts";

export default function HomePage() {
    const {data: courses, isLoading} = useUserCourses();

    return (
        <>
            <Heading className="mb-5">Мои курсы</Heading>

            <CourseList
                courses={courses}
                isLoading={isLoading}
                isUserCourses
            />
        </>
    );
}
