import {useAuth, useLogout} from "../../../hooks/useAuth.ts";
import MyButton from "../../UI/MyButton.tsx";
import MyNavLink from "./MyNavLink.tsx";

export default function Nav() {
    const {isAuthenticated} = useAuth();
    const {mutate: logout, isPending} = useLogout();

    return (
        <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
                {isAuthenticated && (
                    <MyNavLink to="/">Главная</MyNavLink>
                )}
            </div>

            <div className="flex items-center gap-2">
                {!isAuthenticated ? (
                    <MyNavLink to="/login">Вход</MyNavLink>
                ) : (
                    <MyButton
                        variant="danger"
                        onClick={() => logout()}
                        isLoading={isPending}
                        disabled={isPending}
                    >
                        Выйти
                    </MyButton>
                )}
            </div>
        </nav>
    );
}
