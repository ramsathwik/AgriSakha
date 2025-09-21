import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyJWT } from "../utils/JwtUtils.js";
import Farmer from "../models/Farmer.js";

export const verifyFarmerJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized request. No token provided.");
    }

    const decodedToken = verifyJWT(token);
    if (!decodedToken) {
        throw new ApiError(401, "Invalid access token.");
    }

    const farmer = await Farmer.findById(decodedToken.userId).select("-phoneOtp -phoneOtpExpires");
    if (!farmer) {
        throw new ApiError(401, "Invalid access token. Farmer not found.");
    }

    req.farmer = farmer;
    next();
});