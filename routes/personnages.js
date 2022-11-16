const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/personnages", async (req, res) => {
  try {
    const { skip, limit, name } = req.query;
    console.log(req.query);
    const allCharacters = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}&limit=${limit}&name=${name}`
    );
    res.status(200).json(allCharacters.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/personnage/:id", async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({ message: error.message });
    }
    // console.log(req.params);
    const characterId = req.params.id;
    const character = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    // console.log(characterId);
    // console.log(character.data);
    res.status(200).json(character.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
