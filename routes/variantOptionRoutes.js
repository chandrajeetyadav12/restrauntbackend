// routes/variantOptionRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/variantOptionController");

router.post("/", controller.createVariantOption);
router.get("/group/:groupId", controller.getOptionsByGroup);

module.exports = router;
