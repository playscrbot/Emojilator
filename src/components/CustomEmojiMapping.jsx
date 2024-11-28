import React, { useState } from 'react';

const CustomEmojiMapping = ({ customMap, setCustomMap, allMappings }) => {
  const [wordInput, setWordInput] = useState('');
  const [emojiInput, setEmojiInput] = useState('');

  const handleAddMapping = () => {
    if (wordInput.trim() === '' || emojiInput.trim() === '') {
      alert('Both word and emoji fields must be filled!');
      return;
    }
    if (allMappings[wordInput]) {
      alert(`The word "${wordInput}" is already mapped to an emoji.`);
      return;
    }
    setCustomMap((prevMap) => ({ ...prevMap, [wordInput]: emojiInput }));
    setWordInput('');
    setEmojiInput('');
  };

  const handleDeleteMapping = (word) => {
    const updatedMap = { ...customMap };
    delete updatedMap[word];
    setCustomMap(updatedMap);
  };

  return (
    <div className="custom-emoji-mapping">
      <h2>Custom Emoji Mapping</h2>
      <div className="add-mapping">
        <input
          type="text"
          value={wordInput}
          onChange={(e) => setWordInput(e.target.value)}
          placeholder="Enter word (e.g., awesome)"
        />
        <input
          type="text"
          value={emojiInput}
          onChange={(e) => setEmojiInput(e.target.value)}
          placeholder="Enter emoji (e.g., 🌟)"
        />
        <button onClick={handleAddMapping}>Add Mapping</button>
      </div>
      <div className="mapping-list">
        <h3>Custom Mappings</h3>
        <ul>
          {Object.entries(customMap).map(([word, emoji]) => (
            <li key={word}>
              <strong>{word}</strong>: {emoji}
              <button onClick={() => handleDeleteMapping(word)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomEmojiMapping;