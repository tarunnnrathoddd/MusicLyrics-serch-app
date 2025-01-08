const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 5001;

// Temporary array for storing favorites (replace with DB later)
const favorites = [];

// Route: Fetch lyrics from the external API
app.get("/api/lyrics", async (req, res) => {
  const { artist, title } = req.query;
  try {
    const response = await axios.get(
      `https://api.lyrics.ovh/v1/${artist}/${title}`
    );
    res.json(response.data); // Send the lyrics data back to the client
  } catch (error) {
    res.status(404).json({ error: "Lyrics not found!" });
  }
});

// Route: Add a favorite lyric
app.post("/api/favorites", (req, res) => {
  const { artist, title, lyrics } = req.body;
  if (!artist || !title || !lyrics) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const favorite = { artist, title, lyrics };
  favorites.push(favorite);
  res.json({ message: "Added to favorites", favorite });
});

// Route: Get all favorite lyrics
app.get("/api/favorites", (req, res) => {
  res.json(favorites);
});

// Route: Delete a favorite lyric
app.delete("/api/favorites", (req, res) => {
  const { title } = req.body;

  // Check if the favorite exists
  const index = favorites.findIndex((fav) => fav.title === title);
  if (index !== -1) {
    favorites.splice(index, 1); // Remove the favorite from the array
    res.json({ message: "Removed from favorites" });
  } else {
    res.status(404).json({ error: "Favorite not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
``