const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// REGISTER USER / ADMIN
exports.register = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }
    let role = "user"; // DEFAULT
        // ADMIN CREATION LOGIC (ONE TIME ONLY)
    if (adminSecret) {
      if (adminSecret !== process.env.ADMIN_SECRET) {
        return res.status(403).json({ message: "Invalid admin secret" });
      }

      // Check if admin already exists
      const adminExists = await User.findOne({ role: "admin" });
      if (adminExists) {
        return res
          .status(403)
          .json({ message: "Admin already exists" });
      }

      role = "admin";
    }
        // CREATE USER
    const user = await User.create({
      name,
      email,
      password,
      role,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      message:
        role === "admin"
          ? "Admin registered successfully"
          : "User registered successfully",
    });
    // const user = await User.create({
    //   name,
    //   email,
    //   password,
    //   role: role || "user",
    //   image: req.file ? req.file.path : "",
    // });

    // res.status(201).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   role: user.role,
    //   image: user.image,
    //   message: "Registration successful.",
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Account disabled" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.logout = async (req, res) => {
  try {
    // For JWT stored in localStorage, nothing to invalidate server-side
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

