import MyInput from "../../UI/Form/MyInput.tsx";
import MyButton from "../../UI/Buttons/MyButton.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {CourseData} from "../../../types/course.ts";
import {useCourse, useUpdateCourse} from "../../../hooks/useCourses.ts";
import {useNavigate, useParams} from "react-router";
import Loader from "../../UI/Loader.tsx";
import MyForm from "../../UI/Form/MyForm.tsx";

export default function EditCourseFormPage() {
    const navigate = useNavigate();

    const {courseId} = useParams();
    const id = Number(courseId);

    const {data: course, isLoading} = useCourse(id);
    const {mutate} = useUpdateCourse(id);

    const {register, handleSubmit} = useForm<CourseData>({values: course});

    const onSubmit: SubmitHandler<CourseData> = (data) => {
        mutate(data);
        navigate('/');
    }

    if (!course || isLoading) return <Loader/>;

    return (
        <MyForm
            title="Редактирование курса"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MyInput
                label="Название курса"
                id="name"
                placeholder="Введите название курса"
                {...register('name')}
            />

            <MyInput
                label="Всего заданий"
                id="total_tasks"
                type="number"
                placeholder="Введите количество заданий"
                {...register('total_tasks')}
            />

            <MyButton type="submit" className="w-fit mx-auto">
                Изменить
            </MyButton>
        </MyForm>
    );
}
