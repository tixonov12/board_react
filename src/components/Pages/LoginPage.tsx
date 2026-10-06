import MyInput from "../UI/Form/MyInput.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import MyButton from "../UI/Buttons/MyButton.tsx";
import type {LoginData} from "../../types/auth.ts";
import {authService} from "../../services/authService.ts";
import {useAuth} from "../../hooks/useAuth.ts";
import MyForm from "../UI/Form/MyForm.tsx";

export default function LoginPage() {
    const {login} = useAuth();
    const {register, handleSubmit} = useForm<LoginData>();

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        const user = await authService.login(data);
        login(user);
    };

    return (
        <MyForm
            title="Вход"
            onSubmit={handleSubmit(onSubmit)}
        >
            <MyInput
                label="Логин"
                id="login"
                placeholder="ivan"
                {...register('login')}
            />

            <MyInput
                label="Пароль"
                type="password"
                id="password"
                placeholder="•••••••••••"
                {...register('password')}
            />

            <MyButton type="submit">Вход</MyButton>
        </MyForm>
    );
}
