import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Farmer from "../models/Farmer.js";
import { generateOtp, sendOtpSms } from "../services/otp.service.js";
import { generateJWT } from "../utils/JwtUtils.js";
import { cookieOptions, adminContacts } from "../constants.js";

const handleOtpGenerationAndSending = async (farmer) => {
    const otp = generateOtp();
    // OTP is valid for 5 minutes
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); 

    farmer.phoneOtp = otp;
    farmer.phoneOtpExpires = otpExpiry;
    
    await farmer.save({ validateBeforeSave: false });
    await sendOtpSms(farmer.phone, otp);
};

/**
 * @description Registers a new farmer and sends a verification OTP.
 * @route POST /api/v1/farmers/signup
 */
export const signup = asyncHandler(async (req, res) => {
    const { fullName, phone, dateOfBirth, gender, address } = req.body;

    if (!fullName || !phone || !address || !address.district) {
        throw new ApiError(400, "Full name, phone number, and address with district are required.");
    }

    const existingFarmer = await Farmer.findOne({ phone });
    if (existingFarmer) {
        throw new ApiError(409, "A farmer with this phone number already exists.");
    }

    const district = address.district;
    const admin = adminContacts[district];
    if (!admin) {
        throw new ApiError(400, "Invalid district provided.");
    }

    // Create the farmer document in the database
    const newFarmer = await Farmer.create({
        fullName,
        phone,
        dateOfBirth,
        gender,
        address,
        adminEmail: admin.emails[0],
        adminPhone: admin.phones[0],
        adminName: admin.contact_person,
    });

    // Send OTP for account verification
    await handleOtpGenerationAndSending(newFarmer);

    return res.status(201).json(new ApiResponse(
        201,
        { farmerId: newFarmer._id },
        "Registration successful. Please verify your phone number with the OTP sent."
    ));
});

/**
 * @description Sends an OTP to an existing farmer's phone number to initiate login.
 * @route POST /api/v1/farmers/send-login-otp
 */
export const sendLoginOtp = asyncHandler(async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        throw new ApiError(400, "Phone number is required.");
    }
    
    const farmer = await Farmer.findOne({ phone });
    if (!farmer) {
        throw new ApiError(404, "This phone number is not registered with us.");
    }

    // Send OTP for login
    await handleOtpGenerationAndSending(farmer);

    return res.status(200).json(new ApiResponse(
        200,
        {},
        "OTP has been sent to your phone number."
    ));
});

/**
 * @description Verifies the OTP for both signup and login, and logs the user in.
 * @route POST /api/v1/farmers/verify-otp
 */
export const verifyOtpAndLogin = asyncHandler(async (req, res) => {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
        throw new ApiError(400, "Phone number and OTP are required.");
    }

    const farmer = await Farmer.findOne({ phone });
    if (!farmer) {
        throw new ApiError(404, "Farmer with this phone number not found.");
    }
    
    if (!farmer.phoneOtp || !farmer.phoneOtpExpires) {
        throw new ApiError(400, "Please request an OTP first.");
    }
    
    if (farmer.phoneOtpExpires < new Date()) {
        throw new ApiError(401, "OTP has expired. Please request a new one.");
    }
    
    const isOtpValid = await farmer.isOtpCorrect(otp);
    if (!isOtpValid) {
        throw new ApiError(401, "Invalid OTP provided.");
    }
    farmer.phoneOtp = undefined;
    farmer.phoneOtpExpires = undefined;
    await farmer.save({ validateBeforeSave: false });

    const token = generateJWT(farmer, 'farmer');

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

export const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Farmer logged out successfully."));
});