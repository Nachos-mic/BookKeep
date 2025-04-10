import Controller from '../interfaces/controller.inteface';
import { Request, Response, Router } from 'express';
import BookService from '../services/book.service';
import SearchOptions from '../interfaces/search.interface';

class BookController implements Controller {
    public main_path = '/api/v1/books';
    public router = Router();
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(this.main_path, this.addNewBook);
        this.router.get(this.main_path, this.getAllBooks);
        this.router.get(`${this.main_path}/:id`, this.getBook);
        this.router.delete(`${this.main_path}/:id`, this.deleteBook);
        this.router.put(`${this.main_path}/:id`, this.updateBook);
    }

    private addNewBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const newBook = await this.bookService.createBook(req.body);
            res.status(201).json(newBook);
        } catch (error: any) {
            console.error('Błąd podczas zapisywania danych książki:', error);
            res.status(500).json({
                error: error.message || 'Wystąpił błąd podczas zapisywania książki'
            });
        }
    };

    private getAllBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const options: SearchOptions = {
                page: req.query.page ? Number(req.query.page) : undefined,
                limit: req.query.limit ? Number(req.query.limit) : undefined,
                sort: req.query.sort ? String(req.query.sort) : undefined,
                order: req.query.order ? String(req.query.order) as 'asc' | 'desc' : undefined,
                search: req.query.search ? String(req.query.search) : undefined,
                genre: req.query.genre ? String(req.query.genre) : undefined,
                is_read: req.query.is_read !== undefined ? req.query.is_read === 'true' : undefined,
                min_rating: req.query.limit ? Number(req.query.min_rating) : undefined,
                max_rating: req.query.limit ? Number(req.query.max_rating) : undefined
            };

            const books = await this.bookService.getAllBooks(options);
            res.status(200).json(books);
        } catch (error: any) {
            console.error('Błąd podczas pobierania danych książek:', error);
            res.status(500).json({
                error: error.message || 'Wystąpił błąd podczas pobierania danych książek'
            });
        }
    };

    private getBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'Wymagane id książki' });
                return;
            }
            const book = await this.bookService.getBookById(id);
            res.status(200).json(book);
        } catch (error: any) {
            console.error('Błąd podczas pobierania książki:', error);
            res.status(500).json({
                error: error.message || 'Wystąpił błąd podczas pobierania książki'
            });
        }
    };

    private deleteBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'Wymagane id książki' });
                return;
            }
            await this.bookService.deleteBook(id);
            res.status(200).json(`Skasowano książkę o id: ${id}`);
        } catch (error: any) {
            console.error('Błąd podczas usuwania książki:', error);
            res.status(500).json({
                error: error.message || 'Wystąpił błąd podczas usuwania książki'
            });
        }
    };

    private updateBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ error: 'Wymagane id książki' });
                return;
            }
            const updatedBook = await this.bookService.updateBook(id, req.body);
            res.status(200).json(updatedBook);
        } catch (error: any) {
            console.error('Błąd podczas aktualizacji książki:', error);
            res.status(400).json({
                error: error.message || 'Wystąpił błąd podczas aktualizacji książki'
            });
        }
    };
}

export default BookController;