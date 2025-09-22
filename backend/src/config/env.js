import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'CORS_ORIGIN',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRY',
  'EMAIL_USER',
  'EMAIL_PASS',
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_PHONE_NUMBER',
  'SMS_COUNTRY_CODE',
  'EXPERT_REGISTRATION_SECRET_KEY',
  'CLOUDINARY_CLOUD_NAME', 
  'CLOUDINARY_API_KEY',    
  'CLOUDINARY_API_SECRET', 
];


const checkEnvVars = () => {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  if (missingVars.length > 0) {
    console.error(`FATAL: Missing required environment variables: ${missingVars.join(', ')}`);
    process.exit(1);
  }
};

checkEnvVars();

const config = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  corsOrigin: process.env.CORS_ORIGIN,
  mongodbUri: process.env.MONGODB_URI,
  debugLogs: process.env.DEBUG_LOGS === 'true',
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  sms: {
    countryCode: process.env.SMS_COUNTRY_CODE,
  },
  features: {
    tipsEnabled: process.env.FEATURE_TIPS_ENABLED === 'true',
    chatEnabled: process.env.FEATURE_CHAT_ENABLED === 'true', 
  },
  expertSecret: process.env.EXPERT_REGISTRATION_SECRET_KEY,
  cloudinary: { 
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  ml: { 
    modelEndpoint: process.env.ML_MODEL_ENDPOINT
  }
};

export default Object.freeze(config);