// routes/addonRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/addonController");

router.post("/", controller.createAddon);
router.get("/item/:itemId", controller.getAddonsByItem);

module.exports = router;
