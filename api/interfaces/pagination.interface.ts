interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export default PaginatedResult;