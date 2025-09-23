import config from "../config/env.js";
import logger from "../utils/logger.js";
import { ApiError } from "../utils/ApiError.js";

/**
 * Sends a prompt to the configured ML model endpoint and returns the response.
 * @param {string} prompt - The user's query to send to the model.
 * @returns {Promise<string>} The content of the model's response.
 * @throws {ApiError} If the model URL is not configured or if the fetch call fails.
 */
export const getModelResponse = async (prompt) => {
    if (!config.ml.modelUrl) {
        logger.error("ML model URL is not configured in environment variables.");
        throw new ApiError(500, "Chat service is not configured correctly.");
    }

    try {
        const response = await fetch(config.ml.modelUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: prompt,
                max_new_tokens: 100
            })
        });

        if (!response.ok) {
            // Log the error response from the external service if possible
            const errorBody = await response.text();
            logger.error("ML model endpoint returned a non-OK status", {
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
                endpoint: config.ml.modelUrl,
            });
            throw new Error(`The AI service responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.response || typeof data.response !== 'string') {
            logger.warn("ML model returned an unexpected data format.", { data });
            return "I'm sorry, I received an unusual response from the AI model. Please try rephrasing your question.";
        }

        return data.response;

    } catch (error) {
        logger.error("Failed to get prediction from ML model", {
            endpoint: config.ml.modelUrl,
            error: error.message,
            stack: error.stack
        });
        throw new ApiError(503, "The AI chat service is temporarily unavailable. Please try again later.");
    }
};