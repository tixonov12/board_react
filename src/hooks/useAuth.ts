import {useContext} from "react";
import {AuthContext, type AuthContextType} from "../contexts/Auth/AuthContext.ts";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider');
    }

    return context;
};
