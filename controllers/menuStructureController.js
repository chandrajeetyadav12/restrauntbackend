const mongoose = require("mongoose");
const Cuisine = require("../models/Cuisine");
const MenuItem = require("../models/menuItems/MenuItem");

exports.getMenuByCuisineAggregation = async (req, res) => {
  try {
    const { cuisineId } = req.params;

    //  Get cuisine name
    const cuisine = await Cuisine.findById(cuisineId).select("name");
    if (!cuisine) {
      return res.status(404).json({ message: "Cuisine not found" });
    }

    //  Aggregation pipeline
    const sections = await MenuItem.aggregate([
      // 🔹 Match cuisine
      {
        $match: {
          cuisine: new mongoose.Types.ObjectId(cuisineId),
        },
      },

      //  Lookup Variant Groups
      {
        $lookup: {
          from: "variantgroups",
          localField: "_id",
          foreignField: "item",
          as: "variantGroups",
        },
      },

      //  Lookup Variant Options
      {
        $lookup: {
          from: "variantoptions",
          localField: "variantGroups._id",
          foreignField: "group",
          as: "variantOptions",
        },
      },

      //  Build variants array (group → options)
      {
        $addFields: {
          variants: {
            $map: {
              input: "$variantGroups",
              as: "vg",
              in: {
                name: "$$vg.name",
                isRequired: "$$vg.isRequired",
                options: {
                  $filter: {
                    input: "$variantOptions",
                    as: "opt",
                    cond: { $eq: ["$$opt.group", "$$vg._id"] },
                  },
                },
              },
            },
          },
        },
      },

      //  Lookup Addons
      {
        $lookup: {
          from: "addons",
          localField: "_id",
          foreignField: "items",
          as: "addons",
        },
      },

      //  Group by subcategory (Pakode, Vada Pav, Paratha)
      {
        $group: {
          _id: "$subcategory",
          items: {
            $push: {
              name: "$name",
              description: "$description",
              price: "$price",
              image: "$image",
              isVeg: "$isVeg",
              variants: "$variants",
              addons: "$addons",
            },
          },
        },
      },

      //  Shape final section output
      {
        $project: {
          _id: 0,
          name: {
            $cond: [
              { $ifNull: ["$_id", false] },
              "$_id",
              "Others",
            ],
          },
          items: 1,
        },
      },
    ]);

    //  Reshape (force key order: name → items)
    const formattedSections = sections.map((sec) => ({
      name: sec.name,
      items: sec.items,
    }));

    //  Final response (ONLY one res.json)
    res.json({
      cuisine: cuisine.name,
      sections: formattedSections,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
