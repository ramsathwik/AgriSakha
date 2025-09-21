import { Router } from "express";
import {
    generateAndSendOtp,
    verifyOtpAndLogin,
    logoutUser
} from "../controllers/auth.controller.js";
import { verifyFarmerJWT } from "../middlewares/auth.middleware.js"; 

const router = Router();

// --- Public Routes ---
router.route("/generate-otp").post(generateAndSendOtp);
router.route("/verify-otp").post(verifyOtpAndLogin);

// --- Protected Route (Requires Authentication) ---
router.route("/logout").post(verifyFarmerJWT, logoutUser);


export default router;