import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        role: {
            type: String,
            enum: ['user', 'model'],
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { timestamps: { createdAt: true, updatedAt: false } } // Only track creation time for messages
);

const chatSchema = new Schema(
    {
        farmer: {
            type: Schema.Types.ObjectId,
            ref: 'Farmer',
            required: true,
            index: true,
        },
        messages: {
            type: [messageSchema],
            default: [],
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;