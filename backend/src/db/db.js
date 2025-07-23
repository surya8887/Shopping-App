import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const DBConnect = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Data Base Connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(`Data connection failed: ${error}`);
        process.exit(1);
        
    }
}


export default DBConnect;