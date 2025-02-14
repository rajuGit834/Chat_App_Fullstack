import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: any;
}

export const validUserHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  try {
    const SECRET_KEY = process.env.SECRET_KEY;

    if (!SECRET_KEY) {
      throw new Error("No secret key provided");
    }

    const decodedUser = jwt.verify(token, SECRET_KEY);
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbidden: Invalid token!" });
  }
};

