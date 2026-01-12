const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {adminOnly}=require("../middlewares/adminMiddleware")
const {
  createCuisine,
  getCuisines,
  getCuisineById,
  updateCuisine,
  deleteCuisine
} = require("../controllers/cuisineController");
router.post("/",protect, adminOnly, createCuisine);
router.get("/", getCuisines);
router.get("/:id", getCuisineById);
router.put("/:id",protect, adminOnly,  updateCuisine);
router.delete("/:id",protect, adminOnly, deleteCuisine);

module.exports = router;