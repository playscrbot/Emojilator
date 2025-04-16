import React, { useState, useEffect } from 'react';

const puzzles = [
  {
    prompt: "A cat gets scared by a ghost and runs into a pumpkin",
    sequence: ["🐱", "😱", "👻", "🏃‍♂️", "🎃"]
  },
  {
    prompt: "Alien lands, eats taco, gets sick",
    sequence: ["👽", "🛸", "🌮", "🤢"]
  },
  {
    prompt: "Robot builds a heart and becomes human",
    sequence: ["🤖", "🛠️", "❤️", "🧍"]
  },
  {
    prompt: "A chicken lays an egg that hatches into a chick",
    sequence: ["🐔", "🥚", "⏳", "🐣"]
  },
  {
    prompt: "The sun rises, shines, and then sets",
    sequence: ["🌅", "🌞", "☀️", "🌇"]
  },
  {
    prompt: "A pirate finds a map and digs for treasure",
    sequence: ["🏴‍☠️", "🗺️", "⛏️", "💰"]
  },
  {
    prompt: "An artist paints a portrait and hangs it in a gallery",
    sequence: ["👨‍🎨", "🎨", "🖼️", "🛠️", "🏛️"]
  },
  {
    prompt: "A bee collects nectar and makes honey",
    sequence: ["🐝", "🌸", "🍯"]
  },
  {
    prompt: "A magician pulls a rabbit out of a hat",
    sequence: ["🧙‍♂️", "🐇", "🎩", "🎉"]
  },
  {
    prompt: "An astronaut launches into space and lands on the moon",
    sequence: ["👨‍🚀", "🚀", "🌌", "🌕"]
  },
  {
    prompt: "Astronaut discovers alien life on a distant planet",
    sequence: ["👨‍🚀", "🌌", "🔭", "🪐", "👽"]
  },
  {
    prompt: "A robot gets upgraded and flies to space",
    sequence: ["🤖", "🔧", "🚀", "🌌"]
  },
  {
    prompt: "A wizard accidentally mixed potions and turned into a frog",
    sequence: ["🧙‍♂️", "⚗️", "✨", "🐸"]
  },
  {
    prompt: "A dragon burns a village and flies away",
    sequence: ["🐉", "🔥", "🏘️", "💨"]
  },
  {
    prompt: "A detective finds clues and solves the case",
    sequence: ["🕵️‍♂️", "🧐", "🧩", "✅"]
  },
  {
    prompt: "Player collects coins and defeats the boss",
    sequence: ["🧍", "🪙", "🪙", "👾", "🏆"]
  },
  {
    prompt: "Speedrunner dodges traps and wins",
    sequence: ["🏃‍♂️", "⚠️", "🕳️", "🏁"]
  },
  {
    prompt: "Santa delivers presents down the chimney",
    sequence: ["🎅", "🎁", "🏠", "🔥", "🎄"]
  },
  {
    prompt: "A dog digs a hole and buries a bone",
    sequence: ["🐶", "🕳️", "🦴", "✅"]
  },
  {
    prompt: "Scientist invents time machine and meets dinosaurs",
    sequence: ["👨‍🔬", "⚙️", "⏳", "🦕"]
  },
  {
    prompt: "Time traveler forgets something and loops back",
    sequence: ["🕰️", "🚪", "😨", "🔁"]
  },
  {
    prompt: "Castaway builds raft and sails home",
    sequence: ["🏝️", "🪵", "🛶", "🏠"]
  },
  {
    prompt: "Explorer gets lost, finds treasure",
    sequence: ["🧭", "🌲", "❓", "💰"]
  },
  {
    prompt: "Two people fall in love and get married",
    sequence: ["👀", "💘", "💍", "👰🤵"]
  },
  {
    prompt: "A breakup happens but they become friends",
    sequence: ["💑", "💔", "😢", "🤝"]
  },
  {
    prompt: "Thief steals jewel but gets caught",
    sequence: ["🕵️‍♀️", "🧤", "💎", "🚨"]
  },
  {
    prompt: "Detective follows trail to uncover culprit",
    sequence: ["🕵️‍♂️", "🔍", "🧩", "👤"]
  },
  {
    prompt: "A knight fights a dragon and wins",
    sequence: ["🛡️", "⚔️", "🐉", "🏆"]
  },
  {
    prompt: "A seed is planted and grows into a tree",
    sequence: ["🌱", "💧", "🌤️", "🌳"]
  },
  {
    prompt: "A chef bakes a cake and decorates it",
    sequence: ["👨‍🍳", "🥣", "🎂", "🍓"]
  },
  {
    prompt: "A student studies hard and graduates",
    sequence: ["👨‍🎓", "📚", "📝", "🎓"]
  },
  {
    prompt: "A vampire bites someone and turns them into a vampire",
    sequence: ["🧛", "😱", "🩸", "🧛"]
  },
  {
    prompt: "A wizard casts a spell and makes it rain",
    sequence: ["🧙‍♂️", "🪄", "☁️", "🌧️"]
  },
  {
    prompt: "A penguin slides on ice and dives into water",
    sequence: ["🐧", "🛷", "🧊", "🤿", "🌊"]
  },
  {
    prompt: "A ghost haunts a house and scares people away",
    sequence: ["👻", "🏚️", "😱", "🏃‍♀️"]
  }
];

export default function EmojiPuzzleWall() {
  const [currentPuzzle, setCurrentPuzzle] = useState(randomPuzzle());
  const [tiles, setTiles] = useState([]);
  const [dropZone, setDropZone] = useState([]);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const [score, setScore] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0 && !gameOver) setTimer(t => t - 1);
      else if (timer === 0) {
        setGameOver(true);
        setMessage("⏰ Time's up!");
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, gameOver]);

  function randomPuzzle() {
    return puzzles[Math.floor(Math.random() * puzzles.length)];
  }

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  // Initialize/reset puzzle
  useEffect(() => {
    resetPuzzle();
  }, [currentPuzzle]);

  function resetPuzzle() {
    setTiles(shuffle([...currentPuzzle.sequence]));
    setDropZone(Array(currentPuzzle.sequence.length).fill(null));
    setMessage("");
    setTimer(60);
    setGameOver(false);
  }

  function nextPuzzle() {
    setCurrentPuzzle(randomPuzzle());
  }

  function handleDrop(index, emoji) {
    if (gameOver) return;

    const updated = [...dropZone];
    updated[index] = emoji;
    setDropZone(updated);

    const isComplete = updated.every(tile => tile !== null);
    if (isComplete) {
      const isCorrect = updated.join("") === currentPuzzle.sequence.join("");
      setGameOver(true);
      if (isCorrect) {
        setMessage(
          <div>
            🎉 Correct! +10 points
            <button className="next-puzzle-btn" onClick={nextPuzzle}>
              Next Puzzle ➡️
            </button>
          </div>
        );
      } else {
        setMessage(
          <div>
            ❌ Try again!
            <button className="retry-btn" onClick={resetPuzzle}>
              Retry 🔄
            </button>
          </div>
        );
      }
    }
  }

  return (
    <div className="emoji-puzzle-wall">
      <h2>🧩 Emoji Puzzle Wall</h2>
      <p><strong>Story:</strong> {currentPuzzle.prompt}</p>
      <div className="puzzle-timer">{!gameOver && `⏱️ ${timer}s`}</div>

      <div className="puzzle-drop-row">
        {dropZone.map((emoji, i) => (
          <div
            key={i}
            className={`puzzle-drop-zone ${emoji ? "filled" : ""}`}
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              const draggedEmoji = e.dataTransfer.getData("emoji");
              handleDrop(i, draggedEmoji);
            }}
          >
            {emoji || "??"}
          </div>
        ))}
      </div>

      <div className="puzzle-tile-row">
        {tiles.map((emoji, i) => (
          <div
            key={i}
            draggable
            className="puzzle-tile neon"
            onDragStart={e => e.dataTransfer.setData("emoji", emoji)}
          >
            {emoji}
          </div>
        ))}
      </div>

      {message && <div className="puzzle-result-msg">{message}</div>}
    </div>
  );
}