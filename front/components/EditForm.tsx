import React, { useState, useEffect } from 'react';
import { Book } from "../interfaces/book.interface";
import "../styles/Style.css";
import axios from "axios";
import port from "../src/config.ts";


const EditForm: React.FC<{books: Book[]}> = ({books}) => {
    const [bookID, setBookID] = useState<string>('');
    const [editBook, setEditBook] = useState({name: '', author: '', genre: '', rating: 0, is_read: false});


    useEffect(() => {
        if (bookID) {
            const selectedBook = books.find(book => book._id === bookID);
            if (selectedBook) {setEditBook({name: selectedBook.name, author: selectedBook.author,
                genre: selectedBook.genre, rating: selectedBook.rating, is_read: selectedBook.is_read
                });
            }
        }
    }, [bookID, books]);

    const handleBookSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBookID(e.target.value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setEditBook(prev => ({ ...prev, [name]: checkbox.checked }));
        } else if (type === 'number') {
            setEditBook(prev => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setEditBook(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmitNewBook = (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        return axios
            .put(`http://localhost:${port}/api/v1/books/${bookID}`, editBook)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Błąd podczas edycji książki:', error);
            });
    };

    return (
        <div className="form-container">
            <h2>Edytuj książkę</h2>
            <form onSubmit={handleSubmitNewBook}>
                <div className="form-group">
                    <label htmlFor="bookSelect">Wybierz książkę:</label>
                    <select id="bookSelect" value={bookID}
                        onChange={handleBookSelection}
                        required
                    >
                        <option value="">-- Wybierz książkę --</option>
                        {books.map(book => (
                            <option key={book._id} value={book._id}>
                                {book.name} - {book.author}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Nazwa książki:</label>
                    <input type="text" id="name" name="name" value={editBook.name || ''} onChange={handleChange}
                        placeholder="Nazwa książki"
                        disabled={!bookID}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Autor:</label>
                    <input type="text" id="author" name="author" value={editBook.author || ''} onChange={handleChange}
                           placeholder="Autor książki"
                        disabled={!bookID}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Gatunek:</label>
                    <input type="text" id="genre" name="genre" value={editBook.genre || ''} onChange={handleChange}
                        placeholder="Gatunek książki"
                        disabled={!bookID}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Ocena:</label>
                    <input type="number" id="rating" name="rating" value={editBook.rating || 0} onChange={handleChange}
                        placeholder="Ocena książki"
                        min="0"
                        max="10"
                        disabled={!bookID}
                    />
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input type="checkbox" name="is_read" checked={editBook.is_read || false} onChange={handleChange}
                            disabled={!bookID}
                        />
                        Czy została przeczytana ?
                    </label>
                </div>

                <button type="submit" disabled={!bookID}>
                    Edytuj książkę
                </button>
            </form>
        </div>
    );
};

export default EditForm;
