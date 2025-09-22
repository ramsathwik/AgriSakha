import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyJWT as verifyToken } from "../utils/JwtUtils.js";
import Farmer from "../models/Farmer.js";
import FarmingExpert from "../models/FarmingExpert.js";

/**
 * @description A flexible RBAC middleware to verify JWT and user roles.
 * @param {string[]} requiredRoles - An array of roles that are allowed to access the route (e.g., ['farmer'], ['expert'], ['farmer', 'expert']).
 * @returns {Function} Express middleware function.
 */
export const verifyJWT = (requiredRoles = []) => asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers?.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new ApiError(401, "Unauthorized request. No token provided.");
    }

    const decodedToken = verifyToken(token);
    if (!decodedToken || !decodedToken.userId || !decodedToken.role) {
        throw new ApiError(401, "Invalid access token.");
    }
    
    if (requiredRoles.length > 0 && !requiredRoles.includes(decodedToken.role)) {
        throw new ApiError(403, "Forbidden. You do not have permission to access this resource.");
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
    
    req.user = {
        _id: user._id,
        role: decodedToken.role,
        details: user,
    };
    
    // For convenience, also attach role-specific objects
    if (decodedToken.role === 'farmer') {
        req.farmer = user;
    } else if (decodedToken.role === 'expert') {
        req.expert = user;
    }
    
    next();
});