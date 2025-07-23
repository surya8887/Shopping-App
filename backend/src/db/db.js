import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const DBConnect = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri || !DB_NAME) {
            throw new Error("Missing MongoDB URI or DB name");
        }

        const connection = await mongoose.connect(`${uri}/${DB_NAME}`);

        console.log(`✅ Database connected: ${connection.connection.host}`);
    } catch (error) {
        console.error(`❌ Database connection failed:`, error);
        process.exit(1);
    }
};

export default DBConnect;
