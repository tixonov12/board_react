import MyInput from "../UI/Form/MyInput.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../UI/MyButton.tsx";
import type {LoginData} from "../../types/auth.ts";
import {authService} from "../../services/authService.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import MyForm from "../UI/Form/MyForm.tsx";
import ArrowRightToSquare from "../UI/Icons/ArrowRightToSquare.tsx";
import Person from "../UI/Icons/Person.tsx";
import Lock from "../UI/Icons/Lock.tsx";
import MyCheckbox from "../UI/Form/MyCheckbox.tsx";
import {clsx} from "clsx";

export default function LoginPage() {
    const {login} = useAuth();
    const {register, handleSubmit, formState: {isSubmitting}} = useForm<LoginData>();

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        const user = await authService.login(data);
        login(user);
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
            />

            <MyInput
                label="Пароль"
                type="password"
                id="password"
                placeholder="Введите ваш пароль"
                icon={<Lock/>}
                {...register('password')}
            />

            <MyCheckbox label="Запомнить меня"/>

            <MyButton
                type="submit"
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                className={clsx('mx-auto w-full', isSubmitting && 'w-12.5!')}
            >
                Войти
            </MyButton>
        </MyForm>
    );
}
