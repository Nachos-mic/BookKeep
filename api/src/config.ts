import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT,
    database_URL: process.env.MONGO_URL,
    database_name: process.env.DATABASE_NAME,
    api_key: process.env.NYT_API_KEY
};