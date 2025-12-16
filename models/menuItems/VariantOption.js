// models/VariantOption.js
const mongoose = require("mongoose");

const variantOptionSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Small, Medium, Large
      required: true,
      trim: true,
    },

    price: {
      type: Number, // final price OR additional price
      required: true,
    },

    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VariantGroup",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VariantOption", variantOptionSchema);
