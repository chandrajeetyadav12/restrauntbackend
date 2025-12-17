// routes/menuItemRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
    createMenuItem,
    getItemsBySection,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem,
    getPopularItems
} = require("../controllers/menuItemController");
router.get("/popular", getPopularItems);        // getpopular food
router.post("/", upload.single("image"), createMenuItem);        // CREATE
router.get("/section/:sectionId", getItemsBySection);            // READ (tabs)
router.get("/:id", getMenuItemById);                             // READ ONE
router.put("/:id", upload.single("image"), updateMenuItem);      // UPDATE
router.delete("/:id", deleteMenuItem);  
                         // DELETE

module.exports = router;
