import { useState, useEffect } from 'react';
import emojiMap from './EmojiMap';
import CustomEmojiMapping from './CustomEmojiMapping';
import ReverseTranslator from './ReverseTranslator';

const EmojiTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [customMap, setCustomMap] = useState({});
  const [allMappings, setAllMappings] = useState({ ...emojiMap });
  const [suggestions, setSuggestions] = useState([]);
  const [translated, setTranslated] = useState('');
  const [isVoiceRecognitionActive, setIsVoiceRecognitionActive] = useState(false);
  
  const [recognition, setRecognition] = useState(null);
  
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognitionInstance = new window.webkitSpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;

      recognitionInstance.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setInputText(result);
        translateToEmoji(result);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // Load custom mappings from localStorage
  useEffect(() => {
    const savedCustomMap = JSON.parse(localStorage.getItem('customEmojiMap')) || {};
    setCustomMap(savedCustomMap);
    setAllMappings({ ...emojiMap, ...savedCustomMap });
  }, []);

  const translateToEmoji = () => {
    const words = inputText.split(' ');
    const translatedWords = words.map((word) => allMappings[word.toLowerCase()] || word);
    setOutputText(translatedWords.join(' '));
    setTranslated(translatedWords.join(' '));
  };

  const handleInputChange = (e) => {
    const currentInput = e.target.value.toLowerCase();
    setInputText(currentInput);

    // Provide suggestions based on the current input
    const matchingSuggestions = Object.keys(emojiMap).filter((word) =>
      word.startsWith(currentInput)
    );
    setSuggestions(matchingSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText((prevInput) => prevInput + ' ' + suggestion);
  };

  const handleToggleVoiceRecognition = () => {
    if (isVoiceRecognitionActive) {
      recognition.stop();
    } else {
      recognition.start();
    }

    setIsVoiceRecognitionActive(!isVoiceRecognitionActive);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputText);
  };

  const stickerVariations = [
    { color: '#FFD700', fontFamily: 'cursive', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' },
    { color: '#87CEEB', fontFamily: 'Arial, sans-serif', fontStyle: 'italic', textDecoration: 'underline' },
    { color: '#FF69B4', fontSize: '28px', fontFamily: 'fantasy' },
    { color: '#FFA07A', fontFamily: 'Georgia, serif', letterSpacing: '2px', lineHeight: '1.5' },
    { color: '#90EE90', fontFamily: 'monospace' },
  ];

  const generateStickerContainer = (outputText, styles) => (
    <div className="sticker-container" style={styles}>
      <p className="sticker-text">{outputText}</p>
    </div>
  );
        
  return (
   <>
    <div className="emoji-translator-container">
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your text..."
      />
      {inputText.length > 0 && (
        <div className="tooltip">
          {suggestions.map((suggestion) => (
            <span key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </span>
          ))}
        </div>
      )}
      <button onClick={translateToEmoji}>Translate</button>
      <span style={{ margin: '0 15px' }}></span>
      <button onClick={handleToggleVoiceRecognition}>
        {isVoiceRecognitionActive ? 'Stop Voice' : 'Start Voice'}
      </button>
      <p>
        <strong style={{ color: 'green' }}>Suggestion:</strong>
        {' '}Use the "Start Voice" button if you don't want to type your query 😄
      </p>
      <div>
        <strong>Translated Text:</strong> {outputText}
        <button className="copy-button" onClick={handleCopyClick}>Copy</button>
      </div>
    </div>
    <div className="sticker-container-wrapper">
       {translated && (
         <div>
           {stickerVariations.map((styles, index) => (
             <div key={index} className="sticker-container" style={styles}>
               {generateStickerContainer(translated, styles, index)}
             </div>
           ))}
         </div>
       )}
    </div>
    <CustomEmojiMapping customMap={customMap} setCustomMap={setCustomMap} allMappings={allMappings} />
    <ReverseTranslator allMappings={allMappings} />
   </>
  );
};

export default EmojiTranslator;