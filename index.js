// Import des modules nécessaires
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Appel des modules
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Appel des routes
const comicsRoutes = require("./routes/comics");
const personnagesRoutes = require("./routes/personnages");
const userRoutes = require("./routes/user");
app.use(comicsRoutes);
app.use(personnagesRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Ca marche !" });
});

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(4000, () => {
  console.log("Super Hero Super Charged server has started !!!! 🦸🏻‍♀️ 🦸‍♂️ 🦹‍♀️ 🦹🏻‍♂️");
});
