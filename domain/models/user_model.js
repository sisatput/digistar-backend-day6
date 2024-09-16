const mongoose = require("mongoose"); // Import Mongoose to define schema and models
const { v4: uuidv4 } = require("uuid"); // Import UUID

// Define Mongoose schema for User model
const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // Use UUIDv4 as the default for _id
  username: { type: String, required: true, unique: true }, // Unique username
  password: { type: String, required: true }, // Hashed password
  email: { type: String, required: true }, // User's email
  role: { type: String, default: "user" }, // Role with default value 'user'
});

module.exports = mongoose.model("User", userSchema); // Export User model based on the schema
