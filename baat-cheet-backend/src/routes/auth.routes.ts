import express from "express";
import { signup , getAllUsers, login, logout} from "../controllers/auth.controllers";

const router = express.Router();

// ✅ Route to register a new user
router.post("/signup", signup);
router.get("/users", getAllUsers);
router.post("/login", login);
router.post("/logout", logout);


export default router;
