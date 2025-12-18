const MenuItem = require("../models/menuItems/MenuItem");
const MenuSection = require("../models/MenuSection");
const Cuisine = require("../models/Cuisine");


/**
 * CREATE MENU ITEM
 */
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price,subcategory, cuisine, section,isVeg,isPopular,salesCount } = req.body;

    if (!name || !price || !cuisine || !section) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Validate cuisine & section
    const cuisineExists = await Cuisine.findById(cuisine);
    const sectionExists = await MenuSection.findById(section);

    if (!cuisineExists || !sectionExists) {
      return res.status(404).json({ message: "Cuisine or section not found" });
    }

    const item = await MenuItem.create({
      name,
      description,
      price,
      subcategory,
      cuisine,
      section,
      image: req.file?.path,
      isVeg,
      isPopular,
      salesCount
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get bestSellingdish
exports.getBestSellingDishes = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 10;

    const items = await MenuItem.find({salesCount: { $gt: 5 }})
    
      .sort({ salesCount: -1 }) // highest sold first
      .limit(limit);

    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GET POPULAR ITEMS (USER PANEL)
exports.getPopularItems = async (req, res) => {
  try {
    const items = await MenuItem.find({ isPopular: true })
      .populate("cuisine", "name",)
      .populate("section", "name");

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET ITEMS BY SECTION (UI tabs)
 */
exports.getItemsBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const { subcategory } = req.query; // correct source

    const filter = { section: sectionId };

    // apply subcategory filter ONLY if provided
    if (subcategory) {
      filter.subcategory = subcategory;
    }

    const items = await MenuItem.find(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET SINGLE ITEM
 */
exports.getMenuItemById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
      .populate("cuisine", "name")
      .populate("section", "name");

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * UPDATE MENU ITEM
 */
exports.updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.price = req.body.price || item.price;
    item.isPopular=req.body.isPopular || item.isPopular

    //  update subcategory correctly
    if ("subcategory" in req.body) {
      item.subcategory = req.body.subcategory || null;
    }

    if (req.file) {
      item.image = req.file.path;
    }

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/**
 * DELETE MENU ITEM
 */
exports.deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    await item.deleteOne();
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

