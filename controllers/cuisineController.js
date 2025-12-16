// controllers/cuisineController.js
const Cuisine = require("../models/Cuisine");


//  CREATE CUISINE
exports.createCuisine = async (req, res) => {
  try {
    const { name,description } = req.body;

    const exists = await Cuisine.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Cuisine already exists" });
    }

    const cuisine = await Cuisine.create({
      name,description
    });

    res.status(201).json(cuisine);
  } catch (error) {
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

    cuisine.name = req.body.name || cuisine.name;

    await cuisine.save();
    res.json(cuisine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//  DELETE CUISINE
exports.deleteCuisine = async (req, res) => {
  try {
    const cuisine = await Cuisine.findById(req.params.id);
    if (!cuisine) {
      return res.status(404).json({ message: "Cuisine not found" });
    }

    await cuisine.deleteOne();
    res.json({ message: "Cuisine deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
