import BookModel, {IBook} from "../models/book.model";
import PaginatedResult from "../interfaces/pagination.interface";
import SearchOptions from "../interfaces/search.interface";


class BookRepository {
    public async findAll(options: SearchOptions = {}): Promise<PaginatedResult<IBook>> {
        const {
            page = 1, limit = 10, sort = 'createdAt', order = 'desc',
            search = '', genre, is_read
        } = options;

        const query: any = {};
        if (search) query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { author: { $regex: search, $options: 'i' } }
        ];
        if (genre) query.genre = genre;
        if (is_read !== undefined) query.is_read = is_read;

        const skip = (page - 1) * limit;

        const [books, total] = await Promise.all([
            BookModel.find(query).sort([[sort, order === 'asc' ? 1 : -1]]).skip(skip).limit(limit),
            BookModel.countDocuments(query)
        ]);

        return {
            data: books,
            total,
            page,
            limit,
            total_pages: Math.ceil(total / limit)
        };
    }

    public async findById(id: string) {
        return BookModel.findById(id);
    }

    public async create(bookData: any) {
        const newBook = new BookModel(bookData);
        return await newBook.save();
    }

    public async update(id: string, bookData: any) {
        return BookModel.findByIdAndUpdate(id, bookData, { new: true });
    }

    public async delete(id: string) {
        return BookModel.findByIdAndDelete(id);
    }

    public async search(query: string): Promise<IBook[]> {
        return BookModel.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ]
        });
    }

    public async getGenres(): Promise<string[]> {
        return BookModel.distinct('genre');
    }
}

export default BookRepository;