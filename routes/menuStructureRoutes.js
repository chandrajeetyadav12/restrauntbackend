const express = require("express");
const router = express.Router();
const {
  getMenuByCuisineAggregation,
} = require("../controllers/menuStructureController");

router.get(
  "/cuisine/:cuisineId/aggregation",
  getMenuByCuisineAggregation
);

module.exports = router;
