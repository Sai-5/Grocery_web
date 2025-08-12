const models = require("../models/schema");
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await models.Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).send("Server error");
  }
};


exports.createOrder = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      userId,
      phone,
      productId,
      productname,
      quantity,
      price,
      paymentMethod,
      address,
    } = req.body;

  

    // ✅ Create the new order
    const newOrder = await models.Order.create({
      firstname,
      lastname,
      userId,
      phone,
      productId,
      productname,
      quantity,
      price,
      paymentMethod,
      address,
    });

    return res.status(201).json({
      msg: "Order successfully created",
      newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ msg: "Error placing your order" });
  }
};

// GET /api/orders/:userId - Get all orders by a specific user
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await models.Order.find({ userId: userId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders by user:", error);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

// DELETE /api/orders/:id - Cancel an order by ID
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await models.Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ error: "Failed to cancel order" });
  }
};



exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await models.Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error('Error updating order:', err.message);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};


