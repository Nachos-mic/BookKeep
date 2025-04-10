interface SearchOptions {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    genre?: string;
    is_read?: boolean;
    min_rating?: number;
    max_rating?: number;
}

export default SearchOptions;