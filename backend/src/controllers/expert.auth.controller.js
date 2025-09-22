import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import FarmingExpert from "../models/FarmingExpert.js";
import { generateJWT } from "../utils/JwtUtils.js";
import { cookieOptions } from "../constants.js";
import config from "../config/env.js";
import { auditLog } from "../utils/auditLogger.js";

export const registerExpert = asyncHandler(async (req, res) => {
    const { fullName, email, password, secretKey } = req.body;

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
    
    const createdExpert = await FarmingExpert.findById(expert._id).select("-password");

    return res.status(201).json(new ApiResponse(
        201,
        { expert: createdExpert },
        "Farming expert registered successfully. Please log in."
    ));
});

export const loginExpert = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const expert = await FarmingExpert.findOne({ email });
    if (!expert) {
        throw new ApiError(404, "Expert with this email does not exist.");
    }

    const isPasswordValid = await expert.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const token = generateJWT(expert, 'expert');

    // Audit Log for successful login
    auditLog({
        action: 'EXPERT_LOGIN_SUCCESS',
        actor: { id: expert._id.toString(), role: 'expert' },
    });
    
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

export const logoutExpert = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Expert logged out successfully."));
});

export const getMyProfile = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, { expert: req.expert }, "Expert profile fetched successfully."));
});