// Import des packages nécessaires
const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Appel de router
const router = express.Router();

// Import du model User
const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Phase de vérification de la réception des informations nécessaires à l'inscription
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameters." });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // On vérifie si l'e-mail est déjà utilisé ou pas
    const emailUsed = await User.findOne({ email: email });
    if (emailUsed) {
      return res.status(409).json({ message: "This email is already used." });
    }

    // On vérifie si le nom d'utilisateur est déjà utilisé ou pas
    const usernameUsed = await User.findOne({ username: username });
    if (usernameUsed) {
      return res
        .status(409)
        .json({ message: "This username is already used." });
    }

    // Je crée le salt, du hash et du token
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(64);

    // Je vais créer un nouvel utilisateur
    const newUser = new User({
      username: username,
      email: email,
      salt: salt,
      hash: hash,
      token: token,
    });

    await newUser.save();

    res
      .status(200)
      .json({ _id: newUser._id, token: token, username: username });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Both your email address and password are required.",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const newHash = SHA256(password + user.salt).toString(encBase64);
    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    res.status(200).json({
      _id: user._id,
      token: user.token,
      username: user.username,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
