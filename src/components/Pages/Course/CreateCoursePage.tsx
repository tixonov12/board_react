import MyForm from "../../UI/Form/MyForm.tsx";
import MyButton from "../../UI/MyButton.tsx";
import MyInput from "../../UI/Form/MyInput.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {CourseData} from "../../../types/course.ts";
import {useCreateCourse} from "../../../hooks/useCourses.ts";
import {handleApiErrors} from "../../../utils/handleApiErrors.ts";
import {clsx} from "clsx";

export default function CreateCoursePage() {
    const {register, handleSubmit, formState: {errors}, setError} = useForm<CourseData>();
    const {mutate: create, isPending} = useCreateCourse();

    const onSubmit: SubmitHandler<CourseData> = (data) => {
        create(data, {
            onError: (error) => handleApiErrors(error, setError),
        });
    }

    return (
        <MyForm
            title="Создать курс"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MyInput
                label="Название курса"
                id="name"
                placeholder="Введите название курса"
                error={errors.name}
                {...register('name')}
            />

            <MyInput
                label="Всего заданий"
                id="total_tasks"
                placeholder="Введите количество заданий"
                type="number"
                min={0}
                error={errors.total_tasks}
                {...register('total_tasks')}
            />

            <MyButton
                type="submit"
                isLoading={isPending}
                disabled={isPending}
                className={clsx('mx-auto', isPending ? 'w-12.5' : 'w-full')}
            >
                Создать
            </MyButton>
        </MyForm>
    );
}
