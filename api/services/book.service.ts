import BookRepository from "../repositories/book.repository";
import { IBook } from "../models/book.model";
import bookSchema from "../utils/book_validation";
import SearchOptions from "../interfaces/search.interface";


class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    public async getAllBooks(options: SearchOptions = {}) {
        try {
            return await this.bookRepository.findAll(options);
        } catch (error: any) {
            throw new Error(`Błąd podczas pobierania książek: ${error.message}`);
        }
    }

    public async getBookById(id: string) {
        try {
            const book = await this.bookRepository.findById(id);
            if (!book) {
                throw new Error('Książka nie została znaleziona');
            }
            return book;
        } catch (error: any) {
            throw new Error(`Błąd podczas pobierania książki: ${error.message}`);
        }
    }

    public async createBook(bookData: Partial<IBook>) {
        try {
            const validationResult = bookSchema.safeParse(bookData);
            if (!validationResult.success) {
                throw new Error(`Walidacja książki nie powiodła się: ${validationResult.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')}`);
            }

            return await this.bookRepository.create(validationResult.data);
        } catch (error: any) {
            throw new Error(`Błąd podczas tworzenia książki: ${error.message}`);
        }
    }

    public async updateBook(id: string, bookData: Partial<IBook>) {
        try {

            const validationResult = bookSchema.safeParse(bookData);
            if (!validationResult.success) {
                throw new Error(`Walidacja książki nie powiodła się: ${validationResult.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')}`);
            }

            const updatedBook = await this.bookRepository.update(id, validationResult.data);
            if (!updatedBook) {
                throw new Error('Książka nie została znaleziona');
            }
            return updatedBook;
        } catch (error: any) {
            throw new Error(`Błąd podczas aktualizacji książki: ${error.message}`);
        }
    }

    public async deleteBook(id: string) {
        try {
            const book = await this.bookRepository.delete(id);
            if (!book) {
                throw new Error('Książka nie została znaleziona');
            }
            return book;
        } catch (error: any) {
            throw new Error(`Błąd podczas usuwania książki: ${error.message}`);
        }
    }
}

export default BookService;