import React, { useState, useEffect } from 'react';
import emojiMap from '../components/EmojiMap.jsx';

const moodPool = ['😂', '😱', '😡', '😎', '🥶', '🥳', '😭', '🤖', '😁', '😤', '😖', '🫡', '🤣', '😍', '😋', '😊', '😉', '😆', '😅', '😄', '🤣', '😘', '🥰', '😗', '😙', '🥲', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🫥', '😶‍🌫️', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '🥱', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🫤', '🙃', '🫠', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😮‍💨', '😰', '😱', '🥵', '🥶', '😳', '🤪', '😵', '😵‍💫', '🥴', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🥳', '🫨', '🥸', '🥺', '🥹', '🤠', '🤡', '🤥', '🙂‍↔️', '🙂‍↕️', '🤫', '🤭', '🫢', '🫣', '🧐', '🤓', '😈', '👹', '👺', '💀', '☠️', '👻', '👽', '👾', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '🐵', '🐶', '🐺', '🐱', '🦁', '🐯', '🦒', '🙍', '🙎', '🙅', '🙆', '🧏', '💁', '🙋', '🙇', '🤦', '🤷', '💆', '💇', '🧖', '🤹', '🏃', '🧘', '🧗', '🛀', '🛌', '🏇', '🏂', '🏄', '🏊', '🤽', '🏋️', '🚵', '🤸', '✌️', '🤞', '🫰', '🖖', '🤘', '🤏', '🫵', '🤙', '👌', '👊', '🤟', '👋', '🙏', '🤝', '🫶', '🙌', '👎', '👍'];

const emojiStories = [
  // 🟢 Beginner
  { emojis: "☀️🍳🥓", answer: ["breakfast", "morning food"] },
  { emojis: "📖☕😌", answer: ["relaxing with a book", "coffee and reading"] },
  { emojis: "🏖️🌞🍹", answer: ["beach day", "vacation", "sunny holiday"] },
  { emojis: "🍿🎬😱", answer: ["watching horror movie", "movie night"] },
  { emojis: "🛒🥛🍎", answer: ["grocery shopping", "buying essentials"] },
  { emojis: "🏃‍♂️🐶🌳", answer: ["walking the dog", "morning run with pet"] },
  { emojis: "🍕🎮😋", answer: ["gaming and pizza", "late night snack"] },
  { emojis: "🌙🛌💤", answer: ["bedtime", "going to sleep"] },
  { emojis: "⚓🚢👻", answer: ["ghost ship", "haunted anchor"] },
  { emojis: "🍽️🍷🕯️", answer: ["romantic night", "candlelight dinner", "dating"] },

  // 🟡 Intermediate
  { emojis: "🌧️☔📷📸", answer: ["rainy photoshoot", "taking photos in rain"] },
  { emojis: "💻🔋😰", answer: ["low battery panic"] },
  { emojis: "💸🛒😭", answer: ["overspending"] },
  { emojis: "🧑‍💻📱☕", answer: ["coding with coffee", "developer emergency"], },
  { emojis: "🧙‍♂️🔥📜", answer: ["spellcasting", "ancient magic ritual"] },
  { emojis: "📚🖊️⏰😴", answer: ["studying late night", "pulling an all-nighter"] },
  { emojis: "🔍📖👀", answer: ["decoding a secret message", "spy research"] },
  { emojis: "📧📥😫", answer: ["email overload", "inbox stress"] },
  { emojis: "📦🎁🤔", answer: ["a mystery package", "an unexpected gift"] },

  // 🔴 Advanced
  { emojis: "🧠🔬🧪💡", answer: ["scientific discovery", "experiment idea"] },
  { emojis: "🌌🛸👽🚨", answer: ["alien invasion", "ufo sighting"] },
  { emojis: "🦠🔍🧬💊", answer: ["virus research for disease cure", "genetic experiment"] },
  { emojis: "🧟♂️🏥💉", answer: ["zombie outbreak", "zombie apocalypse"] },
  { emojis: "🚀🌕👩‍🚀", answer: ["landing on the moon", "space exploration"] },
  { emojis: "🕵️‍♂️🔍🕶️", answer: ["undercover detective", "spy mission"] },
  { emojis: "🧝‍♀️🏹🐉", answer: ["elf vs dragon", "fantasy battle"] },
  { emojis: "🦸‍♂️👊💥", answer: ["superhero battle", "an epic fight scene"] },
  { emojis: "⌛🌌👶", answer: ["time travel paradox", "meeting your past self"] },
  { emojis: "🧜‍♀️🎤🌊", answer: ["mermaid concert", "singing under the sea"] },
  { emojis: "🏴‍☠️🗺️👑", answer: ["pirate treasure hunt"] }
];

const ingredients = ["🍅", "🧀", "🍞", "🥩", "🥬", "🍄", "🍌", "🍎", "🍗", "🍤", "🍚", "🍜", "🥚", "🌽"];
const recipes = {
  "🍅🧀🍞": "🍕", // Pizza
  "🍞🧀🥩": "🥪", // Sandwich
  "🥚🍞": "🍳", // Fried egg
  "🍌🥛": "🥤", // Smoothie
  "🍎🥬": "🥗", // Salad
  "🍗🍞": "🍔", // Burger
  "🍤🍚": "🍣", // Sushi
  "🍅🍄🥬": "🍲", // Soup
  "🍌🍎": "🍹", // Juice
  "🌽🥩": "🌮", // Taco
};

function EmojiDecoder() {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(null);
  const [burstEmojis, setBurstEmojis] = useState([]);

  const currentStory = emojiStories[index];

  const triggerEmojiBurst = (emoji) => {
    const burst = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random(),
      y: Math.random(),
      emoji,
    }));
    setBurstEmojis(burst);
    setTimeout(() => setBurstEmojis([]), 1000);
  };

  const checkAnswer = () => {
    const normalized = input.toLowerCase().trim();
    const isCorrect = currentStory.answer.some(a => normalized.includes(a));
    setStatus(isCorrect ? '✅ Correct!' : '❌ Try again');
    triggerEmojiBurst(isCorrect ? '🎉' : '💥');

    if (isCorrect) {
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % emojiStories.length);
        setInput('');
        setStatus(null);
      }, 1500);
    }
  };

  return (
    <>
      <div className="emoji-burst">
        {burstEmojis.map((b) => (
          <span
            key={b.id}
            className="emoji-fly"
            style={{ '--x': b.x, '--y': b.y }}
          >
            {b.emoji}
          </span>
        ))}
      </div>

      <div className="emoji-decoder">
        <div className="emoji-display">{currentStory.emojis}</div>

        <input
          type="text"
          className="emoji-decode-input"
          placeholder="Translate to text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={checkAnswer}>Check</button>

        {status && <p className="emoji-status">{status}</p>}
      </div>
    </>
  );
}

function EmojiCloner() {
    const [clones, setClones] = useState([]);
  
    const handleInput = (e) => {
      const emoji = e.target.value;
      if (emoji.trim()) {
        const newClones = Array.from({ length: 20 }, (_, i) => ({
          id: i,
          emoji,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        }));
        setClones(newClones);
      }
    };
  
    return (
      <div className="cloner-zone">
        <input className="emoji-input" placeholder="Type emoji" onChange={handleInput} />
        {clones.map(clone => (
          <div
            key={clone.id}
            className="emoji-clone"
            style={{
              left: clone.x,
              top: clone.y,
            }}
          >
            {clone.emoji}
          </div>
        ))}
      </div>
    );
}

function EmojiLooper() {
  const [storyText, setStoryText] = useState("");
  const [timer, setTimer] = useState(600);
  const [initialEmojis, setInitialEmojis] = useState([]);

  // Generate random emojis for the starting display
  const getRandomEmojis = () => {
    const keys = Object.keys(emojiMap);
    const randomEmojis = [];
    for (let i = 0; i < 3; i++) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      randomEmojis.push(emojiMap[randomKey]);
    }
    return randomEmojis;
  };

  useEffect(() => {
    // Set the initial emojis when the component mounts
    setInitialEmojis(getRandomEmojis());

    const storyInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(storyInterval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(storyInterval);
    };
  }, [timer]);

  // Function to convert the story text to emojis
  const convertTextToEmoji = (text) => {
    const words = text.split(" ");
    return words
      .map((word) => emojiMap[word.toLowerCase()] || word) // Replace words with emojis
      .join(" ");
  };

  // Handle input change
  const handleInputChange = (e) => {
    setStoryText(e.target.value); // Update the story text
  };

  // Copy the emoji story to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(storyText);
    alert("Story copied to clipboard!");
  };

  // Download the emoji story as PNG (using html2canvas)
  const downloadAsPNG = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    context.font = "30px Arial";
    context.fillText(storyText, 50, 50); // Draw the story text onto the canvas

    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "emoji-story.png";
    link.click();
  };

  return (
    <div className="emoji-story-builder">
      <div className="emoji-story-display">
        {initialEmojis.join(" ")}
      </div>
      <textarea
        className="emoji-story-input"
        value={convertTextToEmoji(storyText)}
        onChange={handleInputChange}
        placeholder="Start writing your story..."
        rows="6"
      ></textarea>
      <div className="emoji-story-timer">Time left: {timer}s</div>
      <div className="emoji-story-actions">
        <button className="emoji-story-copy" onClick={copyToClipboard}>
          Copy Story
        </button>
        <button onClick={downloadAsPNG}>
          Download as PNG
        </button>
      </div>
    </div>
  );
};

function MoodRandomizer() {
  const [mood, setMood] = useState(null);

  const handleGenerate = () => {
    const fx = new Audio('/sfx/beep.mp3');
    fx.play();
    const randomMood = moodPool[Math.floor(Math.random() * moodPool.length)];
    setMood(randomMood);
  };

  return (
    <div className="mood-randomizer">
      <button onClick={handleGenerate}>Generate Mood 🎲</button>
      {mood && <div className="mood-output">{mood}</div>}
    </div>
  );
}

function RecipeCooker() {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState("");
  const [isCooking, setIsCooking] = useState(false);

  const addIngredient = (emoji) => {
    if (selected.length < 5) {
      setSelected([...selected, emoji]);
    }
  };

  const cook = () => {
    setIsCooking(true);
    const combo = selected.sort().join("");
    const foundRecipe = recipes[combo] || "🤷‍♂️ No Recipe Found!"; // Default: "No recipe found"

    setTimeout(() => {
      setResult(foundRecipe);
      setIsCooking(false);
    }, 1500);
  };

  const surpriseMe = () => {
    const shuffled = [...ingredients].sort(() => 0.5 - Math.random()).slice(0, 3);
    setSelected(shuffled);
  };

  const reset = () => {
    setSelected([]);
    setResult("");
  };

  return (
    <div className="emoji-chef">
      <h2>What's in your kitchen?</h2>
      
      <div className="ingredient-grid">
        {ingredients.map((emoji, i) => (
          <button key={i} onClick={() => addIngredient(emoji)} disabled={selected.includes(emoji)} aria-label={`Add ${emoji}`}>
            {emoji}
          </button>
        ))}
      </div>

      <div className="cooking-pot">
        <h3>Your Ingredients:</h3>
        {selected.length > 0 ? (
          <div className="cooking-selected-items">
            {selected.map((item, i) => (
              <span key={i} aria-label={item}>{item}</span>
            ))}
          </div>
        ) : (
          <p>Click above to add ingredients!</p>
        )}

        {isCooking ? (
          <p className="cooking-status">Cooking...</p>
        ) : result ? (
          <div className="recipe-result">
            <p>You made: <span className="cooking-dish" aria-label={result === "🤷‍♂️" ? "Failed recipe" : result}>{result}</span></p>
            <button onClick={reset}>Cook Again</button>
          </div>
        ) : (
          <div className="cook-buttons">
            <button onClick={cook} disabled={selected.length === 0} aria-label="Cook">
              🍳 Cook!
            </button>
            <button onClick={surpriseMe} aria-label="Surprise me">🎲 Surprise Me</button>
            <button onClick={reset} aria-label="Reset">♻️ Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

const tabs = [
  { id: 'decoder', label: '🔎 Emoji Decoder', component: <EmojiDecoder /> },
  { id: 'cloner', label: '🧬 Cloner', component: <EmojiCloner /> },
  { id: 'looper', label: '🔁 Looper', component: <EmojiLooper /> },
  { id: 'randomizer', label: '🎲 Mood Generator', component: <MoodRandomizer /> },
  { id: 'chef', label: '👨‍🍳 Recipe Cooker', component: <RecipeCooker /> }
];

export default function ExperimentZone() {
  const [activeTab, setActiveTab] = useState('cloner');

  return (
    <div className="experiment-zone">
      <h1 className="zone-title">🔬 Emoji Experiment Zone</h1>
      <div className="zone-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="zone-content">
        {tabs.find(tab => tab.id === activeTab).component}
      </div>
    </div>
  );
}