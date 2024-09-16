const User = require("../models/user_model"); // Import the User model
const bcrypt = require("bcrypt");

// Fetch all users but exclude their passwords
const getAllUsers = async () => User.find({}, "-password");

// Find a user by their ID
const getUserById = async (id) => User.findById(id);

// Find a user by their username
const getUserByUsername = async (username) => User.findOne({ username: username });

// Add a new user to the database
const addUser = async (user) => {
  const newUser = new User(user); // Create a new User instance
  await newUser.save(); // Save the new user to MongoDB
  return newUser; // Return the newly added user
};

// Update an existing user's data by ID
const updateUser = async (id, updatedFields) => {
  const user = await User.findById(id); // Find user by ID
  if (!user) throw new Error("User not found"); // If user not found, throw an error

  // Hash the password again if it is being updated
  if (updatedFields.password) {
    updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
  }

  // Merge the updated fields with the existing user object
  Object.assign(user, updatedFields);
  await user.save(); // Save the updated user data
  return user; // Return the updated user
};

// Delete a user by their ID
const deleteUser = async (id) => {
  const user = await User.findById(id); // Find user by ID
  if (!user) throw new Error("User not found"); // Throw an error if not found
  await User.findByIdAndDelete(id); // Delete user from the database
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByUsername,
};
