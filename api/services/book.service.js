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
const book_repository_1 = __importDefault(require("../repositories/book.repository"));
const book_validation_1 = __importDefault(require("../utils/book_validation"));
class BookService {
    constructor() {
        this.bookRepository = new book_repository_1.default();
    }
    getAllBooks() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            try {
                return yield this.bookRepository.findAll(options);
            }
            catch (error) {
                throw new Error(`Błąd podczas pobierania książek: ${error.message}`);
            }
        });
    }
    getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.bookRepository.findById(id);
                if (!book) {
                    throw new Error('Książka nie została znaleziona');
                }
                return book;
            }
            catch (error) {
                throw new Error(`Błąd podczas pobierania książki: ${error.message}`);
            }
        });
    }
    createBook(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Walidacja danych książki
                const validationResult = book_validation_1.default.safeParse(bookData);
                if (!validationResult.success) {
                    throw new Error(`Walidacja książki nie powiodła się: ${validationResult.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')}`);
                }
                return yield this.bookRepository.create(validationResult.data);
            }
            catch (error) {
                throw new Error(`Błąd podczas tworzenia książki: ${error.message}`);
            }
        });
    }
    updateBook(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validationResult = book_validation_1.default.safeParse(bookData);
                if (!validationResult.success) {
                    throw new Error(`Walidacja książki nie powiodła się: ${validationResult.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')}`);
                }
                const updatedBook = yield this.bookRepository.update(id, validationResult.data);
                if (!updatedBook) {
                    throw new Error('Książka nie została znaleziona');
                }
                return updatedBook;
            }
            catch (error) {
                throw new Error(`Błąd podczas aktualizacji książki: ${error.message}`);
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield this.bookRepository.delete(id);
                if (!book) {
                    throw new Error('Książka nie została znaleziona');
                }
                return book;
            }
            catch (error) {
                throw new Error(`Błąd podczas usuwania książki: ${error.message}`);
            }
        });
    }
    searchBooks(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookRepository.search(query);
            }
            catch (error) {
                throw new Error(`Błąd podczas wyszukiwania książek: ${error.message}`);
            }
        });
    }
    getGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookRepository.getGenres();
            }
            catch (error) {
                throw new Error(`Błąd podczas pobierania gatunków: ${error.message}`);
            }
        });
    }
}
exports.default = BookService;
