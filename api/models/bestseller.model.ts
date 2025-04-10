import mongoose, { Document, Schema } from 'mongoose';

export interface IBestseller extends Document {
    title: string;
    author: string;
    weeks_on_list: number;
    rank: number;
    fetch_time: Date;
}

const BestsellerSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        weeks_on_list: { type: Number, required: true },
        rank: { type: Number, required: true },
        fetch_time: { type: Date, default: Date.now }
    }
);

export default mongoose.model<IBestseller>('Bestseller', BestsellerSchema);
