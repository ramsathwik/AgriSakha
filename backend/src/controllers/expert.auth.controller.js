import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import FarmingExpert from "../models/FarmingExpert.js";
import { generateJWT } from "../utils/JwtUtils.js";
import { cookieOptions } from "../constants.js";
import config from "../config/env.js";

/**
 * @description Registers a new farming expert using a secret key.
 * @route POST /api/v1/experts/auth/register
 */
export const registerExpert = asyncHandler(async (req, res) => {
    const { fullName, email, password, secretKey } = req.body;

    if (!fullName || !email || !password || !secretKey) {
        throw new ApiError(400, "Full name, email, password, and secret key are required.");
    }

    if (secretKey !== config.expertSecret) {
        throw new ApiError(403, "Invalid secret key. You are not authorized to register as an expert.");
    }

    const existingExpert = await FarmingExpert.findOne({ email });
    if (existingExpert) {
        throw new ApiError(409, "An expert with this email already exists.");
    }

    const expert = await FarmingExpert.create({
        fullName,
        email,
        password,
    });

    // We do not log the user in automatically upon registration for security reasons.
    // They must explicitly log in after registering.
    
    const createdExpert = await FarmingExpert.findById(expert._id).select("-password");

    return res.status(201).json(new ApiResponse(
        201,
        { expert: createdExpert },
        "Farming expert registered successfully. Please log in."
    ));
});

/**
 * @description Logs in a farming expert.
 * @route POST /api/v1/experts/auth/login
 */
export const loginExpert = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    const expert = await FarmingExpert.findOne({ email });
    if (!expert) {
        throw new ApiError(404, "Expert with this email does not exist.");
    }

    const isPasswordValid = await expert.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const token = generateJWT(expert, 'expert');
    const loggedInExpert = await FarmingExpert.findById(expert._id).select("-password");

    return res
        .status(200)
        .cookie("accessToken", token, cookieOptions)
        .json(new ApiResponse(
            200,
            { expert: loggedInExpert, accessToken: token },
            "Expert logged in successfully"
        ));
});

/**
 * @description Logs out a farming expert.
 * @route POST /api/v1/experts/auth/logout
 */
export const logoutExpert = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Expert logged out successfully."));
});

/**
 * @description Get current logged in expert's profile.
 * @route GET /api/v1/experts/auth/me
 */
export const getMyProfile = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, { expert: req.expert }, "Expert profile fetched successfully."));
});