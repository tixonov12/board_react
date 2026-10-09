import CourseList from "../Course/CourseList.tsx";
import Heading from "../UI/Typography/Heading.tsx";

export default function HomePage() {
    return (
        <>
            <Heading className="mb-5 text-center">Мои курсы</Heading>
            <CourseList/>
        </>
    );
}
