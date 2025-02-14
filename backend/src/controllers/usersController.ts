import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/usersModel";
import generateToken from "../utils/generateTokenUtil";

// Interface for Authenticated Request
interface AuthRequest extends Request {
  user?: { id: string };
}

// Register a New User (Signup)
export const addNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if required fields are provided
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Check if email is already taken
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ error: "Email already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error in addNewUser:", error);
    res.status(500).json({ error: "User registration failed" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: "Invalid Credentials" });
      return;
    }

    // Generate JWT token
    interface PayLoadData {
      id: string;
      name: string;
      email: string | null;
    }

    const name = user.firstName + " " + user.lastName;

    const payloadData: PayLoadData = {
      id: user.id,
      name: name,
      email: user.email || null
    }
    const token = generateToken(payloadData);

    // Set cookie with token
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send response with user data and token
    res.status(200).json({
      message: "Login Successful",
      user: {
        _id: user.id,
        name: user.firstName + " " + user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Get All Users (Protected Route)
export const getAllUsers = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res
        .status(401)
        .json({ error: "Unauthorized: User not found in request" });
      return;
    }

    const users = await User.find().select("-password"); // Exclude password from response
    
    res.status(200).json({ users, logedInUser: req.user });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
