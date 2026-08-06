import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongodb connected ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting to the DB ${error.message}`);
    process.exit(1);
  }
};
