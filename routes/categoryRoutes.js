const express = require("express");
const upload = require("../middlewares/upload");
const { createCategory, getCategories } = require("../controllers/categoryController");
const router = express.Router();

router.post("/",upload.single("image"), createCategory);       // Add category
router.get("/", getCategories);         // Get all categories

module.exports = router;
