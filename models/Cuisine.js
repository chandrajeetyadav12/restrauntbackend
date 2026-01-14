// models/Cuisine.js
const mongoose = require("mongoose");

const cuisineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim:true
    },
    description: {
        type: String,          // optional text about the cuisine
        default: "",
    },
    isActive: {
        type: Boolean,
        default: true,         // cuisine is active by default
    },
   
}, { timestamps: true }
);

module.exports = mongoose.model("Cuisine", cuisineSchema);
