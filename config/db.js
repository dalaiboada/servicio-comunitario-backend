import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        const MONGO_DB = process.env.MONGO_DB;

        const conn = await mongoose.connect(`${MONGO_URI}/${MONGO_DB}`);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}\n`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;