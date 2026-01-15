const express = require("express");
const router = express.Router();

const {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  clearCart,
} = require("../controllers/cartController");

const { protect } = require("../middlewares/authMiddleware");

//  ALL cart routes are protected
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCartItem);
router.delete("/remove/:itemId", protect, removeCartItem);
router.get("/", protect, getCart);
router.delete("/clear", protect, clearCart);

module.exports = router;
