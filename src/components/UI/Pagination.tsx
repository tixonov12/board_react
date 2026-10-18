import {clsx} from "clsx";
import type {Dispatch, SetStateAction} from "react";
import MyButton from "./MyButton.tsx";

interface PaginationProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    lastPage: number;
    className?: string;
}

export default function Pagination({page, setPage, lastPage, className}: PaginationProps) {
    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prev => Math.max(prev - 1, 1));
        }
    }

    const handleNextPage = () => {
        if (page < lastPage) {
            setPage(prev => Math.min(prev + 1, lastPage));
        }
    }

    if (lastPage <= 1) return null;

    return (
        <div className={clsx('flex justify-center items-center gap-5', className)}>
            <MyButton
                onClick={handlePrevPage}
                size="sm"
                disabled={page <= 1}
            >
                Назад
            </MyButton>

            <span className="">
                {page}
            </span>

            <MyButton
                onClick={handleNextPage}
                size="sm"
                disabled={page >= lastPage}
            >
                Вперед
            </MyButton>
        </div>
    );
}
