import mongoose, { Document, Schema } from 'mongoose';

export interface IBestseller extends Document {
    title: string;
    author: string;
    rank: number;
    sold_copies: number;
    fetch_time: Date;
}

const BestsellerSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        rank: { type: Number, required: true },
        soldCopies: { type: Number, required: true },
        fetch_time: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export default mongoose.model<IBestseller>('Bestseller', BestsellerSchema);
