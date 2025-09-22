import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit'; 
import DBconnection from "./src/config/db.js";
import logger from "./src/utils/logger.js";
import config from "./src/config/env.js"; 
import { ApiError } from "./src/utils/ApiError.js";

const app = express();

app.set('trust proxy', 1); // Trust first proxy

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cors({
  origin: config.corsOrigin, 
  credentials: true 
}));

// Rate Limiters
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 20, // Limit each IP to 20 requests per window
	standardHeaders: true,
	legacyHeaders: false,
    message: 'Too many authentication requests from this IP, please try again after 15 minutes.',
    handler: (req, res, next, options) => {
        throw new ApiError(options.statusCode, options.message);
    }
});

const generalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
    handler: (req, res, next, options) => {
        throw new ApiError(options.statusCode, options.message);
    }
});

// Health Check Route
app.get('/health', generalApiLimiter, (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy.' });
});

// --- Routes ---
import authRouter from "./src/routes/auth.routes.js";
app.use("/api/v1/auth", authLimiter, authRouter);

// --- Conditionally Loaded Feature Routes ---
if (config.features.tipsEnabled) {
    // Import routers for the "Tips" feature
    logger.info("Feature 'TIPS' is ENABLED. Mounting related routes.");
}
    // Expert auth routes
const expertAuthLimiter = rateLimit({ // Using a separate limiter for experts
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many authentication requests from this IP, please try again after 15 minutes.',
  handler: (req, res, next, options) => {
      throw new ApiError(options.statusCode, options.message);
  }
});
    
import expertAuthRouter from "./src/routes/expert.auth.routes.js";
app.use("/api/v1/experts/auth", expertAuthLimiter, expertAuthRouter);

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  
  if (err instanceof ApiError) {
    logger.warn(`ApiError: ${err.statusCode} - ${err.message}`, { path: req.path, errors: err.errors });
    return res.status(err.statusCode).json({
        success: err.success,
        message: err.message,
        errors: err.errors
    });
  }

  // Handle unexpected errors
  logger.error(err.message, { stack: err.stack, path: req.path });
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected server error occurred.";
  
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
});


const PORT = config.port;
DBconnection()
.then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  logger.error("MongoDB connection error:", { error: error.message });
  process.exit(1);
});