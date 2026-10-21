import Loader from "./Loader.tsx";

export default function UpdateLoader() {
    return (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Loader size="2xs"/>
            <span className="hidden sm:block">Обновление...</span>
        </div>
    );
}
