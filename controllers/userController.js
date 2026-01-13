const User = require("../models/User");
const bcrypt = require("bcryptjs");

//  GET LOGGED-IN USER PROFILE
exports.getProfile = async (req, res) => {
  try {
    res.json(req.user); // req.user comes from protect middleware
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  UPDATE USER PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // update fields
    user.name = req.body.name || user.name;

    if (req.file) {
      user.image = req.file.path;
    }
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
