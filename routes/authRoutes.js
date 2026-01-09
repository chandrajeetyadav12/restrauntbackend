const express = require("express");
const { register, login } = require("../controllers/authController");
const upload = require("../middlewares/upload");

const router = express.Router();

// multipart/form-data
router.post("/register", upload.single("image"), register);
router.post("/login", login);

module.exports = router;
