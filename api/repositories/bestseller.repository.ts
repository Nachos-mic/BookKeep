import BestsellerModel, {IBestseller} from "../models/bestseller.model";

class BestsellersRepository {
    async findAll(): Promise<IBestseller[]> {
        return BestsellerModel.find().sort({ rank: 1 }).exec();
    }

    async clearAndInsert(bestsellers: Omit<IBestseller, '_id'>[]): Promise<IBestseller[]> {
        await BestsellerModel.deleteMany({});
        return BestsellerModel.insertMany(bestsellers);
    }
}

export default BestsellersRepository;
