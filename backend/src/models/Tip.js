import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FarmingExpert',
    },
    authorFarmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer',
    },
    authorDistrict: {
        type: String,
        index: true, // Index for efficient querying
    },
    image: {
        url: { type: String },
        public_id: { type: String },
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
    }],
    status: {
        type: String,
        enum: ['published', 'pending', 'rejected'],
        default: 'pending',
        index: true,
    },
    rejectionReason: {
        type: String,
        trim: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

// Ensure that a tip has an author, either an expert or a farmer
tipSchema.pre('validate', function(next) {
    if (!this.author && !this.authorFarmer) {
        next(new Error('A tip must have an author, either a FarmingExpert or a Farmer.'));
    } else {
        next();
    }
});


const Tip = mongoose.model("Tip", tipSchema);
export default Tip;