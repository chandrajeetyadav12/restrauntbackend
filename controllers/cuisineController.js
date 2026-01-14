// controllers/cuisineController.js
const Cuisine = require("../models/Cuisine");
const MenuSection = require("../models/MenuSection");
const MenuItem = require("../models/menuItems/MenuItem")

//  CREATE CUISINE
exports.createCuisine = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const exists = await Cuisine.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Cuisine already exists" });
    }

    const cuisine = await Cuisine.create({
      name, description, isActive
    });

    res.status(201).json(cuisine);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Cuisine already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};


//  GET ALL CUISINES
exports.getCuisines = async (req, res) => {
  try {
    const cuisines = await Cuisine.find().sort({ createdAt: -1 });
    res.json(cuisines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  GET SINGLE CUISINE
exports.getCuisineById = async (req, res) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (!cuisine) {
      return res.status(404).json({ message: "Cuisine not found" });
    }
    res.json(cuisine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  UPDATE CUISINE
exports.updateCuisine = async (req, res) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (!cuisine) {
      return res.status(404).json({ message: "Cuisine not found" });
    }

    // cuisine.name = req.body.name || cuisine.name;
    if ("name" in req.body) {
      const exists = await Cuisine.findOne({
        name: req.body.name.trim(), // schema will uppercase
        _id: { $ne: cuisine._id },
      });

      if (exists) {
        return res.status(400).json({ message: "Cuisine already exists" });
      }
      cuisine.name = req.body.name;
    }
    if ("isActive" in req.body) {
      cuisine.isActive = req.body.isActive;
    }

    await cuisine.save();
    res.json(cuisine);
  } catch (error) {
        if (error.code === 11000) {
      return res.status(400).json({ message: "Cuisine already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};


//  DELETE CUISINE
exports.deleteCuisine = async (req, res) => {
  try {
    const cuisineId = req.params.id;

    // 1. Check cuisine exists
    const cuisine = await Cuisine.findById(cuisineId);
    if (!cuisine) {
      return res.status(404).json({ message: "Cuisine not found" });
    }
    // 2 Check if sections exist
    const sectionCount = await MenuSection.countDocuments({
      cuisine: cuisineId,
    });
    if (sectionCount > 0) {
      return res.status(400).json({
        message:
          "Cannot delete cuisine. Please delete related menu sections and items first.",
      });
    }
    // 3. Safe to delete cuisine
    await Cuisine.deleteOne({ _id: cuisineId });
    res.json({ message: "Cuisine and related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

