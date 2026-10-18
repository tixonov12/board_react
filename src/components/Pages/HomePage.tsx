import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";
import {useUserCourses} from "../../hooks/useCourses.ts";
import Pagination from "../UI/Pagination.tsx";
import {useState} from "react";

export default function HomePage() {
    const [page, setPage] = useState(1);

    const {data: courses, isLoading} = useUserCourses(page);

    const lastPage = courses?.meta.last_page ?? 0;

    return (
        <>
            <Heading className="mb-5">Мои курсы</Heading>

            <CourseList
                courses={courses?.data ?? []}
                isLoading={isLoading}
                isUserCourses
            />

            <Pagination
                page={page}
                setPage={setPage}
                lastPage={lastPage}
                className="mt-5"
            />
        </>
    );
}
