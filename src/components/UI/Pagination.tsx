import {clsx} from "clsx";
import MyButton from "./MyButton.tsx";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function Pagination({currentPage, totalPages, onPageChange, className}: PaginationProps) {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    if (totalPages <= 1) return null;

    return (
        <div className={clsx('flex justify-center items-center gap-5', className)}>
            <MyButton
                onClick={handlePrevPage}
                size="sm"
                disabled={currentPage <= 1}
            >
                Назад
            </MyButton>

            <span className="">
                {currentPage} из {totalPages}
            </span>

            <MyButton
                onClick={handleNextPage}
                size="sm"
                disabled={currentPage >= totalPages}
            >
                Вперед
            </MyButton>
        </div>
    );
}
