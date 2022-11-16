// Import des modules nécessaires
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Appel des modules
const app = express();
app.use(express.json());
app.use(cors());

// Appel des routes
const comicsRoutes = require("./routes/comics");
const personnagesRoutes = require("./routes/personnages");
app.use(comicsRoutes);
app.use(personnagesRoutes);
app.get("/", (req, res) => {
  res.json({ message: "Ca marche !" });
});

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(4000, () => {
  console.log("Super Hero Super Charged server has started !!!! 🦸🏻‍♀️ 🦸‍♂️ 🦹‍♀️ 🦹🏻‍♂️");
});
