import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Book, GetBooksResponse} from "../interfaces/book.interface.ts";
import "../styles/Style.css"
import port from "../src/config.ts"
import SearchForm from "./SearchForm.tsx";
import AddBookForm from "./AddBookForm.tsx";
import EditForm from "./EditForm.tsx";
import {SearchOptions} from "../interfaces/search.interface.ts";


const Books: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = (): Promise<void> => {
        return axios.get<GetBooksResponse>(`http://localhost:${port}/api/v1/books`)
            .then(response => {
                const result = response.data;
                setBooks(result.data);
                setTotalPages(result.total_pages);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    };

    const fetchSearchResult = (filters: SearchOptions): Promise<void> => {
        const queryParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryParams.append(key, String(value));
            }
        });

        return axios
            .get<GetBooksResponse>(`http://localhost:${port}/api/v1/books?${queryParams.toString()}`)
            .then((response) => {
                const result = response.data;
                setBooks(result.data); // Funkcja ustawiająca książki w stanie
                setTotalPages(result.total_pages); // Funkcja ustawiająca liczbę stron
            })
            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    };

    const deleteBook = async (book_id: string) => {
        axios.delete(`http://localhost:${port}/api/v1/books/${book_id}`)
            .then(response => {
                console.log(response);
                fetchBooks();
            })
            .catch(error => {
                console.error(error);
            });
    }



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
        <div className = "main">
            <h2>BookKeep - notatnik do książek</h2>
                <div className="options">
                    <SearchForm onApplyFilters={fetchSearchResult} currentFilters=
                        {{ search: '', genre: '', sort: 'createdAt', order: 'desc', limit: 10 }}></SearchForm>
                    <AddBookForm/>
                    <EditForm books={books}></EditForm>
                </div>
                <div>
                    <div className="books-grid">
                        {books.map((book: Book) => (
                            <div key={book._id} className="book-card">

                                <h3>{book.name}</h3>
                                <text>Autor: {book.author}<br/></text>
                                <text>Gatunek: {book.genre}<br/></text>
                                <text>Ocena: {book.rating}/10<br/></text>
                                <text>Status: <span className={book.is_read ? "read" : "not-read"}>
                                        {book.is_read ? "Przeczytana" : "Nieprzeczytana"}
                                    </span>
                                    <br/>
                                </text>
                                <text>Dodano: {formatDate(book.createdAt)}</text>
                                <div>
                                    <button>Edytuj książkę</button>
                                </div>
                                <div>
                                    <button onClick={() => deleteBook(book._id)}>Usuń książkę z kolekcji</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="pagination-button">
                            &laquo; Poprzednia
                        </button>

                        <span>
                            Strona {currentPage} z {totalPages}
                        </span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Następna &raquo;
                        </button>
                    </div>
                </div>

        </div>
    );
};

export default Books;
