const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {adminOnly}=require("../middlewares/adminMiddleware")
const {
    createMenuSection,
    getSectionsByCuisine,
    getMenuSectionById,
    updateMenuSection,
    deleteMenuSection
} = require("../controllers/menuSectionController");
router.post("/",protect,adminOnly, createMenuSection);                    // CREATE
router.get("/cuisine/:cuisineId", getSectionsByCuisine);// READ (tabs)
router.get("/:id", getMenuSectionById);                 // READ ONE
router.put("/:id",protect,adminOnly, updateMenuSection);                  // UPDATE
router.delete("/:id",protect,adminOnly, deleteMenuSection);               // DELETE

module.exports = router;