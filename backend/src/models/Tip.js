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
        required: true,
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
        default: 'published',
        index: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const Tip = mongoose.model("Tip", tipSchema);
export default Tip;