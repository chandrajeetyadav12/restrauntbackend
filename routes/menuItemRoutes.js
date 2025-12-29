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
    getPopularItems,
    getBestSellingDishes
} = require("../controllers/menuItemController");
router.get("/popular", getPopularItems);        // getpopular food
//  BEST SELLING (salesCount only)
router.get("/best-selling", getBestSellingDishes);
router.post("/", upload.single("image"), createMenuItem);        // CREATE
router.get("/section/:sectionId", getItemsBySection);            // READ (tabs)
router.get("/:id", getMenuItemById);                             // READ ONE
router.put("/:id", upload.single("image"), updateMenuItem);      // UPDATE
router.delete("/:id", deleteMenuItem);


module.exports = router;
