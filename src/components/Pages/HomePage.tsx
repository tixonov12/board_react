import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";
import {useUserCourses} from "../../hooks/useCourses.ts";
import Pagination from "../UI/Pagination.tsx";

export default function HomePage() {
    const {data: courses, isLoading, currentPage, setCurrentPage} = useUserCourses();

    const totalPages = courses?.meta.last_page ?? 0;

    return (
        <>
            <Heading className="mb-5">Мои курсы</Heading>

            <CourseList
                courses={courses?.data ?? []}
                isLoading={isLoading}
                isUserCourses
            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={newPage => setCurrentPage(newPage)}
                className="mt-5"
            />
        </>
    );
}
