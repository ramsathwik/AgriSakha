import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import FarmingExpert from "../models/FarmingExpert.js";
import { ApiError } from "../utils/ApiError.js";

export const getMyProfile = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, { expert: req.user.details }, "Expert profile fetched successfully."));
});

export const updateMyProfile = asyncHandler(async (req, res) => {
    const { fullName, expertise } = req.body;
    const expertId = req.user._id;

    // Build the update object dynamically based on provided fields.
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (expertise) {
        if (!Array.isArray(expertise)) {
            throw new ApiError(400, "Expertise must be an array of strings.");
        }
        updateData.expertise = expertise;
    }

    const updatedExpert = await FarmingExpert.findByIdAndUpdate(
        expertId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password");

    if (!updatedExpert) {
        throw new ApiError(404, "Expert not found.");
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, { expert: updatedExpert }, "Profile updated successfully."));
});