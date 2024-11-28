import React, { useState } from 'react';

const ReverseTranslator = ({ allMappings }) => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const translateToWords = (text) => {
    const elements = text.split(' ');
    const translatedWords = elements.map((element) =>
      Object.keys(allMappings).find((key) => allMappings[key] === element) || element
    );
    setOutputText(translatedWords.join(' '));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    translateToWords(value);
  };

  return (
    <div className="reverse-emoji-translator">
      <h2>Reverse Emoji Translator</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Paste your emoji text here..."
      />
      <div>
        <strong>Translated Text:</strong>
        <p>{outputText || 'Translation will appear here...'}</p>
      </div>
    </div>
  );
};

export default ReverseTranslator;