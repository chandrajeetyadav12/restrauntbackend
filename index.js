require("dotenv").config();//note always use config function after the require on the top.
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const contactRoutes = require("./routes/contactRoute");
const categoryRoutes=require("./routes/categoryRoutes");
const foodRoutes =require("./routes/foodRoutes")
const CuisineRoutes=require("./routes/cuisineRoutes.js")
const menuSectionRoutes=require("./routes/menuSectionRoutes.js")
const menuItems=require("./routes/menuItemRoutes.js")
const menuStructure=require("./routes/menuStructureRoutes.js")
const variantGroupRoutes=require("./routes/variantGroupRoutes.js")
const variantOptionRoutes=require("./routes/variantOptionRoutes.js")
const addonRoutes=require("./routes/addonRoutes.js")


connectDB(); // connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());
// api for contact
app.use("/api/contact", contactRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/foods",foodRoutes);
app.use("/api/Cuisine",CuisineRoutes);
app.use("/api/menuSection",menuSectionRoutes);
app.use("/api/menuItems",menuItems);
app.use("/api/menuStructure",menuStructure);
app.use("/api/variant-groups", variantGroupRoutes);
app.use("/api/variant-options", variantOptionRoutes);
app.use("/api/addons", addonRoutes);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
