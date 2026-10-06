import CourseList from "../Course/CourseList.tsx";

export default function HomePage() {
    return (
        <>
            <h1 className="mb-5 text-2xl font-semibold">Мои курсы</h1>
            <CourseList/>
        </>
    );
}
