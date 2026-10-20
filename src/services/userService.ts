import api from "../lib/axios.ts";
import type {User} from "../types/user.ts";

export const userService = {
    getMe: async () => {
        const res = await api.get<User>('/me');
        return res.data;
    },
    setAvatar: async (data: FormData) => {
        const res = await api.post<{ avatar: string }>('/me/avatar', data);
        return res.data;
    },
};
