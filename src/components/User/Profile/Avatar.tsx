import {clsx} from "clsx";
import Loader from "../../UI/Loader.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";
import type {AvatarData} from "../../../types/user.ts";
import {useSetAvatar} from "../../../hooks/useUser.ts";

interface AvatarProps {
    avatar?: string;
}

export default function Avatar({avatar}: AvatarProps) {
    const {register, handleSubmit} = useForm<AvatarData>();
    const {mutate: setAvatar, isPending} = useSetAvatar();

    const onSubmit: SubmitHandler<AvatarData> = (data) => {
        if (!data.avatar?.[0]) return;

        const formData = new FormData();
        formData.append('avatar', data.avatar[0]);

        setAvatar(formData);
    }

    return (
        <div
            className={clsx(
                'w-32 h-32 rounded-full relative bg-primary-400 bg-center bg-cover bg-no-repeat',
            )}
            style={{backgroundImage: `url('${avatar}')`}}
        >
            {isPending ? (
                <div className="absolute inset-0 bg-black/50 rounded-full flex justify-center items-center">
                    <Loader/>
                </div>
            ) : (
                <input
                    type="file"
                    id="avatar"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    {...register('avatar')}
                    onChange={(e) => {
                        register('avatar').onChange(e);
                        handleSubmit(onSubmit)()
                    }}
                />
            )}
        </div>
    );
}
