export interface SearchOptions {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    genre?: string;
    is_read?: boolean;
}

export interface FilterProps {
    onApplyFilters: (filters: SearchOptions) => void;
    currentFilters: SearchOptions;
}