import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import MuseumDirectory from './MuseumDirectory.jsx';

export default function EmojiMuseum() {
  const guides = [
    {
      name: 'Professor',
      emoji: '👨‍🔬🧬',
      role: 'Lab Advisor',
      description: 'A Wise and quirky guide who teaches emoji history and lore.',
      scenes: 'Unicode Lab'
    },
    {
      name: 'Ampurr',
      emoji: '😆⚡',
      role: 'Entertainer',
      description: 'An Energetic host who surprises users with facts, jokes, and challenges.',
      scenes: 'Visitor\'s Playground'
    },
    {
      name: 'Pixelia',
      emoji: '👾🔍',
      role: 'Explorer',
      description: 'A Curious AI that interacts with you and helps you explore the world of emojis.',
      scenes: 'Experiment Zone'
    },
    {
      name: 'Seijiro',
      emoji: '😊✨',
      role: 'Swordsman',
      description: 'A Warm and friendly figure who motivates you to become the best version of yourself.',
      scenes: 'Tradition Tracker'
    },
    {
      name: 'Agent Wink',
      emoji: '😉🕶️',
      role: 'Navigator',
      description: 'A Mysterious guide who would visit you at the hidden paths.',
      scenes: 'Secret Vault'
    }
  ];

  useEffect(() => {
    // Initial fireworks burst
    launchFireworks();
  }, []);

  const launchFireworks = () => {
    confetti({
      particleCount: 150,
      spread: 120,
      startVelocity: 50,
      origin: { y: 0.6 }
    });

    confetti({
      particleCount: 100,
      angle: 60,
      spread: 100,
      origin: { x: 0, y: 0.8 }
    });

    confetti({
      particleCount: 100,
      angle: 120,
      spread: 100,
      origin: { x: 1, y: 0.8 }
    });
  };

  return (
    <div className="museum-room">
      <h2 className="museum-title">🖼️ Welcome to the Emoji Museum Hall</h2>
      <p className="museum-intro">
        Hello there! I'm so happy you came here today.
        <br />
        Tap "Enter Room" and see the magic 🥳
      </p>

      <MuseumDirectory />

      <div className="guide-info-section">
        <h2 className="guide-title">Meet Our Hosts 🎧</h2>
        <p className="guide-intro">
          Let me introduce the hosts who guide you through the museum. Each host has an unique personality and a significant role.
        </p>
        <div className="guides-deck">
        {guides.map((guide, idx) => (
          <div className="guide-card" key={idx}>
            <div className="guide-info">
              <img className="guide-image" src={`hosts/${guide.name}.png`} alt={guide.name} />
              <h3 className="guide-name">{guide.name} {guide.emoji}</h3>
              <p className="guide-role">{guide.role}</p>
              <p className="guide-description">{guide.description}</p>
              <p className="guide-scenes"><strong>Appears at:</strong> {guide.scenes}</p>
            </div>
          </div>
        ))}
        </div>
      </div>

      <div className="under-construction-section">
        <h2 className="construction-title">🚧 Rooms Under Construction</h2>
        <p className="construction-intro">
          Some parts of the museum are still being assembled. 
          Please check back later — exciting updates on the way \(but I'm just too lazy 😝)/!
        </p>
        <div className="construction-rooms">
          <div className="construction-card">
            <h3>🎧 Sound Booth</h3>
            <p>Coming in <strong>June 2025</strong>. Expect an audio adventure for every emoji!</p>
          </div>
          <div className="construction-card">
            <h3>🤳 Selfie Booth</h3>
            <p>Coming in <strong>August 2025</strong>. Expect an audio adventure for every emoji!</p>
          </div>
          <div className="construction-card">
            <h3>🎬 Emoji Reactions Theatre</h3>
            <p>Opening in <strong>October 2025</strong>. Get ready for live emoji acts and dramatic expressions!</p>
          </div>
        </div>
      </div>
    </div>
  );
}