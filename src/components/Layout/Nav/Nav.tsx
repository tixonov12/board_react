import {useAuth} from "../../../hooks/useAuth.ts";
import MyNavLink from "./MyNavLink.tsx";
import UserMenu from "../UserMenu/UserMenu.tsx";

export default function Nav() {
    const {isAuthenticated} = useAuth();

    return (
        <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                {isAuthenticated && (
                    <>
                        <MyNavLink to="/">Главная</MyNavLink>
                        <MyNavLink to="/courses">Курсы</MyNavLink>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2">
                {!isAuthenticated ? (
                    <MyNavLink to="/login">Вход</MyNavLink>
                ) : (
                    <UserMenu/>
                )}
            </div>
        </nav>
    );
}
