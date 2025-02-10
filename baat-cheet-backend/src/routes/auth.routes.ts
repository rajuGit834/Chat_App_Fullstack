import express from "express";
import { signup , getAllUsers, login, logout} from "../controllers/auth.controllers";
import { authenticateJWT } from "../middleware/authMiddleware";

const router = express.Router();

// ✅ Route to register a new user
router.post("/signup", signup);
router.get("/users", getAllUsers);
router.post("/login", login);
router.get("/logout", logout);

router.use(authenticateJWT); // Protect all routes below


export default router;
