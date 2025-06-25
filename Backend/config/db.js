import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {});
        console.log("Mongodb connected successfully");
    } catch (error) {
        console.log("Mongodb connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
