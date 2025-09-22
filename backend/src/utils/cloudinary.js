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
    
    fs.unlinkSync(localFilePath);
    
    return response;

  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    logger.error("Cloudinary upload failed", { error: error.message, path: localFilePath });
    return null;
  }
};

export { uploadOnCloudinary };