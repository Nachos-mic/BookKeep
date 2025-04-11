import React, { useState } from 'react';
import {SearchOptions , FilterProps} from "../interfaces/search.interface.ts";
import "../styles/Style.css"

const SearchForm: React.FC<FilterProps> = ({ onApplyFilters, currentFilters }) => {
    const [filters, setFilters] = useState<SearchOptions>(currentFilters);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checkbox = e.target as HTMLInputElement;
            setFilters((prev) => ({ ...prev, [name]: checkbox.checked }));
        } else {
            setFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApplyFilters(filters);
    };

    return (
        <div className="form-container">
            <h2>Wyszukaj książkę</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="search">Nazwa książki:</label>
                    <input type="text" id="search" name="search" value={filters.search || ''}
                           onChange={handleChange}
                           placeholder="Wyszukaj książkę..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Gatunek:</label>
                    <input type="text" id="genre" name="genre" value={filters.genre || ''}
                           onChange={handleChange}
                           placeholder="Gatunek książki"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="sort">Sortuj według:</label>
                    <select id="sort" name="sort" value={filters.sort || 'createdAt'} onChange={handleChange}
                    >
                        <option value="createdAt">Data dodania</option>
                        <option value="title">Tytuł</option>
                        <option value="author">Autor</option>
                        <option value="rating">Ocena</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="order">Kolejność:</label>
                    <select id="order" name="order" value={filters.order || 'desc'} onChange={handleChange}
                    >
                        <option value="desc">Malejąco</option>
                        <option value="asc">Rosnąco</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="limit">Liczba wyników na stronie:</label>
                    <input type="number" id="limit" name="limit" value={filters.limit || ''}
                           onChange={handleChange}
                           placeholder="Ilość książek na stronie"
                    />
                </div>

                <div className="form-group checkbox">
                    <label>
                        <input type="checkbox" name="is_read" checked={filters.is_read || false}
                               onChange={handleChange}
                        />
                        Tylko przeczytane
                    </label>
                </div>

                <button type="submit">
                    Filtruj
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
