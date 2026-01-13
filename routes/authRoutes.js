const express = require("express");
const { register, login,logout } = require("../controllers/authController");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// multipart/form-data
router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.post("/logout",protect, logout);


module.exports = router;
