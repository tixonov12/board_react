import {type ReactNode, useEffect, useState} from "react";
import type {User} from "../../types/user.ts";
import {AuthContext} from "./AuthContext.ts";
import {authService} from "../../services/authService.ts";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const userData = await authService.getMe();
                setUser(userData);
            } catch (e) {
                console.error('Session check failed:', e);
            }
        };

        checkSession();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
