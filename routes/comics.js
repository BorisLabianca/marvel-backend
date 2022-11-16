const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/comics", async (req, res) => {
  try {
    const { skip, limit, title } = req.query;
    // console.log(skip);
    const allComics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}&skip=${skip}&limit=${limit}&title=${title}`
    );
    res.status(200).json(allComics.data);
    // console.log(allComics.data.results.length);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comic/:id", async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({ message: error.message });
    }

    const comicId = req.params.id;
    const comic = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(comic.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/comics/:id", async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({ message: error.message });
    }
    const characterId = req.params.id;
    const comicsByCharacter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(400).json(comicsByCharacter.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
