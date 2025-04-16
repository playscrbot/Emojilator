import React, { useState } from 'react';

const emojiReactions = {
  '😂': { animation: 'shake', sound: 'laugh.mp3' },
  '😱': { animation: 'jump', sound: 'gasp.mp3' },
  '😍': { animation: 'pulse', sound: 'awe.mp3' },
  '🤔': { animation: 'tilt', sound: 'hmm.mp3' },
  '🎉': { animation: 'burst', sound: 'cheer.mp3' },
};

export default function EmojiTheatre() {
  const [stageEmojis, setStageEmojis] = useState([]);

  function handleDrop(e) {
    const emoji = e.dataTransfer.getData('text');
    const reaction = emojiReactions[emoji];
    if (reaction) {
      setStageEmojis(prev => [...prev, { emoji, ...reaction, id: Date.now() }]);
      const audio = new Audio(`/sounds/${reaction.sound}`);
      audio.play();
    }
  }

  function handleDragStart(e, emoji) {
    e.dataTransfer.setData('text', emoji);
  }

  return (
    <div className="emoji-theatre">
      <h2>🎭 Emoji Reactions Theatre</h2>
      <div className="emoji-theatre-toolbar">
        {Object.keys(emojiReactions).map(e => (
          <span
            key={e}
            draggable
            onDragStart={(ev) => handleDragStart(ev, e)}
            className="emoji-draggable"
          >
            {e}
          </span>
        ))}
      </div>

      <div className="emoji-stage" onDrop={handleDrop} onDragOver={e => e.preventDefault()}>
        {stageEmojis.map(({ id, emoji, animation }) => (
          <span key={id} className={`emoji-on-stage ${animation}`}>{emoji}</span>
        ))}
      </div>
    </div>
  );
}