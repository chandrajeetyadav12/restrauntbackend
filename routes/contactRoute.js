const express = require("express");
const { createContact } = require("../controllers/contact");

const router = express.Router();

// POST /api/contact
router.post("/", createContact);

module.exports = router;
