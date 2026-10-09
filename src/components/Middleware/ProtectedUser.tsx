import {useAuth} from "../../hooks/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router";

export default function ProtectedUser() {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace/>
    }

    return <Outlet/>;
}
