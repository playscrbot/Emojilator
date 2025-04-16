import { useState, useEffect } from 'react';
import EmojiMatch from '../games/EmojiMatch.jsx';
import MoodMapper from '../games/MoodMapper.jsx';
import EmojiPuzzleWall from '../games/EmojiPuzzleWall.jsx';
import AchievementBadge from './AchievementBadge.jsx';

const EMOJIRAINS = ["😂", "🥳", "😎", "🎉", "✨", "💥", "❤️", "🚀", "🔥", "🌟"];

const MoodPlayground = () => {
  const [activeGame, setActiveGame] = useState('match');
  const [achievements, setAchievements] = useState([]);
  const [score, setScore] = useState(0);

  const switchGame = (game) => {
    setActiveGame(game);
  };

  const handleScoreUpdate = (points) => {
    setScore(prev => prev + points);
    if (points > 50) {
      setAchievements(prev => [...prev, "🔥 Epic Move!"]);
    }
  };

  const EmojiRain = () => {
    const [emojis, setEmojis] = useState([]);
  
    useEffect(() => {
      // Generate 40 emojis with random properties
      const newEmojis = Array.from({ length: 40 }, () => ({
        emoji: EMOJIRAINS[Math.floor(Math.random() * EMOJIRAINS.length)],
        left: `${Math.random() * 100}%`,
        duration: `${5 + Math.random() * 10}s`,
        delay: `${Math.random() * 5}s`,
        size: `${1 + Math.random() * 2}rem`,
        opacity: `${0.2 + Math.random() * 0.8}`,
      }));
      setEmojis(newEmojis);
    }, []);
  
    return (
      <div className="emoji-rain-container">
        {emojis.map((e, i) => (
          <span
            key={i}
            className="emoji-drop"
            style={{
              left: e.left,
              animationDuration: e.duration,
              animationDelay: e.delay,
              fontSize: e.size,
              opacity: e.opacity,
            }}
          >
            {e.emoji}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mood-playground">
      <EmojiRain />
      <div className="header-zone">
        <h1 className="glow-title">🎭 Visitor's Playground</h1>
        <p className="glow-para">Where every emoji has a story.</p>

        <div className="game-tabs">
          <button onClick={() => switchGame('match')} className={activeGame === 'match' ? 'active' : ''}>🎯 Emoji Match</button>
          <button onClick={() => switchGame('mapper')} className={activeGame === 'mapper' ? 'active' : ''}>🧠 Mood Mapper</button>
          <button onClick={() => switchGame('puzzle')} className={activeGame === 'puzzle' ? 'active' : ''}>🧩 Puzzle Wall</button>
        </div>
      </div>

      <div className="game-scoreboard">
        <span>⭐ Score: {score}</span>
        {achievements.map((badge, index) => (
          <AchievementBadge key={index} label={badge} />
        ))}
      </div>

      <div className="game-area">
        {activeGame === 'match' && <EmojiMatch onScore={handleScoreUpdate} />}
        {activeGame === 'mapper' && <MoodMapper onScore={handleScoreUpdate} />}
        {activeGame === 'puzzle' && <EmojiPuzzleWall onScore={handleScoreUpdate} />}
      </div>

      <footer className="scrolling-lore">
        💡 Did You Know? The 🫶 emoji was voted most wholesome in 2022. | 🎉 Emoji Hack: Using emojis in tweets boosts engagement by 25%! | 🧠 Fun Fact: There are over 3600 emojis in the Unicode as of today!
      </footer>
    </div>
  );
};

export default MoodPlayground;