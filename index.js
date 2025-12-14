require("dotenv").config();//note always use config function after the require on the top.
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const contactRoutes = require("./routes/contactRoute");
const categoryRoutes=require("./routes/categoryRoutes");
const foodRoutes =require("./routes/foodRoutes")

connectDB(); // connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());
// api for contact
app.use("/api/contact", contactRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/foods",foodRoutes);
app.listen(5000, () => console.log("Server running on 5000"));
