// controllers/menuController.js
const MenuSection = require("../models/MenuSection");
const MenuItem = require("../models/menuItems/MenuItem");
const Cuisine = require("../models/Cuisine");

exports.getMenuStructure = async (req, res) => {
  try {
    const { cuisineId } = req.params;

    const cuisine = await Cuisine.findById(cuisineId).select("name");
    if (!cuisine) {
      return res.status(404).json({ message: "Cuisine not found" });
    }

    const sections = await MenuSection.find({
      cuisine: cuisineId,
      isActive: true
    }).sort({ order: 1 });

    const data = await Promise.all(
      sections.map(async (section) => {
        const items = await MenuItem.find({
          cuisine: cuisineId,
          section: section._id
        }).select("name price image isVeg subcategory");

        // group by subcategory
        const grouped = items.reduce((acc, item) => {
          const key = item.subcategory || "ITEMS";
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {});

        return {
          sectionId: section._id,
          sectionName: section.name,
          items: grouped
        };
      })
    );

    res.json({
      cuisine: cuisine.name,
      sections: data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
