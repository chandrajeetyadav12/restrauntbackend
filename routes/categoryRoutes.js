const express = require("express");
const { createCategory, getCategories } = require("../controllers/categoryController");
const router = express.Router();

router.post("/", createCategory);       // Add category
// router.get("/", getCategories);         // Get all categories

module.exports = router;
