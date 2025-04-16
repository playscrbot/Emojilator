import GameBoard from "./components/GameBoard.jsx";
import './Game.css';

function Game() {
  return (
    <div className="Game">
      <h1 style={{ textAlign: "center", marginTop: "60px" }}>Re-Burst ❤️‍🔥</h1>
      <GameBoard />
    </div>
  );
}

export default Game;