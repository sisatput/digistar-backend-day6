const orderRepository = require("../repositories/order_repository");

// Create a new order
const createOrder = async (name, quantity, price, status = "pending") => {
  try {
    // Create a new order object
    const order = { name, quantity, price, status };
    return await orderRepository.addOrder(order); // Add order to the repository
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch all orders
const fetchAllOrders = async () => {
  try {
    return await orderRepository.getAllOrders(); // Get all orders
  } catch (error) {
    throw new Error(error.message);
  }
};

// Fetch order by ID
const fetchOrderById = async (id) => {
  try {
    const order = await orderRepository.getOrderById(id); // Get order by ID
    if (!order) throw new Error("Order not found");
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete order by order_id
const deleteOrderByOrderId = async (order_id) => {
  try {
    const deletedOrder = await orderRepository.deleteOrderByOrderId(order_id);
    if (!deletedOrder) throw new Error("Order not found");
    return deletedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update order by order_id
const updateOrderByOrderId = async (order_id, updatedData) => {
  try {
    const updatedOrder = await orderRepository.updateOrderByOrderId(order_id, updatedData);
    if (!updatedOrder) throw new Error("Order not found");
    return updatedOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createOrder,
  fetchAllOrders,
  fetchOrderById,
  deleteOrderByOrderId,
  updateOrderByOrderId,
};
