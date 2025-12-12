const Food = require("../models/Food");

exports.createFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.status(201).json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate("category");
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFoodsByCategory = async (req, res) => {
  try {
    const foods = await Food.find({ category: req.params.id }).populate("category");
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
