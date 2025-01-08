import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");

  // Function to fetch lyrics
  const fetchLyrics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/lyrics?artist=${artist}&title=${title}`
      );
      setLyrics(response.data.lyrics);
    } catch (error) {
      setLyrics("Lyrics not found!");
    }
  };

  // Function to save to favorites
  const saveToFavorites = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/favorites", {
        artist,
        title,
        lyrics,
      });
      alert(response.data.message);
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lyric Search</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "5px",
            width: "200px",
            fontSize: "16px",
          }}
        />
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            marginRight: "10px",
            padding: "5px",
            width: "200px",
            fontSize: "16px",
          }}
        />
        <button
          onClick={fetchLyrics}
          style={{
            marginRight: "10px",
            padding: "6px 12px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <button
          onClick={saveToFavorites}
          style={{
            padding: "6px 12px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Save to Favorites
        </button>
      </div>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          marginTop: "20px",
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        {lyrics}
      </pre>
    </div>
  );
};

export default Home;
