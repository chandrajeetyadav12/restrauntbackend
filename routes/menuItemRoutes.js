// routes/menuItemRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/authMiddleware");
const {adminOnly}=require("../middlewares/adminMiddleware")
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
router.post("/",protect, adminOnly, upload.single("image"), createMenuItem);        // CREATE
router.get("/section/:sectionId", getItemsBySection);            // READ (tabs)
router.get("/:id", getMenuItemById);                             // READ ONE
router.put("/:id",protect, adminOnly, upload.single("image"), updateMenuItem);      // UPDATE
router.delete("/:id",protect, adminOnly, deleteMenuItem);


module.exports = router;
