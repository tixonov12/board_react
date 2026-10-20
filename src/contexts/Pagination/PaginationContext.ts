import {createContext} from "react";

interface PaginationContextType {
    getPage: (key: string) => number;
    setPage: (key: string, page: number) => void;
}

export const PaginationContext = createContext<PaginationContextType | null>(null);
