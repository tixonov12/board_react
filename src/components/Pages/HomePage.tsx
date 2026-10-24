import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";
import {useUserCourses} from "../../hooks/useCourses.ts";

export default function HomePage() {
    const {courses, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = useUserCourses();

    return (
        <>
            <Heading className="mb-5">Мои курсы</Heading>

            <CourseList
                courses={courses}
                isLoading={isLoading}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                isUserCourses
            />
        </>
    );
}
