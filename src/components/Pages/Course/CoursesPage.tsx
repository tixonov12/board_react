import {useCourses} from "../../../hooks/useCourses.ts";
import Heading from "../../UI/Typography/Heading.tsx";
import CourseList from "../../Course/CourseList.tsx";
import {Link} from "react-router";
import MyButton from "../../UI/MyButton.tsx";
import Plus from "../../UI/Icons/Plus.tsx";
import Pagination from "../../UI/Pagination.tsx";
import {useState} from "react";

export default function CoursesPage() {
    const [page, setPage] = useState(1);

    const {data: courses, isLoading} = useCourses(page);

    const lastPage = courses?.meta.last_page ?? 0;

    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <Heading>Все курсы</Heading>

                <Link to="/courses/create">
                    <MyButton icon={<Plus/>} withIcon>
                        Создать
                    </MyButton>
                </Link>
            </div>

            <CourseList
                courses={courses?.data ?? []}
                isLoading={isLoading}
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
