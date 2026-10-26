import {useAuth} from "../../../hooks/useAuth.ts";
import {clsx} from "clsx";
import Heading from "../../UI/Typography/Heading.tsx";
import Avatar from "./Avatar.tsx";
import Skeleton from "../../UI/Skeleton.tsx";

export default function Profile() {
    const {user, isLoading} = useAuth();

    if (!user || isLoading) return (
        <section className={clsx(
            'max-w-2xs m-auto p-5',
            'bg-white shadow-xs rounded-standard',
            'flex flex-col items-center gap-2',
        )}>
            <Skeleton width={128} height={128} className="rounded-full!"/>
            <Skeleton width={150} height={32}/>
        </section>
    );

    return (
        <section className={clsx(
            'max-w-2xs m-auto p-5',
            'bg-white shadow-xs rounded-standard',
            'flex flex-col items-center gap-2',
        )}>
            <Avatar avatar={user.avatar}/>

            <Heading level={2}>
                {user.login}
            </Heading>
        </section>
    );
}
