import {type ReactNode, useEffect, useState} from "react";
import type {User} from "../../types/user.ts";
import {AuthContext} from "./AuthContext.ts";
import {userService} from "../../services/userService.ts";

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const userData = await userService.getMe();
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

    const update = (newData: Partial<User>) => {
        setUser(prev => prev ? {...prev, ...newData} : null);
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout,
            update,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
