const express = require("express");
const router = express.Router();
const {
  createCuisine,
  getCuisines,
  getCuisineById,
  updateCuisine,
  deleteCuisine
} = require("../controllers/cuisineController");
router.post("/", createCuisine);
router.get("/", getCuisines);
router.get("/:id", getCuisineById);
router.put("/:id",  updateCuisine);
router.delete("/:id", deleteCuisine);

module.exports = router;