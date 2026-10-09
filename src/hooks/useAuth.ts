import {useContext} from "react";
import {AuthContext, type AuthContextType} from "../contexts/Auth/AuthContext.ts";
import {useMutation} from "@tanstack/react-query";
import {authService} from "../services/authService.ts";
import type {LoginData} from "../types/auth.ts";
import type {User} from "../types/user.ts";
import type {AxiosError} from "axios";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }

    return context;
};

export const useLogin = () => {
    const {login} = useAuth();

    return useMutation<
        User,
        AxiosError<{ errors: Record<string, string[]> }>,
        LoginData
    >({
        mutationFn: (data: LoginData) => authService.login(data),
        onSuccess: (userData) => {
            login(userData);
        },
    });
};

export const useLogout = () => {
    const {logout} = useAuth();

    return useMutation({
        mutationFn: () => authService.logout(),
        onSuccess: () => {
            logout();
        },
    });
};
