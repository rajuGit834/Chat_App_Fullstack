import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  console.log("Cookies received:", req.cookies);

  const token = req.cookies?.jwt;

  if (!token) {
    console.log("No token found in cookies");
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Invalid token:", (error as Error).message);
    res.status(403).json({ error: "Forbidden: Invalid token" });
  }
};
