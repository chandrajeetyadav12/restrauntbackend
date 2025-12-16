// controllers/addonController.js
const Addon = require("../models/menuItems/Addon");

exports.createAddon = async (req, res) => {
  try {
    const addon = await Addon.create(req.body);
    res.status(201).json(addon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAddonsByItem = async (req, res) => {
  try {
    const addons = await Addon.find({ items: req.params.itemId });
    res.json(addons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
