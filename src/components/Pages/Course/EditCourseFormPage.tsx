import MyInput from "../../UI/Form/MyInput.tsx";
import MyButton from "../../UI/MyButton.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {CourseData} from "../../../types/course.ts";
import {useCourse, useUpdateCourse} from "../../../hooks/useCourses.ts";
import {useParams} from "react-router";
import MyForm from "../../UI/Form/MyForm.tsx";
import Skeleton from "react-loading-skeleton";
import {clsx} from "clsx";
import {handleApiErrors} from "../../../utils/handleApiErrors.ts";

export default function EditCourseFormPage() {
    const {courseId} = useParams();
    const id = Number(courseId);

    const {data: course, isLoading} = useCourse(id);
    const {mutate: update, isPending} = useUpdateCourse(id);

    const {register, handleSubmit, formState: {errors}, setError} = useForm<CourseData>({values: course});

    const onSubmit: SubmitHandler<CourseData> = (data) => {
        update(data, {
            onError: (error) => {
                handleApiErrors(error, setError);
            },
        });
    }

    if (!course || isLoading) return (
        <MyForm title="Редактирование курса">
            <div className="flex flex-col gap-1">
                <Skeleton width={150} height={20}/>
                <Skeleton height={40}/>
            </div>

            <div className="flex flex-col gap-1">
                <Skeleton width={150} height={20}/>
                <Skeleton height={40}/>
            </div>

            <MyButton className="w-full">
                Изменить
            </MyButton>
        </MyForm>
    );

    return (
        <>
            <MyForm
                title="Редактирование курса"
                onSubmit={handleSubmit(onSubmit)}
            >
                <MyInput
                    label="Название курса"
                    id="name"
                    placeholder="Введите название курса"
                    {...register('name')}
                    error={errors.name}
                />

                <MyInput
                    label="Всего заданий"
                    id="total_tasks"
                    type="number"
                    placeholder="Введите количество заданий"
                    min={0}
                    {...register('total_tasks')}
                    error={errors.total_tasks}
                />

                <MyButton
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    className={clsx('mx-auto', isPending ? 'w-12.5' : 'w-full')}
                >
                    Изменить
                </MyButton>
            </MyForm>
        </>
    );
}
