import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Farmer from "../models/Farmer.js";
import { ApiError } from "../utils/ApiError.js";
import { adminContacts } from "../constants.js";

export const getMyProfile = asyncHandler(async (req, res) => {
    // The user object is already attached by verifyJWT middleware
    return res
        .status(200)
        .json(new ApiResponse(200, { farmer: req.user.details }, "Farmer profile fetched successfully."));
});

export const updateMyProfile = asyncHandler(async (req, res) => {
    const { fullName, dateOfBirth, gender, address } = req.body;
    const farmerId = req.user._id;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
        throw new ApiError(404, "Farmer not found.");
    }

    // Prepare update object with only the fields that are allowed to be changed
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (gender) updateData.gender = gender;
    
    // If address is being updated, we must also update the admin contact info
    if (address) {
        if (!address.district || !address.fullAddress) {
            throw new ApiError(400, "Both district and fullAddress are required when updating address.");
        }
        
        const admin = adminContacts[address.district];
        if (!admin) {
            throw new ApiError(400, "Invalid district provided.");
        }
        updateData.address = address;
        updateData.adminEmail = admin.emails[0];
        updateData.adminPhone = admin.phones[0];
        updateData.adminName = admin.contact_person;
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(
        farmerId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-phoneOtp -phoneOtpExpires");

    return res
        .status(200)
        .json(new ApiResponse(200, { farmer: updatedFarmer }, "Profile updated successfully."));
});