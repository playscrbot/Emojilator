const emojiSounds = {
    "😂": "/sounds/laugh.mp3",
    "😎": "/sounds/cool.wav",
    "💥": "/sounds/explosion.mp3",
    "💃": "/sounds/dancebeat.mp3",
    "😱": "/sounds/scream.mp3",
};
  
function SoundBooth() {
    const playSound = (src) => {
      const audio = new Audio(src);
      audio.play();
    };
  
    return (
      <div className="booth-container">
        {Object.entries(emojiSounds).map(([emoji, sound]) => (
          <button
            key={emoji}
            className="emoji-button"
            onClick={() => playSound(sound)}
          >
            {emoji}
          </button>
        ))}
      </div>
    );
}

export default SoundBooth;