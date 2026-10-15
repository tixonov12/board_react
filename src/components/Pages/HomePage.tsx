import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";
import {Link} from "react-router";
import MyButton from "../UI/MyButton.tsx";
import Plus from "../UI/Icons/Plus.tsx";

export default function HomePage() {
    return (
        <>
            <div className="mb-5 flex justify-between items-center">
                <Heading>Мои курсы</Heading>

                <Link to="/courses/create">
                    <MyButton icon={<Plus/>} withIcon>
                        Добавить
                    </MyButton>
                </Link>
            </div>
            <CourseList/>
        </>
    );
}
