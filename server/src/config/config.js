import dotenv from "dotenv";
import { version } from "mongoose";

dotenv.config();

const config = {
  appUrl: process.env.APP_URL || "",
  mongoDBUrl: process.env.MONGODB_URL || "",
  name: process.env.NAME || "RidExpress",
  port: process.env.PORT || 5000,
  version: process.env.VERSION || "1.0.0",
  jwtSecret:
    process.env.JWT_SECRET ||
    "e6b0f7b6f7a357a416f5c762f75531caecf815b4d96d00bc",
  resendEmailApiKey: process.env.RESEND_EMAIL_API_KEY || "",
  cloudinary: {
    cloudName: process.env.CLOUD_NAME || "",
    apiKey: process.env.API_KEY || "",
    apiSecret: process.env.API_SECRET || "",
  },
  khalti:{
    apiKey: process.env.KHALTI_SECRET_KEY || "",
    apiUrl: process.env.KHALTI_API_URL || "",
    returnUrl: process.env.KHALTI_RETURN_URL || "",
  },
  gemini:{
    Url: process.env.GEMINI_URL || "",
    apiKey: process.env.GEMINI_API_KEY || "",
  }
};

export default config;
