import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Chat from "../models/Chat.js";
import { getModelResponse } from "../services/ml.service.js";
import { auditLog } from "../utils/auditLogger.js";

export const askQuestion = asyncHandler(async (req, res) => {
    const { prompt, chatId } = req.body;
    const farmerId = req.user._id;

    let chat;

    if (chatId) {
        chat = await Chat.findById(chatId);
        if (!chat) {
            throw new ApiError(404, "Chat session not found.");
        }
        // Security check: Ensure the farmer owns this chat
        if (chat.farmer.toString() !== farmerId.toString()) {
            throw new ApiError(403, "You are not authorized to access this chat session.");
        }
    } else {
        // Create a new chat session for the first message
        chat = new Chat({ farmer: farmerId, messages: [] });
    }

    // Add user's message to history
    chat.messages.push({ role: 'user', content: prompt });

    // Get response from the ML model
    const modelResponseContent = await getModelResponse(prompt);

    // Add model's response to history
    chat.messages.push({ role: 'model', content: modelResponseContent });

    await chat.save();

    auditLog({
        action: 'CHAT_MESSAGE_SENT',
        actor: { id: farmerId.toString(), role: 'farmer' },
        target: { id: chat._id.toString(), type: 'Chat' },
    });

    return res.status(200).json(new ApiResponse(
        200,
        {
            modelResponse: modelResponseContent,
            chat,
        },
        "Response received successfully."
    ));
});

export const getChatHistory = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    const farmerId = req.user._id;

    const chat = await Chat.findById(chatId);

    if (!chat) {
        throw new ApiError(404, "Chat session not found.");
    }

    // Security check
    if (chat.farmer.toString() !== farmerId.toString()) {
        throw new ApiError(403, "You are not authorized to view this chat session.");
    }

    return res.status(200).json(new ApiResponse(200, chat, "Chat history retrieved successfully."));
});

export const getAllChatsForFarmer = asyncHandler(async (req, res) => {
    const farmerId = req.user._id;

    const chats = await Chat.find({ farmer: farmerId })
        .sort({ updatedAt: -1 })
        .select("-messages"); // Exclude messages for a lighter payload

    return res.status(200).json(new ApiResponse(200, chats, "All chat sessions retrieved successfully."));
});