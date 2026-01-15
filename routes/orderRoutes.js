const express = require("express");
const router = express.Router();

const { placeOrder,updateOrderStatus,cancelOrderByUser ,getMyOrders,getAllOrders} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const {adminOnly}=require("../middlewares/adminMiddleware")

// Place order (logged-in user only) user 
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.put("/cancel/:orderId", protect, cancelOrderByUser);

// ADMIN
router.get("/", protect, adminOnly, getAllOrders);
router.put("/status/:orderId", protect, adminOnly, updateOrderStatus);

module.exports = router;
