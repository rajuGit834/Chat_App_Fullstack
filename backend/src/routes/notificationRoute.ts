import express from "express";
import { validUserHandler } from "../middleware/validUserHandler";
import { getAllNotification } from "../controllers/notificationController";

const router = express.Router();

router.get("/:receiverId", getAllNotification);

export default router;
