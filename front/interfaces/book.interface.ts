export interface Book {
    _id: string;
    name: string;
    author: string;
    is_read: boolean;
    genre: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetBooksResponse {
    data: Book[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export interface NewBook {
    name: string;
    author: string;
    is_read: boolean;
    genre: string;
    rating: number;
}

