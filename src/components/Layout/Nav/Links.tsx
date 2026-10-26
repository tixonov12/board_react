import MyNavLink from "./MyNavLink.tsx";

export default function Links() {
    return (
        <>
            <MyNavLink to="/">Главная</MyNavLink>
            <MyNavLink to="/courses">Курсы</MyNavLink>
            <MyNavLink to="/calendar">Календарь</MyNavLink>
        </>
    );
}
