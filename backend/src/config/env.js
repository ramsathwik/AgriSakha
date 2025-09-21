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
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

export default Object.freeze(config);