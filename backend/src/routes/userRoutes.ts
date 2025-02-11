import express from "express";
import { validUserHandler } from "../middleware/validUserHandler";
import {
  addNewUser,
  getAllUsers,
  loginUser,
} from "../controllers/usersController";

const router = express.Router();

router.post("/signup", addNewUser);
router.post("/login", loginUser);
router.get("/", validUserHandler, getAllUsers);

export default router;
