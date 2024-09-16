const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction
const { mongoURI } = require('../config/config'); // Import MongoDB connection string

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI); // Connect to MongoDB using the connection string from config
    console.log('MongoDB connected'); // Log success message
  } catch (err) {
    console.error('MongoDB connection error:', err.message); // Log any error message
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB; // Export the connection function
