import mongoose from "mongoose";
import bcrypt from "bcrypt";

const farmingExpertSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    expertise: {
        type: [String], // e.g., ["Soil Health", "Pest Control"]
        default: [],
    }
}, { timestamps: true });

// Hash the password before saving
farmingExpertSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare password
farmingExpertSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const FarmingExpert = mongoose.model("FarmingExpert", farmingExpertSchema);
export default FarmingExpert;