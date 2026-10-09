import {useAuth} from "../../hooks/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router";

export default function ProtectedGuest() {
    const {isAuthenticated} = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Outlet/>;
    }

    return <Navigate to="/" state={{from: location}} replace/>
}
