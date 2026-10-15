import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";
import {Link} from "react-router";
import MyButton from "../UI/MyButton.tsx";
import Plus from "../UI/Icons/Plus.tsx";
import {useUserCourses} from "../../hooks/useCourses.ts";

export default function HomePage() {
    const {data: courses, isLoading} = useUserCourses();

    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <Heading>Мои курсы</Heading>

                <Link to="/my/courses/add">
                    <MyButton icon={<Plus/>} withIcon>
                        Добавить
                    </MyButton>
                </Link>
            </div>

            <CourseList
                courses={courses}
                isLoading={isLoading}
                isUserCourses
            />
        </>
    );
}
