import mongoose from "mongoose";
import bcrypt from "bcrypt";

const LocationSchema = new mongoose.Schema({
    _id: false,
    fullAddress: {
        type : String,
        required : true
    },
    district: {
        type: String,
        enum: [
            "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod",
            "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad",
            "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
        ],
        required : true
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
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    address: [LocationSchema],
    
    phoneOtp: {
        type: String,
    },
    phoneOtpExpires: {
        type: Date,
    },

    // Admin contact details (if assigned)
    adminEmail: String,
    adminPhone: String,
    adminName: String
}, { timestamps: true });


// Hash the OTP before saving
FarmerSchema.pre("save", async function(next) {
    if (!this.isModified("phoneOtp") || !this.phoneOtp) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.phoneOtp = await bcrypt.hash(this.phoneOtp, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare OTP
FarmerSchema.methods.isOtpCorrect = async function(otp) {
    if (!this.phoneOtp) return false;
    return await bcrypt.compare(otp, this.phoneOtp);
};


const Farmer = mongoose.model("Farmer", FarmerSchema);
export default Farmer;