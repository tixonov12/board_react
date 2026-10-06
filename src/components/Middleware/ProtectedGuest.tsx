import {useAuth} from "../../hooks/useAuth.ts";
import {Navigate, Outlet, useLocation} from "react-router";

export default function ProtectedGuest() {
    const {user} = useAuth();
    const location = useLocation();

    if (user) {
        return <Navigate to="/" state={{from: location}} replace/>
    }

    return <Outlet/>;
}
