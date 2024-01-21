import { useState } from 'react';
import emojiMap from './EmojiMap';

const ReverseTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const translateToWords = (text) => {
    const elements = text.split(/(\s+|[\.,!?])/);
    const translatedWords = elements.map((element) => emojiMap[element] || element);
    setOutputText(translatedWords.join(' '));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputText(value);
    translateToWords(value);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputText);
    alert('Translated text copied to clipboard!');
  };

  return (
    <div className="reverse-emoji-translator">
      <h2>Reverse Emoji Translator</h2>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Paste your emoji text here..."
        rows="5"
        cols="50"
      />
      <div>
        <strong>Translated Text:</strong>
        <p>{outputText || 'Translation will appear here...'}</p>
        {outputText && (
          <button onClick={handleCopyClick}>
            Copy Translated Text
          </button>
        )}
      </div>
    </div>
  );
};

export default ReverseTranslator;