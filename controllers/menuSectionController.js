const MenuSection = require("../models/MenuSection");
const Cuisine = require("../models/Cuisine");
const MenuItem = require("../models/menuItems/MenuItem");


/**
 * CREATE MENU SECTION
 * Example: Starters for Italian cuisine
 */
exports.createMenuSection = async (req, res) => {
  try {
    let { name, description, isActive, cuisine, order, } = req.body;

    if (!name || !cuisine) {
      return res.status(400).json({ message: "Name and cuisine are required" });
    }
    name = name.trim().toUpperCase();
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
    //  Handle Mongo unique index error (race condition safe)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Section already exists for this cuisine" });
    }
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
            const newName = req.body.name.trim().toUpperCase();

      // Check duplicate in SAME cuisine
      const exists = await MenuSection.findOne({
        name: newName,
        cuisine: section.cuisine,
        _id: { $ne: section._id }, // exclude self
      });

      if (exists) {
        return res.status(400).json({
          message: "Section already exists for this cuisine",
        });
      }

      section.name = newName;
    }

    // If cuisine is being updated
    if ("cuisine" in req.body) {
      const cuisineExists = await Cuisine.findById(req.body.cuisine);
      if (!cuisineExists) {
        return res.status(400).json({ message: "Invalid cuisine ID" });
      }
            const checkName = section.name;

      const exists = await MenuSection.findOne({
        name: checkName,
        cuisine: req.body.cuisine,
        _id: { $ne: section._id },
      });

      if (exists) {
        return res.status(400).json({
          message: "Section already exists for this cuisine",
        });
      }
      section.cuisine = req.body.cuisine;
    }
    // section.name = req.body.name || section.name;
    await section.save();

    res.json(section);
  } catch (error) {
        // Safety net for DB-level uniqueness
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Section already exists for this cuisine" });
    }
    res.status(500).json({ message: error.message });
  }
};


/**
 * DELETE MENU SECTION
 */
exports.deleteMenuSection = async (req, res) => {
  try {
    const itemscount = await MenuItem.countDocuments({ section: req.params.id });

    if (itemscount > 0) {
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
