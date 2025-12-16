// models/Addon.js
const mongoose = require("mongoose");

const addonSchema = new mongoose.Schema({
  name: String,
  price: Number,
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem"
  }]
});

module.exports = mongoose.model("Addon", addonSchema);
