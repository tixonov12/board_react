export interface CursorMeta {
    next_cursor?: string;
    prev_cursor?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: CursorMeta;
}
