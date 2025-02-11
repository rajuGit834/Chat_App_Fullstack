import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://rk4875750:WHhcIfOHMFDAoUJa@cluster0.0ftjt.mongodb.net/chat_app_db?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("mongoose connected.");
  } catch (error) {
    console.log("mongo not connected", error);
    process.exit(1);
  }
};

export default connectDB;
