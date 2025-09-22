import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Tip from "../models/Tip.js";
import Tag from "../models/Tag.js";
import { auditLog } from "../utils/auditLogger.js";

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

export const createTipByExpert = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    
    const imageLocalPath = req.file?.path;
    let imageAsset;
    if (imageLocalPath) {
        imageAsset = await uploadOnCloudinary(imageLocalPath);
        if (!imageAsset) {
            throw new ApiError(500, "Failed to upload image. Please try again.");
        }
    }
    
    const tagNames = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const tagIds = await getOrCreateTags(tagNames);

    const tip = await Tip.create({
        title,
        content,
        tags: tagIds,
        author: req.expert._id,
        image: imageAsset ? { url: imageAsset.secure_url, public_id: imageAsset.public_id } : undefined,
        status: 'published',
    });

    auditLog({
        action: 'TIP_CREATED',
        actor: { id: req.user._id.toString(), role: req.user.role },
        target: { id: tip._id.toString(), type: 'Tip' },
    });

    const createdTip = await Tip.findById(tip._id).populate('author', 'fullName').populate('tags', 'name');

    return res.status(201).json(
        new ApiResponse(201, createdTip, "Tip published successfully.")
    );
});

export const submitTipByFarmer = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;
    
    const imageLocalPath = req.file?.path;
    let imageAsset;
    if (imageLocalPath) {
        imageAsset = await uploadOnCloudinary(imageLocalPath);
        if (!imageAsset) {
            throw new ApiError(500, "Failed to upload image. Please try again.");
        }
    }

    const tagNames = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const tagIds = await getOrCreateTags(tagNames);

    const tip = await Tip.create({
        title,
        content,
        tags: tagIds,
        authorFarmer: req.farmer._id,
        image: imageAsset ? { url: imageAsset.secure_url, public_id: imageAsset.public_id } : undefined,
        status: 'pending',
    });

    auditLog({
        action: 'TIP_SUBMITTED',
        actor: { id: req.user._id.toString(), role: req.user.role },
        target: { id: tip._id.toString(), type: 'Tip' },
    });

    return res.status(202).json(
        new ApiResponse(202, tip, "Tip submitted successfully for review.")
    );
});


export const getPendingTips = asyncHandler(async (req, res) => {
    const pendingTips = await Tip.find({ status: 'pending' })
        .sort({ createdAt: 'asc' })
        .populate('authorFarmer', 'fullName phone')
        .populate('tags', 'name');
    
    return res.status(200).json(
        new ApiResponse(200, pendingTips, "Pending tips retrieved successfully.")
    );
});

export const approveTip = asyncHandler(async (req, res) => {
    const { tipId } = req.params;
    const tip = await Tip.findById(tipId);

    if (!tip) {
        throw new ApiError(404, "Tip not found.");
    }
    if (tip.status !== 'pending') {
        throw new ApiError(400, `Tip is already in '${tip.status}' status and cannot be approved.`);
    }

    tip.status = 'published';
    tip.author = req.expert._id; 
    await tip.save({ validateBeforeSave: true });

    auditLog({
        action: 'TIP_APPROVED',
        actor: { id: req.user._id.toString(), role: req.user.role },
        target: { id: tip._id.toString(), type: 'Tip' },
    });

    return res.status(200).json(
        new ApiResponse(200, tip, "Tip approved and published successfully.")
    );
});

export const rejectTip = asyncHandler(async (req, res) => {
    const { tipId } = req.params;
    const { reason } = req.body;
    
    const tip = await Tip.findById(tipId);

    if (!tip) {
        throw new ApiError(404, "Tip not found.");
    }
    if (tip.status !== 'pending') {
        throw new ApiError(400, `Tip is already in '${tip.status}' status and cannot be rejected.`);
    }

    tip.status = 'rejected';
    tip.rejectionReason = reason;
    await tip.save({ validateBeforeSave: true });

    auditLog({
        action: 'TIP_REJECTED',
        actor: { id: req.user._id.toString(), role: req.user.role },
        target: { id: tip._id.toString(), type: 'Tip' },
        details: { reason },
    });

    return res.status(200).json(
        new ApiResponse(200, tip, "Tip rejected successfully.")
    );
});

export const getAllTips = asyncHandler(async (req, res) => {
    const tips = await Tip.find({ status: 'published' })
        .sort({ createdAt: -1 })
        .populate('author', 'fullName email')
        .populate('authorFarmer', 'fullName')
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
        .populate('authorFarmer', 'fullName')
        .populate('tags', 'name');

    return res.status(200).json(
        new ApiResponse(200, { tag, tips }, `Tips for tag '${tag.name}' retrieved successfully.`)
    );
});