const express = require("express");
const router = express.Router();
const {getMenuStructure}=require("../controllers/menuController")
router.get("/menu-structure/:cuisineId", getMenuStructure);//getmenuitems by cuisineid from 
module.exports = router;
