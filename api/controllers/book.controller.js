"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_service_1 = __importDefault(require("../services/book.service"));
class BookController {
    constructor() {
        this.main_path = '/api/v1/books';
        this.router = (0, express_1.Router)();
        this.addNewBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = yield this.bookService.createBook(req.body);
                res.status(201).json(newBook);
            }
            catch (error) {
                console.error('Błąd podczas zapisywania danych książki:', error);
                res.status(500).json({
                    error: error.message || 'Wystąpił błąd podczas zapisywania książki'
                });
            }
        });
        this.getAllBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const options = {
                    page: req.query.page ? Number(req.query.page) : undefined,
                    limit: req.query.limit ? Number(req.query.limit) : undefined,
                    sort: req.query.sort ? String(req.query.sort) : undefined,
                    order: req.query.order ? String(req.query.order) : undefined,
                    search: req.query.search ? String(req.query.search) : undefined,
                    genre: req.query.genre ? String(req.query.genre) : undefined,
                    is_read: req.query.is_read !== undefined ? req.query.is_read === 'true' : undefined
                };
                const books = yield this.bookService.getAllBooks(options);
                res.status(200).json(books);
            }
            catch (error) {
                console.error('Błąd podczas pobierania danych książek:', error);
                res.status(500).json({
                    error: error.message || 'Wystąpił błąd podczas pobierania danych książek'
                });
            }
        });
        this.getBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ error: 'Wymagane id książki' });
                    return;
                }
                const book = yield this.bookService.getBookById(id);
                res.status(200).json(book);
            }
            catch (error) {
                console.error('Błąd podczas pobierania książki:', error);
                res.status(500).json({
                    error: error.message || 'Wystąpił błąd podczas pobierania książki'
                });
            }
        });
        this.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ error: 'Wymagane id książki' });
                    return;
                }
                yield this.bookService.deleteBook(id);
                res.status(200).json('Skasowano książkę o id: ${id}');
            }
            catch (error) {
                console.error('Błąd podczas usuwania książki:', error);
                res.status(500).json({
                    error: error.message || 'Wystąpił błąd podczas usuwania książki'
                });
            }
        });
        this.updateBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ error: 'Wymagane id książki' });
                    return;
                }
                const updatedBook = yield this.bookService.updateBook(id, req.body);
                res.status(200).json(updatedBook);
            }
            catch (error) {
                console.error('Błąd podczas aktualizacji książki:', error);
                res.status(400).json({
                    error: error.message || 'Wystąpił błąd podczas aktualizacji książki'
                });
            }
        });
        this.bookService = new book_service_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.main_path, this.addNewBook);
        this.router.get(this.main_path, this.getAllBooks);
        this.router.get('${this.main_path}/:id', this.getBook);
        this.router.delete('${this.main_path}/:id', this.deleteBook);
        this.router.put('${this.main_path}/:id', this.updateBook);
    }
}
exports.default = BookController;
