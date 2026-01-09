const express = require("express");
const router = express.Router();
const {getDashboardSummary,getCuisineWiseDistribution,getSectionWiseItemCount}=require("../controllers/dashboard/summaryController");
router.get("/summary",getDashboardSummary)
router.get("/cuisine-distribution",getCuisineWiseDistribution)
router.get("/section-item-count",getSectionWiseItemCount)


module.exports = router;
