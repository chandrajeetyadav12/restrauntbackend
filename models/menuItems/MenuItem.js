// models/MenuItem.js
const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  image: String,
  subcategory: {
    type: String,   // e.g. "Pakoda", "Paratha", "Pizza"
    default: null
  },

  cuisine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cuisine",
    required: true
  },

  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuSection",
    required: true
  },

  isVeg: { type: Boolean, default: true },
  isPopular: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);
