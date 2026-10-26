import MyForm from "../UI/Form/MyForm.tsx";
import MyInput from "../UI/Form/MyInput.tsx";
import MyButton from "../UI/MyButton.tsx";
import {type SubmitHandler, type UseFormReturn} from "react-hook-form";
import type {EventInput} from "@fullcalendar/react";

interface Props {
    title: string;
    form: UseFormReturn<EventInput>;
    onSubmit: SubmitHandler<EventInput>;
    isLoading: boolean;
    onDelete?: () => void;
}

export default function EventForm({title, form, onSubmit, isLoading, onDelete}: Props) {
    return (
        <MyForm
            title={title}
            onSubmit={form.handleSubmit(onSubmit)}
            className="shadow-none! p-0!"
        >
            <MyInput
                label="Название события"
                id="title"
                placeholder="Введите название"
                {...form.register('title')}
                error={form.formState.errors.title}
            />

            <MyInput
                label="Начало события"
                id="start"
                type="datetime-local"
                {...form.register('start')}
                error={form.formState.errors.start}
            />

            <MyInput
                label="Конец события"
                id="end"
                type="datetime-local"
                {...form.register('end')}
                error={form.formState.errors.end}
            />

            <MyInput
                label="Цвет события"
                id="color"
                type="color"
                {...form.register('color')}
                error={form.formState.errors.color}
            />

            <div className="flex gap-2 *:flex-1">
                {onDelete && (
                    <MyButton
                        variant="danger"
                        onClick={onDelete}
                        disabled={isLoading}
                    >
                        Удалить
                    </MyButton>
                )}

                <MyButton
                    type="submit"
                    disabled={isLoading}
                >
                    {onDelete ? 'Сохранить' : 'Добавить'}
                </MyButton>
            </div>
        </MyForm>
    );
}
