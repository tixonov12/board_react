import Skeleton from "../../UI/Skeleton.tsx";

export default function CourseSkeleton({isUserCourses}: { isUserCourses: boolean }) {
    return (
        <div className="flex flex-col gap-5 bg-white rounded-2xl p-5 shadow-xs">
            <div className="flex justify-between items-center">
                <Skeleton width={50} height={24}/>

                <div className="flex items-center gap-2">
                    <Skeleton width={28} height={28}/>

                    {!isUserCourses && (
                        <>
                            <Skeleton width={28} height={28}/>
                            <Skeleton width={28} height={28}/>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-0.5">
                <Skeleton height={32}/>
                <Skeleton width={130} height={24}/>
            </div>

            {isUserCourses && (
                <>
                    <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                            <Skeleton width={70} height={28}/>
                            <Skeleton width={25} height={28}/>
                        </div>

                        <div>
                            <Skeleton height={10}/>
                        </div>
                    </div>

                    <Skeleton height={52}/>
                </>
            )}
        </div>
    );
}
