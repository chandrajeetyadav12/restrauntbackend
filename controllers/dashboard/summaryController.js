// controllers/adminDashboard.controller.js
const Cuisine = require("../../models/Cuisine");
const MenuSection = require("../../models/MenuSection");
const MenuItem = require("../../models/menuItems/MenuItem");

exports.getDashboardSummary = async (req, res) => {
  try {
    const [
      totalCuisines,
      activeCuisines,
      totalSections,
      totalItems,
      popularItems,
      vegItems,
      nonVegItems
    ] = await Promise.all([
      Cuisine.countDocuments(),
      Cuisine.countDocuments({ isActive: true }),
      MenuSection.countDocuments(),
      MenuItem.countDocuments(),
      MenuItem.countDocuments({ isPopular: true }),
      MenuItem.countDocuments({ isVeg: true }),
      MenuItem.countDocuments({ isVeg: false }),
    ]);

    res.json({
      totalCuisines,
      activeCuisines,
      totalSections,
      totalItems,
      popularItems,
      vegItems,
      nonVegItems,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard summary error" });
  }
};
exports.getCuisineWiseDistribution = async (req, res) => {
  try {
    const data = await MenuItem.aggregate([
      {
        $group: {
          _id: "$cuisine",
          totalItems: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "cuisines",
          localField: "_id",
          foreignField: "_id",
          as: "cuisine"
        }
      },
      { $unwind: "$cuisine" },
      {
        $lookup: {
          from: "menusections",
          localField: "_id",
          foreignField: "cuisine",
          as: "sections"
        }
      },
      {
        $project: {
          _id: 0,
          cuisineId: "$cuisine._id",
          cuisineName: "$cuisine.name",
          totalItems: 1,
          totalSections: { $size: "$sections" }
        }
      }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Cuisine distribution error" });
  }
};
exports.getSectionWiseItemCount = async (req, res) => {
  try {
    const data = await MenuItem.aggregate([
      {
        $group: {
          _id: "$section",
          totalItems: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "menusections",
          localField: "_id",
          foreignField: "_id",
          as: "section"
        }
      },
      { $unwind: "$section" },
      {
        $lookup: {
          from: "cuisines",
          localField: "section.cuisine",
          foreignField: "_id",
          as: "cuisine"
        }
      },
      { $unwind: "$cuisine" },
      {
        $project: {
          _id: 0,
          sectionId: "$section._id",
          sectionName: "$section.name",
          cuisineName: "$cuisine.name",
          totalItems: 1
        }
      },
      { $sort: { totalItems: -1 } }
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Section item count error" });
  }
};

