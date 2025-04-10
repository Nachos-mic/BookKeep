import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Bestseller} from "../interfaces/bestseller.interface.tsx";
import "../styles/Style.css"


const Bestsellers: React.FC = () => {
    const [bestsellers, setBestsellers] = useState<Bestseller[]>([]);

    useEffect(() => {
        fetchBestsellers();
    }, []);

    const fetchBestsellers = (): Promise<void> => {
        return axios.get<Bestseller[]>('http://localhost:3100/api/v1/bestsellers')
            .then(response => {
                const result = response.data;
                setBestsellers(result);
            })
            .catch(error => {
                console.error('Błąd podczas pobierania danych:', error);
            });
    };

    const formatDate = (dateString: string | undefined): string => {
        if(!dateString){
            return "Nie załadowano poprawnie dnia"
        }
        const date = new Date(dateString);
        return date.toLocaleDateString('pl-PL');
    };


    return (
        <div>
            <h2>Top 10 Bestsellerów według New York Times</h2>
            <h2>Na dzień: {formatDate(bestsellers[0]?.fetch_time)}</h2>
            <div className="books-grid">
                {bestsellers.map((bestseller: Bestseller) => (
                    <div key={bestseller._id} className="book-card">

                        <h3>{bestseller.title}</h3>
                        <text>Autor: {bestseller.author}<br/></text>
                        <text>Ilość tygodni na liście: {bestseller.weeks_on_list}</text>
                        <text>Miejsce: {bestseller.rank}<br/></text>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bestsellers;
