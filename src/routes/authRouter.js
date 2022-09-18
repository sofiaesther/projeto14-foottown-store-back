import express from "express";
import { signUp, signIn } from "../controllers/authController.js"
import { validateSignUp, validateSignIn } from "../middlewares/validateAuthMiddleware.js";

const router = express.Router();
router.post("/sign-up", signUp, validateSignUp);
router.post("/login", signIn, validateSignIn);

export default router