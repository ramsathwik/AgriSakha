import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit'; 
import DBconnection from "./src/config/db.js";
import logger from "./src/utils/logger.js";
import config from "./src/config/env.js"; 

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: config.corsOrigin, 
  credentials: true 
}));

const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
});

const generalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy.' });
});


app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack, path: req.path, statusCode: err.statusCode });
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected server error occurred.";
  
  const errorResponse = {
    success: false,
    message: message,
  };
  
  res.status(statusCode).json(errorResponse);
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