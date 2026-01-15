const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const { deliveryAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: userId }).populate("items.menuItem");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderItems = cart.items.map((item) => ({
            menuItem: item.menuItem._id,
            name: item.menuItem.name,
            price: item.price,
            quantity: item.quantity,
        }));

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalAmount: cart.totalPrice,
            paymentMethod,
            deliveryAddress,
        });

        // Clear cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};
// order updates ny admin
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "confirmed",
            "preparing",
            "out_for_delivery",
            "delivered",
            "cancelled",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;

        if (status === "cancelled") {
            order.cancelReason = "Cancelled by admin";
            order.cancelledAt = new Date();

            if (order.paymentMethod === "online") {
                order.paymentStatus = "refunded";
            }
        }

        await order.save();

        res.json({
            message: "Order status updated",
            order,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }

};
//order cancel by user 
// controllers/orderController.js

exports.cancelOrderByUser = async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;
  const { reason } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // User can cancel only their own order
  if (order.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  // Cancellation rules
  if (["preparing", "out_for_delivery", "delivered"].includes(order.status)) {
    return res.status(400).json({
      message: "Order cannot be cancelled at this stage",
    });
  }

  order.status = "cancelled";
  order.cancelReason = reason || "Cancelled by user";
  order.cancelledAt = new Date();

  // Refund handling
  if (order.paymentMethod === "online") {
    order.paymentStatus = "refunded";
  }

  await order.save();

  res.json({
    message: "Order cancelled successfully",
    order,
  });
};
// user order history
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 });

  res.json(orders);
};
// admin all order
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
};



