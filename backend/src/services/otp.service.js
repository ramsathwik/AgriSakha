import twilio from 'twilio';
import logger from '../utils/logger.js';
import config from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

// A mock Twilio client for development to avoid sending actual SMS
const mockTwilioClient = {
  messages: {
    create: (message) => {
      logger.info(`[MOCK SMS] Sending OTP to ${message.to}: ${message.body}`);
      return Promise.resolve({ sid: `mock_sid_${Date.now()}` });
    }
  }
};

// Initialize Twilio client only if all credentials are provided and NODE_ENV is production
let twilioClient;
const isTwilioConfigured = config.twilio.accountSid && config.twilio.authToken && config.twilio.phoneNumber;

if (config.nodeEnv === 'production') {
  if (isTwilioConfigured) {
    twilioClient = twilio(config.twilio.accountSid, config.twilio.authToken);
  } else {
    logger.warn('Twilio configuration is incomplete. SMS sending will be disabled.');
  }
} else {
  logger.info('Running in development mode. Using mock SMS service.');
  twilioClient = mockTwilioClient;
}


const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const sendOtpSms = async (phone, otp) => {
  if (config.nodeEnv === 'production' && !isTwilioConfigured) {
      throw new ApiError(500, 'SMS service is not configured.');
  }

  const formattedPhoneNumber = `${config.sms.countryCode}${phone}`;
  const messageBody = `Your verification code is: ${otp}. It will expire in 5 minutes.`;

  try {
    const message = await twilioClient.messages.create({
      body: messageBody,
      from: config.twilio.phoneNumber,
      to: formattedPhoneNumber,
    });
    
    logger.info(`OTP SMS sent successfully to ${formattedPhoneNumber}`, { sid: message.sid });
    return message;

  } catch (error) {
    logger.error('Twilio SMS sending failed', {
      to: formattedPhoneNumber,
      error_code: error.code,
      error_message: error.message,
    });

    // Provide more specific error messages based on Twilio error codes
    if (error.code === 21211) { // Invalid 'To' Phone Number
      throw new ApiError(400, 'The phone number provided is not valid.');
    }
    if (error.code === 21614) { // 'To' number is not verified for trial accounts
        throw new ApiError(400, 'This phone number is not verified for our trial SMS service. Please contact support.');
    }

    throw new ApiError(500, 'Failed to send OTP. Please try again later.');
  }
};

export { generateOtp, sendOtpSms };