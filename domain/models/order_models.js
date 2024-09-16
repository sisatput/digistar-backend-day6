const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Define Order schema
const orderSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, // UUIDv4 for order ID
  name: { type: String, required: true }, // Name of the item
  quantity: { type: Number, required: true }, // Quantity of the item
  price: { type: Number, required: true }, // Price of the item
  status: { type: String, default: "pending" }, // Order status, default is 'pending'
}, { timestamps: true }); // Add timestamps (createdAt, updatedAt)

module.exports = mongoose.model("Order", orderSchema); // Export Order model