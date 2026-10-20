import Heading from "../UI/Typography/Heading.tsx";
import MyButton from "../UI/MyButton.tsx";
import {Link} from "react-router";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center gap-3">
            <div className="text-7xl font-bold">404</div>
            <Heading level={2}>Страница не найдена</Heading>

            <Link to="/">
                <MyButton>Вернуться на главную</MyButton>
            </Link>
        </div>
    );
}
