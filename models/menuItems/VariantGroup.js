// models/VariantGroup.js
const mongoose = require("mongoose");

const variantGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Size, Spice Level
      required: true,
      trim: true,
    },

    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },

    isRequired: {
      type: Boolean,
      default: true, // user must choose one option
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VariantGroup", variantGroupSchema);
