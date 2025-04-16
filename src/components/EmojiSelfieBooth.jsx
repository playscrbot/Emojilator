import React, { useRef, useState, useEffect } from 'react';
import interact from 'interactjs';
import html2canvas from 'html2canvas';

const backgrounds = [
  '/assets/bg/selfie-bg1.jpg',
  '/assets/bg/selfie-bg2.jpg',
  '/assets/bg/selfie-bg3.jpg',
  '/assets/bg/selfie-bg4.jpg',
];

const emojiPacks = {
  food: ['🍕', '🍣', '🍩'],
  animals: ['🐶', '🦁', '🐼'],
  emotions: ['😆', '😭', '😎']
};

const emojiProps = ['🎩', '🕶️', '💬', '👑', '🎀'];

export default function EmojiSelfieBooth() {
  const videoRef = useRef(null);
  const selfieRef = useRef(null);
  const dragAreaRef = useRef(null);

  const [snapshot, setSnapshot] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [typedEmoji, setTypedEmoji] = useState('');
  const [emojiObjects, setEmojiObjects] = useState([]);
  const [selectedFilter, setFilter] = useState('none');
  const [snapToGrid, setSnapToGrid] = useState(false);
  const [frame, setFrame] = useState('none');

  // Add dynamic emojis from input
  const handleEmojiAdd = () => {
    if (typedEmoji.trim()) {
      setEmojiObjects([...emojiObjects, { emoji: typedEmoji.trim(), x: 50, y: 50 }]);
      setTypedEmoji('');
    }
  };

  const handleStickerClick = (emoji) => {
    setEmojiObjects([...emojiObjects, { emoji, x: 50, y: 50 }]);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error('Camera access denied:', err);
    }
  };

  const capturePhoto = () => {
    const canvas = selfieRef.current;
    const ctx = selfieRef.current.getContext('2d');

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Apply filter
    ctx.filter = selectedFilter;

    emojiObjects.forEach(({ emoji, x, y }) => {
      ctx.font = '30px serif';
      ctx.fillText(emoji, x, y);
    });

    const image = selfieRef.current.toDataURL('image/png');
    setSnapshot(image);
  };

  // Download selfie to the gallery
  const downloadSelfie = () => {
    html2canvas(selfieRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'emoji-selfie.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  // InteractJS for drag & drop emojis into canvas
  // 1.Let users rotate and scale emojis
  // 2.Let users toggle a “Snap to Grid” mode to align emojis easily
  useEffect(() => {
    interact('.draggable').unset(); // Clear previous to avoid duplicates

    interact('.draggable').draggable({
      modifiers: [
        interact.modifiers.restrictRect({ restriction: dragAreaRef.current, endOnly: true }),
        ...(snapToGrid
          ? [interact.modifiers.snap({
              targets: [interact.snappers.grid({ x: 30, y: 30 })],
              relativePoints: [{ x: 0, y: 0 }]
            })]
          : [])
      ],
      listeners: {
        move(event) {
          const index = parseInt(event.target.getAttribute('data-index'), 10);
          const dx = event.dx;
          const dy = event.dy;

          setEmojiObjects(prev => {
            const updated = [...prev];
            const current = updated[index];
            updated[index] = {
              ...current,
              x: current.x + dx,
              y: current.y + dy
            };
            return updated;
          });

          // Update visual position
          const target = event.target;
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + dy;
          target.style.transform = `translate(${x}px, ${y}px)`;
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        }
      }
    });
  }, [emojiObjects, snapToGrid]);

  return (
    <div className="emoji-selfie-booth">
      <h2>📸 Emoji Selfie Booth</h2>
      <p>Snap a selfie with your favorite emojis everywhere!</p>

      {/* Controls */}
      <div className="selfie-booth-controls">
        {/* Background Selector */}
        <p>🖼️ Choose Background:</p>
        {backgrounds.map((bg, i) => (
          <button key={i} onClick={() => setBgIndex(i)}>BG {i + 1}</button>
        ))}

        {/* Frame Selector */}
        <select onChange={(e) => setFrame(e.target.value)}>
          <option value="none">No Frame</option>
          <option value="glow">Glow</option>
          <option value="polaroid">Polaroid</option>
        </select>

        {/* Filter Selector */}
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="none">No Filter</option>
          <option value="grayscale(1)">Grayscale</option>
          <option value="sepia(1)">Sepia</option>
          <option value="brightness(1.2)">Bright</option>
          <option value="blur(2px)">Blur</option>
        </select>

        {/* Snap to Grid Toggle */}
        <label>
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={() => setSnapToGrid(!snapToGrid)}
          />
          Snap to Grid
        </label>
      </div>

      {/* Emoji Panels */}
      <div className="booth-emoji-panels">
        {/* Emoji Stickers */}
        <div>
          <p>🧩 Emoji Stickers:</p>
          {Object.entries(emojiPacks).map(([pack, emojis]) => (
            <div key={pack}>
              <strong>{pack}:</strong>{' '}
              {emojis.map((emoji, i) => (
                <button key={i} onClick={() => handleStickerClick(emoji)}>{emoji}</button>
              ))}
            </div>
          ))}
        </div>

        {/* Emoji Props */}
        <div>
          <p>🎯 Drag props into your selfie!</p>
          {emojiProps.map((emoji, i) => (
            <button key={i} onClick={() => handleStickerClick(emoji)}>{emoji}</button>
          ))}
        </div>
      </div>

      {/* Emoji Input */}
      <div className="selfie-booth-input">
        <input
          value={typedEmoji}
          onChange={(e) => setTypedEmoji(e.target.value)}
          placeholder="Type emoji here"
        />
        <button onClick={handleEmojiAdd}>Add</button>
      </div>

      <video ref={videoRef} width="320" height="240" autoPlay muted />
      <br />

      {/* Selfie Zone */}
      <div
        className="selfie-zone"
        ref={dragAreaRef}
        style={{
          position: 'relative',
          width: '320px',
          height: '240px',
          margin: '1rem auto',
          backgroundImage: `url(${backgrounds[bgIndex]})`,
          backgroundSize: 'cover',
          filter: selectedFilter,
          border: frame !== 'none' ? '10px solid gold' : 'none'
        }}
      >
        <video
          ref={videoRef}
          width="320"
          height="240"
          autoPlay
          muted
          style={{ position: 'absolute', zIndex: 0 }}
        />

        {emojiObjects.map((e, i) => (
          <div
            key={i}
            className="draggable"
            data-index={i}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              transform: `translate(${e.x}px, ${e.y}px)`,
              fontSize: '30px',
              cursor: 'move',
              zIndex: 2,
              userSelect: 'none'
            }}
          >
            {e.emoji}
          </div>
        ))}
      </div>

      {/* Hidden Canvas for Snapshot */}
      <canvas
        ref={selfieRef}
        width="320"
        height="240"
        style={{ display: 'none' }}
      />

      <button onClick={startCamera} className="start-camera">🎥 Start Camera</button>
      <button onClick={capturePhoto}>📸 Take Selfie</button>

      {snapshot && (
        <div className="snapshot-preview">
          <h3>Your Selfie:</h3>
          <img src={snapshot} alt="Emoji Selfie" />
          {/* Save Button */}
          <button className="selfie-save-button" onClick={downloadSelfie}>
            💾 Save Selfie
          </button>
        </div>
      )}
    </div>
  );
}