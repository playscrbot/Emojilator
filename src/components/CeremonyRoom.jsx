import React, { useEffect, useState } from 'react';

const awards = [
  { role: "Commander", emoji: "🎖️", name: "You" },
  { role: "Chief", emoji: "🧠", name: "Section 7" },
  { role: "Engineer", emoji: "🛠️", name: "JSX Core" },
  { role: "Ambassador", emoji: "📡", name: "EmojiVerse AI" },
];

export default function CeremonyRoom() {
  const canvasRef = useRef();
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, {
      resize: false, // Important: we handle size manually
      useWorker: true,
    });
  
    // Set canvas size to match parent
    const parent = canvas.parentNode;
    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;
  
    const fireworkSequence = () => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          myConfetti({
            particleCount: 80,
            spread: 70 + Math.random() * 20,
            origin: {
              x: Math.random(),
              y: Math.random() * 0.5,
            },
          });
        }, i * 400);
      }
    };
  
    const interval = setInterval(() => {
      myConfetti({
        particleCount: 20,
        spread: 40,
        origin: { x: Math.random(), y: 0 },
      });
    }, 5000);
  
    fireworkSequence();
  
    return () => clearInterval(interval);
  }, []);  

  return (
    <div className="ceremony-room">
      <div className="curtain" />
      <div className="spotlight">
        <canvas ref={canvasRef} className="confetti-canvas-local" />
        <h1 className="headline">🏛️ Celebrating your end of journey!</h1>
        <p className="subtext">Thanks for visiting our Emojium Museum Hall. I hope you enjoyed what you see 🎉</p>

        <div className="award-row">
          {awards.map((medal, i) => (
            <div key={i} className="medal-card">
              <div className="medal-emoji">{medal.emoji}</div>
              <div className="medal-role">{medal.role}</div>
              <div className="medal-name">{medal.name}</div>
              <div className="medal-description">This is to </div>
            </div>
          ))}
        </div>

        <div className="ticker-tape">
          <p>🎮 4 rooms explored</p>
        </div>
      </div>
    </div>
  );
}