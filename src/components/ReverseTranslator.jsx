import React, { useState } from "react";
import ReverseMap from "./ReverseMap.jsx";

const ReverseTranslator = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleTranslate = () => {
    const translations = input
      .split(" ") // Split input by spaces to handle multiple emoji combos
      .map((emoji) => ReverseMap[emoji] || "Unknown Emoji")
      .join(", "); // Combine translations
    setOutput(translations);
  };

  return (
    <div style={styles.container}>
      <h1>Reverse Emoji Translator</h1>
      <textarea
        style={styles.textarea}
        placeholder="Enter emojis (e.g., 🎉 🎂 🎁)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button style={styles.button} onClick={handleTranslate}>
        Translate
      </button>
      {output && (
        <div style={styles.output}>
          <h3>Translation:</h3>
          <p>{output}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  textarea: {
    width: "80%",
    height: "100px",
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  output: {
    marginTop: "20px",
    textAlign: "left",
    display: "inline-block",
    maxWidth: "80%",
  },
};

export default ReverseTranslator;