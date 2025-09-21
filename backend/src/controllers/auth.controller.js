import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Farmer from "../models/Farmer.js";
import { generateOtp, sendOtpSms } from "../services/otp.service.js";
import { generateJWT } from "../utils/JwtUtils.js";
import { cookieOptions } from "../constants.js";

const generateAndSendOtp = asyncHandler(async (req, res) => {
    const { phone } = req.body;

    if (!phone || !/^\d{10}$/.test(phone)) {
        throw new ApiError(400, "A valid 10-digit phone number is required.");
    }
    
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    let farmer = await Farmer.findOne({ phone });

    if (!farmer) {
        farmer = new Farmer({ phone });
    }

    farmer.phoneOtp = otp;
    farmer.phoneOtpExpires = otpExpiry;
    await farmer.save({ validateBeforeSave: false });

    // Send the OTP via our mock SMS service
    await sendOtpSms(phone, otp);

    return res.status(200).json(new ApiResponse(
        200,
        {},
        "OTP has been sent successfully. It will expire in 5 minutes."
    ));
});


const verifyOtpAndLogin = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone) {
        throw new ApiError(400, "Phone number is required.");
    }
    if (!otp) {
        throw new ApiError(400, "OTP is required.");
    }

    const farmer = await Farmer.findOne({ phone });

    if (!farmer) {
        throw new ApiError(404, "Farmer with this phone number not found.");
    }
    
    if (!farmer.phoneOtp || !farmer.phoneOtpExpires) {
        throw new ApiError(400, "No OTP has been generated for this user. Please request an OTP first.");
    }
    
    const isOtpValid = await farmer.isOtpCorrect(otp);

    if (!isOtpValid) {
        throw new ApiError(401, "Invalid OTP.");
    }
    
    if (farmer.phoneOtpExpires < new Date()) {
        throw new ApiError(401, "OTP has expired. Please request a new one.");
    }
    
    // Clear the OTP fields after successful verification
    farmer.phoneOtp = undefined;
    farmer.phoneOtpExpires = undefined;
    await farmer.save({ validateBeforeSave: false });

    const token = generateJWT(farmer);

    const loggedInFarmer = await Farmer.findById(farmer._id).select("-phoneOtp -phoneOtpExpires");

    return res
        .status(200)
        .cookie("accessToken", token, cookieOptions)
        .json(new ApiResponse(
            200,
            { farmer: loggedInFarmer, accessToken: token },
            "Farmer logged in successfully"
        ));
});

const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Farmer logged out successfully."));
});

export { generateAndSendOtp, verifyOtpAndLogin, logoutUser };