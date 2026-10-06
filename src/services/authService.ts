import api, {getCsrf} from "../lib/axios.ts";
import type {LoginData} from "../types/auth.ts";
import type {User} from "../types/user.ts";

export const authService = {
    getMe: async () => {
        const res = await api.get<User>('/me');
        return res.data;
    },
    login: async (data: LoginData) => {
        await getCsrf();
        const res = await api.post<User>('/login', data);
        return res.data;
    },
    logout: async () => {
        await api.post<void>('/logout');
    },
};
