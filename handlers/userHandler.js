const jwt = require("jsonwebtoken"); // Import jsonwebtoken for token generation
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const userRepository = require("../domain/repositories/user_repository"); // Import repository for user data
const { createUser } = require("../domain/usecases/user_usecase"); // Import use case for creating a user
const { JWT_SECRET } = require("../config/config");

// Secret key for JWT
const JWTKey = process.env.JWT_SECRET || JWT_SECRET;

// Handle request for registering a new user
const registerUserHandler = async (req, res) => {
  try {
    const { username, password, email, role } = req.body; // Extract data from request body
    if (!username || !password || !email) throw new Error("Username, password, and email are required"); // Validate required fields

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await createUser(username, hashedPassword, email, role); // Create user
    res.status(201).json({ message: "User has been added", newuser: user }); // Respond with success message
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error if creation fails
  }
};

// Handle request for logging in a user
const loginUserHandler = async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body
    if (!username || !password) throw new Error("Username and password are required"); // Validate required fields

    const user = await userRepository.getUserByUsername(username); // Fetch user by username
    if (!user) throw new Error("User not found"); // Throw an error if user not found

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare password with hashed password
    if (!isPasswordValid) throw new Error("Invalid password"); // Throw an error if password is invalid

    const token = jwt.sign({ id: user.id, role: user.role }, JWTKey, { expiresIn: "1h" }); // Generating token
    res.json({ message: "Login successful", token }); // Respond with success message and token
  } catch (error) {
    res.status(401).json({ error: error.message }); // Respond with error if login fails
  }
};

// Handle request to get all users
const getAllUsersHandler = async (req, res) => {
  try {
    const users = await userRepository.getAllUsers(); // Get all users (password excluded)
    res.json({ users }); // Respond with the list of users
  } catch (error) {
    res.status(500).json({ error: error.message }); // Respond with an error if something fails
  }
};

// Handle request to get a user by their ID
const getUserByIdHandler = async (req, res) => {
  try {
    const user = await userRepository.getUserById(req.params.id); // Fetch user by ID
    if (!user) throw new Error("User not found"); // Throw an error if user not found
    res.json({ user }); // Respond with user data
  } catch (error) {
    res.status(404).json({ error: error.message }); // Respond with 404 error if user not found
  }
};

// Handle request to update an existing user
const updateUserHandler = async (req, res) => {
  try {
    const id = req.params.id; // Extract user ID from request parameters
    const updatedFields = req.body; // Extract fields to be updated from request body

    if (!Object.keys(updatedFields).length) throw new Error("No fields to update"); // Ensure at least one field is provided

    const user = await userRepository.updateUser(id, updatedFields); // Update user
    res.json({ message: "User has been updated", updateduser: user }); // Respond with success message
  } catch (error) {
    res.status(400).json({ error: error.message }); // Respond with error if update fails
  }
};

// Handle request to delete a user
const deleteUserHandler = async (req, res) => {
  try {
    const id = req.params.id; // Extract user ID from request parameters
    await userRepository.deleteUser(id); // Delete the user by ID
    res.status(200).json({ message: "User has been deleted" }); // Respond with success message
  } catch (error) {
    res.status(404).json({ error: error.message }); // Respond with error if deletion fails
  }
};

module.exports = {
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  registerUserHandler,
  loginUserHandler,
};
