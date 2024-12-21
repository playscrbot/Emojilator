import { useState, useEffect } from 'react';
import emojiMap from './EmojiMap';

const EmojiTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
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

  const translateToEmoji = () => {
    const words = inputText.split(' ');
    const translatedWords = words.map((word) => emojiMap[word.toLowerCase()] || word);
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
    { color: '#FFD700', fontFamily: 'cursive', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }
  ];

  const stickerVariations2 = [
    { color: '#FF69B4', fontSize: '28px', fontFamily: 'fantasy' }
  ];

  const stickerVariations3 = [
    { color: '#87CEEB', fontFamily: 'Arial, sans-serif', fontStyle: 'italic', textDecoration: 'underline' }
  ];

  const generateStickerAsPng = (text, styles) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    // Set canvas dimensions
    canvas.width = 150; // Match sticker dimensions
    canvas.height = 150;
  
    // Apply background color
    ctx.fillStyle = styles.backgroundColor || "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Apply text styles
    ctx.font = `${styles.fontWeight || "normal"} ${styles.fontSize || "25px"} ${
      styles.fontFamily || "sans-serif"
    }`;
    ctx.fillStyle = styles.color || "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  
    // Draw the text
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
    // Convert canvas to PNG
    return canvas.toDataURL("image/png");
  };
        
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
      <div className="button-container">
        <button className="translate-button" onClick={translateToEmoji}>
          Translate
        </button>
        <span style={{ margin: '0 15px' }}></span>
        <button className="voice-button" onClick={handleToggleVoiceRecognition}>
        {isVoiceRecognitionActive ? (
          <>
          <span>Stop</span> <span>Voice</span>
          </>
          ) : (
          <>
          <span>Start</span> <span>Voice</span>
          </>
        )}
        </button>
      </div>
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
         <>
           {stickerVariations.map((styles, index) => (
            <img key={index} src={generateStickerAsPng(translated, styles)} className="sticker-container" style={styles} alt={`Sticker ${index + 1}`}>
            </img>
           ))}
           {stickerVariations2.map((styles, index) => (
            <img key={index} src={generateStickerAsPng(translated, styles, index)} className="sticker-container" style={styles} alt={`Sticker ${index + 1}`}>
            </img>
           ))}
           {stickerVariations3.map((styles, index) => (
            <img key={index} src={generateStickerAsPng(translated, styles, index)} className="sticker-container" style={styles} alt={`Sticker ${index + 1}`}>
            </img>
           ))}
         </>
       )}
    </div>
   </>
  );
};

export default EmojiTranslator;