import { Request, Response } from "express";
import User from "../models/users";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, fullName, password } = req.body;

    // Validate request body
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

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, email, fullName },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
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



// Logout Controller
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
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







