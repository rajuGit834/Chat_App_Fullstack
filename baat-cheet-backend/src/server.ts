import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserModel from "./models/users";

const app = express();

app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// MongoDB connection
mongoose.connect("mongodb+srv://abhiprd4685:Ned457D6RZEkPitZ@cluster-baatcheet.sypnt.mongodb.net/itemResource")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Welcome route
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome");
});

// Fetch all users route
app.get("/users", async (req: Request, res: Response) => {
    try {
        console.log("Fetching users...");
        const users = await UserModel.find(); // Fetch all users

        // Optionally exclude the `_id` field and return the clean data
        const formattedUsers = users.map(user => ({
            name: user.name,
            email: user.email,
            password: user.password, // Be careful with logging or sending passwords!
        }));

        console.log(formattedUsers); // Log the users
        res.json(formattedUsers); // Send the formatted users as a JSON response
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
});




// Start server
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
