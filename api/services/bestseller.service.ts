import axios from 'axios';
import BestsellersRepository from "../repositories/bestseller.repository";
import {config} from "../src/config"

class BestsellersService {
    private bestsellersRepository: BestsellersRepository;
    private readonly fetchInterval: number;

    constructor() {
        this.bestsellersRepository = new BestsellersRepository();
        this.fetchInterval = 4 * 60 * 60 * 1000;
        this.scheduleFetch();
    }

    private async fetchAndStoreBestsellers(): Promise<void> {
        try {
            if (!config.api_key) {
                console.error('Klucz API NYT nie został podany w zmiennych środowiskowych.');
                return;
            }
            const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${config.api_key}`;
            const response = await axios.get(url);
            const books = response.data.results.books;
            const top10 = books.slice(0, 10).map((book: any) => ({
                title: book.title,
                author: book.author,
                rank: book.rank,
                soldCopies: book.sold_copies || 0,
                fetchedAt: new Date()
            }));

            await this.bestsellersRepository.clearAndInsert(top10);
            console.log(`Pomyślnie zapisano bestsellery ${new Date().toISOString()}`);
        } catch (error: any) {
            console.error('Wystąpił błąd podczas pobierania bestsellerów:', error.message);
        }
    }

    private scheduleFetch(): void {
        void this.fetchAndStoreBestsellers();
        setInterval(() => {
            void this.fetchAndStoreBestsellers();
        }, this.fetchInterval);
    }

    public async getBestsellers() {
        return this.bestsellersRepository.findAll();
    }
}

export default BestsellersService;
