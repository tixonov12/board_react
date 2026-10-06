import {useAuth} from "../../../hooks/useAuth.ts";
import MyButton from "../../UI/Buttons/MyButton.tsx";
import MyNavLink from "./MyNavLink.tsx";
import {authService} from "../../../services/authService.ts";

export default function Nav() {
    const {user, logout} = useAuth();

    const handleLogout = async () => {
        await authService.logout();
        logout();
    }

    return (
        <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                {user && (
                    <MyNavLink to="/">Главная</MyNavLink>
                )}
            </div>

            <div>
                {!user ? (
                    <MyNavLink to="/login">Вход</MyNavLink>
                ) : (
                    <MyButton onClick={handleLogout} variant="danger">
                        Выйти
                    </MyButton>
                )}
            </div>
        </nav>
    );
}
