// controllers/variantGroupController.js
const VariantGroup = require("../models/menuItems/VariantGroup");

exports.createVariantGroup = async (req, res) => {
  try {
    const group = await VariantGroup.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVariantGroupsByItem = async (req, res) => {
  try {
    const groups = await VariantGroup.find({ item: req.params.itemId });
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
