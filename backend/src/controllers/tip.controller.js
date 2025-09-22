import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Tip from "../models/Tip.js";
import Tag from "../models/Tag.js";

const getOrCreateTags = async (tagNames) => {
    const tagPromises = tagNames.map(name =>
        Tag.findOneAndUpdate(
            { name: name.trim().toLowerCase() },
            { $setOnInsert: { name: name.trim().toLowerCase() } },
            { upsert: true, new: true }
        )
    );
    const settledTags = await Promise.all(tagPromises);
    return settledTags.map(tag => tag._id);
};

export const createTip = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content || !tags) {
        throw new ApiError(400, "Title, content, and tags are required.");
    }

    const imageLocalPath = req.file?.path;
    let imageAsset;
    if (imageLocalPath) {
        imageAsset = await uploadOnCloudinary(imageLocalPath);
        if (!imageAsset) {
            throw new ApiError(500, "Failed to upload image. Please try again.");
        }
    }
    
    const tagNames = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    if (tagNames.length === 0) {
        throw new ApiError(400, "At least one tag is required.");
    }
    const tagIds = await getOrCreateTags(tagNames);

    const tip = await Tip.create({
        title,
        content,
        tags: tagIds,
        author: req.expert._id,
        image: imageAsset ? { url: imageAsset.secure_url, public_id: imageAsset.public_id } : undefined,
        status: 'published', 
    });

    const createdTip = await Tip.findById(tip._id).populate('author', 'fullName').populate('tags', 'name');

    return res.status(201).json(
        new ApiResponse(201, createdTip, "Tip published successfully.")
    );
});

export const getAllTips = asyncHandler(async (req, res) => {
    const tips = await Tip.find({ status: 'published' })
        .sort({ createdAt: -1 })
        .populate('author', 'fullName email')
        .populate('tags', 'name');

    return res.status(200).json(
        new ApiResponse(200, tips, "Tips retrieved successfully.")
    );
});

export const getAllTags = asyncHandler(async (req, res) => {
    const tags = await Tag.find({}).sort({ name: 1 });
    return res.status(200).json(
        new ApiResponse(200, tags, "Tags retrieved successfully.")
    );
});

export const getTipsByTag = asyncHandler(async (req, res) => {
    const { tagId } = req.params;
    const tag = await Tag.findById(tagId);

    if (!tag) {
        throw new ApiError(404, "Tag not found.");
    }

    const tips = await Tip.find({ tags: tagId, status: 'published' })
        .sort({ createdAt: -1 })
        .populate('author', 'fullName email')
        .populate('tags', 'name');

    return res.status(200).json(
        new ApiResponse(200, { tag, tips }, `Tips for tag '${tag.name}' retrieved successfully.`)
    );
});