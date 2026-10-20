import Heading from "../UI/Typography/Heading.tsx";
import Profile from "../User/Profile/Profile.tsx";

export default function ProfilePage() {
    return (
        <>
            <Heading className="text-center mb-5">
                Профиль
            </Heading>

            <Profile/>
        </>
    );
}
