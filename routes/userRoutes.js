const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/userController");
const upload = require("../middlewares/upload");

// GET profile
router.get("/profile", protect, getProfile);

// UPDATE profile
router.put(
  "/profile",
  protect,
  upload.single("image"),
  updateProfile
);

module.exports = router;
