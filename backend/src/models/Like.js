import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    tip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tip',
        required: true,
    },
    likedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel',
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Farmer', 'FarmingExpert'],
    }
}, { timestamps: true });

// Create a compound index to ensure a user can only like a tip once
likeSchema.index({ tip: 1, likedBy: 1 }, { unique: true });

const Like = mongoose.model("Like", likeSchema);
export default Like;