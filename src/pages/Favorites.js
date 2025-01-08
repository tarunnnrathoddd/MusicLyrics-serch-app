import React, { useState, useEffect } from "react";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get("http://localhost:5000/api/favorites");
      setFavorites(response.data);
    };
    fetchFavorites();
  }, []);

  const removeFavorite = async (title) => {
    try {
      await axios.delete("http://localhost:5000/api/favorites", { data: { title } });
      setFavorites(favorites.filter((fav) => fav.title !== title));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map((fav, index) => (
        <div key={index}>
          <h2>{fav.title}</h2>
          <p>By: {fav.artist}</p>
          <button onClick={() => removeFavorite(fav.title)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
