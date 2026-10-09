import {type ReactNode, useEffect, useState} from "react";
import type {User} from "../../types/user.ts";
import {AuthContext} from "./AuthContext.ts";
import {authService} from "../../services/authService.ts";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const userData = await authService.getMe();
                setUser(userData);
            } catch (e) {
                console.error('Session check failed:', e);
            } finally {
                setIsLoading(false);
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
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
