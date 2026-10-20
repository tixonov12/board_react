import {useMutation} from "@tanstack/react-query";
import {userService} from "../services/userService.ts";
import type {AxiosError} from "axios";
import {useAuth} from "./useAuth.ts";

export const useSetAvatar = () => {
    const {update} = useAuth();

    return useMutation<
        { avatar: string },
        AxiosError<{ errors?: Record<string, string[]> }>,
        FormData
    >({
        mutationKey: ['users', 'avatar'],
        mutationFn: (data) => userService.setAvatar(data),
        onSuccess: (newData) => {
            update({avatar: newData.avatar});
        },
    });
}
