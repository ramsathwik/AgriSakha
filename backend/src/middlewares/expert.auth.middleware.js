import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyJWT } from "../utils/JwtUtils.js";
import FarmingExpert from "../models/FarmingExpert.js";

export const verifyExpertJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers?.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request. No token provided.");
    }

    const decodedToken = verifyJWT(token);

    // Check if token is valid and has the correct role
    if (!decodedToken || decodedToken.role !== 'expert') {
        throw new ApiError(401, "Invalid access token for this resource.");
    }

    const expert = await FarmingExpert.findById(decodedToken.userId).select("-password");
    if (!expert) {
        throw new ApiError(401, "Invalid access token. Expert not found.");
    }

    req.expert = expert;
    next();
});