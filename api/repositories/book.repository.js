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
const book_model_1 = __importDefault(require("../models/book.model"));
class BookRepository {
    findAll() {
        return __awaiter(this, arguments, void 0, function* (options = {}) {
            const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', search = '', genre, is_read } = options;
            const query = {};
            if (search)
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { author: { $regex: search, $options: 'i' } }
                ];
            if (genre)
                query.genre = genre;
            if (is_read !== undefined)
                query.is_read = is_read;
            const skip = (page - 1) * limit;
            const [books, total] = yield Promise.all([
                book_model_1.default.find(query).sort([[sort, order === 'asc' ? 1 : -1]]).skip(skip).limit(limit),
                book_model_1.default.countDocuments(query)
            ]);
            return {
                data: books,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            };
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.default.findById(id);
        });
    }
    create(bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = new book_model_1.default(bookData);
            return yield newBook.save();
        });
    }
    update(id, bookData) {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.default.findByIdAndUpdate(id, bookData, { new: true });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.default.findByIdAndDelete(id);
        });
    }
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.default.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { author: { $regex: query, $options: 'i' } }
                ]
            });
        });
    }
    getGenres() {
        return __awaiter(this, void 0, void 0, function* () {
            return book_model_1.default.distinct('genre');
        });
    }
}
exports.default = BookRepository;
