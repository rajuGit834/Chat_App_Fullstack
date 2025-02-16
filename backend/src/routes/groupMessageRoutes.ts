import express from "express";
import { getGroupMessageById } from "../controllers/groupMessageController";

const router = express.Router();

router.get("/:groupId", getGroupMessageById);

export default router;