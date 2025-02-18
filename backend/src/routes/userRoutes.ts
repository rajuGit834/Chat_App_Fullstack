import express from "express";
import { validUserHandler } from "../middleware/validUserHandler";
import {
  addNewUser,
  getAllUsers,
  loginUser,
  getAllContactsOfUser,
  getUserById,
} from "../controllers/usersController";

const router = express.Router();

router.post("/signup", addNewUser);
router.post("/login", loginUser);

router.use(validUserHandler);

router.get("/contacts", getAllContactsOfUser);
router.get("/", getAllUsers);
router.get("/:userId", getUserById);

export default router;
