const express = require("express"); // Import Express framework
const { getAllUsersHandler, getUserByIdHandler, updateUserHandler, deleteUserHandler, loginUserHandler, registerUserHandler } = require("../handlers/userHandler"); // Import user handlers
const { createOrderHandler, getAllOrdersHandler, getOrderByIdHandler, deleteOrderHandler, updateOrderHandler } = require("../handlers/orderHandler");
const authenticateToken = require("../middleware/jwt"); // Import middleware for token authentication

const router = express.Router(); // Create a new router

// User routes
router.post("/login", loginUserHandler); // POST /login - Login user
router.post("/register", registerUserHandler); // POST /register - Register a new user
router.get("/users", authenticateToken, getAllUsersHandler); // GET /users - Get all users with authentication
router.get("/users/:id", authenticateToken, getUserByIdHandler); // GET /users/:id - Get user by ID with authentication
router.put("/users/:id", authenticateToken, updateUserHandler); // PUT /users/:id - Update user by ID with authentication
router.delete("/users/:id", authenticateToken, deleteUserHandler); // DELETE /users/:id - Delete user by ID with authentication

// Order routes
router.post("/orders", authenticateToken, createOrderHandler); // POST /orders - Create a new order
router.get("/orders", authenticateToken, getAllOrdersHandler); // GET /orders - Get all orders
router.get("/orders/:id", authenticateToken, getOrderByIdHandler); // GET /orders/:order_id - Get order by ID
router.delete("/orders/:id", authenticateToken, deleteOrderHandler); // DELETE order
router.put("/orders/:id", authenticateToken, updateOrderHandler); // UPDATE order

module.exports = router; // Export the router
