import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
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

interface ApiResponse {
    data: Book[];
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

const Books: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async (): Promise<void> => {
        try {
            const response = await axios.get<ApiResponse>('http://localhost:3100/api/v1/books');
            const result = response.data;

                setBooks(result.data);
                setTotalPages(result.total_pages);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);

        }
    };

    const handlePageChange = (newPage: number): void => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL');
    };

    return (
        <div className="books-container">
            <h2>BookKeep - notatnik do książek</h2>

                <>
                    <div className="books-grid">
                        {books.map((book: Book) => (
                            <div key={book._id} className="book-card">
                                <h3 className="book-title">{book.name}</h3>
                                <p className="book-author">Autor: {book.author}</p>
                                <p className="book-genre">Gatunek: {book.genre}</p>
                                <div className="book-rating">
                                    Ocena: <span className="rating-value">{book.rating}/10</span>
                                </div>
                                <div className="book-status">
                                    Status: <span className={book.is_read ? "read" : "not-read"}>
                                        {book.is_read ? "Przeczytana" : "Nieprzeczytana"}
                                    </span>
                                </div>
                                <div className="book-date">
                                    Dodano: {formatDate(book.createdAt)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-button"
                        >
                            &laquo; Poprzednia
                        </button>

                        <span className="page-info">
                            Strona {currentPage} z {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                        >
                            Następna &raquo;
                        </button>
                    </div>
                </>

        </div>
    );
};

export default Books;
