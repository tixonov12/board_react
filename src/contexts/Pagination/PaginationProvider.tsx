import {type ReactNode, useState} from "react";
import {PaginationContext} from "./PaginationContext";

interface PaginationState {
    [key: string]: number;
}

export const PaginationProvider = ({children}: { children: ReactNode }) => {
    const [pages, setPages] = useState<PaginationState>({});

    const getPage = (key: string) => pages[key] ?? 1;

    const setPage = (key: string, page: number) => {
        setPages(prev => ({...prev, [key]: page}));
    };

    return (
        <PaginationContext.Provider value={{getPage, setPage}}>
            {children}
        </PaginationContext.Provider>
    );
}
