import express from "express";
import {
  sendMessage,
  getMessages,
//   getAllMessage,
} from "../controllers/messageController";
import { validUserHandler } from "../middleware/validUserHandler";

const router = express.Router();

router.post("/", validUserHandler, sendMessage);
router.get("/:receiverId", validUserHandler, getMessages);
// router.get("/all/:userId", getAllMessage);

export default router;
