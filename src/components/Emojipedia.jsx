import React, { useState } from "react";
import EmojiCard from "./EmojiCard.jsx";
import emojiData from "../data/emojiData.json";

const Emojipedia = () => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(emojiData);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setQuery(q);
    setFiltered(
      emojiData.filter((e) =>
        e.name.toLowerCase().includes(q) || e.char.includes(q)
      )
    );
  };

  const handleRandom = () => {
    const r = emojiData[Math.floor(Math.random() * emojiData.length)];
    setFiltered([r]);
  };

  return (
    <div className="emojipedia-room">
      <h2 className="emojipedia-title">📚 Emojipedia Vault</h2>
      <input
        type="text"
        placeholder="Search emoji..."
        value={query}
        onChange={handleSearch}
        className="emojipedia-input"
      />
      <button onClick={handleRandom} className="emojipedia-button">🎲 Random Emoji</button>

      <div className="emojipedia-grid">
        {filtered.map((emoji) => (
          <EmojiCard key={emoji.char} emoji={emoji} />
        ))}
      </div>
    </div>
  );
};

export default Emojipedia;