import { config } from "dotenv";
config()



const _config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/kodr-email-agent",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "your-google-client-id",
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "your-google-client-secret",
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback",
    GOOGLE_GEMINI_KEY: process.env.GOOGLE_GEMINI_KEY || "your-google-gemini-key"
}

export default Object.freeze(_config);  