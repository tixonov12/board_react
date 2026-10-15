import MyForm from "../../UI/Form/MyForm.tsx";
import MyButton from "../../UI/MyButton.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {AddCourseData} from "../../../types/course.ts";
import {useAddCourse, useCourses} from "../../../hooks/useCourses.ts";
import MySelect from "../../UI/Form/MySelect.tsx";
import {handleApiErrors} from "../../../utils/handleApiErrors.ts";
import Skeleton from "react-loading-skeleton";

export default function CreateCourseFormPage() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<AddCourseData>();
    const {data: courses, isLoading} = useCourses();
    const {mutate: create} = useAddCourse();

    const onSubmit: SubmitHandler<AddCourseData> = (data) => {
        create(data, {
            onError: (error) => handleApiErrors(error, setError),
        });
    }

    if (!courses || isLoading) return (
        <MyForm title="Добавить курс">
            <div className="flex flex-col gap-1">
                <Skeleton width={150} height={20}/>
                <Skeleton height={40}/>
            </div>

            <MyButton>
                Добавить
            </MyButton>
        </MyForm>
    );

    return (
        <MyForm
            title="Добавить курс"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MySelect
                label="Курс"
                id="course"
                placeholder="Выберите курс"
                error={errors.course_id}
                {...register('course_id')}
            >
                {courses.map(course => (
                    <option key={course.id} value={course.id}>
                        {course.name}
                    </option>
                ))}
            </MySelect>

            <MyButton type="submit">Добавить</MyButton>
        </MyForm>
    );
}
