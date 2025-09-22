import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyJWT } from "../utils/JwtUtils.js";
import Farmer from "../models/Farmer.js";
import FarmingExpert from "../models/FarmingExpert.js";

export const verifyFarmerJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers?.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request. No token provided.");
    }

    const decodedToken = verifyJWT(token);
    
    if (!decodedToken || decodedToken.role !== 'farmer') {
        throw new ApiError(401, "Invalid access token for this resource.");
    }

    const farmer = await Farmer.findById(decodedToken.userId).select("-phoneOtp -phoneOtpExpires");
    if (!farmer) {
        throw new ApiError(401, "Invalid access token. Farmer not found.");
    }

    req.farmer = farmer;
    next();
});

// New flexible middleware to verify any authenticated user (Farmer or Expert)
export const verifyUserJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers?.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request. No token provided.");
    }

    const decodedToken = verifyJWT(token);

    if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
        throw new ApiError(401, "Invalid access token.");
    }

    let user;
    if (decodedToken.role === 'farmer') {
        user = await Farmer.findById(decodedToken.userId).select("-phoneOtp -phoneOtpExpires");
    } else if (decodedToken.role === 'expert') {
        user = await FarmingExpert.findById(decodedToken.userId).select("-password");
    }

    if (!user) {
        throw new ApiError(401, "User not found. Invalid access token.");
    }
    
    // Attach a generic `user` object to the request for easy access in controllers
    req.user = {
        _id: user._id,
        role: decodedToken.role,
        details: user,
    };
    
    next();
});