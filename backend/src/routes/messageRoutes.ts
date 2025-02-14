import express from "express";
import {
  sendMessage,
  getMessages,
} from "../controllers/messageController";
import { validUserHandler } from "../middleware/validUserHandler";

const router = express.Router();

router.post("/", validUserHandler, sendMessage);
router.get("/:receiverId", validUserHandler, getMessages);

export default router;
