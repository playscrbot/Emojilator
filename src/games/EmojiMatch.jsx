import React, { useState, useEffect } from 'react';

const emojiList = [
  { name: 'Party Popper', emoji: '🎉' },
  { name: 'Face with Tears of Joy', emoji: '😂' },
  { name: 'Red Heart', emoji: '❤️' },
  { name: 'Thumbs Up', emoji: '👍' },
  { name: 'Fire', emoji: '🔥' },
  { name: 'Rocket', emoji: '🚀' },
  { name: 'Smiling Face with Sunglasses', emoji: '😎' },
  { name: 'Thinking Face', emoji: '🤔' },
  { name: 'Crying Face', emoji: '😢' },
  { name: 'Grinning Face', emoji: '😀' },
  { name: 'Woozy Face', emoji: '🥴' },
  { name: 'Lying Face', emoji: '🤥' },
  { name: 'Confounded Face', emoji: '😖' },
  { name: 'Zany Face', emoji: '🤪' }
];

const EmojiMatch = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => localStorage.getItem('emojiHighScore') || 0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [gridEmojis, setGridEmojis] = useState([]);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    if (!gameRunning) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameRunning]);

  useEffect(() => {
    if (gameRunning) nextRound();
  }, [gameRunning]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameRunning(true);
  };

  const endGame = () => {
    setGameRunning(false);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('emojiHighScore', score);
      alert('🎉 New High Score!');
    }
  };

  const nextRound = () => {
    const random = emojiList[Math.floor(Math.random() * emojiList.length)];
    setCurrentEmoji(random);

    const shuffled = [...emojiList].sort(() => 0.5 - Math.random()).slice(0, 8);
    if (!shuffled.find(e => e.emoji === random.emoji)) {
      shuffled[Math.floor(Math.random() * shuffled.length)] = random;
    }

    setGridEmojis(shuffled);
  };

  const handleEmojiClick = (emoji) => {
    if (!gameRunning) return;

    if (emoji === currentEmoji.emoji) {
      setScore(prev => prev + 1);
    } else {
      setScore(prev => Math.max(0, prev - 1));
    }
    nextRound();
  };

  return (
    <div className="emoji-match-container">
      <h1>🎯 Emoji Match</h1>

      <div className="game-scoreboard">
        <div>Score: {score} | Time: {timeLeft}s | High Score: {highScore}</div>
      </div>

      {gameRunning ? (
        <>
          <div className="emoji-match-question">
            Match: <strong>{currentEmoji?.name}</strong>
          </div>
          <div className="emoji-match-grid">
            {gridEmojis.map((e, index) => (
              <button key={index} className="emoji-match-button" onClick={() => handleEmojiClick(e.emoji)}>
                {e.emoji}
              </button>
            ))}
          </div>
        </>
      ) : (
        <button className="match-game-start-button" onClick={startGame}>
          🚀 Start Challenge
        </button>
      )}
    </div>
  );
};

export default EmojiMatch;