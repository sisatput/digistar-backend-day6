const userRepository = require("../repositories/user_repository"); // Import repository for database interaction

// Create a new user with the provided data
const createUser = async (username, password, email, role = "user") => {
  try {
    if (!password) throw new Error("Password is required"); // Ensure password is provided

    // Construct the new user object
    const user = { username, password, email, role };
    return await userRepository.addUser(user); // Add user to the repository
  } catch (error) {
    throw new Error(error.message); // Throw an error if something goes wrong
  }
};

module.exports = {
  createUser,
};
