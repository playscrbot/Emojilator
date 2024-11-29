import { useState, useEffect } from 'react';
import axios from "axios";
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

  const [mood, setMood] = useState("");
  const [emoji, setEmoji] = useState("");
  const [bgColor, setBgColor] = useState("#f4f4f4");
  const [moodDescription, setMoodDescription] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [recognition, setRecognition] = useState(null);

  const moodEmojis = {
    happy: "😊",
    sad: "😞",
    neutral: "😐",
    excited: "🤩",
    anxious: "😰",
    angry: "😡",
  };

  const moodColors = {
    happy: "#d4edda",
    sad: "#f8d7da",
    neutral: "#fdfd96",
    excited: "#d1c4e9",
    anxious: "#ffe6e6",
    angry: "#ffcccc",
  };
  
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

  const analyzeMood = async () => {
    if (!inputText) {
      setMood("Please enter some text to analyze.");
      setEmoji("");
      setBgColor("#f4f4f4");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a mood analysis assistant. Given a text input, identify the primary mood and explain why it reflects that mood. Use nuanced moods like 'excited' or 'anxious' where applicable.",
            },
            { role: "user", content: inputText },
          ],
        },
        {
          headers: {
            "Authorization": `Bearer YOUR_OPENAI_API_KEY`,
            "Content-Type": "application/json",
          },
        }
      );

      const analysis = response.data.choices[0].message.content;

      // Extract mood and description from GPT output
      const detectedMood = analysis.match(/Mood: (\w+)/)[1].toLowerCase();
      const description = analysis.split("Description:")[1]?.trim();

      setMood(`Mood: ${detectedMood}`);
      setMoodDescription(description || "No description available.");
      setEmoji(moodEmojis[detectedMood] || "🤔");
      setBgColor(moodColors[detectedMood] || "#f4f4f4");
    } catch (error) {
      console.error("Error analyzing mood:", error);
      setMood("Error: Could not detect mood.");
      setEmoji("❌");
      setBgColor("#f4f4f4");
    } finally {
      setLoading(false);
    }
  };

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
    <section className="custom-emoji-mapper">
    <CustomEmojiMapping className="custom-emoji-mapping" customMap={customMap} setCustomMap={setCustomMap} allMappings={allMappings} />
    <ReverseTranslator className="reverse-emoji-translator" allMappings={allMappings} />
    <div className="mood-detector">
      <h1>Mood Detector</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your text here..."
      />
      <button onClick={analyzeMood} disabled={loading}>
        {loading ? "Analyzing..." : "Detect Mood"}
      </button>
      {mood && (
        <div
          className="mood-result"
          style={{
            backgroundColor: bgColor,
            borderRadius: "10px",
            padding: "15px",
          }}
        >
          <p>
            <strong>{emoji}</strong> {mood}
          </p>
          {moodDescription && <p><em>{moodDescription}</em></p>}
        </div>
      )}
    </div>
    </section>
   </>
  );
};

export default EmojiTranslator;