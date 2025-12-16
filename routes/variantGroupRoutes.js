// routes/variantGroupRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/variantGroupController");

router.post("/", controller.createVariantGroup);
router.get("/item/:itemId", controller.getVariantGroupsByItem);

module.exports = router;
