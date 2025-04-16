import React, { useEffect, useState } from "react";
import { Howl, Howler } from "howler";

const numRows = 8;
const numCols = 8;

const emojis = ["🔥", "😂", "💧", "🌟", "💀", "💖", "🧨"];

const sounds = {
  match3: new Howl({ src: ["../../public/sounds/match-3.wav"], volume: 0.5, loop: false }),
  match4: new Howl({ src: ["../../public/sounds/match-4.wav"], volume: 0.5, loop: false }),
  match5: new Howl({ src: ["../../public/sounds/match-5.wav"], volume: 0.5, loop: false })
};

const generateBoard = () => {
  const grid = [];
  for (let i = 0; i < 6 * 6; i++) {
    grid.push({
      emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      power: null,
      id: i
    });
  }
  return grid;
};

const playMatchSound = (count) => {
  if (count >= 5) sounds.match5.play();
  else if (count === 4) sounds.match4.play();
  else sounds.match3.play();
};

const getRandomEmoji = () =>
  emojis[Math.floor(Math.random() * emojis.length)];

const createBoard = () => {
  return Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, getRandomEmoji)
  );
};

export default function GameBoard() {
  const [board, setBoard] = useState(createBoard());
  const [score, setScore] = useState(0);

  // Handle swapping two tiles
  const [selectedTile, setSelectedTile] = useState(null);

  const handleTileClick = (row, col) => {
    if (!selectedTile) {
      setSelectedTile({ row, col });
    } else {
      const newBoard = [...board.map((row) => [...row])];

      const temp = newBoard[row][col];
      newBoard[row][col] = newBoard[selectedTile.row][selectedTile.col];
      newBoard[selectedTile.row][selectedTile.col] = temp;

      setBoard(newBoard);
      setSelectedTile(null);
    }
  };

  const findMatches = (board) => {
    const matched = Array(numRows).fill(null).map(() => Array(numCols).fill(false));
    const matchCounts = [];
  
    // Horizontal matches
    for (let row = 0; row < numRows; row++) {
      let streak = 1;
      for (let col = 1; col < numCols; col++) {
        if (board[row][col] === board[row][col - 1]) {
          streak++;
        } else {
          if (streak >= 3) {
            for (let k = 0; k < streak; k++) {
              matched[row][col - 1 - k] = true;
            }
            matchCounts.push(streak);
          }
          streak = 1;
        }
      }
      if (streak >= 3) {
        for (let k = 0; k < streak; k++) {
          matched[row][numCols - 1 - k] = true;
        }
        matchCounts.push(streak);
      }
    }
  
    // Vertical matches
    for (let col = 0; col < numCols; col++) {
      let streak = 1;
      for (let row = 1; row < numRows; row++) {
        if (board[row][col] === board[row - 1][col]) {
          streak++;
        } else {
          if (streak >= 3) {
            for (let k = 0; k < streak; k++) {
              matched[row - 1 - k][col] = true;
            }
            matchCounts.push(streak);
          }
          streak = 1;
        }
      }
      if (streak >= 3) {
        for (let k = 0; k < streak; k++) {
          matched[numRows - 1 - k][col] = true;
        }
        matchCounts.push(streak);
      }
    }
  
    if (matchCounts.length > 0) {
      // Play best sound based on biggest match
      const bestMatch = Math.max(...matchCounts);
      playMatchSound(bestMatch);
    }
  
    return matched;
  };

  const collapseAndRefill = (board, matched) => {
    const newBoard = board.map((row) => [...row]);
  
    for (let col = 0; col < numCols; col++) {
      let pointer = numRows - 1;
  
      for (let row = numRows - 1; row >= 0; row--) {
        if (!matched[row][col]) {
          newBoard[pointer][col] = newBoard[row][col];
          pointer--;
        }
      }
  
      while (pointer >= 0) {
        newBoard[pointer][col] = getRandomEmoji();
        pointer--;
      }
    }
  
    return newBoard;
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      const matched = findMatches(board);
  
      if (matched.flat().includes(true)) {
        const newBoard = collapseAndRefill(board, matched);
        setBoard(newBoard);
      }
    }, 300);
  
    return () => clearInterval(interval);
  }, [board]);  

  return (
    <div className="game-board">
      {board.map((row, rowIndex) =>
        row.map((emoji, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`game-tile ${
              selectedTile &&
              selectedTile.row === rowIndex &&
              selectedTile.col === colIndex
                ? "selected"
                : ""
            }`}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          >
            {emoji}
          </div>
        ))
      )}
    </div>
  );
}