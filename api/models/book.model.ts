import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
    name: string;
    author: string;
    is_read: boolean;
    genre: string;
    rating: number;
}

const BookSchema: Schema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    is_read: { type: Boolean, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
}, {
    timestamps: true
});

const BookModel = mongoose.model<IBook>('Book', BookSchema);

export default BookModel;