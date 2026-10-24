import CourseSkeleton from "./CourseSkeleton.tsx";

export default function CourseListSkeleton({isUserCourses}: { isUserCourses: boolean }) {
    const count = isUserCourses ? 6 : 10;

    return (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {[...Array(count)].map((_, i) => {
                return <CourseSkeleton key={i} isUserCourses={isUserCourses}/>;
            })}
        </section>
    );
}
