import { Client } from "@gradio/client";
import config from "../config/env.js";
import logger from "../utils/logger.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Sends a prompt to the configured Gradio ML model and returns the response.
 * @param {string} prompt - The user's query to send to the model.
 * @returns {Promise<string>} The content of the model's response.
 * @throws {ApiError} If the model endpoint is not configured or if the prediction fails.
 */
export const getModelResponse = async (prompt) => {
    if (!config.ml.modelEndpoint) {
        logger.error("ML model endpoint is not configured in environment variables.");
        throw new ApiError(500, "Chat service is not configured correctly.");
    }

    try {
        const client = await Client.connect(config.ml.modelEndpoint);
        const result = await client.predict("/predict", { prompt });

        if (result?.type === 'log' && result?.level === 'error') {
            logger.error("Gradio client returned an error log", { data: result.data });
            throw new Error('Prediction resulted in an error.');
        }

        // The result data structure might vary; adjust this based on actual model output.
        // Assuming the response is in result.data[0] or result.data.
        const responseData = result.data?.[0] || result.data;
        
        if (typeof responseData !== 'string') {
             logger.warn("ML model returned an unexpected data format.", { data: responseData });
             // Fallback to a generic message if format is unknown
             return "I'm sorry, I received an unusual response from the prediction model. Please try rephrasing your question.";
        }

        return responseData;

    } catch (error) {
        logger.error("Failed to get prediction from ML model", {
            endpoint: config.ml.modelEndpoint,
            error: error.message,
            stack: error.stack
        });
        throw new ApiError(503, "The AI chat service is temporarily unavailable. Please try again later.");
    }
};