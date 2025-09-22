import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../config/env.js';
import logger from './logger.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
  secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
        logger.warn("Cloudinary upload skipped: No local file path provided.");
        return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
      folder: 'farmer_tips', 
    });

    logger.info(`File uploaded successfully to Cloudinary: ${response.url}`);
    
    // Clean up the locally saved temporary file
    fs.unlinkSync(localFilePath);
    
    return response;

  } catch (error) {
    // Clean up the locally saved temporary file if the upload operation failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    logger.error("Cloudinary upload failed", { error: error.message, path: localFilePath });
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
    if (!publicId) {
        logger.warn("Cloudinary delete skipped: No public ID provided.");
        return null;
    }
    try {
        // We only need to specify the public_id to delete an asset.
        // For videos, we might need to set resource_type: 'video'. For this app, 'image' is sufficient.
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: 'image' // Be specific to avoid accidental deletion of other asset types.
        });
        
        if (result.result === 'ok') {
            logger.info(`Asset deleted successfully from Cloudinary: ${publicId}`);
        } else {
            // This case handles when Cloudinary returns a non-error response but didn't find the file.
            logger.warn(`Cloudinary asset not found or could not be deleted: ${publicId}`, { result });
        }

        return result;

    } catch (error) {
        logger.error("Cloudinary delete failed", { error: error.message, publicId });
        // We don't throw an error here to prevent the main application flow from breaking
        // if only the asset deletion fails. This should be monitored.
        return null;
    }
};


export { uploadOnCloudinary, deleteFromCloudinary };