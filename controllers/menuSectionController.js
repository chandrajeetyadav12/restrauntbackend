const MenuSection = require("../models/MenuSection");
const Cuisine = require("../models/Cuisine");
const MenuItem = require("../models/menuItems/MenuItem");


/**
 * CREATE MENU SECTION
 * Example: Starters for Italian cuisine
 */
exports.createMenuSection = async (req, res) => {
  try {
    const { name, description, isActive, cuisine, order, } = req.body;

    if (!name || !cuisine) {
      return res.status(400).json({ message: "Name and cuisine are required" });
    }

    // Check cuisine exists
    const cuisineExists = await Cuisine.findById(cuisine);
    if (!cuisineExists) {
      return res.status(404).json({ message: "Cuisine not found" });
    }

    // Prevent duplicate section in same cuisine
    const sectionExists = await MenuSection.findOne({ name, cuisine });
    if (sectionExists) {
      return res.status(400).json({ message: "Section already exists for this cuisine" });
    }

    const section = await MenuSection.create({ name, description, isActive, cuisine, order });
    res.status(201).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET Menu_SECTIONS BY CUISINE(store as ObjectId ) (Used in tabs)
 */
exports.getSectionsByCuisine = async (req, res) => {
  try {
    const { cuisineId } = req.params;
    const menu_sections = await MenuSection.find({ cuisine: cuisineId });
    res.json(menu_sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET SINGLE SECTION
 */
exports.getMenuSectionById = async (req, res) => {
  try {
    const section = await MenuSection.findById(req.params.id)
      .populate("cuisine", "name", "description", "isActive", "order");

    if (!section) {
      return res.status(404).json({ message: "Menu section not found" });
    }

    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * UPDATE MENU SECTION
 */
exports.updateMenuSection = async (req, res) => {
  try {
    const section = await MenuSection.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Menu section not found" });
    }
    if ("name" in req.body) {
      section.name = req.body.name;
    }

    // If cuisine is being updated
    if ("cuisine" in req.body) {
      const cuisineExists = await Cuisine.findById(req.body.cuisine);
      if (!cuisineExists) {
        return res.status(400).json({ message: "Invalid cuisine ID" });
      }
      section.cuisine = req.body.cuisine;
    }
    // section.name = req.body.name || section.name;
    await section.save();

    res.json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * DELETE MENU SECTION
 */
exports.deleteMenuSection = async (req, res) => {
  try {
    const items = await MenuItem.find({ menuSection: req.params.id });

    if (items.length > 0) {
      return res.status(400).json({
        message: "Delete menu items first",
      });
    }
    const section = await MenuSection.findById(req.params.id);

    if (!section) {
      return res.status(404).json({ message: "Menu section not found" });
    }

    await section.deleteOne();
    res.json({ message: "Menu section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
