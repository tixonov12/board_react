import Nav from "./Nav/Nav.tsx";

export default function Header() {
    return (
        <header className="bg-white shadow-xs py-4">
            <div className="container mx-auto">
                <Nav/>
            </div>
        </header>
    );
}
