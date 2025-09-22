import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Like from "../models/Like.js";
import Tip from "../models/Tip.js";

export const toggleTipLike = asyncHandler(async (req, res) => {
    const { tipId } = req.params;
    const userId = req.user._id;
    const userModel = req.user.role === 'farmer' ? 'Farmer' : 'FarmingExpert';

    if (!mongoose.isValidObjectId(tipId)) {
        throw new ApiError(400, "Invalid tip ID.");
    }

    const tip = await Tip.findById(tipId);
    if (!tip || tip.status !== 'published') {
        throw new ApiError(404, "Published tip not found.");
    }

    const existingLike = await Like.findOne({
        tip: tipId,
        likedBy: userId,
    });

    if (existingLike) {
        // User has already liked the tip, so unlike it
        await Like.findByIdAndDelete(existingLike._id);
        await Tip.findByIdAndUpdate(tipId, { $inc: { likesCount: -1 } });
        
        return res.status(200).json(new ApiResponse(200, { liked: false }, "Tip unliked successfully."));
    } else {
        // User has not liked the tip, so like it
        await Like.create({
            tip: tipId,
            likedBy: userId,
            onModel: userModel,
        });
        await Tip.findByIdAndUpdate(tipId, { $inc: { likesCount: 1 } });

        return res.status(200).json(new ApiResponse(200, { liked: true }, "Tip liked successfully."));
    }
});