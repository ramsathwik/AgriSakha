import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit'; 
import mongoose from "mongoose";
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
app.use(express.static("public")); // Serve static files

// Rate Limiters
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
    message: 'Too many authentication requests from this IP, please try again after 15 minutes.',
    handler: (req, res, next, options) => {
        throw new ApiError(options.statusCode, options.message);
    }
});

const generalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
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
import farmerRouter from "./src/routes/farmer.routes.js";
import expertAuthRouter from "./src/routes/expert.auth.routes.js";
import expertRouter from "./src/routes/expert.routes.js";

app.use("/api/v1/auth", authLimiter, authRouter);
app.use("/api/v1/farmers", generalApiLimiter, farmerRouter);
app.use("/api/v1/experts/auth", authLimiter, expertAuthRouter);
app.use("/api/v1/experts", generalApiLimiter, expertRouter);

// --- Conditionally Loaded Feature Routes ---
if (config.features.tipsEnabled) {
    logger.info("Feature 'TIPS' is ENABLED. Mounting related routes.");
} 
import tipRouter from "./src/routes/tip.routes.js";
import likeRouter from "./src/routes/like.routes.js"; 

app.use("/api/v1/tips", generalApiLimiter, tipRouter);
app.use("/api/v1/tags", generalApiLimiter, tipRouter); // Note: /tags is part of tipRouter
app.use("/api/v1/likes", generalApiLimiter, likeRouter); 


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

  if (config.debugLogs) {
    logger.error(err.message, { stack: err.stack, path: req.path });
  } else {
    logger.error(err.message);
  }
  
  const statusCode = err.statusCode || 500;
  
  return res.status(statusCode).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

const PORT = config.port;
let server;

DBconnection()
.then(() => {
  server = app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  logger.error("MongoDB connection error:", { error: error.message });
  process.exit(1);
});

// --- Graceful Shutdown Logic ---
const gracefulShutdown = (signal) => {
    logger.warn(`Received signal: ${signal}. Starting graceful shutdown.`);
    if (server) {
        server.close(() => {
            logger.info("HTTP server closed.");
            mongoose.connection.close(false, () => {
                logger.info("MongoDB connection closed.");
                process.exit(0);
            });
        });
    } else {
        logger.info("No active server to shut down.");
        process.exit(0);
    }

    setTimeout(() => {
        logger.error("Could not close connections in time, forcefully shutting down.");
        process.exit(1);
    }, 10000); // 10 seconds
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));