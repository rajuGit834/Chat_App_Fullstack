import express from "express";
import { createGroup } from "../controllers/groupController";
import { validUserHandler } from "../middleware/validUserHandler";
const router = express.Router();

router.post("/create-group", validUserHandler, createGroup);

export default router;
