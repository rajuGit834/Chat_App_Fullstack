import express from "express";
import { connectDB } from "./lib/db";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes"; // Import routes

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json()); // Parse JSON body

// ✅ Routes
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
});

// ✅ Connect to MongoDB
connectDB();
