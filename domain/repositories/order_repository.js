const Order = require("../models/order_models"); // Import Order model

// Fetch all orders
const getAllOrders = async () => Order.find({});

// Find an order by its ID
const getOrderById = async (id) => Order.findById(id);

// Add a new order to the database
const addOrder = async (order) => {
  const newOrder = new Order(order); // Create a new Order instance
  await newOrder.save(); // Save the order
  return newOrder; // Return the newly added order
};

// Delete an order by its order_id
const deleteOrderByOrderId = async (order_id) => Order.findOneAndDelete({ order_id });

// Update an order by its order_id
const updateOrderByOrderId = async (order_id, order) => Order.findOneAndUpdate({ order_id }, order, { new: true });

module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  deleteOrderByOrderId,
  updateOrderByOrderId,
};
