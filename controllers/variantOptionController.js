// controllers/variantOptionController.js
const VariantOption = require("../models/menuItems/VariantOption");

exports.createVariantOption = async (req, res) => {
  try {
    const option = await VariantOption.create(req.body);
    res.status(201).json(option);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOptionsByGroup = async (req, res) => {
  try {
    const options = await VariantOption.find({ group: req.params.groupId });
    res.json(options);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
