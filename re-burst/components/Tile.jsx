import React from 'react';

const Tile = ({ emoji, power, index, onSwap }) => {
  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * 36);
    onSwap(index, randomIndex); // temporary random swap logic
  };

  return (
    <div className="game-tile" onClick={handleClick}>
      <span>{emoji}</span>
      {power === 'line' && <span className="tile-powerup">➖</span>}
      {power === 'zapper' && <span className="tile-powerup">⚡</span>}
    </div>
  );
};

export default Tile;