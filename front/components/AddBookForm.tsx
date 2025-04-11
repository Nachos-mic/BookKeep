import React, { useState } from 'react';
import "../styles/Style.css"
import {NewBook} from "../interfaces/book.interface"
import axios from "axios";
import port from "../src/config";

const AddBookForm: React.FC = () => {
    const [book, setBook] = useState<NewBook>({name: '', author: '', genre: '', rating: 5, is_read: false});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setBook((prev) => ({ ...prev, [name]: target.checked }));
        } else if (type === 'number') {
            setBook((prev) => ({ ...prev, [name]: parseFloat(value) }));
        } else {
            setBook((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmitBook = (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        return axios
            .post(`http://localhost:${port}/api/v1/books`, book)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Błąd podczas dodawania książki:', error);
            });
    };

    return (
        <div className="form-container">
            <h2>Dodaj książkę</h2>
            <form onSubmit={handleSubmitBook}>

                <div className="form-group">
                    <label htmlFor="name">Nazwa książki:</label>
                    <input type="text" id="name" name="name" value={book.name || ''}
                           onChange={handleChange}
                           placeholder="Nazwa ksiażki"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Autor:</label>
                    <input type="text" id="author" name="author" value={book.author || ''}
                           onChange={handleChange}
                           placeholder="Autor książki"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Gatunek:</label>
                    <input type="text" id="genre" name="genre" value={book.genre || ''}
                           onChange={handleChange}
                           placeholder="Gatunek książki"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Ocena:</label>
                    <input type="number" id="rating" name="rating" value={book.rating || ''}
                           onChange={handleChange}
                           placeholder="Ocena książki w skali 1-10"
                    />
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input type="checkbox" name="is_read" checked={book.is_read || false}
                               onChange={handleChange}
                        />
                        Czy została przeczytana ?
                    </label>
                </div>

                <button type="submit">
                    Dodaj ksiażkę do kolekcji
                </button>
            </form>
        </div>
    );
};

export default AddBookForm;
