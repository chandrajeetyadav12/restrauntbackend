const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const {name}=req.body
  try {
    const category = await Category.create({name:name, image: req.file.path});
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
