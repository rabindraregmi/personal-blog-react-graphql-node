import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  dotenv.config();
  try {
    await mongoose.connect(process.env.MONGO_URI || "", {});
    console.log(`Database Connected`);
  } catch (err: any) {
    console.error(`${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
