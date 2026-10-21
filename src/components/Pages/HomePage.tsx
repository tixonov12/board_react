import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";
import {useUserCourses} from "../../hooks/useCourses.ts";
import Pagination from "../UI/Pagination.tsx";
import UpdateLoader from "../UI/Loader/UpdateLoader.tsx";

export default function HomePage() {
    const {data: courses, isLoading, isFetching, currentPage, setCurrentPage} = useUserCourses();

    const totalPages = courses?.meta.last_page ?? 0;

    return (
        <>
            <div className="flex items-center gap-3 mb-5">
                <Heading>Мои курсы</Heading>

                {isFetching && !isLoading && (
                    <UpdateLoader/>
                )}
            </div>

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
