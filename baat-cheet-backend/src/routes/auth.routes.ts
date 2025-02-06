import express  from "express";
import { signUp,logIn, logOut } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/signUp",signUp);

router.get("/logIn", logIn);

router.get("/logOut", logOut);

export default router;
