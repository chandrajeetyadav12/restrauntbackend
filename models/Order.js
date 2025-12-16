// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    quantity: Number
  }],
  totalAmount: Number,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
