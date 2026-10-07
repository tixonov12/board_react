import MyInput from "../UI/Form/MyInput.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../UI/MyButton.tsx";
import type {LoginData} from "../../types/auth.ts";
import {useLogin} from "../../hooks/useAuth.ts";
import MyForm from "../UI/Form/MyForm.tsx";
import ArrowRightToSquare from "../UI/Icons/ArrowRightToSquare.tsx";
import Person from "../UI/Icons/Person.tsx";
import Lock from "../UI/Icons/Lock.tsx";
import MyCheckbox from "../UI/Form/MyCheckbox.tsx";
import {clsx} from "clsx";
import {handleApiErrors} from "../../utils/handleApiErrors.ts";

export default function LoginPage() {
    const {mutate, isPending} = useLogin();
    const {register, handleSubmit, setError, formState: {errors}} = useForm<LoginData>();

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        mutate(data, {
            onError: (error) => {
                if (error.response?.status === 401) {
                    setError('root', {message: 'Неверный логин или пароль'});
                }

                handleApiErrors(error, setError);
            },
        });
    };

    return (
        <MyForm
            icon={<ArrowRightToSquare/>}
            iconClassName="pr-6"
            title="Добро пожаловать"
            subtitle="Войдите в свой аккаунт"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MyInput
                label="Логин"
                id="login"
                placeholder="Введите ваш логин"
                icon={<Person/>}
                {...register('login')}
                error={errors.login}
            />

            <MyInput
                label="Пароль"
                type="password"
                id="password"
                placeholder="Введите ваш пароль"
                icon={<Lock/>}
                {...register('password')}
                error={errors.password}
            />

            <MyCheckbox
                label="Запомнить меня"
                {...register('remember_me')}
            />

            {errors.root && (
                <p className="text-center text-sm text-danger-600">
                    {errors.root.message}
                </p>
            )}

            <MyButton
                type="submit"
                size="lg"
                isLoading={isPending}
                disabled={isPending}
                className={clsx('mx-auto w-full', isPending && 'w-12.5! h-10')}
            >
                Войти
            </MyButton>
        </MyForm>
    );
}
