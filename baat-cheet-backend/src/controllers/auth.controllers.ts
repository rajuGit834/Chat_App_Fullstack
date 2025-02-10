import { Request, Response } from "express";
import User from "../models/users"; // Import the user model


export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const newUser = new User({ email, fullName, password });
    await newUser.save();

    console.log("✅ User added successfully:", newUser);

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // 🔹 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // 🔹 Compare plain-text password
    if (user.password !== password) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    // 🔹 Return success response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout Controller
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // 🔹 Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};






