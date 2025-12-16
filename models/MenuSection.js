// models/MenuSection.js
const mongoose = require("mongoose");

const menuSectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,      // optional short text about the section
        default: "",
    },
    isActive: {
        type: Boolean,
        default: true,     // section active by default
    },
    cuisine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuisine",
        required: true
    },
    order: {
        type: Number,
        default: 0,   // lower means higher priority in UI
    },

},
    {
        timestamps: true,    // adds createdAt & updatedAt automatically
    }
);

module.exports = mongoose.model("MenuSection", menuSectionSchema);
