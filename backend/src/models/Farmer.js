import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
    _id: false,
    fullAddress: String,
    district: {
        type: String,
        required: true,
        enum: [
            "Alappuzha",
            "Ernakulam",
            "Idukki",
            "Kannur",
            "Kasaragod",
            "Kollam",
            "Kottayam",
            "Kozhikode",
            "Malappuram",
            "Palakkad",
            "Pathanamthitta",
            "Thiruvananthapuram",
            "Thrissur",
            "Wayanad"
        ]
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number]
        }
    },
});

const FarmerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: [LocationSchema],

    currentOTP: String,
    otpGeneratedAt: Date,
    adminEmail: String,
    adminPhone: String,
    adminName: String
});