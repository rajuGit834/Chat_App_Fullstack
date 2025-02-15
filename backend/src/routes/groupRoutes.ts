import express from "express";
import { createGroup, findGroupByUserId } from "../controllers/groupController";
import { validUserHandler } from "../middleware/validUserHandler";
const router = express.Router();

router.get("/:userId", findGroupByUserId);
router.use(validUserHandler);
router.post("/create-group", createGroup);

export default router;
