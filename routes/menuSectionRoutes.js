const express = require("express");
const router = express.Router();
const {
    createMenuSection,
    getSectionsByCuisine,
    getMenuSectionById,
    updateMenuSection,
    deleteMenuSection
} = require("../controllers/menuSectionController");
router.post("/", createMenuSection);                    // CREATE
router.get("/cuisine/:cuisineId", getSectionsByCuisine);// READ (tabs)
router.get("/:id", getMenuSectionById);                 // READ ONE
router.put("/:id", updateMenuSection);                  // UPDATE
router.delete("/:id", deleteMenuSection);               // DELETE

module.exports = router;