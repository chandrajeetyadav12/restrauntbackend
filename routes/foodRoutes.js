const express = require("express");
const { createFood, getFoods, getFoodsByCategory } = require("../controllers/foodController");
const router = express.Router();

router.post("/", createFood);                 // Add food item
router.get("/", getFoods);                    // Get all food items
router.get("/category/:id", getFoodsByCategory);   // Get foods by category

module.exports = router;
