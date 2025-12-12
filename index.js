const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const contactRoutes = require("./routes/contactRoute");
dotenv.config();

connectDB(); // connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json());
// api for contact
app.use("/api/contact", contactRoutes);
app.listen(5000, () => console.log("Server running on 5000"));
