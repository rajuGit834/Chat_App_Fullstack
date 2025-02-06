import express, { Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";

//import UserModel from "./models/users";
import authRoutes from "./routes/auth.routes";

const app = express();

dotenv.config();

app.use("/api/auth", authRoutes);
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// Start server
app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
