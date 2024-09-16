require("dotenv").config(); // Load environment variables from .env file

// Export configuration settings like MongoDB URI and port
module.exports = {
  mongoURI: process.env.MONGO_URI, // MongoDB connection string
  port: process.env.PORT, // Server port
  JWT_SECRET: process.env.JWT_SECRET, // Secret key for JWT
};
