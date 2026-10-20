import {useContext} from "react";
import {PaginationContext} from "../contexts/Pagination/PaginationContext.ts";

export const usePagination = () => {
    const context = useContext(PaginationContext);

    if (!context) {
        throw new Error('usePagination должен использоваться внутри PaginationProvider');
    }

    return context;
}
