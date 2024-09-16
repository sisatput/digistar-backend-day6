const { createOrder, fetchAllOrders, fetchOrderById, deleteOrderByOrderId, updateOrderByOrderId } = require("../domain/usecases/order_usecase");

// Handle request to create a new order
const createOrderHandler = async (req, res) => {
  try {
    const { name, quantity, price, status } = req.body;
    if (!name || !quantity || !price) throw new Error("Name, quantity, and price are required");

    const newOrder = await createOrder(name, quantity, price, status);
    res.status(201).json({ message: "Order has been added", order: newOrder });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Handle request to get all orders
const getAllOrdersHandler = async (req, res) => {
  try {
    const orders = await fetchAllOrders();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle request to get order by ID
const getOrderByIdHandler = async (req, res) => {
  try {
    const order = await fetchOrderById(req.params.id);
    if (!order) throw new Error("Order not found");
    res.json({ order });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Handle request to delete order by order_id
const deleteOrderHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const deletedOrder = await deleteOrderByOrderId(order_id);
    res.json({ message: "Order deleted successfully", order: deletedOrder });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Handle request to update order by order_id
const updateOrderHandler = async (req, res) => {
  try {
    const { order_id } = req.params;
    const updatedData = req.body;
    const updatedOrder = await updateOrderByOrderId(order_id, updatedData);
    res.json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  deleteOrderHandler,
  updateOrderHandler,
};
