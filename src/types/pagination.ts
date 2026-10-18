export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        last_page: number;
    },
}
